// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ÍNDICE DE ARTÍCULOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Para agregar un artículo nuevo:
//   1. Crear archivo en src/content/articles/<slug>.ts export default Article
//   2. Importar acá abajo y agregar al array ARTICLES
//   3. Listo.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { Article } from "./articles-config";
import {
  buildWhatsAppLink as _buildWhatsAppLink,
  getWhatsAppNumber as _getWhatsAppNumber,
} from "./articles-config";

export type { Article } from "./articles-config";
export const buildWhatsAppLink = _buildWhatsAppLink;
export const getWhatsAppNumber = _getWhatsAppNumber;

import article1 from "./articles/web-para-restaurant-villa-carlos-paz";
import article2 from "./articles/whatsapp-business-vs-web-propia";
import article3 from "./articles/migrar-de-wix-canva-a-web-profesional";
import article4 from "./articles/precio-pagina-web-comercio-cordoba";
import article5 from "./articles/wix-no-aparece-en-google";
import article6 from "./articles/web-para-abogados-estudio-juridico";

export const ARTICLES: Article[] = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
];

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return [...ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(
  category: Article["category"]
): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, max = 2): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category
  );
  const others = ARTICLES.filter(
    (a) => a.slug !== slug && a.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, max);
}

export function getAllCategories(): Article["category"][] {
  const cats = new Set<Article["category"]>();
  ARTICLES.forEach((a) => cats.add(a.category));
  return Array.from(cats);
}
