import type { Article } from "../articles-config";

const article: Article = {
  slug: "tiendanube-vs-mercadolibre-vs-carrito-propio",
  title:
    "Tiendanube vs MercadoLibre vs carrito propio: ¿dónde te conviene vender online?",
  description:
    "Comparativa honesta de las 3 formas de vender online en 2026. Comisiones, control de marca, tráfico, costos iniciales y cuál elegir según tu tipo de comercio. Sin tomar partido.",
  category: "Comparativas",
  tags: ["tiendanube", "mercadolibre", "ecommerce", "vender online", "carrito propio"],
  publishedAt: "2026-07-19",
  readingTime: "9 min",
  coverEmoji: "🛒",
  intro:
    "Si querés vender online tenés 3 caminos principales: publicar en MercadoLibre, armar tu tienda en Tiendanube, o desarrollar un carrito propio. Cada uno tiene un punto dulce. Te muestro cuál conviene según tu negocio, sin venderte la misma solución para todos.",
  content: `## Las 3 formas de vender online (y por qué ninguna es "la mejor")

Cuando un comercio me pregunta "¿dónde me conviene vender online?", la respuesta honesta es: depende. Depende de tu margen, de tu tipo de producto, de si ya tenés clientes, de si querés construir marca o solo mover volumen. Las 3 opciones que vamos a comparar resuelven problemas distintos.

**MercadoLibre** es un marketplace: subís tu producto, te encuentran miles de personas que ya están buscando comprar, pagás comisión por venta. Es la opción más rápida para arrancar y la más cara para escalar.

**Tiendanube** es una plataforma de e-commerce: armás tu propia tienda con tu dominio, tu marca, tu diseño. Pagás suscripción mensual más comisión por transacción. Es el equilibrio entre autonomía y simplicidad.

**Carrito propio** es un desarrollo a medida: un sitio web construido específicamente para tu negocio, con tu flujo de venta, tu pasarela de pago, tu panel de administración. Inversión inicial alta, costo marginal bajo, control total.

Las 3 son válidas. El error es elegir por inercia o por moda. Vamos a los detalles.

## MercadoLibre: máximo tráfico, mínimo control

MercadoLibre tiene más de 30 millones de compradores activos en Latinoamérica. Si subís un producto bien descripto con foto decente, en horas tenés visitas. Ese es su gran valor: te resuelve el problema del tráfico que ninguna web propia te va a resolver de entrada.

### Cuándo conviene MercadoLibre

- **Estás arrancando y no tenés clientela**: ML te genera la primera venta en días, no en meses.
- **Vendés productos masivos**: electrónica, ropa, hogar, autopartes. Cosas que la gente ya busca en ML.
- **Tu margen soporta la comisión**: ML cobra comisión de venta (12-18% según categoría) más comisión de Mercado Pago. Si tu margen es del 30%, se come la mitad.
- **No querés lidiar con desarrollo**: subís producto, cobrás, despachás. Cero técnica.

### Lo que no te dicen de MercadoLibre

- **El cliente es de ML, no tuyo**: no tenés su email, no le podés hacer remarketing, no sabés quién es más allá del dato mínimo. Si ML cambia las reglas, perdés tu canal.
- **Comisiones que suben**: históricamente las comisiones de ML subieron cada 1-2 años. Lo que hoy deja margen, mañana no.
- **Guerra de precios**: en ML estás compitiendo con 50 vendedores del mismo producto. La única diferenciación es precio y reputación. Si sos más caro, perdés.
- **No construís marca**: nadie recuerda de quién compró en ML. Solo recuerda que compró en ML.

## Tiendanube: tu tienda, sin pelear con código

Tiendanube (o Nuvemshop en Brasil) es la plataforma de e-commerce líder en LatAm. Es el equivalente regional a Shopify: armás tu tienda con plantillas, integrás pasarelas de pago, gestionás pedidos desde un panel. No tocás código (salvo que quieras).

### Cuándo conviene Tiendanube

- **Querés construir marca**: tu dominio, tu logo, tu diseño. El cliente entra a \`tuprogramida.com\`, no a \`mercadolibre.com/tutienda\`.
- **Margen más sano**: pagás suscripción fija (USD 20-50/mes según plan) más comisión de pasarela (3-6%). Mucho más margen que ML.
- **Vendés productos de nicho o premium**: donde la marca, la foto y la descripción importan más que el precio.
- **Querés captar tráfico de Google**: una tienda Tiendanube bien configurada puede posicionarse en Google para búsquedas como "zapatillas de cuero hechas a mano". ML no te da eso.
- **Querés retener clientes**: tenés emails, podés hacer newsletters, programas de fidelidad, cupones.

### Lo que no te dicen de Tiendanube

- **El tráfico no viene solo**: a diferencia de ML, tenés que generar tus propias visitas. Si no hacés SEO, redes o pauta, no vendés. La tienda sola no atrae gente.
- **Personalización con techo**: las plantillas son buenas, pero si querés un flujo custom (suscripción, cotización, configurador de producto), te chocás con los límites de la plataforma.
- **Costo mensual fijo**: aunque no vendas nada, pagás suscripción. Para tiendas chicas que recién arrancan, eso pesa.
- **Apps premium suman**: cada funcionalidad extra (envíos, email marketing, reseñas) suele ser una app de pago. La suscripción base sube rápido.

## Carrito propio: control total, costo inicial alto

Un carrito propio es un desarrollo a medida. Se construye con tecnologías como Next.js + Prisma + PostgreSQL (lo que usamos en Paulero Studio), se integra con la pasarela de pago que quieras (Mercado Pago, Stripe, PayPal, todo), y se ajusta 100% a tu flujo de negocio.

No pagás suscripción mensual. No pagás comisión por venta (solo la comisión de la pasarela, que igual pagás en Tiendanube). Tu costo es el desarrollo inicial y el hosting.

### Cuándo conviene un carrito propio

- **Tu negocio tiene flujos que ninguna plataforma cubre**: cotización online de productos customizados, suscripciones complejas, B2B con precios por cliente, integración con tu ERP, marketplace propio.
- **Vendés volumen y el margen importa mucho**: si hacés 500 ventas/mes, ahorrar 5% de comisión paga el desarrollo en meses.
- **Tu marca es el activo principal**: empresas premium, productos hechos a medida, marcas de autor. Necesitás que la experiencia de compra sea parte del producto.
- **Querés escalar sin pedir permiso**: tu propio CRM, tu propio email marketing, tu propio blog, tu propio panel. Todo integrado.
- **Ya tenés tráfico o audiencia**: si ya llegás a tu cliente por otras vías (redes, YouTube, presencial), el carrito propio solo tiene que convertir, no traer tráfico.

### Lo que no te dicen del carrito propio

- **Inversión inicial real**: no es USD 30/mes. Es un desarrollo que arranca en unos miles de dólares y sube según alcance. Si tu negocio factura poco, no se justifica.
- **Necesitás mantenerlo**: servidores, actualizaciones de seguridad, SSL, backups. Si no tenés equipo técnico, necesitás un proveedor que lo mantenga.
- **El tráfico es tu problema**: igual que Tiendanube, no te resuelve atraer gente. Solo te resuelve vender cuando ya están ahí.
- **Time-to-market más largo**: armás la tienda en Tiendanube en un fin de semana. Un carrito propio toma 4-8 semanas según alcance.

## Tabla comparativa

| Criterio | MercadoLibre | Tiendanube | Carrito propio |
|----------|-------------|------------|---------------|
| **Costo inicial** | USD 0 | USD 0-100 setup | USD 2.000+ desarrollo |
| **Costo recurrente** | Comisión por venta (12-18%) | Suscripción USD 20-50/mes + comisión pasarela (3-6%) | Solo hosting (USD 10-30/mes) + comisión pasarela (3-5%) |
| **Tráfico incluido** | Sí (alto) | No | No |
| **Control de marca** | Bajo | Medio | Total |
| **Personalización** | Mínima | Media | Total |
| **Datos del cliente** | Limitados | Completos | Completos |
| **Time to market** | Horas | Días | Semanas |
| **Escalabilidad** | Limitada por comisiones | Buena | Total |

## Casos reales: cuál elegir

### Caso 1: emprendedor que arranca con poco stock
**Vende**: accesorios de moda comprados a mayoristas, márgenes del 40-50%, sin clientes previos.
**Recomendación**: arrancar en MercadoLibre. Generás ventas rápido, validás qué productos funcionan, no invertís en desarrollo. Cuando tengás volumen y clientela, migrás a Tiendanube o carrito propio.

### Caso 2: marca propia con producto premium
**Vende**: cosmética natural hecha a mano, márgenes altos (60-70%), quiere construir marca.
**Recomendación**: Tiendanube o carrito propio. ML te mata el margen y no te deja construir marca. Tiendanube para arrancar; cuando factures fuerte, migrás a carrito propio para bajar costos y tener control total.

### Caso 3: comercio con flujo custom
**Vende**: muebles a medida, necesita cotización online según medidas y materiales elegidos.
**Recomendación**: carrito propio. Ninguna plataforma te resuelve un configurador de producto. La inversión se paga con 10-15 ventas que ML te habría comido en comisiones.

### Caso 4: PYME con catálogo grande
**Vende**: repuestos automotrices, 2.000+ referencias, ventas mensuales 300-500.
**Recomendación**: carrito propio + mantener presencia en ML como canal complementario. El carrito propio para clientes recurrentes (margen sano), ML para nuevos clientes (tráfico). Estrategia multi-canal.

### Caso 5: tienda de barrio que quiere vender online
**Vende**: productos de almacén, delivery local, márgenes chicos (15-20%).
**Recomendación**: ni ML (te come el margen) ni carrito propio (overkill). Tiendanube con catálogo acotado o, mejor todavía, una web simple con WhatsApp para pedidos. Margen sano, costo bajo.

## La trampa de "hacerlo todo"

Algunos comercios intentan estar en ML + Tiendanube + Instagram + Facebook + web propia todo al mismo tiempo. Si tenés equipo para mantener todo, bien. Si no, terminás con 5 canales mal atendidos en lugar de 1 bien hecho.

Mi recomendación: elegí 1 canal principal y 1 secundario. Hacé el principal excelente, el secundario complementario. Cuando el principal pide más, recién ahí sumá otro.

## ¿Cómo decidir en 5 minutos?

Hacete estas 3 preguntas:

1. **¿Cuánto margen tengo por venta?** Si es menor al 25%, ML te lo come. Andá a Tiendanube o carrito propio.
2. **¿Vendés productos estándar o customizados?** Estándar → ML o Tiendanube. Customizado → carrito propio.
3. **¿Ya tenés clientes o necesitás que te encuentren?** Sin clientes → ML. Con clientes → Tiendanube o carrito propio.

Si después de esto seguís sin saber, escribinos por WhatsApp y lo charlamos. Sin compromiso, sin venderte la solución más cara: te decimos qué te conviene según tu caso real.

## Si ya decidiste y querés que armemos tu tienda

Si llegaste hasta acá y ya sabés cuál es tu camino, te puedo ayudar con:

- **Tiendanube**: configuración completa de tu tienda, plantilla personalizada, integración con pasarelas, carga inicial de productos, SEO técnico.
- **Carrito propio**: desarrollo a medida con Next.js, panel de administración, integración con Mercado Pago/Stripe, sistema de envíos, blog integrado, SEO local.
- **MercadoLibre**: no desarrollamos en ML (es marketplace cerrado), pero sí te ayudamos a definir estrategia y a integrar tu web con ML como canal complementario.

Cada caso es distinto. Charlemos.`,
  cta: {
    title: "¿Querés vender online y no sabés cuál elegir?",
    message:
      "Hola Gonzalo, vi tu artículo Tiendanube vs MercadoLibre vs carrito propio y quiero una recomendación para mi caso. Te cuento:",
  },
};

export default article;
