import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://paulerostudio.vercel.app";
  const now = new Date();

  // Página principal (single page app con anchors)
  const home: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Una entrada por cada artículo
  const articles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [...home, ...articles];
}
