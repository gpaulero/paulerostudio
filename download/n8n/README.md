# Prospección Automática — Setup Final (n8n + CRM + Telegram)

Setup simplificado y probado: cada **Lunes, Miércoles y Viernes a las 9 AM**, n8n busca comercios en el Valle de Punilla y te los manda por Telegram con pitch sugerido + botón a WhatsApp.

**Costo total: USD 0/mes** (sin Apify, sin servicios pagos).

---

## Arquitectura final (simplificada)

```
┌──────────────────────────────────────────────────────────────┐
│                          n8n (local)                          │
│                                                               │
│  Schedule Lun/Mié/Vie 9am                                     │
│         │                                                     │
│         ▼                                                     │
│  HTTP: GET /n8n-config/prospeccion-config.json (rubros/zonas) │
│         │                                                     │
│         ▼                                                     │
│  Loop por cada combinación rubro × zona                      │
│         │                                                     │
│         ▼                                                     │
│  HTTP: POST /api/comercios/buscar-online                      │
│  (El CRM hace: web search + LLM extraction + dedup + save)    │
│         │                                                     │
│         ▼                                                     │
│  Code node: arma mensaje HTML con pitch + WhatsApp link       │
│         │                                                     │
│         ▼                                                     │
│  Telegram: manda 1 mensaje por lead                           │
└──────────────────────────────────────────────────────────────┘
                                │
                                ▼
              ┌─────────────────────────────────┐
              │  Telegram (con botón a WhatsApp)│
              └─────────────────────────────────┘
```

**Solo 9 nodos en n8n.** El CRM hace toda la тяжелa (búsqueda + extracción + dedup), n8n solo orquesta y manda mensajes.

---

## Variables de entorno que vas a necesitar

| Variable | Valor | Dónde se setea |
|----------|-------|----------------|
| `CRM_BASE_URL` | `https://TU-DOMINIO.vercel.app` | n8n |
| `TELEGRAM_BOT_TOKEN` | `8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4` | n8n |
| `TELEGRAM_CHAT_ID` | `7780475797` | n8n |

> ✅ Ya tenés el bot de Telegram configurado (verificamos en la sesión anterior).
> Solo falta deployar el CRM en Vercel y configurar n8n.

---

## Paso 1 — Hacer push del CRM a GitHub (con los nuevos cambios)

Los cambios ya están commiteados en `/home/z/my-project/`. Necesitás subirlos a tu GitHub.

### Opción A — Si tenés el repo clonado en tu compu

```bash
cd ruta/a/tu/paulerostudio
git pull origin main

# Copiar los archivos nuevos desde /home/z/my-project/
# (o usar scp/rsync desde el entorno Z.ai si tenés acceso)

# Hacer commit de los cambios nuevos
git add .
git commit -m "feat: endpoint buscar-online devuelve datos completos + workflow n8n simplificado"
git push origin main
```

### Opción B — Si querés hacerlo desde cero

Descargá estos archivos desde `/home/z/my-project/` a tu repo local:

**Archivos nuevos / modificados:**
- `src/app/api/comercios/buscar-online/route.ts` (modificado — devuelve datos completos)
- `src/app/api/comercios/lead-from-n8n/route.ts` (nuevo — endpoint opcional para otros usos)
- `public/n8n-config/prospeccion-config.json` (nuevo — config editable de rubros/zonas)
- `scripts/setup-telegram-bot.sh` (nuevo — helper para crear bot de Telegram)
- `download/n8n/paulero-studio-prospeccion-simple.json` (nuevo — workflow n8n a importar)
- `.env.example` (actualizado con `CRM_API_KEY` y `CRM_BASE_URL`)

Después: `git add . && git commit -m "..." && git push origin main`

---

## Paso 2 — Deploy automático en Vercel

Si ya tenés Vercel conectado a tu repo de GitHub, el push anterior dispara un deploy automático. Esperá 1-2 minutos a que termine.

### Verificar que el deploy salió bien

```bash
curl https://TU-DOMINIO.vercel.app/n8n-config/prospeccion-config.json
# Debe devolver un JSON con rubros y zonas
```

### Configurar variables de entorno en Vercel

1. Andá a https://vercel.com/dashboard
2. Abrí tu proyecto `paulerostudio`
3. Settings → Environment Variables
4. Agregá estas (si no están):

| Name | Value | Environments |
|------|-------|--------------|
| `DATABASE_URL` | (tu Neon Postgres URL) | Production, Preview, Development |
| `CRM_PASSWORD` | `paulero2024` (o la que tengas) | Production, Preview, Development |
| `CRM_API_KEY` | (generar con `openssl rand -hex 32`) | Production |
| `CRM_BASE_URL` | `https://TU-DOMINIO.vercel.app` | Production |
| `GROQ_API_KEY` | (tu key de Groq para el chatbot) | Production |
| `ZAI_API_KEY` | (tu key de Z-AI) | Production |

> 💡 `CRM_API_KEY` es opcional por ahora (el endpoint `buscar-online` no la requiere). Solo la necesitás si más adelante querés que n8n use `/api/comercios/lead-from-n8n` con auth.

5. Después de agregar, hacé un redeploy: Deployments → ⋮ → Redeploy

### Probar que el endpoint funciona

```bash
curl -X POST https://TU-DOMINIO.vercel.app/api/comercios/buscar-online \
  -H "Content-Type: application/json" \
  -d '{"rubro": "Hotel", "zona": "La Falda"}'

# Respuesta esperada:
# {
#   "ok": true,
#   "message": "5 comercios nuevos encontrados para Hotel en La Falda. ...",
#   "nuevos": [
#     {
#       "id": "...",
#       "nombre": "Hotel Marydor La Falda",
#       "rubro": "Hotel",
#       "zona": "La Falda",
#       "direccion": null,
#       "telefono": null,
#       "whatsapp": null,
#       "webUrl": "https://...",
#       "estadoWeb": "Existe (a verificar)",
#       "prioridad": "Media",
#       "notas": "...",
#       "pitchSugerido": null
#     },
#     ...
#   ],
#   "duplicados": 0,
#   "totalResultados": 10
# }
```

---

## Paso 3 — Instalar n8n localmente (si no lo tenés)

### Opción A — Docker (recomendado, fácil de mantener)

```bash
# Crear directorio para n8n
mkdir -p ~/n8n && cd ~/n8n

# Crear docker-compose.yml
cat > docker-compose.yml <<EOF
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_URL=http://localhost:5678/
      - GENERIC_TIMEZONE=America/Argentina/Cordoba
      # Variables para el workflow de Paulero Studio:
      - CRM_BASE_URL=https://TU-DOMINIO.vercel.app
      - TELEGRAM_BOT_TOKEN=8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4
      - TELEGRAM_CHAT_ID=7780475797
    volumes:
      - ./data:/home/node/.n8n
EOF

# Levantar n8n
docker compose up -d

# Verificar que está corriendo
docker compose ps
```

Abrí http://localhost:5678 en tu navegador — vas a ver la UI de n8n.

### Opción B — npm global (más simple pero menos robusto)

```bash
npm install -g n8n

# Setear variables de entorno en tu shell (agregá a ~/.bashrc o ~/.zshrc)
export CRM_BASE_URL=https://TU-DOMINIO.vercel.app
export TELEGRAM_BOT_TOKEN=8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4
export TELEGRAM_CHAT_ID=7780475797
export GENERIC_TIMEZONE=America/Argentina/Cordoba

# Arrancar n8n
n8n start
```

Abrí http://localhost:5678

---

## Paso 4 — Importar el workflow en n8n

1. Descargá el archivo `paulero-studio-prospeccion-simple.json` (está en `/home/z/my-project/download/n8n/`)
2. En n8n (http://localhost:5678):
   - Hacé clic en **"Workflows"** en el menú izquierdo
   - Botón **"Add workflow"** arriba a la derecha
   - Tres puntos `⋮` arriba a la derecha → **"Import from File"**
   - Seleccioná el JSON
3. Vas a ver 9 nodos conectados:
   - Schedule Trigger
   - Cargar Config
   - Generar Combinaciones
   - Loop
   - Buscar en CRM
   - Expandir Leads
   - Construir Mensaje
   - Enviar Telegram
   - Volver al Loop

---

## Paso 5 — Configurar la credencial de Telegram en n8n

El nodo "Enviar Telegram" necesita una credencial. Hacé esto UNA sola vez:

1. Hacé clic en el nodo **"Enviar Telegram"**
2. En el campo **"Credential to connect with"**, hacé clic en **"Create New"**
3. Seleccioná **"Telegram API"**
4. Completá:
   - **Access Token**: `8811084254:AAH-r9OCoeyzKNjyZzlDL6uouutuOsvywL4`
   - **Name**: `Paulero Leads Bot`
5. Guardá

> ℹ️ El `chatId` no se pone en la credencial — se pasa como variable de entorno `TELEGRAM_CHAT_ID` y el nodo lo lee con `={{ $env.TELEGRAM_CHAT_ID }}`.

---

## Paso 6 — Probar el workflow manualmente

Antes de esperar al Lunes, hagamos una prueba real:

1. En n8n, abrí el workflow
2. Hacé clic en el nodo **"Schedule Trigger"**
3. Hacé clic en el botón **"Execute workflow"** (play, arriba a la izquierda del nodo)
4. Vas a ver cómo se ejecutan los nodos uno por uno
5. **En tu Telegram deberían empezar a llegar mensajes** con leads

Si todo anda bien:
- El nodo "Cargar Config" devuelve el JSON con rubros y zonas
- El nodo "Generar Combinaciones" crea 24 items (8 rubros × 3 zonas)
- El loop los procesa uno por uno (~30 segundos por búsqueda)
- Cada lead nuevo se manda a Telegram como mensaje separado

**Tiempo total: ~12-15 minutos para las 24 búsquedas.**

---

## Paso 7 — Activar el workflow

Una vez que confirmaste que funciona:

1. Arriba a la derecha del workflow, cambiale el switch de **Inactive** a **Active**
2. A partir de ahora, va a correr solo los **Lunes, Miércoles y Viernes a las 9 AM** hora Argentina

Para verificar que está activo:
- En la lista de Workflows, el tuyo debe tener un dot verde al lado del nombre
- En la tab "Executions" vas a ver el historial cuando corra

---

## Personalización

### Cambiar rubros o zonas (sin tocar n8n)

Editá en el repo del CRM: `public/n8n-config/prospeccion-config.json`

```json
{
  "rubros": [
    {
      "nombre": "Veterinaria",
      "apify_searchTerms_template": "veterinaria {zona} Córdoba",
      "instagram_hashtags_template": ["veterinaria{zona_limpio}"],
      "pitch_default": "Web con turnos online, historias clínicas digitales y tienda de alimentos."
    }
  ],
  "zonas": [
    { "nombre": "Capilla del Monte", "provincia": "Córdoba", "prioridad": "Media" }
  ]
}
```

Commit + push + deploy automático. n8n lo va a leer en la próxima ejecución.

### Cambiar frecuencia del schedule

En n8n, abrí el nodo **"Schedule Trigger"** y cambiá el cron:

| Quiero que corra... | Cron |
|----------------------|------|
| Lunes/Miércoles/Viernes 9am (default) | `0 9 * * 1,3,5` |
| Todos los días a las 9am | `0 9 * * *` |
| Cada lunes a las 10am | `0 10 * * 1` |
| Cada 6 horas | `0 */6 * * *` |

### Agregar pitches para nuevos rubros

Editá el Code node **"Construir Mensaje"** en n8n. En el objeto `PITCHES` agregá tu entrada:

```javascript
const PITCHES = {
  "Hotel": "...",
  "Restaurante": "...",
  // Agregá tu nuevo rubro:
  "Ferretería": "Hola {nombre}! Soy Gonzalo de Paulero Studio. Vi su ferretería en {zona} y les propongo una web con catálogo online, cotizador automático y WhatsApp integrado. ¿10 minutos esta semana?",
  "default": "..."
};
```

---

## Troubleshooting

### "No me llegan los mensajes de Telegram"

1. Verificá que las 3 variables de entorno estén bien seteadas en n8n
2. En n8n, abrí la última ejecución y mirá el log del nodo "Enviar Telegram"
3. Errores comunes:
   - `401 Unauthorized` → token mal configurado
   - `403 Forbidden: chat not found` → chat ID incorrecto o no le mandaste `/start` al bot

### "El workflow corre pero el endpoint del CRM falla"

1. Probá el endpoint manualmente:
   ```bash
   curl -X POST https://TU-DOMINIO.vercel.app/api/comercios/buscar-online \
     -H "Content-Type: application/json" \
     -d '{"rubro": "Hotel", "zona": "La Falda"}'
   ```
2. Si responde con error 500 → revisá los logs en Vercel (Deployments → tu deploy → Logs)
3. Si responde con error 502 → esperá unos minutos, Vercel puede estar en cold start

### "Me llegan pocos leads"

El endpoint hace web search (10 resultados) + LLM extraction. Algunas búsquedas no devuelven leads porque:
- El rubro es muy específico y no hay comercios en esa zona
- El LLM no logró identificar comercios claros en los resultados

Para más volumen:
- Agregá más zonas a la config (más zonas = más búsquedas)
- Agregá más rubros

### "n8n no puede ver el CRM (ECONNREFUSED)"

El `CRM_BASE_URL` debe ser la URL pública de Vercel (`https://...`), no `localhost:3000`. n8n corre en tu compu pero hace HTTP requests a internet.

---

## Costos estimados (FINAL)

| Servicio | Costo |
|----------|-------|
| Vercel (plan Hobby) | USD 0/mes |
| Neon Postgres (plan Free) | USD 0/mes |
| n8n local (Docker en tu compu) | USD 0/mes |
| Telegram Bot API | USD 0/mes |
| Z-AI Web Search (incluido en Vercel) | USD 0/mes |
| Groq API (chatbot) | USD 0/mes (free tier) |
| **Total** | **USD 0/mes** ✅ |

---

## Archivos del entregable

```
download/n8n/
├── README.md                                  ← este archivo (setup simplificado)
├── paulero-studio-prospeccion-simple.json     ← workflow n8n a importar (9 nodos)
└── paulero-studio-prospeccion.json            ← workflow anterior con Apify (alternativa)

src/app/api/comercios/
├── buscar-online/route.ts                     ← endpoint mejorado (devuelve datos completos)
└── lead-from-n8n/route.ts                     ← endpoint opcional para otros usos

public/n8n-config/
└── prospeccion-config.json                    ← config editable de rubros/zonas

scripts/
├── setup-telegram-bot.sh                      ← helper para crear bot de Telegram
├── prospeccion.py                             ← script Python (alternativa a n8n)
└── prospeccion_simple.py                      ← script Python simplificado (alternativa)
```

---

## Próximos pasos sugeridos

1. **Probar el workflow completo este Lunes** — te van a llegar leads automáticamente
2. **Hacer follow-up de los leads** que vas cerrando en el CRM (cambiar estado a "Contactado" → "Respondio" → "Reunion" → "Cerrado")
3. **Sumar zonas** cuando ya hayas trabajado las 3 actuales (Capilla del Monte, La Cumbre, etc.)
4. **Plantillas de respuesta por objeción** — cuando un lead te dice "no tengo tiempo" o "es muy caro", tener respuestas pre-armadas
5. **Dashboard semanal** — otro workflow que los lunes te mande un resumen de la semana anterior (cuántos leads cerraste, cuántos están pendientes)

---

¿Preguntas? Volvé al chat y las resolvemos.
