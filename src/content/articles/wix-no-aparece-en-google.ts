import type { Article } from "../articles-config";

const article: Article = {
  slug: "wix-no-aparece-en-google",
  title:
    "¿Por qué tu web de Wix no aparece en Google? 7 razones concretas y cómo fixearlas",
  description:
    "Tu web hecha en Wix no aparece en Google y no sabés por qué. Te explico las 7 causas más comunes y qué podés hacer hoy mismo para que Google te empiece a indexar.",
  category: "Guías",
  tags: ["wix", "seo", "google", "indexación", "posicionamiento web"],
  publishedAt: "2026-07-10",
  readingTime: "8 min",
  coverEmoji: "🔍",
  intro:
    "Si tu web está hecha en Wix y buscás tu rubro en Google sin aparecer en ningún lado, no estás solo. Es uno de los problemas más comunes con Wix. Te cuento por qué pasa y qué podés hacer.",
  content: `## El problema más común con Wix: Google no te ve

Wix es una de las plataformas más usadas en Argentina para armar webs rápidas y baratas. Es legítima, funciona, y para arrancar cumple. Pero hay un problema que casi todo el mundo descubre tarde o temprano: **las webs de Wix cuestan mucho más de posicionar en Google que las webs profesionales**.

No es que Google "odio" Wix. Es que Wix tiene una serie de decisiones técnicas que dificultan el SEO si no las conocés y no las fixeás a mano. En este artículo te explico las 7 razones más comunes por las que tu web de Wix no aparece en Google, y qué podés hacer en cada caso.

Si después de leerlo querés ayuda para diagnosticar tu caso concreto, escribinos por WhatsApp sin compromiso.

## Antes de empezar: confirmá que Google te indexó

Antes de buscar problemas, confirmá que tu web esté en el índice de Google. Hay una forma rápida de comprobarlo:

1. Abrí Google
2. Buscá \`site:tudominio.com.ar\` (reemplazando por tu dominio real)
3. Mirá los resultados

Si aparecen páginas de tu web, Google te indexó. Si no aparece nada, Google directamente no te tiene en su índice y eso es el primer problema a solucionar.

Si tu web es nueva (menos de 2 semanas), es normal que Google todavía no te haya indexado. En ese caso, el fix es simple: registrá tu web en **Google Search Console** y pedí indexación manual. En 3-7 días vas a estar indexado.

Si tu web tiene más de un mes y no aparece en \`site:\`, hay un problema técnico más serio. Seguí leyendo.

## Razón 1: Tenés el botón "Hide from search engines" activado

Wix tiene un setting que mucha gente activa sin darse cuenta (o lo activa cuando arma la web en modo draft y se olvida de desactivarlo). Se llama **"Hide from search engines"** y hace exactamente lo que dice: le dice a Google que NO te indexe.

### Cómo fixearlo

1. Entrá al editor de Wix
2. Andá a **Settings** → **SEO (Basic)** 
3. Buscá el toggle **"Hide from search engines"**
4. Asegurate de que esté **DESACTIVADO**
5. Publicá los cambios

Es ridículo pero el 30% de los casos de "mi Wix no aparece en Google" son por esto. Verificalo primero.

## Razón 2: No tenés configurado Google Search Console

Google Search Console es la herramienta oficial de Google que te dice cómo te ve Google. Sin esto estás trabajando a ciegas.

Wix te permite verificar tu web en Google Search Console desde su panel. El proceso es:

1. Andá a **Settings** → **SEO** → **Get Found on Google**
2. Wix te genera un código de verificación
3. Seguí las instrucciones para conectar con Google Search Console
4. Una vez verificado, podés ver:
   - Qué búsquedas te traen visitas
   - Qué páginas están indexadas
   - Errores de indexación
   - Cómo te ve Google en mobile vs desktop

Si nunca configuraste Search Console, estás perdiendo la herramienta más importante para diagnosticar problemas de SEO. Es gratis y la configurás en 15 minutos.

## Razón 3: Tus URLs son un desastre

Las URLs de Wix por defecto son feas y poco amigables para SEO. Por ejemplo:

- \`tucomercio.wixsite.com/misitio/productos/p12345\`  
- \`tucomercio.wixsite.com/misitio/post/abc123\`

Google las indexa, pero las URLs con números y códigos random posicionan peor que las URLs limpias y descriptivas:

- \`tucomercio.com.ar/productos/buzos-lana-cordoba\`
- \`tucomercio.com.ar/blog/web-para-restaurant-cordoba\`

### Cómo fixearlo

En Wix podés cambiar las URLs manualmente desde **Settings** → **SEO (Advanced)** → **Page URL**. Cambialas a algo legible y descriptivo. Si tenés un sitio con muchas páginas, esto lleva tiempo pero vale la pena.

## Razón 4: Tu web carga lento

Wix es pesado. Carga muchos scripts, fuentes, animaciones y elementos que no siempre necesitás. Google mide la velocidad de carga y la usa como factor de ranking.

Si tu web de Wix tarda más de 4 segundos en cargar, estás perdiendo posiciones. Para comprobarlo, pasá tu web por **PageSpeed Insights** (gratis, de Google) y mirá el score de mobile.

### Cómo fixearlo (dentro de lo posible en Wix)

1. **Borrá elementos que no usás**: videos de fondo, animaciones pesadas, slideshows innecesarios
2. **Comprimí las imágenes**: Wix tiene una opción para optimizar imágenes automáticamente
3. **Reducí la cantidad de apps de Wix** instaladas (cada app agrega peso)
4. **Elegí bien las fuentes**: cada fuente custom suma peso de carga

Aunque hagas todo esto, Wix tiene un piso de peso que no podés bajar. Las webs profesionales hechas con frameworks modernos (Next.js, Astro) cargan 3-5x más rápido sin esfuerzo. Esa es una de las razones por las que los comercios serios migran de Wix.

## Razón 5: No tenés meta tags ni structured data configurado

Los meta tags (title y description) son lo primero que Google lee de cada página. Wix te deja editarlos pero **no te obliga**, y la mayoría de la gente deja los defaults autogenerados que son malos.

Por ejemplo, el title autogenerado de Wix para una página de producto suele ser algo así: \`Productos | Mi Sitio\`. Google prefiere algo así: \`Buzos de lana en Córdoba | Tu Marca\`.

La structured data es aún más importante: es código invisible que le dice a Google "esta página es un producto con este precio y estas características", "esta página es una receta", "este es un artículo de blog". Wix permite agregarla pero casi nadie lo hace.

### Cómo fixearlo

1. Andá a cada página de tu web en el editor de Wix
2. **Settings** → **SEO (Advanced)** → **Page Title** y **Page Description**
3. Escribí títulos y descripciones únicos para cada página, incluyendo tu keyword principal
4. Para structured data, requerís un plugin de Wix o un custom code (más complejo)

## Razón 6: Tu web no tiene dominio propio

Si tu web es \`tucomercio.wixsite.com\`, Google la trata como una web secundaria de la plataforma Wix. No la posiciona igual que un dominio propio.

El subdominio \`wixsite.com\` está asociado con miles de webs amateur y Google le da menos autoridad. No es imposible posicionarlo, pero es más difícil.

### Cómo fixearlo

Comprá un dominio propio (\`tucomercio.com.ar\` cuesta alrededor de $1500-2000 ARS por año). Wix te permite conectarlo si tenés un plan pago.

Si estás en el plan gratuito de Wix, no podés conectar dominio propio. Esa es una de las razones por las que el plan gratuito termina costándote caro en SEO perdido.

## Razón 7: Tu contenido es delgado o duplicado

Google premia contenido único, original y útil. Si tu web de Wix tiene:

- Textos copiados de otras webs (o de ChatGPT sin edición)
- Páginas con 1-2 líneas de texto
- Descripciones de productos idénticas a las del fabricante
- Páginas vacías tipo "Próximamente"

…Google no tiene razón para indexarte. Sin contenido, no hay nada que mostrar.

### Cómo fixearlo

1. Escribí contenido original para cada página (mínimo 300 palabras por página principal)
2. Usá tus propias fotos, no las del banco de imágenes de Wix
3. Agregá un blog y publicá 1 artículo por mes sobre tu rubro
4. Si tenés productos, escribí descripciones propias (no las del fabricante)

## ¿Cuándo tiene sentido quedarte en Wix vs migrar?

Si tu web de Wix ya está funcionando, te trae clientes y los fixes de arriba resolvieron tus problemas, no hay urgencia de migrar. Wix puede ser suficiente para comercios pequeños que no dependen de Google.

Pero si después de hacer todos los fixes tu web sigue sin posicionar, o si necesitás funcionalidades que Wix no permite (catálogos grandes, sistema de reservas custom, integraciones con WhatsApp pre-armadas, etc.), es momento de migrar a una web profesional.

La migración de Wix a una web propia bien hecha no te hace perder SEO si se hace con redirecciones 301 correctamente configuradas. De hecho, en la mayoría de los casos, **el SEO mejora en las semanas posteriores a la migración** porque la nueva web es más rápida, tiene mejor SEO técnico y mejor contenido.

Escribimos una guía completa sobre cuándo y cómo migrar de Wix/Canva a una web profesional. Si querés leerla, está acá: [Migrar de Wix/Canva a una web profesional](/blog/migrar-de-wix-canva-a-web-profesional).

## El diagnóstico rápido

Si querés saber rápido si tu web de Wix tiene problemas de SEO, hacé estas 3 pruebas hoy:

1. **Test de indexación**: buscá \`site:tudominio.com.ar\` en Google. Si no aparecen resultados, tenés un problema grave.
2. **Test de velocidad**: pasá tu web por PageSpeed Insights. Si el score de mobile es menor a 50, tenés un problema de velocidad serio.
3. **Test del dominio**: si tu web es \`wixsite.com\` y no tu dominio propio, tenés una desventaja estructural.

Estas 3 pruebas te dan un panorama en 5 minutos. Si los 3 dan mal, migrar es la opción más eficiente.

## ¿Querés que diagnostiquemos tu web?

Si tenés una web en Wix y querés que la revise, escribinos por WhatsApp. Sin compromiso, sin costo, te decimos en 24-48hs qué problemas tiene tu web y qué opciones tenés. A veces la solución es rápida (fixear settings de Wix), a veces requiere migración. Te lo decimos honestamente.`,
  cta: {
    title: "¿Tu web de Wix no aparece en Google y querés saber por qué?",
    message:
      "Hola Gonzalo, vi tu artículo sobre Wix y Google y quiero que revises mi web. ¿Me decís qué le pasa?",
  },
};

export default article;
