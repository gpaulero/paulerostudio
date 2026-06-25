# Setup: Paulero Studio CRM en Vercel + Neon

Esta guía te explica cómo deployar el CRM en producción. El CRM ya está integrado al sitio de Paulero Studio en la ruta `/admin`, protegido por contraseña.

---

## 1. Crear la base de datos en Neon (5 minutos)

1. Entrá en https://neon.tech y creá una cuenta (Google o GitHub, gratis, sin tarjeta)
2. En el dashboard, botón **"New Project"**
3. Nombre: `paulero-crm`
4. Region: `AWS US East (N. Virginia)` — recomendado para Vercel (mismas región)
5. Postgres version: la última (17.x)
6. **Create Project**
7. En la página del proyecto, botón **"Connect"** o en el dashboard copiá la **Connection String**
   - Tiene esta forma:
     ```
     postgresql://neondb_owner:np_xxxxxxxxxxxx@ep-xxx-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
8. **Importante**: agregá `&pgbouncer=true` al final de la URL (mejora manejo de conexiones en serverless). La URL final queda así:
   ```
   postgresql://neondb_owner:np_xxx@ep-xxx.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
   ```

Guardá esa URL completa, la vas a necesitar en los pasos 2 y 3.

---

## 2. Crear las tablas en la DB (2 minutos)

1. En el dashboard de Neon, entrá en **"SQL Editor"** (en el menú izquierdo)
2. Abrí el archivo `prisma/migrations/0001_init/migration.sql` de este repo, copiá todo el contenido
3. Pegalo en el SQL Editor de Neon
4. Botón **"Run"**
5. Deberías ver: "Query succeeded" y dos tablas creadas (`Comercio` y `Seguimiento`)

Para verificar, ejecutá en el mismo editor:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```
Deberías ver `Comercio` y `Seguimiento`.

---

## 3. Deploy en Vercel (5 minutos)

Si todavía no conectaste el repo `gpaulero/paulerostudio` a Vercel:

1. Entrá en https://vercel.com/new
2. Importá el repo `gpaulero/paulerostudio`
3. Framework preset: **Next.js** (autodetectado)
4. **NO deployues todavía** — primero hay que configurar las env vars (siguiente paso)

Si ya tenés el repo conectado a Vercel:
1. Andá a https://vercel.com/dashboard
2. Clic en tu proyecto `paulerostudio`
3. Settings → Environment Variables

---

## 4. Configurar variables de entorno en Vercel

En Settings → Environment Variables, agregá estas tres:

### `DATABASE_URL`
- **Value**: la URL de Neon del paso 1 (con `&pgbouncer=true`)
- **Environments**: Production, Preview, Development (todas)
- Ejemplo:
  ```
  postgresql://neondb_owner:np_xxx@ep-xxx.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
  ```

### `CRM_PASSWORD`
- **Value**: una contraseña segura que VOY A USAR YO para entrar al CRM
- **Environments**: Production, Preview (no Development)
- Ejemplo: `Gonzalo2026!crm`
- ⚠️ **IMPORTANTE**: cambiá este valor, no uses el default `paulero2024`

### `GROQ_API_KEY`
- **Value**: tu key de Groq (la misma que ya usás para el chatbot del sitio)
- Si ya la tenés configurada, dejala como está
- Environments: Production, Preview, Development

### `ZAI_API_KEY`
- **Value**: solo necesaria si querés que funcione "Buscar online" en producción
- Si no la configurás, la búsqueda online va a dar error pero el resto del CRM funciona igual
- Environments: Production

---

## 5. Deploy

1. Vercel → Deployments → botón "Redeploy"
2. Esperá 2-3 minutos a que termine el build
3. Cuando termine, abrí el sitio (https://paulerostudio.vercel.app o tu dominio custom)

---

## 6. Verificar que todo funciona

1. Entrá en `https://TU-DOMINIO.vercel.app/` → deberías ver el sitio público de Paulero Studio (igual que ahora)
2. Entrá en `https://TU-DOMINIO.vercel.app/admin` → debería redirigirte a `/login`
3. Escribí la contraseña que configuraste en `CRM_PASSWORD`
4. Deberías ver el CRM vacío (sin comercios cargados todavía)
5. Clic en **"Cargar relevamiento"** → te carga las 32 concesionarias del Valle de Punilla
6. Clic en **"Buscar online"** → probá con cualquier rubro + zona (ej: "Hotel" en "La Falda")
7. Listo, CRM en producción

---

## Troubleshooting

### Error: `PrismaClientInitializationError: Database connection failed`
- Verificá que `DATABASE_URL` en Vercel tiene `?sslmode=require&pgbouncer=true` al final
- Verificá que el SQL del paso 2 se ejecutó bien (andá a Neon → Tables, deberías ver `Comercio` y `Seguimiento`)

### Error: `401 No autorizado` al usar el CRM
- No estás logueado. Entrá en `/admin`, te redirige a `/login`, escribí el password de `CRM_PASSWORD`
- Si ya estás logueado y sigue dando 401, borra cookies del navegador y volvé a loguearte

### Error en "Buscar online"
- Probablemente falta `ZAI_API_KEY` en Vercel. El resto del CRM funciona igual sin esto.

### Cambiar la contraseña del CRM
1. Vercel → Settings → Environment Variables → `CRM_PASSWORD`
2. Cambiá el valor
3. Redeploy (o esperá que se redeployee solo en el próximo commit)

### Olvidaste la contraseña
- Andá a Vercel → Settings → Environment Variables y leela desde ahí (podés verla con el botón del ojo)

---

## Notas finales

- **La DB de Neon es persistente**: todo lo que cargues en el CRM (comercios, seguimientos) queda guardado. No se pierde al redeployear.
- **Free tier de Neon**: 0.5 GB storage + compute autoscale. Para tu CRM personal (50-500 comercios) vas a usar <1% del free tier.
- **Backup**: Neon tiene backups automáticos con point-in-time recovery (hasta 7 días en free tier).
- **Multi-usuario**: el sistema soporta un solo password compartido. Si algún día querés usuarios individuales con su propia contraseña, habría que cambiar a NextAuth + tabla de usuarios.
