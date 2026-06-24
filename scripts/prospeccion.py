#!/usr/bin/env python3
"""
Prospección automática para Paulero Studio.
Busca comercios por rubro+zona usando z-ai-web-dev-sdk (web search + LLM extraction)
+ scraping de Páginas Amarillas AR, y manda los de prioridad alta a Telegram.

Uso:
    python3 prospeccion.py --rubro "Hotel" --zona "La Falda"
"""

import json
import os
import re
import subprocess
import sys
import urllib.parse
import urllib.request
from typing import Optional

# Telegram config
TELEGRAM_BOT_TOKEN = "8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4"
TELEGRAM_CHAT_ID = 7780475797

# WhatsApp message template
WA_MESSAGE_TEMPLATE = (
    "Hola {nombre}, vi tu negocio y me gustaría proponerte algo. "
    "Soy Gonzalo de Paulero Studio."
)

# ──────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────

def normalize_name(s: str) -> str:
    """Normaliza un nombre para comparar duplicados."""
    import unicodedata
    s = (s or "").lower()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\b(s\.?r\.?l|s\.?a\.?|sas|srl|sa|empresa|el|la|los|las)\b", "", s)
    s = re.sub(r"[^a-z0-9]", "", s)
    return s.strip()


# Alias para compatibilidad
normalize_name_v2 = normalize_name


def detectar_estado_web(url: Optional[str]) -> str:
    if not url:
        return "Sin web propia"
    u = url.lower()
    if "canva.site" in u:
        return "Amateur (Canva)"
    if "wixsite.com" in u or "wix.com" in u:
        return "Amateur (Wix)"
    if "sites.google.com" in u:
        return "Amateur (Google Sites)"
    if "facebook.com" in u or "instagram.com" in u:
        return "Sin web (solo red social)"
    if "wordpress.com" in u:
        return "Amateur (WordPress.com)"
    if "shopify" in u:
        return "E-commerce (Shopify)"
    if "mercadolibre" in u or "demotores" in u or "autocosmos" in u:
        return "Solo en marketplace"
    return "Existe (a verificar)"


def inferir_prioridad(estado_web: str) -> str:
    if "Sin web" in estado_web or "Amateur" in estado_web:
        return "Alta"
    if "Existe" in estado_web or "E-commerce" in estado_web:
        return "Media"
    return "Baja"


def construir_whatsapp_link(telefono: Optional[str], whatsapp: Optional[str], nombre: str) -> Optional[str]:
    """Construye un deep link de WhatsApp con mensaje pre-escrito."""
    digits = ""
    if whatsapp:
        digits = re.sub(r"\D", "", whatsapp)
    elif telefono:
        digits = re.sub(r"\D", "", telefono)
        # Si tiene 10 dígitos y empieza con 0, asumir Argentina
        if len(digits) == 10 and digits.startswith("0"):
            digits = "549" + digits[1:]
        elif len(digits) == 10:
            digits = "549" + digits
        elif len(digits) in (7, 8):
            digits = "54935" + digits  # asumir Córdoba

    if len(digits) < 7:
        return None

    msg = WA_MESSAGE_TEMPLATE.format(nombre=nombre)
    return f"https://wa.me/{digits}?text={urllib.parse.quote(msg)}"


def send_telegram(text: str, disable_preview: bool = True) -> bool:
    """Envía un mensaje HTML a Telegram."""
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": disable_preview,
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            return result.get("ok", False)
    except Exception as e:
        print(f"⚠️ Error enviando a Telegram: {e}", file=sys.stderr)
        return False


# ──────────────────────────────────────────────────────────────
# Fuente 1: Web Search + LLM extraction (vía z-ai-web-dev-sdk CLI)
# ──────────────────────────────────────────────────────────────

def buscar_con_web_search_y_llm(rubro: str, zona: str) -> list[dict]:
    """
    Usa la CLI de z-ai-web-dev-sdk para:
    1. web_search: buscar "rubro en zona, Córdoba, Argentina contacto dirección teléfono"
    2. LLM: extraer comercios estructurados de los resultados
    """
    print(f"  → Web search: buscando '{rubro} en {zona}'...")

    query = f"{rubro} en {zona}, Córdoba, Argentina contacto dirección teléfono"

    # 1) web_search via z-ai CLI
    try:
        cmd = ["z-ai", "function", "--name", "web_search",
               "--args", json.dumps({"query": query, "num": 20})]
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=60,
        )
        if result.returncode != 0:
            print(f"  ⚠️ web_search falló: {result.stderr[:200]}", file=sys.stderr)
            return []
        # La CLI imprime logs de "🚀" además del JSON. Extraer el JSON.
        stdout = result.stdout
        json_start = stdout.find("[")
        json_end = stdout.rfind("]")
        if json_start == -1 or json_end == -1:
            print(f"  ⚠️ web_search no devolvió JSON.", file=sys.stderr)
            return []
        search_results = json.loads(stdout[json_start:json_end+1])
        if not isinstance(search_results, list):
            search_results = search_results.get("results", [])
    except Exception as e:
        print(f"  ⚠️ web_search falló: {e}", file=sys.stderr)
        return []

    if not search_results:
        print(f"  → No se encontraron resultados web.")
        return []

    # Filtrar directorios/redes sociales
    DIRECTORIOS = [
        "google.com/maps", "maps.app.goo", "google.com",
        "facebook.com", "instagram.com", "youtube.com", "tiktok.com",
        "yelp.com", "tripadvisor", "guia-telefonica", "paginasamarillas",
        "infoisinfo", "todopueblos", "guiamore", "ciudad.com",
        "wikipedia.org", "wikidata",
    ]

    def es_directorio(r: dict) -> bool:
        host = (r.get("host_name") or "").lower()
        name = (r.get("name") or "").lower()
        return any(d in host or d in name for d in DIRECTORIOS)

    candidatos = [r for r in search_results if not es_directorio(r)]
    print(f"  → {len(search_results)} resultados crudos, {len(candidatos)} candidatos tras filtrar directorios.")

    if not candidatos:
        return []

    # 2) LLM extraction
    contexto = "\n\n".join(
        f"#{i+1}\nTÍTULO: {r.get('name','')}\nURL: {r.get('url','')}\nDESCRIPCIÓN: {r.get('snippet','')}"
        for i, r in enumerate(candidatos)
    )

    system_prompt = f"""Sos un asistente que extrae información estructurada de resultados de búsquedas web.
Vas a recibir resultados de buscar "{rubro} en {zona}" y tenés que identificar los COMERCIOS REALES (no directorios, no notas periodísticas, no Wikipedia).

Reglas:
1. Solo incluí comercios que tengan un nombre identificable y que sean CLARAMENTE del rubro "{rubro}".
2. Si un resultado no parece un comercio real del rubro buscado, NO lo incluyas. Es mejor devolver [] que incluir falsos positivos.
3. Si los resultados no contienen comercios reales claramente identificables, devolvé {{"comercios": []}}.
4. Si no hay dirección o teléfono, dejá null (no inventes).
5. Para estadoWeb inferí: "Sin web propia" si no tiene URL propia, "Amateur (Canva/Wix/Google Sites)" si la URL lo indica, "Existe" si tiene dominio propio.
6. En redesSociales poné IG/FB si se mencionan en el snippet, formato "IG: @xxx" o "FB: Nombre".
7. En notas poné cualquier dato relevante (años de trayectoria, especialidad, etc.).
8. NUNCA inventes comercios que no aparezcan explícitamente en los resultados de búsqueda.

Devolvé EXCLUSIVAMENTE un JSON válido con esta forma, sin markdown ni explicación:
{{
  "comercios": [
    {{
      "nombre": "string",
      "direccion": "string | null",
      "telefono": "string | null",
      "webUrl": "string | null",
      "redesSociales": "string | null",
      "estadoWeb": "string | null",
      "notas": "string | null"
    }}
  ]
}}"""

    user_prompt = f"""Resultados de búsqueda para "{rubro} en {zona}, Córdoba, Argentina":

{contexto}

Extraé todos los comercios reales que encuentres. Devolvé solo JSON."""

    print(f"  → LLM: extrayendo comercios de {len(candidatos)} candidatos...")
    try:
        # z-ai chat CLI: guarda output en archivo para parsear JSON
        import tempfile
        with tempfile.NamedTemporaryFile(mode="w+", suffix=".json", delete=False) as tmp:
            tmp_path = tmp.name

        result = subprocess.run(
            [
                "z-ai", "chat",
                "--system", system_prompt,
                "--prompt", user_prompt,
                "--output", tmp_path,
            ],
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode != 0:
            print(f"  ⚠️ LLM falló: {result.stderr[:200]}", file=sys.stderr)
            return []

        with open(tmp_path, "r") as f:
            chat_resp = json.load(f)

        os.unlink(tmp_path)

        content = (chat_resp.get("choices", [{}])[0].get("message", {}).get("content", "")
                   or chat_resp.get("content", "") or "")

        # Extraer JSON aunque venga con markdown
        json_match = re.search(r"\{[\s\S]*\}", content)
        if not json_match:
            print(f"  ⚠️ LLM no devolvió JSON válido.", file=sys.stderr)
            return []

        parsed = json.loads(json_match.group(0))
        comercios = parsed.get("comercios", [])
        print(f"  ✓ LLM extrajo {len(comercios)} comercios.")
        return comercios
    except Exception as e:
        print(f"  ⚠️ LLM falló: {e}", file=sys.stderr)
        return []


# ──────────────────────────────────────────────────────────────
# Fuente 2: Páginas Amarillas Argentina (scraping HTML)
# ──────────────────────────────────────────────────────────────

def buscar_paginas_amarillas(rubro: str, zona: str) -> list[dict]:
    """Scraping básico de paginasamarillas.com.ar"""
    print(f"  → Páginas Amarillas AR: '{rubro}' en '{zona}'...")
    q = urllib.parse.quote(rubro)
    l = urllib.parse.quote(zona)
    url = f"https://www.paginasamarillas.com.ar/buscador?q={q}&l={l}"

    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "es-AR,es;q=0.9",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            html = resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  ⚠️ Páginas Amarillas falló: {e}", file=sys.stderr)
        return []

    leads = []
    # Patrones comunes de Páginas Amarillas AR
    nombre_matches = re.findall(
        r'<a[^>]*class="[^"]*business-name[^"]*"[^>]*>([^<]+)</a>',
        html,
    )
    dir_matches = re.findall(
        r'<span[^>]*class="[^"]*address[^"]*"[^>]*>([^<]+)</span>',
        html,
    )
    tel_matches = re.findall(r'data-phone="([^"]+)"', html)

    for i, nombre in enumerate(nombre_matches[:20]):
        nombre = nombre.strip()
        if len(nombre) < 3:
            continue
        leads.append({
            "nombre": nombre,
            "direccion": dir_matches[i].strip() if i < len(dir_matches) else None,
            "telefono": tel_matches[i].strip() if i < len(tel_matches) else None,
            "webUrl": None,
            "redesSociales": None,
            "estadoWeb": "Sin web propia",
            "fuente": "directorio_ar",
            "notas": "Encontrado en Páginas Amarillas AR",
        })

    print(f"  ✓ Páginas Amarillas: {len(leads)} comercios.")
    return leads


# ──────────────────────────────────────────────────────────────
# Pipeline principal
# ──────────────────────────────────────────────────────────────

def prospeccion(rubro: str, zona: str, push_crm: bool = False, crm_url: Optional[str] = None, crm_key: Optional[str] = None) -> list[dict]:
    """Corre la prospección para un rubro+zona dados."""
    print(f"\n{'='*60}")
    print(f"  PROSPECCIÓN: {rubro} en {zona}")
    print(f"{'='*60}")

    # Combinar ambas fuentes
    leads_web = buscar_con_web_search_y_llm(rubro, zona)
    for l in leads_web:
        l["fuente"] = "web_search"
        l.setdefault("estadoWeb", None)

    leads_pa = buscar_paginas_amarillas(rubro, zona)

    todos = leads_web + leads_pa
    print(f"\n  Total crudo: {len(leads_web)} (web) + {len(leads_pa)} (PA) = {len(todos)} leads")

    # Normalizar y deduplicar
    vistos = set()
    unicos = []
    for lead in todos:
        nombre = (lead.get("nombre") or "").strip()
        if len(nombre) < 3:
            continue
        key = f"{normalize_name_v2(nombre)}|{zona}"
        if key in vistos:
            continue
        vistos.add(key)

        # Inferir estadoWeb y prioridad
        estado_web = lead.get("estadoWeb") or detectar_estado_web(lead.get("webUrl"))
        prioridad = inferir_prioridad(estado_web)

        unicos.append({
            "nombre": nombre,
            "rubro": rubro,
            "zona": zona,
            "direccion": lead.get("direccion"),
            "telefono": lead.get("telefono"),
            "whatsapp": None,  # el CRM lo va a inferir
            "email": lead.get("email"),
            "webUrl": lead.get("webUrl"),
            "redesSociales": lead.get("redesSociales"),
            "estadoWeb": estado_web,
            "prioridad": prioridad,
            "fuente": lead.get("fuente", "web_search"),
            "notas": lead.get("notas"),
            "pitchSugerido": None,
        })

    print(f"  Tras dedup: {len(unicos)} leads únicos")

    # Push al CRM si está configurado
    if push_crm and crm_url:
        print(f"\n  → Subiendo {len(unicos)} leads al CRM en {crm_url}...")
        for lead in unicos:
            try:
                payload = json.dumps(lead).encode()
                req = urllib.request.Request(
                    f"{crm_url.rstrip('/')}/api/comercios/lead-from-n8n",
                    data=payload,
                    headers={
                        "Content-Type": "application/json",
                        "x-crm-api-key": crm_key or "",
                    },
                    method="POST",
                )
                with urllib.request.urlopen(req, timeout=30) as resp:
                    resp_data = json.loads(resp.read())
                    if resp_data.get("created"):
                        print(f"    ✓ Creado: {lead['nombre']}")
                    elif resp_data.get("duplicado"):
                        print(f"    = Duplicado: {lead['nombre']}")
            except Exception as e:
                print(f"    ⚠️ Falló push para {lead['nombre']}: {e}")

    return unicos


def enviar_leads_telegram(leads: list[dict], rubro: str, zona: str):
    """Filtra prioridad alta/media y manda cada lead como mensaje separado a Telegram."""
    alta = [l for l in leads if l["prioridad"] == "Alta"]
    media = [l for l in leads if l["prioridad"] == "Media"]
    baja = [l for l in leads if l["prioridad"] == "Baja"]

    print(f"\n  Prioridad: {len(alta)} Alta / {len(media)} Media / {len(baja)} Baja")

    # Para prospección de servicios web, Alta (sin web o amateur) Y Media (web mediocre a mejorar) son leads accionables
    accionables = alta + media

    if not accionables:
        msg = (
            f"ℹ️ <b>Prospección completada</b>\n\n"
            f"🔍 {rubro} en {zona}\n"
            f"📊 Resultados: {len(leads)} leads\n"
            f"🔥 Alta: {len(alta)} | 🟡 Media: {len(media)} | ⚪ Baja: {len(baja)}\n\n"
            f"<i>No se encontraron leads accionables esta vez. Probá con otro rubro o zona.</i>"
        )
        send_telegram(msg)
        return

    # Resumen
    resumen = (
        f"🚀 <b>{len(accionables)} nuevos leads</b> ({len(alta)} alta + {len(media)} media)\n"
        f"📍 {rubro} en {zona}\n"
        f"📊 Total encontrado: {len(leads)} leads\n\n"
        f"Te los mando uno por uno con botón a WhatsApp 👇\n"
        f"{'─'*30}"
    )
    send_telegram(resumen)

    # Un mensaje por lead accionable (alta primero, luego media)
    for i, lead in enumerate(accionables, 1):
        wa_link = construir_whatsapp_link(lead.get("telefono"), lead.get("whatsapp"), lead["nombre"])

        emoji = "🔥" if lead["prioridad"] == "Alta" else "🟡"

        msg = f"\n{emoji} #{i} <b>{lead['nombre']}</b>\n"
        msg += f"📍 {lead['rubro']} en {lead['zona']}\n"
        if lead.get("direccion"):
            msg += f"🏠 {lead['direccion']}\n"
        if lead.get("telefono"):
            msg += f"📞 {lead['telefono']}\n"
        if lead.get("webUrl"):
            msg += f"🌐 <a href=\"{lead['webUrl']}\">{lead['webUrl']}</a>\n"
        msg += f"📊 Web: {lead['estadoWeb']} | Prioridad: {lead['prioridad']}\n"
        if lead.get("redesSociales"):
            msg += f"📱 {lead['redesSociales']}\n"
        msg += f"🏷️ Fuente: {lead['fuente']}\n"
        if lead.get("notas"):
            nota_corta = lead["notas"][:120] + ("…" if len(lead["notas"]) > 120 else "")
            msg += f"📝 {nota_corta}\n"
        msg += "\n"
        if wa_link:
            msg += f'🟢 <a href="{wa_link}">Abrir WhatsApp</a>'
        else:
            msg += "⚠️ Sin teléfono"

        send_telegram(msg)
        import time
        time.sleep(0.3)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--rubro", required=True, help="Rubro a buscar (ej: Hotel, Restaurante)")
    parser.add_argument("--zona", required=True, help="Zona a buscar (ej: La Falda, Cosquín)")
    parser.add_argument("--push-crm", action="store_true", help="Subir los leads al CRM via API")
    parser.add_argument("--crm-url", default=None, help="URL base del CRM")
    parser.add_argument("--crm-key", default=None, help="API key del CRM")
    args = parser.parse_args()

    leads = prospeccion(
        rubro=args.rubro,
        zona=args.zona,
        push_crm=args.push_crm,
        crm_url=args.crm_url,
        crm_key=args.crm_key,
    )
    enviar_leads_telegram(leads, args.rubro, args.zona)
    print(f"\n✅ Listo. {len(leads)} leads procesados, enviados a Telegram.")
