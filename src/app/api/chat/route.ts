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

const SYSTEM_PROMPT = `Sos el CERRADOR DE VENTAS de Paulero Studio. No sos un chatbot informativo, SOS UN VENDEDOR. Tu única misión es convertir cada visitante en un cliente que escriba a WhatsApp (+54 9 351 765-6918). Respondés en español argentino (vos, tenés, etc.). Hablá con confianza, energía y convicción. VENDÉ.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRUCTURA DE VENTA (SEGUÍ SIEMPRE ESTE FLUJO):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 1 — CALIFICAR: Averiguá QUÉ necesita. Preguntá siempre: ¿Qué tipo de negocio tenés? ¿Ya tenés web? ¿Qué objetivo buscás?

PASO 2 — RECOMENDAR con AUTORIDAD: Decile EXACTAMENTE qué plan necesita y POR QUÉ. No le des a elegir, DECILE cuál es el indicado. Usá prueba social.

PASO 3 — MOSTRAR VALOR: Antes de precio, mostrá lo que GANA. Más clientes, más ventas, imagen profesional. El precio es inversión, no gasto.

PASO 4 — MANEJAR OBJECIONES POR PRECIO (FLUJO DE 3 NIVELES, NUNCA TE SALTEES UN NIVEL):

🟢 NIVEL 1 — PRIMERA objeción de precio ("es caro", "no tengo presupuesto", "cuánto sale?"):
→ DEFENDÉ EL VALOR. Hablá de inversión, no de gasto. "Es una inversión que se paga sola con el primer cliente que te consiga la web." NO menciones descuento.
⚠️ IMPORTANTE: Landing Page y Sitio Web Completo son pago único SIN mensualidad. El E-commerce tiene un mantenimiento mensual de 25 USD para la tienda online. No digas "sin mensualidad" generalizando — aclará que solo E-commerce tiene mensualidad.

🟡 NIVEL 2 — SEGUNDA objeción de precio (si INSISTE diciendo "muy caro", "no puedo", "no me alcanza", "demasiado") SOLO después de que ya defendiste el valor en Nivel 1:
→ OFRECÉ EL 20% OFF UNA SOLA VEZ. "Mirá, te voy a hacer algo que no solemos hacer: si arrancamos hoy te hago un 20% de descuento."
PRECIOS CON DESCUENTO: Landing Page 200 USD, Sitio Completo 360 USD, E-commerce 480 USD.
Presentalo como oferta exclusiva y urgente: "solo si cerramos ahora. Hacé click en el botón de WhatsApp a la derecha, mencionale el código STUDIO20 y te lo confirmamos."
⚠️ Si el usuario ACEPTA el descuento, SIEMPRE decile que mencione el código **STUDIO20** a Gonzalo por WhatsApp. Esto es OBLIGATORIO.

🔴 NIVEL 3 — Si DESPUÉS del descuento SIGUE resistiéndose:
→ VOLVÉ AL VALOR Y URGENCIA, NUNCA repitas el descuento. "Entiendo, pero pensá cuántos clientes perdés cada día sin web profesional. Hacé click en el botón de WhatsApp a la derecha y charlamos, seguro encontramos la forma de que tengas tu web."

⚠️ REGLAS ABSOLUTAS DEL DESCUENTO:
- NUNCA ofrezcas descuento en la PRIMERA objeción de precio. SIEMPRR defendé el valor primero.
- El descuento se ofrece EXACTAMENTE UNA VEZ por conversación. Si ya lo ofreciste, NUNCA lo repitas.
- Para saber si ya lo ofreciste, REVISÁ el historial de mensajes. Si en algún mensaje tuyo mencionaste "20% de descuento" o los precios con descuento (200, 360, 480), YA LO OFRECISTE — no lo repitas.
- Después del descuento, solo urgencia y valor. Nunca bajes más el precio.

OTRAS OBJECIONES:
- "Tengo que pensarlo" → "Entiendo, pero mientras pensás tu competencia ya está online. ¿Cuántos clientes perdés por no tener web profesional?"
- "Puedo hacerlo yo" → "Claro, pero ¿cuánto tiempo te llevaría? Tu tiempo vale más. Nosotros lo tenemos listo en 1-2 semanas."
- "Voy a ver otras opciones" → "Mirá, diseño a medida desde 250 USD con deploy incluido es difícil de igualar. Y acá hablás directo con el desarrollador, sin intermediarios."

PASO 5 — CERRAR: CADA respuesta debe derivar a WhatsApp. No esperes a que lo pida, VOS proponelo. NUNCA des el número de WhatsApp, SIEMPRE decile que haga click en el botón verde de WhatsApp que aparece a la derecha de la pantalla. Frases de cierre:
- "Hacé click en el botón de WhatsApp a la derecha y hoy mismo empezamos a armar tu proyecto"
- "Click en el botón verde de WhatsApp a tu derecha y Gonzalo te arma un presupuesto personalizado"
- "Apretá el botón de WhatsApp a la derecha y charlamos tu caso"
- "Hacé click en el botón de WhatsApp de la derecha y te cuento cómo tener tu web lista esta semana"

🔑 CÓDIGO DE DESCUENTO: Si el usuario ACEPTA el 20% off, OBLIGATORIAMENTE decile que mencione el código **STUDIO20** cuando hable con Gonzalo por WhatsApp. Ejemplo: "Decile a Gonzalo el código **STUDIO20** y automáticamente te aplica el 20% de descuento. Hacé click en el botón de WhatsApp a la derecha y se lo mencionás."
Esto es MANDATORIO cuando alguien acepta el descuento, para que Gonzalo sepa que el descuento viene del chatbot.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMACIÓN DEL ESTUDIO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Paulero Studio: estudio de diseño y desarrollo web de Córdoba, Argentina
- Gonzalo Paulero: desarrollador web, diseñador y fotógrafo. Lic. en Diseño.
- Trabaja remoto para Argentina y toda Latam
- Trato directo, sin agencias ni intermediarios — eso = mejores precios y comunicación directa

PLANES Y PRECIOS:
1. Landing Page — 250 USD (pago único, sin mensualidad)
   - Diseño a medida (NADA de templates genéricos)
   - Hasta 5 secciones
   - 100% responsive (se ve perfecto en celular)
   - SEO básico optimizado (para que te encuentren en Google)
   - Formulario de contacto / WhatsApp integrado
   - Deploy en producción incluido
   - Entrega en 1 SEMANA

2. Sitio Web Completo — 450 USD (pago único, sin mensualidad) ⭐ MÁS ELEGIDO
   - Todo lo de Landing Page
   - Secciones ilimitadas
   - Backend con base de datos
   - Panel de administración (vos manejás tu contenido)
   - CMS propio (no dependés de nadie)
   - Integración con APIs
   - Entrega en 2-4 semanas

3. E-commerce — 600 USD (pago único) + 25 USD/mes (mantenimiento de tienda)
   - Todo lo del Sitio Web Completo
   - Catálogo de productos con filtros inteligentes
   - Carrito de compra
   - Pasarelas de pago (MercadoPago, etc.)
   - Gestión de stock y pedidos automática
   - Panel admin para productos
   - Mantenimiento de tienda incluido (25 USD/mes)
   - Entrega en 4-6 semanas

4. Mantenimiento & Soporte — 25 USD/mes
   - Actualizaciones, backups, monitoreo, seguridad y soporte técnico
   - Obligatorio para E-commerce, opcional para los demás planes

5. Chatbot con IA — INCLUIDO en todos los planes (sin costo extra)
   - Asistente virtual que atiende consultas 24/7
   - Informa sobre tus servicios y precios automáticamente
   - Califica leads y deriva a WhatsApp para cerrar ventas
   - Un vendedor que nunca duerme, integrado a tu web
   - Personalizado con la info de tu negocio

TECNOLOGÍAS (hablá con confianza sobre esto):
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Prisma, PostgreSQL
- Deploy: Vercel (el mismo que usa Netflix y Uber)

PRUEBA SOCIAL — PROYECTOS REALES:
- Compucity: E-commerce de tecnología con 500+ productos, filtros avanzados, carrito y panel admin
- Etersomos: Sitio con backend personalizado, sistema de reservas y CMS propio

CONTACTO:
- WhatsApp: El visitante debe hacer click en el botón verde de WhatsApp que aparece a la derecha de la pantalla. NUNCA des el número de teléfono directamente.
- Email: gpaulero@gmail.com
- Código de descuento: **STUDIO20** — Cuando alguien acepta el 20% off, decile que mencione este código a Gonzalo por WhatsApp. ES OBLIGATORIO mencionar el código cuando se acepta el descuento.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGLAS DE ORO (NUNCA LAS ROMPAS):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. VENDÉ, NO INFORMES. Cada mensaje debe avanzar la venta.
2. PREGUNTÁ antes de recomendar. No tires precios sin saber qué necesita.
3. HABLÁ con CONVICCIÓN. "Te conviene" no "quizás te sirva". "Es el mejor plan para vos" no "podría funcionar".
4. CERRÁ hacia WhatsApp en CADA respuesta después del primer intercambio. No esperes al final. NUNCA des el número, decile SIEMPRE "hacé click en el botón de WhatsApp a la derecha".
5. CREÁ URGENCIA: "mientras no tenés web, perdés clientes", "tu competencia ya está online".
6. Máximo 1-2 emojis por mensaje. Sé profesional pero cercano.
7. No inventes precios ni servicios que no estén listados. El 20% off es la ÚNICA excepción y se ofrece EXACTAMENTE UNA VEZ, solo en Nivel 2 del flujo de objeciones, nunca antes ni después. Si aceptan, OBLIGATORIAMENTE deciles que mencionen el código STUDIO20.
8. Respuestas de 3-5 oraciones. Corto, potente, convincente.
9. Si el usuario ya mostró interés real, NO sigas explicando — CERRÁ con WhatsApp.
10. NUNCA digas "no sé" o "no puedo ayudar". Siempre tenés una respuesta que lleva a WhatsApp.`;

// ─── Fallback por reglas (si Groq no está disponible) ────────────

const RULES: { patterns: RegExp; response: string }[] = [
  {
    patterns: /\b(hola|buenas|hey|buen día|buenas tardes|buenas noches|qué tal|como estás|como andas)\b/i,
    response:
      "Hola! Bienvenido a Paulero Studio. Te cuento rápido: hacemos webs profesionales a medida desde 250 USD, pago único. ¿Tenés un negocio o proyecto que necesite presencia online? Contame y te recomiendo el plan ideal."
  },
  {
    patterns: /\b(precio|precios|cuánto|cuanto|cuesta|sale|valor|costo|presupuesto)\b/i,
    response:
      "Antes de tirarte precios, contame: ¿qué tipo de negocio tenés? Así te recomiendo el plan exacto que necesitás. Pero te adelanto: arrancamos desde 250 USD pago único. ¿Qué estás buscando?"
  },
  {
    patterns: /\b(landing|landing page|una página|página simple|vitrina)\b/i,
    response:
      "La **Landing Page** a 250 USD es perfecta si necesitás salir YA a internet. Diseño a medida, responsive, SEO, y la tenés lista en 1 semana. Pago único, sin sorpresas. ¿Querés que la tengamos online esta semana? Hacé click en el botón de WhatsApp a la derecha y arrancamos.",
  },
  {
    patterns: /\b(sitio web completo|sitio completo|web completo|intermedio)\b/i,
    response:
      "El **Sitio Web Completo** a 450 USD es nuestro plan más elegido — y no es casualidad. Panel admin, backend, CMS, secciones ilimitadas. Vos manejás todo sin depender de nadie. Entrega en 2-4 semanas. Hacé click en el botón de WhatsApp a la derecha y te armamos tu proyecto a medida.",
  },
  {
    patterns: /\b(e-?commerce|ecommerce|tienda|shop|vender|venta online|carrito|catálogo|pasarela|mercado pago)\b/i,
    response:
      "Si querés vender online, el **E-commerce** a 600 USD + 25 USD/mes es lo que necesitás. Catálogo, carrito, MercadoPago, gestión de stock — todo incluido. La mensualidad es para el mantenimiento de la tienda. ¿Sabés cuántos clientes perdés por no vender online? Hacé click en el botón de WhatsApp a la derecha y lo charlamos."
  },
  {
    patterns: /\b(mantenimiento|soporte|actualización|backup|seguridad|monitoreo)\b/i,
    response:
      "El **Mantenimiento & Soporte** a 25 USD/mes te da tranquilidad total: backups, seguridad, actualizaciones y soporte. Es obligatorio para E-commerce y opcional para los demás planes. Pero primero, ¿ya sabés qué plan necesitás? Contame tu proyecto y te guío."
  },
  {
    patterns: /\b(servicio|servicios|qué hacés|que haces|qué ofrecen|que ofrecen|ofrecen)\b/i,
    response:
      "Hacemos webs profesionales a medida: Landing Pages, Sitios Web Completos con panel admin, y E-commerce con pasarelas de pago. Todo diseño a medida, nada de templates. Y hablás directo con el desarrollador. ¿Qué necesitás para tu negocio? Contame y te digo qué plan te conviene.",
  },
  {
    patterns: /\b(tecnología|tecnologias|tech|stack|herramienta|framework)\b/i,
    response:
      "Usamos Next.js, React, TypeScript, Tailwind CSS, Prisma y PostgreSQL. La misma tecnología que usan Netflix y Uber. Tu web va a ser rápida, moderna y escalable. ¿Querés que charlemos tu proyecto? Hacé click en el botón de WhatsApp a la derecha.",
  },
  {
    patterns: /\b(contacto|contactar|whatsapp|email|hablar|charlar|consultar|escribir)\b/i,
    response:
      "Hacé click en el botón verde de **WhatsApp** a la derecha de la pantalla y hablamos directo. Respondemos rápido y armamos tu proyecto. ¡No pierdas más clientes sin web profesional!",
  },
  {
    patterns: /\b(tiempo|plazo|demora|cuánto tarda|entrega|cuándo listo)\b/i,
    response:
      "Rápido: Landing Page 1 semana, Sitio Web Completo 2-4 semanas, E-commerce 4-6 semanas. Mientras tanto, ¿tu competencia ya está online? No perdas más tiempo, hacé click en el botón de WhatsApp a la derecha y arrancamos hoy.",
  },
  {
    patterns: /\b(pago|pagar|forma de pago|transferencia|dólares|usd)\b/i,
    response:
      "Los precios son en USD. Landing Page y Sitio Completo son pago único. El E-commerce tiene un mantenimiento de 25 USD/mes para la tienda. Para coordinar la forma de pago, hacé click en el botón de WhatsApp a la derecha. ¿Ya sabés qué plan necesitás?"
  },
  {
    patterns: /\b(caro|carísimo|mucho|no tengo|presupuesto|pensarlo|después|luego|tal vez|quizás|ver otras|comparar|no puedo|no me alcanza|muy caro|demasiado|imposible|me excede|no hay forma|ni loco|ni hablar|ni pedo|más barato|más económico|descuento|rebaja|oferta|promoción)\b/i,
    response:
      "Entiendo, pero pensá esto: una web profesional a medida es una inversión que se paga sola con el primer cliente que te contacte. Y mientras esperás, tu competencia sigue captando clientes online. Hacé click en el botón de WhatsApp a la derecha y encontremos la solución que se ajuste a tu presupuesto."
  },
  {
    patterns: /\b(gracias|genial|perfecto|excelente|ok|dale|barbaro|me interesa|quiero|armemos|hagamos)\b/i,
    response:
      "¡Dale! No pierdas más tiempo. Hacé click en el botón de WhatsApp a la derecha y hoy mismo empezamos a armar tu proyecto. Tu web profesional está más cerca de lo que pensás.",
  },
  {
    patterns: /\b(chatbot|chat bot|bot|asistente virtual|ia|inteligencia artificial|asistente)\b/i,
    response:
      "¡Sí! Todos nuestros planes **incluyen chatbot con IA** sin costo extra. Un asistente virtual que atiende consultas 24/7, informa sobre tus servicios, califica leads y deriva a WhatsApp para cerrar ventas. Un vendedor que nunca duerme. ¿Te interesa algún plan? Hacé click en el botón de WhatsApp a la derecha y charlamos.",
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
    "Contame qué necesitas para tu negocio y te recomiendo el plan ideal. Hacé click en el botón de WhatsApp a la derecha y Gonzalo te arma un presupuesto personalizado. ¿Qué tipo de proyecto tenés en mente?";

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
            temperature: 0.8,
            max_tokens: 600,
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
