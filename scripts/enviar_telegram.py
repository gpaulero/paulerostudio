#!/usr/bin/env python3
"""Envía los leads de concesionarias a Telegram."""
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

mensaje = """🚗 <b>CONCESIONARIAS EN VILLA CARLOS PAZ</b>
<b>Criterio: tienen WhatsApp, NO tienen página web</b>

Negocios ideales para ofrecerles web/landing/e-commerce:

<b>1. Redolfi Automotores</b>
📍 Diego de Velázquez 40, Villa Carlos Paz
📱 WhatsApp: +54 9 3541 279366
💬 https://wa.me/5493541279366
📸 Instagram: @redolfiautomotores
👤 Facebook: /redolfiautomotores
🌐 Web: ❌ NO tiene (solo redes sociales)
💡 Solo presencia en Facebook + Instagram

<b>2. Honda Rosso VCP</b>
📍 Trejo y Zanabria 55 (esq. San Martín), Villa Carlos Paz
📱 WhatsApp: 3541 594533
💬 https://wa.me/5493541594533
📸 Instagram: @hondarossovcp
👤 Facebook: /hondarossocarlospaz
🔗 Linktree: linktr.ee/HondaRosso.VCP
🌐 Web: ❌ NO tiene sitio propio
💡 Concesionario oficial Honda, solo redes

<b>3. S-Cars</b>
📍 Alvear 630, Villa Carlos Paz
📱 WhatsApp: +54 9 3541 585147
💬 https://wa.me/5493541585147
📱 Teléfono: 351 242-0010
📸 Instagram: @scars_arg
👤 Facebook: /scarsvcp
🌐 Web: ❌ NO tiene
💡 Concesionaria boutique, 4 años en el rubro

<b>4. Angle Automotores</b>
📍 Esparta 38, Villa Carlos Paz
📱 WhatsApp/Tel: +54 3541 21-8987
💬 https://wa.me/5493541218987
📸 Instagram: @angle.automotores (sponsor Vóley Carlos Paz)
👤 Facebook: /angle.automotores
🌐 Web: ❌ NO tiene sitio propio
💡 Agencia multimarca, sponsor deportivo local

<b>+ Bonus borderline:</b>
<b>5. Martinez Automotores</b>
📍 Bv Sarmiento 524, Villa Carlos Paz
📱 WhatsApp: 3541-760004
💬 https://wa.me/5493541760004
📸 Instagram: @martinez.automotores (12K seguidores)
🌐 Web: ⚠️ Solo Google Sites básico (no sitio profesional)
💡 12K en Instagram, mucha presencia digital pero sin web propia seria

📊 <b>Resumen:</b>
• 4 concesionarias SIN web (oportunidad alta)
• 1 con web muy básica (oportunidad media)
• Todas con WhatsApp confirmado
• Todas activas en Instagram/Facebook

¿Querés que prepare algún mensaje de aproximación para mandarles?"""

result = send_message(mensaje)
print("Enviado!" if result.get("ok") else f"Error: {result}")
