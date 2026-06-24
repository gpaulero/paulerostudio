#!/usr/bin/env bash
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# setup-telegram-bot.sh
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Helper para configurar el bot de Telegram que va a mandarte los
# leads de prospección automáticamente.
#
# Uso:
#   ./setup-telegram-bot.sh
#
# No resuelve TODO automáticamente (BotFather requiere interacción
# humana) pero te guía paso a paso y al final te deja el TOKEN y
# el CHAT_ID listos para meter en n8n.
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

set -euo pipefail

cyan='\033[0;36m'
green='\033[0;32m'
yellow='\033[1;33m'
bold='\033[1m'
reset='\033[0m'

echo -e "${cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo -e "${bold}Setup del Bot de Telegram para Prospección Automática${reset}"
echo -e "${cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo

# ── Paso 1: crear el bot con BotFather ─────────────────────────
echo -e "${bold}[1/4] Crear el bot con @BotFather${reset}"
echo
echo -e "1. Abrí Telegram y buscá ${yellow}@BotFather${reset}"
echo -e "2. Mandale: ${yellow}/newbot${reset}"
echo -e "3. Elegí un nombre (ej: ${yellow}Paulero Leads${reset})"
echo -e "4. Elegí un username (ej: ${yellow}paulero_leads_bot${reset}) — debe terminar en 'bot'"
echo -e "5. Te va a responder con un mensaje que contiene el token. Tiene esta pinta:"
echo -e "   ${yellow}1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ${reset}"
echo
read -rp "Pegá acá el TOKEN que te dio BotFather: " TOKEN
echo

if [[ ! "$TOKEN" =~ ^[0-9]+:[A-Za-z0-9_-]+$ ]]; then
  echo -e "${yellow}⚠️ El token no tiene el formato esperado. Verificá que lo copiaste completo.${reset}"
  read -rp "Continuar igual? (s/N): " confirm
  [[ "$confirm" != "s" ]] && exit 1
fi

echo -e "${green}✓ Token recibido.${reset}"
echo

# ── Paso 2: probar el bot y obtener info ───────────────────────
echo -e "${bold}[2/4] Verificar que el bot responde${reset}"
echo
echo "Haciendo ping a la API de Telegram..."

BOT_INFO=$(curl -s "https://api.telegram.org/bot${TOKEN}/getMe")
OK=$(echo "$BOT_INFO" | python3 -c "import sys,json; print(json.load(sys.stdin).get('ok', False))" 2>/dev/null || echo "False")

if [[ "$OK" != "True" ]]; then
  echo -e "${yellow}⚠️ La API devolvió un error. Respuesta:${reset}"
  echo "$BOT_INFO"
  exit 1
fi

BOT_USERNAME=$(echo "$BOT_INFO" | python3 -c "import sys,json; print(json.load(sys.stdin)['result']['username'])")
echo -e "${green}✓ Bot verificado: @${BOT_USERNAME}${reset}"
echo

# ── Paso 3: obtener el chat ID ─────────────────────────────────
echo -e "${bold}[3/4] Obtener tu CHAT_ID${reset}"
echo
echo -e "1. Abrí Telegram y mandale cualquier mensaje al bot ${yellow}@${BOT_USERNAME}${reset}"
echo -e "   (necesario para que el bot pueda mandarte mensajes — Telegram lo exige)"
echo -e "2. Si querés que los leads lleguen a un GRUPO en vez de un chat privado:"
echo -e "   - Creá un grupo nuevo"
echo -e "   - Agregá al bot ${yellow}@${BOT_USERNAME}${reset} como administrador"
echo -e "   - Mandá un mensaje cualquiera al grupo"
echo
read -rp "Cuando hayas mandado el mensaje, presioná Enter..."

echo
echo "Buscando el último mensaje que llegó al bot..."
UPDATES=$(curl -s "https://api.telegram.org/bot${TOKEN}/getUpdates")

# Parsear todos los chat IDs posibles
CHAT_IDS=$(echo "$UPDATES" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if not data.get('ok'):
    print('')
    sys.exit(0)
ids = set()
for r in data.get('result', []):
    msg = r.get('message') or r.get('channel_post') or r.get('edited_message') or {}
    chat = msg.get('chat', {})
    if chat.get('id'):
        tipo = chat.get('type', '?')
        nombre = chat.get('title') or chat.get('first_name') or chat.get('username') or '?'
        ids.add((chat['id'], tipo, nombre))
for cid, t, n in ids:
    print(f'{cid}\t{t}\t{n}')
")

if [[ -z "$CHAT_IDS" ]]; then
  echo -e "${yellow}⚠️ No hay mensajes todavía. Esperá 5 segundos y volvé a correr el script.${reset}"
  echo "Si ya mandaste el mensaje, esperá y volvé a ejecutar este script."
  exit 1
fi

echo
echo -e "${bold}Chats encontrados:${reset}"
echo -e "ID\t\tTipo\tNombre"
echo "$CHAT_IDS"
echo

read -rp "Copiá el ID que quieras usar (primera columna) y pegalo acá: " CHAT_ID
echo

if [[ -z "$CHAT_ID" ]]; then
  echo -e "${yellow}⚠️ No se ingresó un CHAT_ID${reset}"
  exit 1
fi

# ── Paso 4: probar envío ───────────────────────────────────────
echo -e "${bold}[4/4] Enviar mensaje de prueba${reset}"
echo

TEST_MSG="🤖 *Bot de prospección configurado correctamente*

Este bot te va a mandar los leads de prospección automática desde n8n.

*Configuración lista:*
• TOKEN: \`$TOKEN\`
• CHAT_ID: \`$CHAT_ID\`
• Bot: @${BOT_USERNAME}

Ahora andá a n8n y agregá estas variables de entorno en tu instancia:
\`\`\`
TELEGRAM_BOT_TOKEN=$TOKEN
TELEGRAM_CHAT_ID=$CHAT_ID
\`\`\`"

SEND_RESULT=$(curl -s -X POST "https://api.telegram.org/bot${TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "$(python3 -c "import json,sys; print(json.dumps({'chat_id': $CHAT_ID, 'text': sys.argv[1], 'parse_mode': 'Markdown'}))" "$TEST_MSG")")

OK=$(echo "$SEND_RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('ok', False))" 2>/dev/null || echo "False")

if [[ "$OK" != "True" ]]; then
  echo -e "${yellow}⚠️ No se pudo enviar el mensaje de prueba:${reset}"
  echo "$SEND_RESULT"
  exit 1
fi

echo -e "${green}✓ Mensaje de prueba enviado a tu Telegram. Revisá que haya llegado.${reset}"
echo
echo -e "${cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo -e "${bold}Variables para n8n:${reset}"
echo -e "${cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
echo
echo -e "  ${yellow}TELEGRAM_BOT_TOKEN${reset}=${TOKEN}"
echo -e "  ${yellow}TELEGRAM_CHAT_ID${reset}=${CHAT_ID}"
echo
echo -e "Agregalas en n8n → Settings → Variables (o en tu .env si n8n corre en Docker)."
echo
echo -e "${cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}"
