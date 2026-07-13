"""
Prospección manual asistida con Playwright + Google Maps.

Estrategia:
- Abre Google Maps en Chromium
- Busca "<rubro> <zona>"
- Hace scroll en el panel izquierdo para cargar ~20 resultados
- Para cada resultado, hace CLICK en el card para abrir el panel de detalle
  donde está el teléfono y la web (no aparecen en el listado)
- Filtra por prefijo telefónico de la zona (ej: 3541/3543 para VCP)
- Exporta CSV + .md listos para revisión humana

Uso:
    python3 scripts/prospectar_maps.py --rubro restaurant --zona "villa carlos paz" --max 15
    python3 scripts/prospectar_maps.py --rubro abogados --zona cosquin --max 10
"""

import argparse
import csv
import re
import sys
import time
from pathlib import Path
from urllib.parse import quote_plus

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout

# ──────────────────────────────────────────────────────────────
# Configuración
# ──────────────────────────────────────────────────────────────

PREFIJOS_ZONA = {
    "villa carlos paz": ["3541", "3543"],
    "carlos paz": ["3541", "3543"],
    "vcp": ["3541", "3543"],
    "cosquin": ["3541", "3543"],
    "cosquín": ["3541", "3543"],
    "la falda": ["3548"],
    "capilla del monte": ["3548"],
    "tanti": ["3541", "3543"],
    "valle hermoso": ["3541", "3543"],
    "la cumbre": ["3548"],
    "alta gracia": ["3547"],
    "cordoba": ["351"],
    "córdoba": ["351"],
}

OUT_DIR = Path("/home/z/my-project/prospeccion-carlos-paz")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def normalizar_telefono(raw: str) -> str:
    if not raw:
        return ""
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("54"):
        digits = digits[2:]
    if digits.startswith("9") and len(digits) >= 10:
        digits = digits[1:]
    return digits


def telefono_es_de_zona(tel: str, prefijos: list[str]) -> bool:
    if not tel or not prefijos:
        return True
    return any(tel.startswith(p) for p in prefijos)


def extraer_de_panel_detalle(page) -> dict:
    """Extrae datos del panel de detalle que se abre a la derecha al hacer click."""
    data = {
        "nombre": "", "direccion": "", "telefono": "", "web": "",
        "rating": "", "reseñas": "", "categoria": "",
    }
    try:
        # Nombre (h1 en el panel de detalle)
        h1 = page.query_selector("h1.DUwDvf, h1.fontHeadlineLarge")
        if h1:
            data["nombre"] = h1.inner_text().strip()
    except Exception:
        pass

    try:
        # Rating
        rating_el = page.query_selector("span.F7nice span, div.F7nice span[aria-hidden='true']")
        if rating_el:
            txt = rating_el.inner_text().strip()
            if re.match(r"^\d\.\d$", txt):
                data["rating"] = txt
    except Exception:
        pass

    try:
        # Categoría
        cat_el = page.query_selector("button[jsaction*='pane.rating.category']")
        if cat_el:
            data["categoria"] = cat_el.inner_text().strip()
    except Exception:
        pass

    # Botones de acción: teléfono, web, dirección, etc.
    # Google Maps los tiene como buttons con aria-label
    try:
        buttons = page.query_selector_all("button[data-item-id^='phone:'], button[data-item-id^='authority:'], button[data-item-id^='address:']")
        for btn in buttons:
            item_id = btn.get_attribute("data-item-id") or ""
            aria = (btn.get_attribute("aria-label") or "").replace("\n", " ").strip()
            texto = " ".join(btn.inner_text().split()).strip()
            if "phone" in item_id:
                # Teléfono: el aria-label suele ser "Teléfono: +54 3541 ..."
                m = re.search(r"(?:Teléfono|Phone)[:\s]*(.+)", aria, re.IGNORECASE)
                if m:
                    data["telefono"] = m.group(1).strip()
                else:
                    data["telefono"] = texto or aria
            elif "authority" in item_id:
                # Web
                m = re.search(r"(?:Sitio web|Website)[:\s]*(.+)", aria, re.IGNORECASE)
                if m:
                    data["web"] = m.group(1).strip()
                else:
                    data["web"] = texto or aria
            elif "address" in item_id:
                # Dirección
                m = re.search(r"(?:Dirección|Address)[:\s]*(.+)", aria, re.IGNORECASE)
                if m:
                    data["direccion"] = m.group(1).strip()
                else:
                    data["direccion"] = texto or aria
    except Exception:
        pass

    # Fallback: buscar por aria-label (más robusto)
    if not data["telefono"]:
        try:
            tel_btn = page.query_selector("button[aria-label*='Teléfono'], button[aria-label*='Llamar'], button[aria-label*='Phone']")
            if tel_btn:
                aria = (tel_btn.get_attribute("aria-label") or "").replace("\n", " ").strip()
                m = re.search(r"(?:Teléfono|Llamar|Phone)[:\s]*(.+)", aria, re.IGNORECASE)
                if m:
                    data["telefono"] = m.group(1).strip()
        except Exception:
            pass

    if not data["web"]:
        try:
            web_btn = page.query_selector("button[aria-label*='Sitio web'], button[aria-label*='Website']")
            if web_btn:
                aria = (web_btn.get_attribute("aria-label") or "").replace("\n", " ").strip()
                m = re.search(r"(?:Sitio web|Website)[:\s]*(.+)", aria, re.IGNORECASE)
                if m:
                    data["web"] = m.group(1).strip()
        except Exception:
            pass

    if not data["direccion"]:
        try:
            dir_btn = page.query_selector("button[aria-label*='Dirección'], button[aria-label*='Address']")
            if dir_btn:
                aria = (dir_btn.get_attribute("aria-label") or "").replace("\n", " ").strip()
                m = re.search(r"(?:Dirección|Address)[:\s]*(.+)", aria, re.IGNORECASE)
                if m:
                    data["direccion"] = m.group(1).strip()
        except Exception:
            pass

    return data


def prospectar(rubro: str, zona: str, prefijos: list[str], max_results: int) -> list[dict]:
    busqueda = f"{rubro} {zona}"
    url = f"https://www.google.com/maps/search/{quote_plus(busqueda)}/"
    print(f"→ Búsqueda: {busqueda}")
    print(f"  URL: {url}")
    print(f"  Filtrando teléfonos por prefijo: {prefijos or 'ninguno'}")
    print(f"  Objetivo: {max_results} comercios válidos\n")

    resultados = []

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage",
            ],
        )
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            locale="es-AR",
            timezone_id="America/Argentina/Cordoba",
            user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        )
        context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
            window.chrome = { runtime: {} };
        """)
        page = context.new_page()

        try:
            page.goto(url, wait_until="domcontentloaded", timeout=30000)
            print("→ Cargando resultados...")
            page.wait_for_selector("[role='feed'] [role='article']", timeout=20000)
            time.sleep(3)
        except PlaywrightTimeout:
            print("  ⚠ Timeout. Probablemente CAPTCHA o cambio de selectors.")
            browser.close()
            return []

        # Scroll para cargar más resultados
        print("→ Scroll para cargar más resultados...")
        for i in range(8):
            page.evaluate("document.querySelector('[role=feed]').scrollBy(0, 1500)")
            time.sleep(1.5)
            cards = page.query_selector_all("[role='feed'] [role='article']")
            print(f"  Iter {i+1}: {len(cards)} cards cargados")
            if len(cards) >= max_results * 2:
                break

        # Tomar lista de cards (sus nombres y hrefs)
        cards_info = []
        for card in page.query_selector_all("[role='feed'] [role='article']"):
            try:
                # El link dentro del card es el nombre + URL
                link = card.query_selector("a.hfpxzc")
                if link:
                    nombre = link.inner_text().strip()
                    href = link.get_attribute("href") or ""
                    if nombre and href:
                        cards_info.append({"nombre": nombre, "href": href})
            except Exception:
                pass

        print(f"\n→ {len(cards_info)} comercios encontrados. Extrayendo detalles...")

        # Para cada card, navegar a su URL directa (mejor que click que puede fallar)
        for i, info in enumerate(cards_info):
            if len(resultados) >= max_results:
                break
            try:
                print(f"  [{i+1}/{len(cards_info)}] {info['nombre'][:50]}... ", end="", flush=True)
                # Navegar directamente a la URL del place (más confiable que click)
                page.goto(info["href"], wait_until="domcontentloaded", timeout=20000)
                time.sleep(2.5)  # Dar tiempo a que cargue el panel de detalle

                data = extraer_de_panel_detalle(page)
                if not data["nombre"]:
                    data["nombre"] = info["nombre"]

                tel_norm = normalizar_telefono(data["telefono"])
                data["telefono_normalizado"] = tel_norm
                data["link_maps"] = info["href"]

                # Filtrar por zona (si tiene teléfono y no es de la zona, descartar)
                if tel_norm and prefijos and not telefono_es_de_zona(tel_norm, prefijos):
                    print(f"✗ fuera de zona ({tel_norm})")
                    continue

                # Marcar oportunidad
                if not data["web"]:
                    data["oportunidad"] = "🔴 Sin web"
                elif not tel_norm:
                    data["oportunidad"] = "🟡 Sin teléfono visible"
                else:
                    data["oportunidad"] = "🟢 Con web (verificar)"

                resultados.append(data)
                print(f"✓ {data['oportunidad']} — {data.get('telefono', 'sin tel')}")

            except Exception as e:
                print(f"⚠ error: {e}")
                continue

        browser.close()

    return resultados


def exportar_csv(resultados: list[dict], rubro: str, zona: str) -> Path:
    zona_slug = zona.replace(" ", "-").lower()
    rubro_slug = rubro.replace(" ", "-").lower()
    out_csv = OUT_DIR / f"leads-{rubro_slug}-{zona_slug}.csv"

    campos = ["nombre", "categoria", "direccion", "telefono", "telefono_normalizado",
              "web", "rating", "oportunidad", "link_maps"]
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=campos, extrasaction="ignore")
        w.writeheader()
        for r in resultados:
            w.writerow(r)
    return out_csv


def exportar_md(resultados: list[dict], rubro: str, zona: str, prefijos: list[str]) -> Path:
    zona_slug = zona.replace(" ", "-").lower()
    rubro_slug = rubro.replace(" ", "-").lower()
    out_md = OUT_DIR / f"leads-{rubro_slug}-{zona_slug}.md"

    sin_web = [r for r in resultados if "Sin web" in r["oportunidad"]]
    con_web = [r for r in resultados if "Con web" in r["oportunidad"]]
    sin_tel = [r for r in resultados if "Sin teléfono" in r["oportunidad"]]

    with open(out_md, "w", encoding="utf-8") as f:
        f.write(f"# Prospección: {rubro.title()} en {zona.title()}\n\n")
        f.write(f"> Búsqueda: {time.strftime('%Y-%m-%d %H:%M')}\n")
        f.write(f"> Fuente: Google Maps (extracción con Playwright)\n")
        f.write(f"> Filtro de prefijo telefónico: {', '.join(prefijos) if prefijos else 'ninguno'}\n\n")
        f.write(f"## Resumen\n\n")
        f.write(f"- **{len(resultados)}** comercios extraídos\n")
        f.write(f"- **{len(sin_web)}** SIN web (oportunidad alta 🔴)\n")
        f.write(f"- **{len(con_web)}** CON web (verificar calidad 🟢)\n")
        f.write(f"- **{len(sin_tel)}** sin teléfono visible (🟡)\n\n")

        f.write(f"## 🎯 Prioridad 1: Sin web (contactar YA)\n\n")
        for i, r in enumerate(sin_web, 1):
            f.write(f"### {i}. {r['nombre']}\n\n")
            f.write(f"| Campo | Valor |\n|---|---|\n")
            f.write(f"| **Categoría** | {r.get('categoria','—')} |\n")
            f.write(f"| **Dirección** | {r['direccion'] or '—'} |\n")
            f.write(f"| **Teléfono** | {r['telefono'] or '—'} |\n")
            if r["telefono_normalizado"]:
                f.write(f"| **WhatsApp** | https://wa.me/549{r['telefono_normalizado']} |\n")
            f.write(f"| **Rating** | {r['rating'] or '—'} |\n")
            f.write(f"| **Link Maps** | {r['link_maps']} |\n\n")

        f.write(f"\n## 🟢 Prioridad 2: Con web (revisar si está rota/fea/desactualizada)\n\n")
        for i, r in enumerate(con_web, 1):
            f.write(f"### {i}. {r['nombre']}\n\n")
            f.write(f"- **Teléfono**: {r['telefono'] or '—'}\n")
            f.write(f"- **Web**: {r['web']}\n")
            f.write(f"- **Link Maps**: {r['link_maps']}\n\n")

        f.write(f"\n## 🟡 Sin teléfono visible (revisar manualmente)\n\n")
        for i, r in enumerate(sin_tel, 1):
            f.write(f"### {i}. {r['nombre']}\n\n")
            f.write(f"- **Dirección**: {r['direccion'] or '—'}\n")
            f.write(f"- **Web**: {r['web'] or '—'}\n")
            f.write(f"- **Link Maps**: {r['link_maps']}\n\n")

        f.write(f"\n---\n\n## Cómo usar estos leads\n\n")
        f.write(f"1. Empezá por la lista 🔴 **Sin web** — son los leads más calientes.\n")
        f.write(f"2. Para cada uno, abrí el link de Maps y confirmá con tus ojos:\n")
        f.write(f"   - ¿Sigue abierto? (mirá reseñas recientes)\n")
        f.write(f"   - ¿El teléfono es correcto? (probá mandar WhatsApp)\n")
        f.write(f"   - ¿Qué le ofrecés? (mirá su Instagram si tiene)\n")
        f.write(f"3. Mandá WhatsApp PERSONALIZADO, no template. Ejemplo:\n\n")
        f.write('   "Hola [nombre del comercio], vi [comercio] en Google Maps. '\
                f'Miré y me di cuenta que no tenés web propia. Soy Gonzalo de Paulero '\
                f'Studio, hago webs para {rubro} en {zona.title()}. ¿Te molesta si te mando '\
                'una idea concreta para tu caso?"\n\n')
        f.write(f"4. **No mandes más de 10 WhatsApps por día**. Mejor 5 personalizados que 50 genéricos.\n")
        f.write(f"5. Si responden 'no', igual agradecé y dejá la puerta abierta. Re-contactá en 3 meses.\n")
    return out_md


def main():
    parser = argparse.ArgumentParser(description="Prospección con Google Maps + Playwright")
    parser.add_argument("--rubro", required=True, help="Ej: restaurant, abogados, cabañas")
    parser.add_argument("--zona", required=True, help="Ej: 'villa carlos paz', cosquin")
    parser.add_argument("--prefijos", default="", help="Override separados por coma (ej: 3541,3543)")
    parser.add_argument("--max", type=int, default=15, help="Máximo resultados válidos (default 15)")
    args = parser.parse_args()

    zona_lower = args.zona.lower().strip()
    if args.prefijos:
        prefijos = [p.strip() for p in args.prefijos.split(",")]
    else:
        prefijos = PREFIJOS_ZONA.get(zona_lower, [])
        if not prefijos:
            print(f"⚠ Zona '{zona_lower}' no está mapeada. Usá --prefijos.")
            print(f"  Zonas conocidas: {', '.join(PREFIJOS_ZONA.keys())}")
            sys.exit(1)

    print(f"=== Prospección: {args.rubro} en {args.zona} ===\n")

    resultados = prospectar(args.rubro, args.zona, prefijos, args.max)

    if not resultados:
        print("\n✗ Sin resultados. Revisá logs.")
        sys.exit(1)

    out_csv = exportar_csv(resultados, args.rubro, args.zona)
    out_md = exportar_md(resultados, args.rubro, args.zona, prefijos)

    sin_web = [r for r in resultados if "Sin web" in r["oportunidad"]]
    con_web = [r for r in resultados if "Con web" in r["oportunidad"]]

    print(f"\n=== RESULTADOS ===")
    print(f"Total comercios extraídos: {len(resultados)}")
    print(f"  🔴 Sin web (prioridad alta): {len(sin_web)}")
    print(f"  🟢 Con web (verificar):     {len(con_web)}")
    print(f"\n📁 CSV: {out_csv}")
    print(f"📁 MD:  {out_md}")
    print(f"\nSiguiente paso: abrí el .md y revisá los leads uno por uno antes de mandar WhatsApp.")


if __name__ == "__main__":
    main()
