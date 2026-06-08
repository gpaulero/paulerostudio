# PAULERO STUDIO — Contexto de Sesión

## Última actualización: 2026-06-08

---

## Proyecto: Paulero Studio Portfolio Web

**Descripción:** Sitio web portfolio profesional para Gonzalo Paulero (desarrollador web y diseñador). Construido con Next.js 16, React 19, Tailwind CSS 4, Framer Motion y shadcn/ui.

**Repositorio GitHub:** `https://github.com/gpaulero/paulerostudio.git`

---

## Estructura del Proyecto

```
/home/z/my-project/
├── src/
│   ├── app/
│   │   ├── page.tsx          → Página principal (884 líneas, componente client-side)
│   │   ├── layout.tsx        → Layout raíz
│   │   ├── globals.css       → Estilos globales + Tailwind
│   │   └── api/route.ts      → API routes
│   ├── components/ui/        → Componentes shadcn/ui
│   ├── hooks/                → Custom hooks (use-mobile, use-toast)
│   └── lib/                  → Utilidades (utils, db)
├── public/
│   ├── logo.svg              → Logo SVG del estudio
│   ├── logo-mark.png         → Marca del logo
│   ├── hero-bg.png           → Imagen de fondo del hero
│   ├── gonzalo-photo.png     → Foto de perfil de Gonzalo
│   ├── project-etersomos-real.png  → Captura real Etersomos
│   ├── project-compucity-real.png  → Captura real Compucity
│   ├── project-etersomos.png       → Thumbnail Etersomos
│   ├── project-compucity.png       → Thumbnail Compucity
│   └── robots.txt
├── prisma/schema.prisma      → Schema de base de datos
├── package.json              → Dependencias (Next.js 16, React 19, etc.)
├── tailwind.config.ts
├── next.config.ts
└── components.json           → Config shadcn/ui
```

---

## Estado Actual del Sitio

### Secciones implementadas:
1. **Hero** — Con gradiente animado + textura grain cinematográfica (estática, sin animación para rendimiento)
2. **About** — Presentación de Gonzalo con foto y habilidades
3. **Services** — Servicios: Desarrollo Web, E-commerce, Backend/APIs, Consultoría
4. **Projects** — Portfolio con 2 proyectos:
   - **Etersomos** — Comunidad de terapias holísticas
   - **Compucity** — E-commerce de tecnología
5. **Contact** — Contacto directo por WhatsApp (sin formulario)
6. **Footer** — Links y copyright

### Características implementadas:
- Diseño dark mode premium
- Animaciones con Framer Motion (scroll reveal, hover effects)
- Navegación responsive con menú hamburguesa
- Textura grain cinematográfica estática (sin animación para rendimiento)
- Gradiente animado suave en hero
- Capturas reales de proyectos (tomadas con Playwright)
- Contacto directo por WhatsApp en vez de formulario
- Email actualizado: gpaulero@gmail.com

### Tecnologías:
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion 12
- shadcn/ui (componentes)
- Lucide React (íconos)
- Prisma (ORM)
- Bun (runtime)

---

## Historial de Cambios Recientes

| Commit | Descripción |
|--------|-------------|
| 97abc79 | Auto-save sesión |
| 3614832 | fix: grain estático sin animación + gradiente más suave |
| 413f8ff | feat: textura grain cinematográfica + gradiente animado en hero |
| e2f8cf9 | fix: email actualizado a gpaulero@gmail.com |
| bac5983 | feat: contacto por WhatsApp directo en vez de formulario |
| 576d8a5 | fix: captura correcta de Compucity (e-commerce de tecnología) |

---

## Para la Próxima Sesión

### Posibles mejoras pendientes:
- Agregar más proyectos al portfolio
- Implementar página de detalle de proyectos
- Agregar sección de testimonials
- Optimizar SEO (meta tags, Open Graph)
- Agregar modo claro/oscuro toggle
- Implementar blog o sección de artículos
- Deploy a producción (Vercel o similar)

### Notas técnicas:
- El sitio corre en puerto 3000 con `bun run dev`
- Las capturas de proyectos están en `public/project-*-real.png`
- El archivo `page.tsx` contiene TODO el sitio en un solo archivo (884 líneas) — podría refactorizarse en componentes separados
- Existe una carpeta `paulerostudio/` que parece ser una copia antigua del proyecto

---

## Datos de Contacto del Cliente
- **Nombre:** Gonzalo Paulero
- **Email:** gpaulero@gmail.com
- **WhatsApp:** Configurado en el sitio
- **GitHub:** gpaulero/paulerostudio
