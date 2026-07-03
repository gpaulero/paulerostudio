// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTENIDO DEL BLOG — Paulero Studio
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Cada artículo es un objeto TS con frontmatter + contenido en markdown.
// Sin MDX, sin build steps extra: react-markdown renderiza el body.
//
// Para agregar un artículo nuevo:
//   1. Sumar un objeto al array ARTICLES abajo (slug único)
//   2. Escribir el contenido en markdown dentro de content: `...`
//   3. Listo — se publica automáticamente en /blog y /blog/[slug]
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type Article = {
  slug: string;
  title: string;
  description: string; // 150-160 chars para meta description
  category: "Comercios" | "Comparativas" | "Guías" | "Casos";
  tags: string[];
  publishedAt: string; // ISO date
  readingTime: string; // ej: "5 min"
  coverEmoji: string; // emoji para card (sin imágenes pesadas)
  intro: string; // H1 + intro para el hero del artículo
  content: string; // markdown body (sin H1)
  cta: {
    title: string;
    message: string; // mensaje pre-armado para WhatsApp
  };
};

const WA_NUMBER = "5493517656918";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppNumber(): string {
  return WA_NUMBER;
}
