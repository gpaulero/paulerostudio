import { NextRequest, NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/chat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chatbot con IA (Groq) + fallback por reglas.
// Groq es gratis, rápido y funciona desde Vercel.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Sos el asistente virtual de Paulero Studio, el estudio de diseño y desarrollo web de Gonzalo Paulero. Respondés en español argentino (vos, tenés, etc.).

Tu objetivo es ayudar al visitante a entender los servicios y guiarlo hacia una conversación con Gonzalo por WhatsApp para cerrar la venta.

INFORMACIÓN DEL ESTUDIO:
- Paulero Studio es un estudio de desarrollo web freelance de Córdoba, Argentina
- Gonzalo Paulero: desarrollador web, diseñador y fotógrafo. Estudia Lic. en Diseño.
- Trabaja de forma remota para clientes de Argentina y Latam
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
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Prisma, PostgreSQL
- Herramientas: Git, Vercel, Figma

PROYECTOS DESTACADOS:
- Compucity: E-commerce de tecnología con 500+ productos, filtros avanzados, carrito y panel admin
- Etersomos: Sitio con backend personalizado, sistema de reservas y CMS propio

CONTACTO:
- WhatsApp: +54 9 351 765-6918
- Email: gpaulero@gmail.com
- Ubicación: Remoto — Argentina & Latam

REGLAS DE COMPORTAMIENTO:
- Sé amable, directo y profesional. Hablá como un argentino: usá "vos", "tenés", "sabés"
- Si el usuario pregunta por precios, explicá los planes con detalle
- Si el usuario describe su negocio, RECOMENDÁ el plan que mejor le venga y explicá por qué
- Si el usuario pregunta algo que no está en tu info, derivá a WhatsApp: "Para eso te conviene hablar directo con Gonzalo por WhatsApp"
- SIEMPRE que la conversación avance hacia un interés real, sugerí contactar por WhatsApp para cerrar la venta
- No uses emojis en exceso, máximo 1-2 por mensaje
- No inventes precios ni servicios que no estén listados arriba
- Mantené las respuestas concisas (3-5 oraciones máximo), no escribas novelas`;

// ─── Fallback por reglas (si Groq no está disponible) ────────────

const RULES: { patterns: RegExp; response: string }[] = [
  {
    patterns: /\b(hola|buenas|hey|buen día|buenas tardes|buenas noches|qué tal|como estás|como andas)\b/i,
    response:
      "Hola! Bienvenido a Paulero Studio. Puedo contarte sobre nuestros servicios, precios y ayudarte a elegir el plan ideal para tu proyecto. ¿Qué tenés en mente?",
  },
  {
    patterns: /\b(precio|precios|cuánto|cuanto|cuesta|sale|valor|costo|presupuesto)\b/i,
    response:
      "Tenemos 3 planes principales:\n\n• **Landing Page** — 250 USD: ideal para presencia online rápida\n• **Sitio Web Completo** — 450 USD ⭐: el más elegido, con backend y panel admin\n• **E-commerce** — 600 USD: tienda online completa con pasarelas de pago\n\nTambién ofrecemos mantenimiento por 50 USD/mes. ¿Qué tipo de proyecto necesitás?",
  },
  {
    patterns: /\b(landing|landing page|una página|página simple|vitrina)\b/i,
    response:
      "La **Landing Page** cuesta 250 USD e incluye diseño a medida, hasta 5 secciones, responsive, SEO, formulario de contacto y deploy. Se entrega en 1 semana. Es ideal si necesitás presencia online rápido. ¿Te interesa? Podemos charlar por WhatsApp para definir los detalles.",
  },
  {
    patterns: /\b(sitio web completo|sitio completo|web completo|intermedio)\b/i,
    response:
      "El **Sitio Web Completo** cuesta 450 USD y es nuestro plan más elegido. Incluye todo lo de la Landing Page más backend con base de datos, panel de administración, CMS y secciones ilimitadas. Entrega en 2-4 semanas. ¿Querés que hablemos por WhatsApp para ver si es lo que necesitás?",
  },
  {
    patterns: /\b(e-?commerce|ecommerce|tienda|shop|vender|venta online|carrito|catálogo|pasarela|mercado pago)\b/i,
    response:
      "El plan **E-commerce** cuesta 600 USD e incluye todo lo del Sitio Web Completo más catálogo con filtros, carrito de compra, pasarelas de pago (MercadoPago), gestión de stock y panel admin para productos. Entrega en 4-6 semanas. Si tenés un negocio de ventas, este es tu plan. ¿Charlamos por WhatsApp?",
  },
  {
    patterns: /\b(mantenimiento|soporte|actualización|backup|seguridad|monitoreo)\b/i,
    response:
      "El **Mantenimiento & Soporte** cuesta 50 USD/mes e incluye actualizaciones, backups automáticos, monitoreo de rendimiento, seguridad y soporte técnico. Se puede contratar junto con cualquier plan.",
  },
  {
    patterns: /\b(servicio|servicios|qué hacés|que haces|qué ofrecen|que ofrecen|ofrecen)\b/i,
    response:
      "Ofrecemos desarrollo web a medida, e-commerce, backend & APIs, y mantenimiento. Trabajamos con Next.js, React, TypeScript, Prisma y más. ¿Qué necesitás para tu negocio?",
  },
  {
    patterns: /\b(tecnología|tecnologias|tech|stack|herramienta|framework)\b/i,
    response:
      "Usamos Next.js, React, TypeScript, Tailwind CSS para frontend; Node.js, Prisma, PostgreSQL para backend; y Vercel, Git, Figma como herramientas. Todo moderno y escalable.",
  },
  {
    patterns: /\b(contacto|contactar|whatsapp|email|hablar|charlar|consultar|escribir)\b/i,
    response:
      "Podés escribirnos por **WhatsApp** al +54 9 351 765-6918 (respuesta rápida) o por **email** a gpaulero@gmail.com. ¡Charlamos sin compromiso!",
  },
  {
    patterns: /\b(tiempo|plazo|demora|cuánto tarda|entrega|cuándo listo)\b/i,
    response:
      "Los tiempos de entrega son: Landing Page 1 semana, Sitio Web Completo 2-4 semanas, E-commerce 4-6 semanas. ¿Tenés urgencia?",
  },
  {
    patterns: /\b(pago|pagar|forma de pago|transferencia|dólares|usd)\b/i,
    response:
      "Los precios son en USD. Para coordinar la forma de pago, escribinos por WhatsApp al +54 9 351 765-6918 y acordamos lo que te quede más cómodo.",
  },
  {
    patterns: /\b(gracias|genial|perfecto|excelente|ok|dale|barbaro)\b/i,
    response:
      "Me alegra! Si querés avanzar con un proyecto, escribinos por WhatsApp al +54 9 351 765-6918. ¡Charlamos!",
  },
];

function getRuleBasedResponse(message: string): string | null {
  for (const rule of RULES) {
    if (rule.patterns.test(message)) {
      return rule.response;
    }
  }
  return null;
}

const FALLBACK =
  "No estoy seguro de eso, pero puedo ayudarte con nuestros servicios y precios. También podés escribirnos por WhatsApp al +54 9 351 765-6918 para una consulta personalizada. ¿Qué te interesa saber?";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages requerido" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    // 1) Intentar con Groq IA primero
    if (GROQ_API_KEY !== "PLACEHOLDER") {
      try {
        const response = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: GROQ_MODEL,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages,
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        } else {
          console.error("Groq API error:", response.status);
        }
      } catch (e) {
        console.error("Groq fetch error:", e);
      }
    }

    // 2) Fallback por reglas
    const ruleReply = getRuleBasedResponse(lastMessage);
    if (ruleReply) {
      return NextResponse.json({ reply: ruleReply });
    }

    // 3) Fallback genérico
    return NextResponse.json({ reply: FALLBACK });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error en /api/chat:", message);
    return NextResponse.json({ reply: FALLBACK });
  }
}
