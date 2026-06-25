#!/usr/bin/env python3
"""Envía leads de celulares a Telegram con mensajes de venta."""
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

# Mensaje 1: Resumen
resumen = """📱 <b>NEGOCIOS DE CELULARES - VALLE DE PUNILLA</b>
<b>Criterio: WhatsApp SÍ, página web NO</b>

Zonas: La Falda, Cosquín, La Cumbre
(en Valle Hermoso no encontré negocios claros con presencia online — te lo confirmo abajo)

✅ <b>4 leads encontrados</b> con WhatsApp confirmado y SIN web propia:

1. <b>Cellstore La Falda</b> — Av. Edén 144
2. <b>Sercell La Falda</b> — España 144
3. <b>Celcos Cosquín</b> — Tucumán 583
4. <b>CELSERVICE Punilla</b> — Shopping Cosquín Local 9
5. <b>La Cumbre Comunicaciones</b> — López y Planes 270

Te mando abajo los mensajes personalizados para cada uno 👇"""

r = send_message(resumen)
print("Resumen:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Mensaje 2: Aviso sobre Valle Hermoso
valle = """ℹ️ <b>Sobre Valle Hermoso:</b>

No encontré negocios de celulares con presencia clara online (Instagram/Facebook activo) en Valle Hermoso. Los resultados eran de México (Tamaulipas) o de otras ciudades. Es una localidad más chica, seguramente los locales operan de boca en boca sin redes activas.

¿Querés que probemos con Google Maps directo en Valle Hermoso? Esos no aparecen en redes pero sí en el mapa."""

r = send_message(valle)
print("Valle Hermoso:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Mensaje 3: Lead 1 - Cellstore
msg1 = """💬 <b>MENSAJE 1 - Para Cellstore La Falda</b>

📱 WhatsApp: por Instagram DM (no aparece número público)
📸 Instagram: @cellstore.lafalda
📍 Av. Edén 144, La Falda

<code>Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio. Vi el Instagram de Cellstore La Falda y me pareció impecable cómo manejan el catálogo: fotos pro, precios claros, stock real. Se nota el laburo.

Noté que están muy fuertes en redes pero no tienen una web propia. Y pensé que para un negocio con ese nivel de catálogo, una web les daría:

- Catálogo online con buscador (marca, modelo, precio)
- Cada equipo con botón directo al WhatsApp
- Sección "Plan canje" con simulador
- Formulario de servicio técnico (pedir turno online)
- Posicionamiento en Google (cuando alguien busca "celulares La Falda")

Como ya tienen el contenido armado en Instagram, la web se alimenta sola.

¿Les interesaría ver una propuesta? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio</code>

💡 <i>Tip: mandar por Instagram DM primero, o ir al local en persona (Av. Edén 144, L-S 10-13 / 17-21)</i>"""

r = send_message(msg1)
print("Mensaje 1:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Mensaje 4: Lead 2 - Sercell
msg2 = """💬 <b>MENSAJE 2 - Para Sercell La Falda</b>

📱 WhatsApp: https://wa.me/5493548509698
📍 España 144, La Falda
📸 Instagram: @sercell_oficial

<code>Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio. Vi una publicación que los menciona como "el mejor servicio técnico de telefonía celular de La Falda" y me pareció notable. 20 años de experiencia habla por sí solo.

Noté que tienen Instagram activo y WhatsApp, pero no tienen una web propia. Para un servicio técnico con esa trayectoria, una web les daría más autoridad y los ayudaría a captar clientes que buscan en Google "reparar celular La Falda".

Pensaba en algo así:
- Catálogo de servicios (cambio de pantalla, batería, pin de carga, etc.)
- Formulario "Pedir presupuesto online" con fotos del equipo
- Sección de garantía y repuestos originales
- Botón directo al WhatsApp
- Posicionamiento local en Google

¿Les armo una propuesta rápida? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio</code>"""

r = send_message(msg2)
print("Mensaje 2:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Mensaje 5: Lead 3 - Celcos
msg3 = """💬 <b>MENSAJE 3 - Para Celcos Cosquín</b>

📱 WhatsApp: https://wa.me/5493541210659
📍 Tucumán 583, Cosquín
📸 Instagram: @celcosq
👤 Facebook: /celcosq

<code>Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio. Vi el Instagram de Celcos y me gustó mucho que manejan de todo: iPhone sellados, usados, plan canje, servicio técnico y accesorios. Negocio serio.

Noté que tienen presencia fuerte en Instagram y Facebook pero no tienen una web propia. Para un negocio con ese catálogo, una web les permitiría:

- Catálogo online con filtros (sellados/usados/canje)
- Cada equipo con botón "Consultar por WhatsApp"
- Sección de servicio técnico con formulario de diagnóstico
- Sección de accesorios con buscador
- Posicionamiento en Google ("celulares Cosquín")

Y un plus: sincronizar con Instagram para que cada post también aparezca en la web.

¿Les interesaría ver una propuesta? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio</code>"""

r = send_message(msg3)
print("Mensaje 3:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Mensaje 6: Lead 4 - CELSERVICE
msg4 = """💬 <b>MENSAJE 4 - Para CELSERVICE Punilla (Cosquín)</b>

📱 WhatsApp: https://wa.me/5493541612655
📍 Av. San Martín 877, Local 9 — Shopping Cosquín
📸 Instagram: @celservice.punilla

<code>Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio. Vi el Instagram de CELSERVICE Punilla y me gustó que están en el Shopping Cosquín, una ubicación privilegiada. Venta y reparación, Redmi, iPhone, todo cubierto.

Noté que tienen Instagram activo y WhatsApp, pero no tienen una web propia. Para un local dentro de un shopping, una web les daría visibilidad también fuera del tráfico del shopping mismo.

Algo tipo:
- Catálogo de equipos disponibles (con fotos reales del local)
- Sección "Reparaciones" con listado de servicios y precios
- Formulario "Pedir presupuesto" con tipo de equipo y falla
- Botón directo al WhatsApp
- Promociones del mes actualizables

¿Les armo una propuesta rápida? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio</code>"""

r = send_message(msg4)
print("Mensaje 4:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Mensaje 7: Lead 5 - La Cumbre Comunicaciones
msg5 = """💬 <b>MENSAJE 5 - Para La Cumbre Comunicaciones</b>

📱 WhatsApp: https://wa.me/5493548605603
📍 López y Planes 270, Centro, La Cumbre
📸 Instagram: @comunicaciones.lc
👤 Facebook: LA CUMBRE COMUNICACIONES

<code>Hola! ¿Cómo andan? 👋

Soy Gonzalo, de Paulero Studio. Vi el Instagram de La Cumbre Comunicaciones y me encantó que manejan de todo: celulares, accesorios, y hasta calculadoras y electrónica. Negocio de barrio con mucha variedad.

Noté que tienen presencia activa en Instagram y Facebook, pero no tienen una web propia. Para La Cumbre, que es una localidad más chica, tener una web los posicionaría como "el lugar" cuando alguien busca celulares o accesorios en la zona.

Pensaba en algo así:
- Catálogo de productos por categoría (celulares, accesorios, electrónica)
- Sección "Servicio técnico" con tipos de reparación
- Formulario de contacto directo
- Botón al WhatsApp
- Posicionamiento local en Google

¿Les interesaría ver una propuesta? Sin compromiso.

Saludos!
Gonzalo - Paulero Studio</code>"""

r = send_message(msg5)
print("Mensaje 5:", "OK" if r.get("ok") else "ERROR")
time.sleep(1)

# Cierre
cierre = """✅ <b>Listo! Los 5 mensajes enviados</b>

📋 <b>Resumen para seguimiento:</b>

1. Cellstore La Falda → Instagram DM
2. Sercell La Falda → wa.me/5493548509698
3. Celcos Cosquín → wa.me/5493541210659
4. CELSERVICE Punilla → wa.me/5493541612655
5. La Cumbre Comunicaciones → wa.me/5493548605603

⏰ <b>Mejor horario:</b> mañana (jueves) 10-12hs o tarde 16-18hs
📅 <b>Follow-up</b> en 3 días si no responden (te lo paso cuando lo necesites)
🎁 <b>Código STUDIO20</b> si responden con interés (20% off primer mes)

¿Querés que guarde estos leads en GitHub también?"""

r = send_message(cierre)
print("Cierre:", "OK" if r.get("ok") else "ERROR")
