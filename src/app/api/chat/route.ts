import { NextRequest, NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/chat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chatbot inteligente basado en reglas + Gemini (si está disponible).
// Si Gemini falla (quota, región, etc.), usa respuestas predefinidas
// que cubren las consultas más frecuentes.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyD_RWIJL1G7BmcuRYPS1_AQbWWf--bF1jg";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Sos el asistente virtual de Paulero Studio, el estudio de diseño y desarrollo web de Gonzalo Paulero. Respondés en español argentino (vos, tenés, etc.).

INFORMACIÓN DEL ESTUDIO:
- Paulero Studio es un estudio de desarrollo web freelance de Córdoba, Argentina
- Trabajá de forma remota para clientes de Argentina y Latam
- Especialidades: desarrollo web a medio, e-commerce, backend, mantenimiento

PLANES Y PRECIOS:
1. Landing Page — 250 USD (pago único)
2. Sitio Web Completo — 450 USD (pago único) [MÁS ELEGIDO]
3. E-commerce — 600 USD (pago único)
4. Mantenimiento & Soporte — 50 USD/mes

CONTACTO:
- WhatsApp: +54 9 351 765-6918
- Email: gpaulero@gmail.com

REGLAS:
- Sé amable, directo y profesional
- No inventes precios ni servicios
- Si el usuario quiere contratar, derivá a WhatsApp
- Respondé siempre en español argentino
- No uses emojis en exceso`;

// ─── Respuestas basadas en reglas ────────────────────────────────
// Se usan como fallback cuando Gemini no está disponible

const RULES: { patterns: RegExp; response: string }[] = [
  {
    patterns: /\b(hola|buenas|hey|buen día|buenas tardes|buenas noches|qué tal|como estás|como andas)\b/i,
    response:
      "Hola! Bienvenido a Paulero Studio. Soy el asistente virtual y puedo contarte sobre nuestros servicios y precios. ¿Qué te interesa saber?",
  },
  {
    patterns: /\b(precio|precios|cuánto|cuanto|cuesta|sale|valor|costo|tarifa|tarifas|presupuesto|presupuestos)\b/i,
    response:
      "Tenemos 3 planes principales:\n\n• **Landing Page** — 250 USD (pago único): Diseño a medida, hasta 5 secciones, responsive, SEO básico, 1 semana de entrega.\n\n• **Sitio Web Completo** — 450 USD (pago único) ⭐ Más elegido: Todo lo anterior + backend, panel admin, CMS, secciones ilimitadas, 2-4 semanas.\n\n• **E-commerce** — 600 USD (pago único): Todo lo anterior + catálogo, carrito, pasarelas de pago (MercadoPago), gestión de stock, 4-6 semanas.\n\nAdemás ofrecemos **Mantenimiento & Soporte** por 50 USD/mes.\n\n¿Te interesa algún plan en particular?",
  },
  {
    patterns: /\b(landing|landing page|una página|una pagina|página simple|pagina simple|página sencilla|vitrina)\b/i,
    response:
      "La **Landing Page** cuesta 250 USD (pago único) e incluye:\n\n• Diseño a medida (no usamos templates)\n• Hasta 5 secciones\n• 100% responsive (mobile + desktop)\n• SEO básico optimizado\n• Formulario de contacto / WhatsApp\n• Deploy en producción incluido\n• Entrega en 1 semana\n\nEs ideal para emprendedores que necesitan presencia online rápida y profesional. ¿Querés saber más o te interesa arrancar?",
  },
  {
    patterns: /\b(sitio web completo|sitio completo|web completo|completo|más elegido|mas elegido|intermedio)\b/i,
    response:
      "El **Sitio Web Completo** cuesta 450 USD (pago único) y es nuestro plan más elegido. Incluye todo lo de la Landing Page más:\n\n• Secciones ilimitadas\n• Backend con base de datos\n• Panel de administración\n• Contenido dinámico (CMS)\n• Integración con APIs\n• Entrega en 2-4 semanas\n\nEs perfecto para negocios que necesitan funcionalidades reales, no solo una vitrina. ¿Te interesa?",
  },
  {
    patterns: /\b(e-?commerce|ecommerce|tienda|shop|vender|venta online|carrito|catálogo|catalogo|pasarela|mercado pago|mercadopago)\b/i,
    response:
      "El plan **E-commerce** cuesta 600 USD (pago único) e incluye todo lo del Sitio Web Completo más:\n\n• Catálogo de productos con filtros\n• Carrito de compra\n• Pasarelas de pago (MercadoPago, etc.)\n• Gestión de stock y pedidos\n• Panel admin para productos\n• Entrega en 4-6 semanas\n\nEs una tienda online completa para vender 24/7. ¿Querés que armemos tu tienda?",
  },
  {
    patterns: /\b(mantenimiento|soporte|actualización|actualizacion|backup|seguridad|monitoreo)\b/i,
    response:
      "El plan de **Mantenimiento & Soporte** cuesta 50 USD/mes e incluye:\n\n• Actualizaciones del sitio\n• Backups automáticos\n• Monitoreo de rendimiento\n• Seguridad\n• Soporte técnico\n\nPara que tu sitio siga funcionando perfecto mientras vos te enfocás en tu negocio. Se puede contratar junto con cualquier plan.",
  },
  {
    patterns: /\b(servicio|servicios|qué hacés|que haces|qué ofrecen|que ofrecen|qué hacemos|que hacen|ofrecen)\b/i,
    response:
      "En Paulero Studio ofrecemos:\n\n1. **Desarrollo Web** — Sitios a medida con Next.js, React, TypeScript\n2. **E-commerce** — Tiendas online con carrito, pagos y gestión de stock\n3. **Backend & APIs** — Bases de datos, APIs, autenticación\n4. **Mantenimiento & Soporte** — Actualizaciones, backups, seguridad\n\nTrabajamos de forma remota para clientes de Argentina y Latam. ¿Qué servicio te interesa?",
  },
  {
    patterns: /\b(tecnología|tecnologias|tech|stack|herramienta|herramientas|framework|lenguaje)\b/i,
    response:
      "Trabajamos con tecnologías modernas y probadas:\n\n**Frontend:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion\n**Backend:** Node.js, Prisma, PostgreSQL\n**Herramientas:** Git, Vercel, Figma\n\nCada herramienta se elige pensando en rendimiento, escalabilidad y mantenimiento a largo plazo.",
  },
  {
    patterns: /\b(contacto|contactar|whatsapp|email|correo|hablar|charlar|consultar|escribir|escribime|llamar)\b/i,
    response:
      "Podés contactarnos por:\n\n• **WhatsApp:** +54 9 351 765-6918 (respuesta rápida)\n• **Email:** gpaulero@gmail.com\n\nTambién podés usar el botón de WhatsApp que aparece abajo a la derecha en la página. ¡Charlamos sin compromiso!",
  },
  {
    patterns: /\b(tiempo|plazo|demora|cuánto tarda|cuanto tarda|entrega|cuando|cuándo listo)\b/i,
    response:
      "Los tiempos de entrega dependen del plan:\n\n• **Landing Page:** 1 semana\n• **Sitio Web Completo:** 2-4 semanas\n• **E-commerce:** 4-6 semanas\n\nCada proyecto es único, así que los tiempos pueden ajustarse según la complejidad. ¿Tenés una fecha límite?",
  },
  {
    patterns: /\b(quién|quien|gonzalo|paulero|sobre mí|sobre mi|sos|eres|estudio)\b/i,
    response:
      "Paulero Studio es el estudio de Gonzalo Paulero, un profesional de Córdoba, Argentina, que combina diseño y desarrollo web. Estudia la Licenciatura en Diseño y también es fotógrafo, lo que le da una mirada visual única para cada proyecto. Trabaja de forma remota para clientes de Argentina y toda Latam.",
  },
  {
    patterns: /\b(pago|pagar|forma de pago|método de pago|metodo de pago|transferencia|efectivo|dólares|dolares|usd)\b/i,
    response:
      "Los precios son en USD (dólares). Para coordinar la forma de pago (transferencia bancaria, MercadoPago, etc.), lo mejor es que nos escribas por WhatsApp al +54 9 351 765-6918 y acordamos lo que te quede más cómodo.",
  },
  {
    patterns: /\b(gracias|genial|perfecto|excelente|buenísimo|buenisimo|ok|dale|barbaro|bárbaro|re bueno)\b/i,
    response:
      "Me alegra! Si tenés más consultas, preguntame. Y si querés arrancar con un proyecto, escribinos por WhatsApp al +54 9 351 765-6918. ¡Charlamos!",
  },
  {
    patterns: /\b(trabajo|proyecto|portfolio|portafolio|ejemplo|ejemplos|mostrar|ver)\b/i,
    response:
      "Podés ver nuestros proyectos en la sección 'Proyectos' de esta misma página. Dos ejemplos destacados:\n\n• **Compucity** — E-commerce de tecnología con 500+ productos\n• **Etersomos** — Sitio con backend personalizado y sistema de reservas\n\nPara ver más, scrolleá hasta la sección de proyectos o escribinos por WhatsApp.",
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

const FALLBACK_RESPONSE =
  "No estoy seguro de eso, pero puedo ayudarte con información sobre nuestros servicios, precios y tecnologías. También podés escribirnos por WhatsApp al +54 9 351 765-6918 para una consulta personalizada. ¿Qué te interesa saber?";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Se requiere un array de messages" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    // 1) Intentar respuesta por reglas primero (instantánea, sin API)
    const ruleReply = getRuleBasedResponse(lastMessage);
    if (ruleReply) {
      return NextResponse.json({ reply: ruleReply });
    }

    // 2) Si no hay regla, intentar con Gemini para respuestas más inteligentes
    try {
      const contents = messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return NextResponse.json({ reply });
        }
      }
    } catch {
      // Gemini falló, usar fallback
    }

    // 3) Fallback genérico
    return NextResponse.json({ reply: FALLBACK_RESPONSE });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error en /api/chat:", message);
    return NextResponse.json({ reply: FALLBACK_RESPONSE });
  }
}
