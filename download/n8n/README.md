# Prospección Automática con n8n — Paulero Studio

Setup paso a paso para recibir leads periódicos por Telegram y abordarlos por WhatsApp.

---

## ¿Qué vas a tener al final?

Cada **Lunes, Miércoles y Viernes a las 9 AM** (hora Argentina), n8n va a:

1. Buscar comercios en **5 fuentes** (Google Maps, Instagram, Facebook, Páginas Amarillas AR, web search + LLM)
2. Normalizar y deduplicar los leads
3. Guardarlos en tu CRM (deployado en Vercel)
4. Mandarte por **Telegram** los de prioridad **alta** (sin web propia o web amateur) con un botón directo a WhatsApp

Cada mensaje de Telegram incluye:
- Nombre, rubro, zona, dirección, teléfono
- Estado de la web (Sin web / Amateur Canva / Wix / Existe)
- Pitch sugerido para abordar
- Link directo a WhatsApp con mensaje pre-escrito
- Link al lead en el CRM

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                       n8n (local)                            │
│                                                              │
│  Schedule ──▶ Load config ──▶ Loop rubro×zona                │
│                                  │                            │
│       ┌──────────────┬──────────┼───────────┬───────────┐   │
│       ▼              ▼          ▼           ▼           ▼   │
│   Google Maps   Web Search   Instagram   Facebook   Págs.Am.│
│   (Apify)       (CRM API)    (Apify)     (Apify)    (HTML)   │
│       │              │          │           │           │   │
│       └──────────────┴──────────┴───────────┴───────────┘   │
│                                  │                            │
│                          Merge + Dedup + Score               │
│                                  │                            │
│              ┌───────────────────┴───────────────────┐       │
│              ▼                                       ▼       │
│       POST /api/comercios/                   Telegram        │
│         lead-from-n8n (CRM)               (notif alta prior.)│
└─────────────────────────────────────────────────────────────┘
                                            │
                                            ▼
                          ┌─────────────────────────────────┐
                          │  Tu celu (Telegram + WhatsApp)  │
                          └─────────────────────────────────┘
```

---

## Requisitos previos

Antes de empezar, aseguráte de tener:

- [n8n instalado localmente](https://docs.n8n.io/hosting/installation/) (Docker, npm o desktop)
- El CRM de Paulero Studio deployado en Vercel (esto ya lo tenés)
- Una cuenta en [Apify](https://apify.com/) — trial gratuito con USD 5 de crédito
- Telegram instalado en tu celular
- Acceso al repo `gpaulero/paulerostudio` en GitHub

---

## Paso 1 — Hacer deploy del CRM actualizado

El CRM necesita el nuevo endpoint `/api/comercios/lead-from-n8n` para recibir leads desde n8n.

```bash
# En tu compu local, en el repo del CRM
cd paulerostudio
git pull origin main        # o git clone si no lo tenés
git status                  # confirmá que está limpio

# Generar una API key segura para n8n
openssl rand -hex 32
# → copia el output, ej: a1b2c3d4e5f6...

# Crear .env.local con la API key
cat > .env.local <<EOF
DATABASE_URL="postgresql://..."          # tu URL de Neon (en Vercel ya está)
CRM_API_KEY="a1b2c3d4e5f6..."            # el output de openssl de arriba
CRM_BASE_URL="https://TU-DOMINIO.vercel.app"
EOF

# Commit + push + deploy automático en Vercel
git add .
git commit -m "feat: endpoint /api/comercios/lead-from-n8n + config n8n + setup-telegram script"
git push origin main
```

**En Vercel:**

1. Andá a tu proyecto en https://vercel.com/dashboard
2. Settings → Environment Variables
3. Agregá `CRM_API_KEY` con el valor generado ( Production + Preview + Development)
4. Agregá `CRM_BASE_URL` = `https://TU-DOMINIO.vercel.app`
5. Hacé un redeploy (Deployments → ⋮ → Redeploy)

**Verificá que el endpoint responde:**

```bash
curl -X POST https://TU-DOMINIO.vercel.app/api/comercios/lead-from-n8n \
  -H "Content-Type: application/json" \
  -H "x-crm-api-key: TU_API_KEY" \
  -d '{
    "nombre": "Test Bot Verification",
    "rubro": "Test",
    "zona": "La Falda",
    "fuente": "test"
  }'

# Respuesta esperada:
# { "ok": true, "created": true, "comercio": { "id": "...", ... } }
```

---

## Paso 2 — Configurar el bot de Telegram

Desde la raíz del repo (la carpeta donde está `scripts/`):

```bash
./scripts/setup-telegram-bot.sh
```

El script te guía por:
1. Crear el bot con `@BotFather` → te da un **TOKEN**
2. Verifica que el bot responde
3. Te hace mandar un mensaje al bot para descubrir tu **CHAT_ID**
4. Te envía un mensaje de prueba con todos los datos

Al final te va a mostrar:

```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ
TELEGRAM_CHAT_ID=987654321
```

Anotá esos dos valores — los vas a necesitar en el paso 4.

> 💡 **Si querés que los leads lleguen a un grupo** (con socios, equipo, etc.):
> - Creá un grupo en Telegram
> - Agregá al bot como **administrador**
> - Mandá un mensaje al grupo (con `/start` o cualquier texto)
> - El script te va a mostrar el ID del grupo (con prefijo `-100...`) como una de las opciones

---

## Paso 3 — Configurar Apify (para Google Maps, Instagram y Facebook)

Apify te da USD 5 de crédito gratuito al registrarte. Con eso alcanza para:
- ~200 comercios de Google Maps
- ~500 posts de Instagram
- ~200 páginas de Facebook

(Si querés más volumen, el plan pago arranca en USD 49/mes por 100 GB de compute.)

**Pasos:**

1. Andá a https://apify.com/ y create una cuenta
2. Andá a https://console.apify.com/account/integrations
3. Copiá tu **API token**

**Probá que funciona:**

```bash
curl -X POST \
  "https://api.apify.com/v2/acts/apify~google-maps-scraper/run-sync-get-dataset-items?token=TU_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "searchStringsArray": ["hotel La Falda Córdoba"],
    "maxCrawledPlacesPerSearch": 3,
    "language": "es",
    "countryCode": "ar"
  }'

# Te devuelve un array con hoteles de La Falda
```

---

## Paso 4 — Configurar variables de entorno en n8n

Dependiendo de cómo tengas instalado n8n:

### Opción A — Docker Compose (recomendado para uso permanente)

Si usás Docker, editá el `docker-compose.yml` y agregá en `environment`:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      # ↓↓↓ variables para el workflow de prospección ↓↓↓
      - APIFY_API_TOKEN=tu_apify_token_aqui
      - TELEGRAM_BOT_TOKEN=1234567890:ABCdef...
      - TELEGRAM_CHAT_ID=987654321
      - CRM_BASE_URL=https://TU-DOMINIO.vercel.app
      - CRM_API_KEY=a1b2c3d4e5f6...
```

Reiniciá n8n:

```bash
docker compose down
docker compose up -d
```

### Opción B — npm global

Si lo instalaste con `npm install -g n8n`, agregá las variables en tu `.env` o exportalas en el shell:

```bash
export APIFY_API_TOKEN=tu_apify_token_aqui
export TELEGRAM_BOT_TOKEN=1234567890:ABCdef...
export TELEGRAM_CHAT_ID=987654321
export CRM_BASE_URL=https://TU-DOMINIO.vercel.app
export CRM_API_KEY=a1b2c3d4e5f6...

n8n start
```

### Opción C — n8n Desktop

En n8n Desktop no se pueden setear env vars directamente. En ese caso, dentro de cada nodo del workflow reemplazá `{{$env.VARIABLE}}` por el valor literal. **Menos seguro** porque queda hardcodeado en el workflow.

---

## Paso 5 — Importar el workflow en n8n

1. Abrí n8n en tu navegador: http://localhost:5678
2. Andá a **Workflows** → **Add workflow**
3. Hacé clic en los tres puntos `⋮` arriba a la derecha → **Import from File**
4. Seleccioná el archivo `download/n8n/paulero-studio-prospeccion.json`
5. Va a aparecer el workflow con todos los nodos:

   - Schedule Trigger (Lun/Mié/Vie 9am)
   - Cargar Config Rubros/Zonas
   - Generar Combinaciones Rubro×Zona
   - Loop (1 rubro×zona por vez)
   - 5 fuentes en paralelo (Google Maps, Web Search, Instagram, Facebook, Páginas Amarillas)
   - 5 nodos de normalización (uno por fuente)
   - Merge Todas las Fuentes
   - Filtrar y Dedup Lote
   - Skip nulos y ya-en-CRM
   - Push al CRM
   - Construir Mensaje Telegram
   - Enviar a Telegram
   - Volver al Loop

6. **IMPORTANTE — Configurar credenciales de Telegram:**

   El nodo **"Enviar a Telegram"** necesita credenciales. Hacé clic en el nodo → **Credential to connect with** → **Create New** → Telegram API

   - **Access Token**: el `TELEGRAM_BOT_TOKEN` que te dio el script del paso 2
   - Guardá con un nombre (ej: "Paulero Leads Bot")

   > Si en el paso 4 ya seteaste `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` como env vars, el workflow los usa automáticamente. La credencial de Telegram en n8n solo necesita el token.

7. **Activar el workflow** con el switch arriba a la derecha (de `Inactive` a `Active`)

---

## Paso 6 — Probar el workflow manualmente

Antes de esperar al Lunes, probemos que todo funciona:

1. En n8n, hacé clic en **"Schedule Trigger"** → el botón **Execute workflow** (play)
2. Vas a ver cómo se ejecutan los nodos uno por uno
3. Si todo está bien configurado:
   - Cada nodo HTTP Request devuelve 200/201
   - El nodo "Push al CRM" guarda los comercios
   - El nodo "Enviar a Telegram" manda mensajes a tu bot

**Si algo falla**, los errores más comunes son:

| Error | Causa | Solución |
|-------|-------|----------|
| `401 Unauthorized` en Push al CRM | `CRM_API_KEY` no coincide | Verificá que la env var en n8n sea igual a la de Vercel |
| `Apify 402 Payment Required` | Te quedaste sin crédito | Recargá saldo en https://console.apify.com/account/billing |
| `Telegram 401 Unauthorized` | `TELEGRAM_BOT_TOKEN` incorrecto | Regenerá el token con `/revoke` en @BotFather y volvé a correr el script |
| `Telegram 403 Forbidden: chat not found` | `TELEGRAM_CHAT_ID` incorrecto o no mandaste `/start` al bot | Mandale un mensaje al bot primero y volvé a obtener el chat ID |
| Timeout en Google Maps | Apify scraper tarda >2 min | Aumentá el timeout del nodo HTTP Request a 180000ms |
| `ECONNREFUSED localhost:3000` | n8n no puede ver tu CRM local | En CRM_BASE_URL usá tu dominio de Vercel, no localhost |

---

## Paso 7 — Personalizar rubros y zonas

El workflow lee la configuración desde:

```
public/n8n-config/prospeccion-config.json
```

en el dominio del CRM. Esto significa que **podés cambiar rubros y zonas sin tocar n8n**.

Editá el archivo y agregá lo que necesites:

```json
{
  "rubros": [
    // ... los actuales
    {
      "nombre": "Veterinaria",
      "apify_searchTerms_template": "veterinaria {zona} Córdoba",
      "instagram_hashtags_template": ["veterinaria{zona_limpio}"],
      "pitch_default": "Web con turnos online, historias clínicas digitales y tienda de alimentos."
    }
  ],
  "zonas": [
    // ... las actuales
    { "nombre": "San Francisco", "provincia": "Córdoba", "prioridad": "Media" }
  ]
}
```

Commit + push y n8n lo va a leer en la próxima ejecución.

### Placeholders en plantillas

| Placeholder | Significado | Ejemplo |
|-------------|-------------|---------|
| `{zona}` | Nombre de la zona | "La Falda" |
| `{zona_limpio}` | Nombre sin espacios ni mayúsculas | "lafalda" |

---

## Paso 8 — Ajustar frecuencia

Para cambiar cuándo corre el workflow:

1. En n8n, abrí el nodo **"Schedule Trigger (Lun/Mié/Vie 9am)"**
2. En **Cron Expression**, cambiá la expresión:

   | Quiero que corra... | Cron |
   |----------------------|------|
   | Todos los días a las 9 AM | `0 9 * * *` |
   | Lunes/Miércoles/Viernes a las 9 AM (default) | `0 9 * * 1,3,5` |
   | Cada lunes a las 10 AM | `0 10 * * 1` |
   | Cada 6 horas | `0 */6 * * *` |
   | Solo los días 1 y 15 del mes | `0 9 1,15 * *` |

3. Guardá el nodo. La próxima ejecución respeta la nueva frecuencia.

---

## ¿Cómo sigue el proceso de venta?

Cuando te llega un lead por Telegram:

1. Hacé clic en **"Abrir WhatsApp"** → abre WhatsApp con un mensaje pre-escrito
2. Personalizá el primer mensaje (el bot deja uno genérico, sumale algo específico del lead)
3. Si responde → abrilo en el CRM y cambiá el estado a "Contactado" → "Respondio"
4. Si cierra → cambiá a "Cerrado" y agregá un seguimiento con el monto

**Flujo de estados en el CRM:**

```
Sin contactar → Contactado → Respondio → Reunion → Cerrado
                                              ↘ Rechazado
```

Cada lead que te llega por n8n arranca en `Sin contactar` con prioridad inferida según su web.

---

## Costos estimados

| Servicio | Costo |
|----------|-------|
| n8n local | $0 |
| Telegram bot | $0 |
| Vercel CRM (plan Hobby) | $0 |
| Neon Postgres (plan Free) | $0 |
| Apify trial (USD 5 crédito) | Cubre ~200 leads de Google Maps |
| Apify pago (cuando se agote el trial) | USD 49/mes por 100 GB compute (~10.000 leads) |

**Costo total mes 1: $0** (con trial de Apify gratis)
**Costo steady state:** USD 49/mes si consumís Apify regularmente, o $0 si solo usás web search + directorios.

---

## Troubleshooting avanzado

### "No me llegan los mensajes de Telegram"

1. Verificá que el bot tenga el chat ID correcto: mandale `/start` al bot, volvé a correr `setup-telegram-bot.sh`
2. En n8n, abrí la última ejecución fallida y mirá el log del nodo "Enviar a Telegram"
3. Si dice `chat not found`: el chat ID está mal
4. Si dice `bot was blocked by the user`: le diste block al bot en Telegram

### "El workflow corre pero no encuentra leads"

1. Verificá que `CRM_BASE_URL` sea accesible desde tu compu (si n8n corre local, también puede ver Vercel)
2. Probá el endpoint `/n8n-config/prospeccion-config.json` en el navegador: debe devolver el JSON
3. Si las búsquedas en Google Maps no devuelven nada, intentá con searchTerm más amplio (ej: "restaurante" en vez de "restaurante vegetariano")
4. Para Instagram: los hashtags deben existir y tener al menos 10 posts

### "Me llegan leads duplicados"

El deduplication funciona por nombre normalizado + zona. Si te llegan dos "Hotel La Falda" y "Hotel La Falda S.R.L.", los normaliza igual y solo guarda el primero. Si igual llegan duplicados:
1. Mirá los logs del nodo "Push al CRM"
2. El endpoint devuelve `{ created: false, duplicado: true }` cuando detecta duplicado
3. Si querés fusionar manualmente: en el CRM, abrí el duplicado y agregá los datos al principal

### "Apify me cobra mucho"

El scraper de Google Maps cobra por lugar encontrado, no por búsqueda. Si configurás `maxCrawledPlacesPerSearch: 15` y buscás 4 rubros × 14 zonas = 56 búsquedas, tenés hasta 56 × 15 = 840 lugares × USD 0.025 = **USD 21 por corrida**.

Para reducir costos:
- Bajá `maxCrawledPlacesPerSearch` a 5
- Reducí las zonas (solo Punilla en vez de todo el país)
- Desactivá las fuentes de Apify y dejá solo "Web Search + LLM" (gratis) y "Páginas Amarillas" (gratis)

---

## Estructura de archivos entregados

```
download/n8n/
├── README.md                                    ← este archivo
├── paulero-studio-prospeccion.json              ← workflow n8n listo para importar

src/app/api/comercios/lead-from-n8n/route.ts     ← endpoint nuevo del CRM

public/n8n-config/
└── prospeccion-config.json                       ← config de rubros/zonas (editable)

scripts/
└── setup-telegram-bot.sh                         ← helper para crear el bot de Telegram
```

---

## Próximos pasos sugeridos

1. **Plantillas de pitch por rubro** — Crear mensajes de WhatsApp pre-armados para cada rubro (restaurante, hotel, concesionaria...)
2. **Seguimiento automático** — Workflow n8n separado que mire comercios en estado "Contactado" sin respuesta hace 3 días y te recuerde hacer follow-up
3. **Scoring más fino** — Sumar un Code node que dé +1 si tiene web amateur, +2 si no tiene web, +1 si está en zona de alta prioridad, etc.
4. **Dashboard semanal** — Otro workflow que los lunes te mande un resumen: "Esta semana se encontraron X leads, Y están en contacto, Z cerraron"
5. **Integración con Google Sheets** — Para tener una planilla viva con todos los leads y poder hacer análisis

---

¿Preguntas? Volvé a abrir el chat y las resolvemos.
