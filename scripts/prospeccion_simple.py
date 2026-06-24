#!/usr/bin/env python3
"""
Prospección simplificada y robusta.
- Solo web search (sin LLM, que está fallando)
- Cada resultado web = 1 lead
- Mucho más rápido y confiable
"""

import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from typing import Optional

# Telegram config
TELEGRAM_BOT_TOKEN = "8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4"
TELEGRAM_CHAT_ID = 7780475797

# Pitches por rubro
PITCHES = {
    "Hotel": "Hola {nombre}! Vi que están en {zona}. Soy Gonzalo de Paulero Studio. Te propongo una web con reservas online, sincronización con Booking/Airbnb y galería profesional de habitaciones. ¿Tenés 5 minutos esta semana?",
    "Restaurante": "Hola {nombre}! Vi su restaurante en {zona}. Soy Gonzalo de Paulero Studio. Te propongo una web con menú digital QR, reservas online y fotos profesionales que venden más platos. ¿Les interesaría ver una demo?",
    "Inmobiliaria": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su inmobiliaria en {zona} y les propongo una web con buscador de propiedades, filtros por precio/zona/tipo y captura automática de leads calificados. ¿10 minutos esta semana?",
    "Concesionaria": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su concesionaria en {zona} y les propongo una web profesional con catálogo de vehículos, simulador de financiación online y captura de leads. ¿Les interesaría ver un demo?",
    "Veterinaria": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su veterinaria en {zona} y les propongo una web con turnos online, historias clínicas digitales y tienda de alimentos. ¿Les interesaría charlar?",
    "Gimnasio": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su gimnasio en {zona} y les propongo una web con inscripción online, planilla de rutinas por alumno y pagos mensuales automáticos. ¿10 minutos esta semana?",
    "Panadería": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su panadería en {zona} y les propongo una web con catálogo de productos, pedidos online para retiro en tienda y WhatsApp integrado. ¿Charlamos?",
    "Peluquería": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su peluquería en {zona} y les propongo una web con reserva de turnos online, galería de trabajos y captura de clientes nuevos por Instagram. ¿Les interesaría?",
    "default": "Hola {nombre}! Soy Gonzalo de Paulero Studio, desarrollo webs profesionales para comercios en {zona}. ¿Les interesaría ver una propuesta para tener presencia online profesional? 10 minutos esta semana, sin compromiso.",
}


def get_pitch(rubro, nombre, zona):
    return PITCHES.get(rubro, PITCHES["default"]).format(nombre=nombre, zona=zona)


def normalize_name(s):
    import unicodedata
    s = (s or "").lower()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"\b(s\.?r\.?l|s\.?a\.?|sas|srl|sa|empresa|el|la|los|las)\b", "", s)
    s = re.sub(r"[^a-z0-9]", "", s)
    return s.strip()


def detectar_estado_web(url):
    if not url:
        return "Sin web propia"
    u = url.lower()
    if "canva.site" in u: return "Amateur (Canva)"
    if "wixsite.com" in u or "wix.com" in u: return "Amateur (Wix)"
    if "sites.google.com" in u: return "Amateur (Google Sites)"
    if "facebook.com" in u or "instagram.com" in u: return "Sin web (solo red social)"
    if "wordpress.com" in u: return "Amateur (WordPress.com)"
    # Heurística: si la URL está en un directorio o lista, no es web propia
    DIRECTORIOS_WEB = ["turismo", "guia", "directorio", "listado", "blogspot", "tumblr", ".noticias", "newsroom", "wikia"]
    for d in DIRECTORIOS_WEB:
        if d in u:
            return "Solo en directorio/lista"
    return "Existe (a verificar)"


def inferir_prioridad(estado_web):
    if "Sin web" in estado_web or "Amateur" in estado_web:
        return "Alta"
    if "Solo en directorio" in estado_web:
        return "Alta"
    if "Existe" in estado_web:
        return "Media"
    return "Baja"


def send_telegram(text):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    data = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read()).get("ok", False)
    except Exception as e:
        print(f"⚠️ Telegram error: {e}", file=sys.stderr)
        return False


def web_search(query, num=15):
    """Llama al z-ai CLI para web search."""
    cmd = ["z-ai", "function", "--name", "web_search",
           "--args", json.dumps({"query": query, "num": num})]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=45)
        if result.returncode != 0:
            return []
        stdout = result.stdout
        s = stdout.find("[")
        e = stdout.rfind("]")
        if s == -1 or e == -1:
            return []
        return json.loads(stdout[s:e+1])
    except Exception as e:
        print(f"⚠️ web_search error: {e}", file=sys.stderr)
        return []


# Patrones para detectar si un resultado web es un artículo/lista y no un comercio
ARTICLE_KEYWORDS = [
    "los mejores", "las mejores", "top 10", "top 5", "top 20",
    "lista de", "guía de", "guia de", "mejores hoteles", "mejores restaurantes",
    "dónde comer", "donde comer", "dónde dormir", "donde dormir",
    "10 lugares", "5 lugares", "opciones para",
    "blog", "notas", "artículo", "articulo",
]


def es_articulo_o_lista(name, snippet):
    texto = (name + " " + snippet).lower()
    return any(kw in texto for kw in ARTICLE_KEYWORDS)


def buscar_un_rubro_zona(rubro, zona):
    """Busca comercios de un rubro en una zona. Devuelve lista de leads."""
    print(f"\n>>> {rubro} en {zona}")

    query = f"{rubro} en {zona}, Córdoba, Argentina contacto dirección teléfono"
    resultados = web_search(query, num=20)

    if not resultados:
        print(f"  → 0 resultados web")
        return []

    # Filtrar directorios y artículos
    DIRECTORIOS_HOST = [
        "facebook.com", "instagram.com", "youtube.com", "tiktok.com",
        "yelp.com", "tripadvisor", "guia-telefonica", "paginasamarillas",
        "infoisinfo", "todopueblos", "guiamore", "ciudad.com",
        "wikipedia.org", "wikidata", "google.com/maps",
    ]

    leads = []
    vistos = set()

    for r in resultados:
        host = (r.get("host_name") or "").lower()
        name = (r.get("name") or "").strip()
        snippet = r.get("snippet") or ""
        url = r.get("url") or ""

        # Filtros
        if len(name) < 3:
            continue
        if any(d in host for d in DIRECTORIOS_HOST):
            continue
        if any(d in name.lower() for d in DIRECTORIOS_HOST):
            continue
        if es_articulo_o_lista(name, snippet):
            continue

        # Dedup por nombre normalizado
        key = normalize_name(name)
        if key in vistos or len(key) < 3:
            continue
        vistos.add(key)

        # Intentar extraer teléfono del snippet
        telefono = None
        # Patrones: (0351) 123-4567, +54 9 351 123 4567, 351-1234567, etc.
        tel_match = re.search(r'(\+?\d{1,3}[\s\-]?)?(\(?0?\d{2,4}\)?[\s\-]?)\d{3,4}[\s\-]?\d{3,4}', snippet)
        if tel_match:
            telefono = tel_match.group(0).strip()

        # Intentar extraer dirección
        direccion = None
        dir_match = re.search(r'(?:dir|dirección|direccion|address|ubicado en|ubicada en)[:\s]+([^,.\n]{5,80})', snippet, re.IGNORECASE)
        if dir_match:
            direccion = dir_match.group(1).strip()

        estado_web = detectar_estado_web(url)
        prioridad = inferir_prioridad(estado_web)

        # Instagram/Facebook handle si está mencionado
        redes = []
        ig_match = re.search(r'instagram\.com/([@\w\.\-]+)', snippet, re.IGNORECASE)
        if ig_match:
            redes.append(f"IG: {ig_match.group(1)}")
        fb_match = re.search(r'facebook\.com/([\w\.\-]+)', snippet, re.IGNORECASE)
        if fb_match:
            redes.append(f"FB: {fb_match.group(1)}")

        leads.append({
            "nombre": name,
            "rubro": rubro,
            "zona": zona,
            "direccion": direccion,
            "telefono": telefono,
            "webUrl": url,
            "redesSociales": " | ".join(redes) if redes else None,
            "estadoWeb": estado_web,
            "prioridad": prioridad,
            "fuente": "web_search",
            "notas": snippet[:200] if snippet else None,
        })

    print(f"  → {len(resultados)} resultados, {len(leads)} leads válidos")
    return leads


def enviar_leads_telegram(leads, rubro, zona):
    if not leads:
        send_telegram(f"ℹ️ <b>{rubro}</b> en <b>{zona}</b>: 0 leads encontrados.")
        return 0, 0

    alta = [l for l in leads if l["prioridad"] == "Alta"]
    media = [l for l in leads if l["prioridad"] == "Media"]
    baja = [l for l in leads if l["prioridad"] == "Baja"]

    accionables = alta + media

    # Resumen del rubro
    send_telegram(
        f"📍 <b>{rubro}</b> en <b>{zona}</b>\n"
        f"📊 {len(leads)} leads: {len(alta)} 🔥 Alta + {len(media)} 🟡 Media + {len(baja)} ⚪ Baja"
    )

    for i, lead in enumerate(accionables, 1):
        # WhatsApp link con pitch
        wa_link = None
        if lead.get("telefono"):
            digits = re.sub(r"\D", "", lead["telefono"])
            if len(digits) == 10 and digits.startswith("0"):
                digits = "549" + digits[1:]
            elif len(digits) == 10:
                digits = "549" + digits
            elif len(digits) in (7, 8):
                digits = "54935" + digits
            if len(digits) >= 7:
                pitch = get_pitch(lead["rubro"], lead["nombre"], lead["zona"])
                wa_link = f"https://wa.me/{digits}?text={urllib.parse.quote(pitch)}"

        emoji = "🔥" if lead["prioridad"] == "Alta" else "🟡"
        pitch = get_pitch(lead["rubro"], lead["nombre"], lead["zona"])
        pitch_corto = pitch if len(pitch) <= 280 else pitch[:277] + "…"

        msg = f"\n{emoji} <b>{lead['nombre']}</b>\n"
        msg += f"📍 {lead['rubro']} en {lead['zona']}\n"
        if lead.get("direccion"):
            msg += f"🏠 {lead['direccion']}\n"
        if lead.get("telefono"):
            msg += f"📞 {lead['telefono']}\n"
        if lead.get("webUrl"):
            msg += f"🌐 <a href=\"{lead['webUrl']}\">{lead['webUrl'][:60]}{'…' if len(lead['webUrl']) > 60 else ''}</a>\n"
        msg += f"📊 Web: {lead['estadoWeb']}\n"
        if lead.get("redesSociales"):
            msg += f"📱 {lead['redesSociales']}\n"
        msg += f"\n💬 <i>Pitch:</i> {pitch_corto}\n"

        if wa_link:
            msg += f'\n🟢 <a href="{wa_link}">Abrir WhatsApp con pitch</a>'
        else:
            msg += "\n⚠️ Sin teléfono — buscalo en Google/IG"

        send_telegram(msg)
        time.sleep(0.4)

    return len(alta), len(media)


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--rubros", default="Hotel,Restaurante,Inmobiliaria,Concesionaria,Veterinaria,Gimnasio,Panadería,Peluquería")
    parser.add_argument("--zonas", default="La Falda,Cosquín,Villa Carlos Paz")
    args = parser.parse_args()

    rubros = [r.strip() for r in args.rubros.split(",")]
    zonas = [z.strip() for z in args.zonas.split(",")]

    total_alta = 0
    total_media = 0
    total_leads = 0

    send_telegram(
        f"🚀 <b>Prospección completa arrancó</b>\n\n"
        f"🏷️ {len(rubros)} rubros × {len(zonas)} zonas = {len(rubros)*len(zonas)} búsquedas\n"
        f"📍 Zonas: {', '.join(zonas)}\n\n"
        f"Te mando resultados por rubro×zona. Cada lead trae su pitch sugerido 👇"
    )

    for zona in zonas:
        for rubro in rubros:
            try:
                leads = buscar_un_rubro_zona(rubro, zona)
                if leads:
                    a, m = enviar_leads_telegram(leads, rubro, zona)
                    total_alta += a
                    total_media += m
                    total_leads += len(leads)
                else:
                    send_telegram(f"ℹ️ <b>{rubro}</b> en <b>{zona}</b>: 0 leads encontrados.")
            except Exception as e:
                print(f"⚠️ Error: {e}")
                send_telegram(f"⚠️ Error en <b>{rubro}</b> × <b>{zona}</b>: {str(e)[:100]}")
            time.sleep(1)

    send_telegram(
        f"✅ <b>Prospección completada</b>\n\n"
        f"📊 Total leads: {total_leads}\n"
        f"🔥 Alta prioridad: {total_alta}\n"
        f"🟡 Media prioridad: {total_media}\n\n"
        f"💡 Empezá por los 🔥 Alta — son comercios sin web propia o web amateur.\n"
        f"Cada lead tiene botón <b>Abrir WhatsApp</b> con pitch pre-escrito 🚀"
    )


if __name__ == "__main__":
    main()
