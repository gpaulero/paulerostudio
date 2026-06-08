import { NextRequest, NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/chat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chatbot endpoint que conecta con la API de Z.ai para responder
// consultas sobre los servicios de Paulero Studio.
// Sin necesidad de variables de entorno en Vercel.
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

// Configuración directa — no requiere variables de entorno
const ZAI_CONFIG = {
  baseUrl: process.env.ZAI_BASE_URL || "https://internal-api.z.ai/v1",
  apiKey: process.env.ZAI_API_KEY || "Z.ai",
  chatId: process.env.ZAI_CHAT_ID || "chat-26d906b4-855e-4890-b3f8-4b93d99c858d",
  token:
    process.env.ZAI_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2VkYWY3MzktZDdjMS00Y2Y0LWEzMDUtNGViZTRjMzdhZWFlIiwiY2hhdF9pZCI6ImNoYXQtMjZkOTA2YjQtODU1ZS00ODkwLWIzZjgtNGI5M2Q5OWM4NThkIiwicGxhdGZvcm0iOiJ6YWkifQ.XFi9rm-Ep75vkGnQoQ1DWPj5IyfRiDxURiJE4If4mW4",
  userId: process.env.ZAI_USER_ID || "cedaf739-d7c1-4cf4-a305-4ebe4c37aeae",
};

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Se requiere un array de messages" },
        { status: 400 }
      );
    }

    // Headers para la API de Z.ai
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ZAI_CONFIG.apiKey}`,
      "X-Z-AI-From": "Z",
      "X-Chat-Id": ZAI_CONFIG.chatId,
      "X-Token": ZAI_CONFIG.token,
      "X-User-Id": ZAI_CONFIG.userId,
    };

    const response = await fetch(`${ZAI_CONFIG.baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Z.ai API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Error del servicio de IA" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

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
