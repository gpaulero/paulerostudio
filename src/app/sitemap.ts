import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";

const BASE_URL = "https://www.paulerostudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ──────────────────────────────────────────────
  // Páginas principales
  // ──────────────────────────────────────────────
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ──────────────────────────────────────────────
  // Demos navegables (portfolio)
  // ──────────────────────────────────────────────
  const demos: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/demos/parrilla-la-esquina`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/demos/estudio-fernandez-romero`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/demos/cabanas-del-lago`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // ──────────────────────────────────────────────
  // Artículos del blog
  // ──────────────────────────────────────────────
  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...mainPages, ...demos, ...articles];
}
