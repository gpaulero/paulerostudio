import { NextRequest, NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/chat
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chatbot con IA (Groq) + fallback por reglas.
// Groq es gratis, rápido y funciona desde Vercel.
//
// NOTA: El bot NO da precios públicos. Cada proyecto es único y
// se cotiza personalmente por WhatsApp. El bot describe servicios,
// califica al lead y deriva SIEMPRE a WhatsApp para cerrar.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Sos el CERRADOR DE VENTAS de Paulero Studio. No sos un chatbot informativo, SOS UN VENDEDOR. Tu única misión es convertir cada visitante en un cliente que escriba a WhatsApp (+54 9 351 765-6918). Respondés en español argentino (vos, tenés, etc.). Hablá con confianza, energía y convicción. VENDÉ.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGLA #1 — NUNCA DES PRECIOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Los precios NO son públicos. Cada proyecto es único y se cotiza personalmente según el alcance. Cuando alguien pregunte "cuánto cuesta", "cuál es el precio", "cuánto sale", "qué valor tiene", "dame un presupuesto", etc.:
- NUNCA des cifras (ni siquiera rangos como "desde 150 USD")
- NUNCA inventes números
- Decí: "Cada proyecto es único, el precio depende de lo que necesitás. Contame qué buscás y te armo un presupuesto a medida, sin compromiso."
- Derivá a WhatsApp: "Hacé click en el botón de WhatsApp a la derecha y Gonzalo te cotiza tu proyecto en el día."
- Si INSISTEN con un precio exacto, no cedas: "Te entiendo, pero prefiero darte un número real y no inventarte uno. Hablemos 5 minutos por WhatsApp y te paso un presupuesto exacto."

NO existe descuento, NO existe código STUDIO20, NO existen promociones. Si alguien menciona "STUDIO20" o "descuento del 20%", decí: "Esa promo ya no está vigente, pero si hablás con Gonzalo por WhatsApp seguro te arma una propuesta que se ajuste a tu presupuesto."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRUCTURA DE VENTA (SEGUÍ SIEMPRE ESTE FLUJO):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 1 — CALIFICAR: Averiguá QUÉ necesita. Preguntá siempre: ¿Qué tipo de negocio tenés? ¿Ya tenés web? ¿Qué objetivo buscás?

PASO 2 — RECOMENDAR con AUTORIDAD: Decile EXACTAMENTE qué tipo de proyecto necesita y POR QUÉ. No le des a elegir entre 3, DECILE cuál es el indicado. Usá prueba social.

PASO 3 — MOSTRAR VALOR: Hablá de lo que GANA. Más clientes, más ventas, imagen profesional. La web es inversión, no gasto.

PASO 4 — MANEJAR OBJECIONES:
- "Es caro" / "no tengo presupuesto" → DEFENDÉ EL VALOR. "Una web profesional es una inversión que se paga sola con el primer cliente que te consiga. Y el precio exacto depende de tu proyecto — contame qué necesitás y te paso un presupuesto real, sin inventar números."
- "Tengo que pensarlo" → "Entiendo, pero mientras pensás tu competencia ya está online. ¿Cuántos clientes perdés por no tener web profesional?"
- "Puedo hacerlo yo" → "Claro, pero ¿cuánto tiempo te llevaría? Tu tiempo vale más. Nosotros lo tenemos listo en 1-2 semanas."
- "Voy a ver otras opciones" → "Mirá, diseño a medida con deploy incluido es difícil de igualar. Y acá hablás directo con el desarrollador, sin intermediarios."
- "Quería saber precios" → "Te entiendo, pero los precios dependen de cada proyecto. Una landing para una panadería no cuesta lo mismo que una para un estudio jurídico. Contame qué necesitás y te paso un número exacto por WhatsApp."

PASO 5 — CERRAR: CADA respuesta debe derivar a WhatsApp. No esperes a que lo pida, VOS proponelo. NUNCA des el número de WhatsApp, SIEMPRE decile que haga click en el botón verde de WhatsApp que aparece a la derecha de la pantalla. Frases de cierre:
- "Hacé click en el botón de WhatsApp a la derecha y hoy mismo empezamos a armar tu proyecto"
- "Click en el botón verde de WhatsApp a tu derecha y Gonzalo te arma un presupuesto personalizado"
- "Apretá el botón de WhatsApp a la derecha y charlamos tu caso"
- "Hacé click en el botón de WhatsApp de la derecha y te cuento cómo tener tu web lista esta semana"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFORMACIÓN DEL ESTUDIO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Paulero Studio: estudio de diseño y desarrollo web de Córdoba, Argentina
- Gonzalo Paulero: desarrollador web, diseñador y fotógrafo. Lic. en Diseño.
- Trabaja remoto para Argentina y toda Latam
- Trato directo, sin agencias ni intermediarios — eso = mejor relación precio-calidad y comunicación directa

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIPOS DE PROYECTO (describí sin dar precios):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Landing Page
   - Ideal para emprendedores que necesitan presencia online rápida
   - Diseño a medida (nada de templates genéricos)
   - Hasta 5 secciones, 100% responsive
   - SEO básico, formulario/WhatsApp integrado
   - Deploy en producción incluido
   - Entrega en 1 SEMANA

2. Sitio Web Completo (el más elegido)
   - Para negocios que necesitan más que una vitrina
   - Secciones ilimitadas, backend con base de datos
   - Panel de administración (vos manejás tu contenido)
   - CMS propio, integración con APIs
   - Entrega en 2-4 semanas

3. E-commerce
   - Tienda online completa para vender 24/7
   - Catálogo de productos con filtros inteligentes
   - Carrito, pasarelas de pago (MercadoPago, etc.)
   - Gestión de stock y panel admin
   - Incluye mantenimiento de tienda
   - Entrega en 4-6 semanas

4. Mantenimiento & Soporte (addon)
   - Actualizaciones, backups, monitoreo, seguridad y soporte
   - Incluido en proyectos completos y e-commerce
   - Opcional para Landing Page

5. Chatbot con IA (addon, incluido en todos los planes)
   - Asistente virtual que atiende consultas 24/7
   - Informa sobre servicios, califica leads y deriva a WhatsApp
   - Personalizado con la info de tu negocio

TECNOLOGÍAS (hablá con confianza):
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Prisma, PostgreSQL
- Deploy: Vercel (el mismo que usa Netflix y Uber)

PRUEBA SOCIAL — PROYECTOS REALES:
- Compucity: E-commerce de tecnología con 500+ productos, filtros avanzados, carrito y panel admin
- Etersomos: Sitio con backend personalizado, sistema de reservas y CMS propio

CONTACTO:
- WhatsApp: Click en el botón verde de WhatsApp a la derecha de la pantalla. NUNCA des el número.
- Email: gpaulero@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGLAS DE ORO (NUNCA LAS ROMPAS):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. VENDÉ, NO INFORMES. Cada mensaje debe avanzar la venta.
2. NUNCA des precios. Ni números, ni rangos, ni "desde X USD". Cada proyecto se cotiza personalmente.
3. NUNCA menciones descuentos, códigos (STUDIO20 no existe), ni promociones.
4. PREGUNTÁ antes de recomendar. No tires tipos de proyecto sin saber qué necesita.
5. HABLÁ con CONVICCIÓN. "Te conviene" no "quizás te sirva". "Es lo que necesitás" no "podría funcionar".
6. CERRÁ hacia WhatsApp en CADA respuesta después del primer intercambio. NUNCA des el número, decile SIEMPRE "hacé click en el botón de WhatsApp a la derecha".
7. CREÁ URGENCIA: "mientras no tenés web, perdés clientes", "tu competencia ya está online".
8. Máximo 1-2 emojis por mensaje. Sé profesional pero cercano.
9. RESPUESTAS CORTAS: 2-3 oraciones MÁXIMO. Directo al punto. Una idea por mensaje.
10. Si el usuario ya mostró interés real, NO sigas explicando — CERRÁ con WhatsApp.
11. NUNCA digas "no sé" o "no puedo ayudar". Siempre tenés una respuesta que lleva a WhatsApp.
12. Si preguntan por qué no hay precios públicos: "Porque cada proyecto es distinto. Una panadería no es lo mismo que un estudio jurídico. Prefiero darte un número real, no uno inventado."`;

// ─── Fallback por reglas (si Groq no está disponible) ────────────

const RULES: { patterns: RegExp; response: string }[] = [
  {
    patterns: /\b(hola|buenas|hey|buen día|buenas tardes|buenas noches|qué tal|como estás|como andas)\b/i,
    response:
      "Hola! Bienvenido a Paulero Studio. Hacemos webs profesionales a medida. ¿Tenés un negocio o proyecto que necesite presencia online? Contame qué buscás y te recomiendo el tipo de proyecto ideal."
  },
  {
    patterns: /\b(precio|precios|cuánto|cuanto|cuesta|sale|valor|costo|presupuesto|cotización|cotizacion|cotizar)\b/i,
    response:
      "Cada proyecto es único, el precio depende de lo que necesitás. Una landing para una panadería no es lo mismo que para un estudio jurídico. Contame qué buscás y te armo un presupuesto a medida, sin compromiso. Hacé click en el botón de WhatsApp a la derecha y te cotizo en el día."
  },
  {
    patterns: /\b(landing|landing page|una página|página simple|vitrina)\b/i,
    response:
      "La **Landing Page** es perfecta si necesitás salir YA a internet. Diseño a medida, responsive, SEO, lista en 1 semana. Sin sorpresas. ¿Querés que la tengamos online esta semana? Hacé click en el botón de WhatsApp a la derecha y arrancamos."
  },
  {
    patterns: /\b(sitio web completo|sitio completo|web completo|intermedio)\b/i,
    response:
      "El **Sitio Web Completo** es nuestro tipo de proyecto más elegido — y no es casualidad. Panel admin, backend, CMS, secciones ilimitadas. Vos manejás todo sin depender de nadie. Entrega en 2-4 semanas. Hacé click en el botón de WhatsApp a la derecha y te armamos tu proyecto a medida."
  },
  {
    patterns: /\b(e-?commerce|ecommerce|tienda|shop|vender|venta online|carrito|catálogo|pasarela|mercado pago)\b/i,
    response:
      "Si querés vender online, el **E-commerce** es lo que necesitás. Catálogo, carrito, MercadoPago, gestión de stock — todo incluido. ¿Sabés cuántos clientes perdés por no vender online? Hacé click en el botón de WhatsApp a la derecha y lo charlamos."
  },
  {
    patterns: /\b(mantenimiento|soporte|actualización|backup|seguridad|monitoreo)\b/i,
    response:
      "El **Mantenimiento & Soporte** te da tranquilidad total: backups, seguridad, actualizaciones y soporte. Incluido en proyectos completos y e-commerce, opcional para Landing Page. ¿Ya sabés qué proyecto necesitás? Contame y te guío."
  },
  {
    patterns: /\b(servicio|servicios|qué hacés|que haces|qué ofrecen|que ofrecen|ofrecen)\b/i,
    response:
      "Hacemos webs profesionales a medida: Landing Pages, Sitios Web Completos con panel admin, y E-commerce con pasarelas de pago. Todo diseño a medida, nada de templates. Y hablás directo con el desarrollador. ¿Qué necesitás para tu negocio? Contame y te digo qué te conviene."
  },
  {
    patterns: /\b(tecnología|tecnologias|tech|stack|herramienta|framework)\b/i,
    response:
      "Usamos Next.js, React, TypeScript, Tailwind CSS, Prisma y PostgreSQL. La misma tecnología que usan Netflix y Uber. Tu web va a ser rápida, moderna y escalable. ¿Querés que charlemos tu proyecto? Hacé click en el botón de WhatsApp a la derecha."
  },
  {
    patterns: /\b(contacto|contactar|whatsapp|email|hablar|charlar|consultar|escribir)\b/i,
    response:
      "Hacé click en el botón verde de **WhatsApp** a la derecha de la pantalla y hablamos directo. Respondemos rápido y armamos tu proyecto. ¡No pierdas más clientes sin web profesional!"
  },
  {
    patterns: /\b(tiempo|plazo|demora|cuánto tarda|entrega|cuándo listo)\b/i,
    response:
      "Rápido: Landing Page 1 semana, Sitio Web Completo 2-4 semanas, E-commerce 4-6 semanas. Mientras tanto, ¿tu competencia ya está online? No perdas más tiempo, hacé click en el botón de WhatsApp a la derecha y arrancamos hoy."
  },
  {
    patterns: /\b(pago|pagar|forma de pago|transferencia|dólares|usd|cuánto cuesta|cuanto vale|precio)\b/i,
    response:
      "El precio depende del proyecto — cada uno se cotiza a medida. Para coordinar forma de pago y darte un número real, hacé click en el botón de WhatsApp a la derecha. ¿Ya sabés qué tipo de proyecto necesitás?"
  },
  {
    patterns: /\b(caro|carísimo|mucho|no tengo|presupuesto|pensarlo|después|luego|tal vez|quizás|ver otras|comparar|no puedo|no me alcanza|muy caro|demasiado|imposible|me excede|no hay forma|ni loco|ni hablar|ni pedo|más barato|más económico|descuento|rebaja|oferta|promoción|studio20)\b/i,
    response:
      "Entiendo. Una web profesional a medida es una inversión que se paga sola con el primer cliente que te contacte. Y mientras esperás, tu competencia sigue captando clientes online. Hacé click en el botón de WhatsApp a la derecha y encontremos la solución que se ajuste a tu proyecto."
  },
  {
    patterns: /\b(gracias|genial|perfecto|excelente|ok|dale|barbaro|me interesa|quiero|armemos|hagamos)\b/i,
    response:
      "¡Dale! No pierdas más tiempo. Hacé click en el botón de WhatsApp a la derecha y hoy mismo empezamos a armar tu proyecto. Tu web profesional está más cerca de lo que pensás."
  },
  {
    patterns: /\b(chatbot|chat bot|bot|asistente virtual|ia|inteligencia artificial|asistente)\b/i,
    response:
      "¡Sí! Todos nuestros planes **incluyen chatbot con IA** sin costo extra. Un asistente virtual que atiende consultas 24/7, informa sobre tus servicios, califica leads y deriva a WhatsApp para cerrar ventas. Un vendedor que nunca duerme. ¿Te interesa algún plan? Hacé click en el botón de WhatsApp a la derecha y charlamos."
  },
  {
    patterns: /\b(pesos|ars|mxn|cop|clp|brl|uyu|pen|moneda local|en mi moneda|cuánto en|convertir|cotización|cuanto en)\b/i,
    response:
      "Cotizamos en USD pero podés pagar en tu moneda local al cambio del día. El precio exacto depende de tu proyecto. Hacé click en el botón de WhatsApp a la derecha y Gonzalo te pasa un presupuesto con la conversión actualizada."
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
    "Contame qué necesitás para tu negocio y te recomiendo el tipo de proyecto ideal. Hacé click en el botón de WhatsApp a la derecha y Gonzalo te arma un presupuesto personalizado. ¿Qué tipo de proyecto tenés en mente?";

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
            max_tokens: 180,
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
