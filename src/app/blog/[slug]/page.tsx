import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import {
  ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  buildWhatsAppLink,
  type Article,
} from "@/content/articles";
import { Button } from "@/components/ui/button";

// ──────────────────────────────────────────────────────────────
// Generate static params para prerenderizar todos los artículos
// ──────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

// ──────────────────────────────────────────────────────────────
// Metadata dinámica para SEO
// ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Artículo no encontrado | Paulero Studio" };
  }
  return {
    title: `${article.title} | Paulero Studio`,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Gonzalo Paulero"],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(slug, 2);
  const waLink = buildWhatsAppLink(article.cta.message);

  // JSON-LD para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: "Gonzalo Paulero",
      url: "https://paulerostudio.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Paulero Studio",
      url: "https://paulerostudio.vercel.app",
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Recursos
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/80">
              {article.category}
            </span>
            <span className="text-muted-foreground inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-muted-foreground inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
          </div>

          <div className="text-6xl mb-6 leading-none">{article.coverEmoji}</div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.intro}
          </p>
        </header>

        {/* Contenido markdown */}
        <div className="prose-content">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold tracking-tight mt-10 mb-4 text-foreground"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-semibold mt-6 mb-3 text-foreground"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-base text-muted-foreground leading-relaxed mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside text-muted-foreground mb-4 space-y-1.5 leading-relaxed"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside text-muted-foreground mb-4 space-y-1.5 leading-relaxed"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="text-base leading-relaxed" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-foreground" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-foreground/90" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-foreground underline underline-offset-4 hover:text-foreground/70"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="px-1.5 py-0.5 rounded bg-foreground/10 text-foreground text-sm font-mono"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-foreground/30 pl-4 italic text-muted-foreground my-6"
                  {...props}
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* CTA al final */}
        <section className="mt-12 rounded-2xl border border-border bg-card/30 p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            {article.cta.title}
          </h2>
          <Button
            size="lg"
            className="rounded-full bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Escribime por WhatsApp
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </section>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs bg-foreground/5 text-muted-foreground border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Artículos relacionados */}
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Seguí leyendo
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group block rounded-2xl border border-border bg-card/30 hover:bg-card/60 hover:border-foreground/30 transition-all duration-300 p-6"
              >
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/80">
                    {rel.category}
                  </span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {rel.readingTime}
                  </span>
                </div>
                <h3 className="font-semibold leading-snug mb-2 group-hover:text-foreground">
                  {rel.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {rel.intro}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
