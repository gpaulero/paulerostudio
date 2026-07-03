#!/usr/bin/env python3
"""Envía el mensaje principal de venta a Telegram."""
import urllib.request
import urllib.parse
import json

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

# Mensaje 1: Aviso de que se guardó todo
mensaje1 = """📁 <b>TODO GUARDADO EN GITHUB</b>

Guardé en el repo <b>gpaulero/paulerostudio</b> en la carpeta:
<code>prospeccion-carlos-paz/</code>

Archivos creados:
• <b>leads-concesionarias.md</b> — Datos completos de los 5 leads
• <b>mensajes-venta.md</b> — 5 mensajes personalizados + follow-up + cierre

Ahora seguimos con los mensajes de venta 👇"""

result1 = send_message(mensaje1)
print("Mensaje 1:", "OK" if result1.get("ok") else "ERROR")

# Mensaje 2: Mensaje de venta para Redolfi (el primero, más fácil)
mensaje2 = """💬 <b>MENSAJE DE VENTA #1 - Para Redolfi Automotores</b>

<code>Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio, acá en Carlos Paz. Vi sus publicaciones de Redolfi Automotores en Instagram y me encantó el nivel de los autos que manejan.

Noté que tienen muchísima actividad en redes pero no tienen una página web propia. Y pensé que estaría bueno tener un sitio donde se vea el stock completo, con fotos, precios, y que cada auto tenga un botón directo al WhatsApp de ustedes.

Algo así tipo:
- Catálogo online con todos los autos
- Cada auto con su botón "Consultar por WhatsApp"
- Formulario de contacto directo
- Sección "Tomamos tu usado"

¿Les interesaría que les mande una propuesta? Sin compromiso, solo para que vean cómo podría quedar.

Saludos!
Gonzalo - Paulero Studio</code>

📍 Enviar a: https://wa.me/5493541279366"""

result2 = send_message(mensaje2)
print("Mensaje 2:", "OK" if result2.get("ok") else "ERROR")

# Mensaje 3: Aviso
mensaje3 = """<b>¿Cómo seguir?</b>

Te mandé el mensaje para Redolfi (el primero). 

Los otros 4 están todos guardados en GitHub en:
<code>prospeccion-carlos-paz/mensajes-venta.md</code>

También tenés un follow-up (para mandar si no responden en 3 días) y un mensaje de cierre (cuando respondan con interés, con el código STUDIO20).

¿Querés que te mande los otros 4 por acá también, o los sacás directo del repo?"""

result3 = send_message(mensaje3)
print("Mensaje 3:", "OK" if result3.get("ok") else "ERROR")
