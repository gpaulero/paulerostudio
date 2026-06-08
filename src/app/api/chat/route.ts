import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/chat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chatbot endpoint que usa z-ai-web-dev-sdk para responder
// consultas sobre los servicios de Paulero Studio.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SYSTEM_PROMPT = `Sos el asistente virtual de Paulero Studio, el estudio de diseño y desarrollo web de Gonzalo Paulero. Respondés en español argentino (vos, tenés, etc.).

INFORMACIÓN DEL ESTUDIO:
- Paulero Studio es un estudio de desarrollo web freelance de Córdoba, Argentina
- Trabajá de forma remota para clientes de Argentina y Latam
- Especialidades: desarrollo web a medida, e-commerce, backend, mantenimiento

PLANES Y PRECIOS:
1. Landing Page — 250 USD (pago único)
   - Diseño a medida (no templates)
   - Hasta 5 secciones
   - 100% responsive
   - SEO básico optimizado
   - Formulario de contacto / WhatsApp
   - Deploy en producción incluido
   - 1 semana de entrega

2. Sitio Web Completo — 450 USD (pago único) [MÁS ELEGIDO]
   - Todo lo de Landing Page
   - Secciones ilimitadas
   - Backend con base de datos
   - Panel de administración
   - Contenido dinámico (CMS)
   - Integración con APIs
   - 2-4 semanas de entrega

3. E-commerce — 600 USD (pago único)
   - Todo lo de Sitio Web Completo
   - Catálogo de productos con filtros
   - Carrito de compra
   - Pasarelas de pago (MercadoPago, etc.)
   - Gestión de stock y pedidos
   - Panel admin para productos
   - 4-6 semanas de entrega

4. Mantenimiento & Soporte — 50 USD/mes
   - Actualizaciones, backups, monitoreo, seguridad y soporte técnico

TECNOLOGÍAS:
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Prisma, PostgreSQL/SQLite
- Herramientas: Git, Vercel, Figma

CONTACTO:
- WhatsApp: +54 9 351 765-6918
- Email: gpaulero@gmail.com
- Ubicación: Remoto — Argentina & Latam

REGLAS:
- Sé amable, directo y profesional
- Si te preguntan algo que no sabés, sugerí contactar por WhatsApp
- No inventes precios ni servicios que no estén listados arriba
- Si el usuario quiere contratar o tiene una consulta personalizada, derivá a WhatsApp o email
- Respondé siempre en español argentino
- No uses emojis en exceso, máximo 1 o 2 por mensaje`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Se requiere un array de messages" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "No se pudo generar una respuesta" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
