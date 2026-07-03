#!/usr/bin/env python3
"""Envía los 4 mensajes de venta restantes a Telegram."""
import urllib.request
import urllib.parse
import json
import time

BOT_TOKEN = "8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4"
CHAT_ID = "7780475797"

def send_message(text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = urllib.parse.urlencode({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": "true"
    }).encode()
    req = urllib.request.Request(url, data=data)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read())

mensajes = [
    {
        "titulo": "MENSAJE #2 - Para Honda Rosso VCP",
        "wa_link": "https://wa.me/5493541594533",
        "texto": """Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio, acá en Carlos Paz. Conozco Honda Rosso porque pasé mil veces por San Martín y siempre me llamó la atención el local.

Vi que son concesionario oficial Honda, tienen Instagram y Linktree, pero no tienen un sitio web propio. Pensé que estaría bueno tener una web que muestre:
- Modelos Honda disponibles (Civic, Accord, etc.)
- Service oficial y repuestos
- Formulario para agendar test drive
- Botón directo al WhatsApp del local

Y un plus: integrar el catálogo con su Instagram para que cuando suban un auto, también aparezca en la web.

¿Les puedo mandar una propuesta rápida? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio"""
    },
    {
        "titulo": "MENSAJE #3 - Para S-Cars",
        "wa_link": "https://wa.me/5493541585147",
        "texto": """Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio, acá en Carlos Paz. Vi el perfil de S-Cars y me encantó el concepto de concesionaria boutique, los autos premium que manejan (Hilux, Everest).

Me di cuenta que están hace 4 años, tienen Instagram activo, pero no tienen una web propia. Para una boutique como la de ustedes, una web bien hecha le da muchísimo más prestigio que solo estar en redes.

Pensaba en algo así:
- Catálogo premium con fotos profesionales
- Sección "Nuestra filosofía Ganar-Ganar"
- Cada auto con botón directo a WhatsApp
- Formulario para recibir tu usado como parte de pago

¿Les interesaría ver una propuesta? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio"""
    },
    {
        "titulo": "MENSAJE #4 - Para Angle Automotores",
        "wa_link": "https://wa.me/5493541218987",
        "texto": """Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio, acá en Carlos Paz. Los conozco porque vi que son sponsor del Vóley Carlos Paz, ¡eso habla muy bien de ustedes como marca local!

Vi que tienen Angle Automotores en Esparta 38, presencia en Instagram, pero sin web propia. Pensé que para un sponsor deportivo, tener una web bien hecha refuerza muchísimo la imagen de marca.

Algo tipo:
- Catálogo de autos usados con filtros (marca, año, precio)
- Sección "Auspiciantes" / Apoyo al deporte local
- Botón directo al WhatsApp
- Formulario de contacto

¿Les armo una propuesta rápida? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio"""
    },
    {
        "titulo": "MENSAJE #5 - Para Martinez Automotores",
        "wa_link": "https://wa.me/5493541760004",
        "texto": """Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio, acá en Carlos Paz. Vi el Instagram de Martinez Automotores y me impresionó: 12K seguidores, autos premium, mucha actividad.

Noté que tienen un Google Sites muy básico y pensé que con esa comunidad que ya tienen armada en Instagram, una web profesional les multiplicaría las consultas.

Algo así:
- Catálogo profesional con buscador y filtros
- Integración con Instagram (cada post se sincroniza con la web)
- Botón "Reservar auto" directo al WhatsApp
- Sección de financiación con simulador

Para una agencia con 12K seguidores, una web en serio les daría muchísimo más alcance que solo el feed de Instagram.

¿Les interesaría ver una propuesta? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio"""
    }
]

# Aviso inicial
aviso = """📨 <b>Te mando los 4 mensajes restantes</b>

Uno por uno, listos para copiar y pegar en cada WhatsApp. Al final de cada mensaje te paso el link directo.

¿Los mandás hoy o los agendás para mañana a la mañana? (martes-jueves 10-12hs es el mejor horario según mi experiencia)"""

result = send_message(aviso)
print("Aviso:", "OK" if result.get("ok") else "ERROR")
time.sleep(1)

# Enviar cada mensaje
for i, m in enumerate(mensajes, 1):
    header = f"💬 <b>{m['titulo']}</b>\n\nEnviar a: {m['wa_link']}\n\n<code>"
    footer = "</code>"
    full_text = header + m['texto'] + footer

    result = send_message(full_text)
    print(f"Mensaje {i} ({m['titulo']}):", "OK" if result.get("ok") else "ERROR")
    time.sleep(1)

# Cierre
cierre = """✅ <b>Listo! Los 4 mensajes enviados</b>

Recordá:
• Martes-jueves 10-12hs o 16-18hs = mejor horario
• Esperá 3 días antes del follow-up
• Si responden con interés, usá el código <b>STUDIO20</b> para el 20% off

El follow-up y el mensaje de cierre están en GitHub en:
<code>prospeccion-carlos-paz/mensajes-venta.md</code>

¿Necesitás algo más?"""

result = send_message(cierre)
print("Cierre:", "OK" if result.get("ok") else "ERROR")
