import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import {
  getAllArticles,
  getAllCategories,
  getArticlesByCategory,
  type Article,
} from "@/content/articles";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Recursos | Paulero Studio",
  description:
    "Guías, comparativas y casos prácticos para comercios que quieren mejorar su presencia online en Córdoba y Valle de Punilla.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Recursos | Paulero Studio",
    description:
      "Guías, comparativas y casos prácticos para comercios que quieren mejorar su presencia online.",
    type: "website",
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block rounded-2xl border border-border bg-card/30 hover:bg-card/60 hover:border-foreground/30 transition-all duration-300 p-6 h-full"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl shrink-0 leading-none mt-1">
          {article.coverEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/80">
              {article.category}
            </span>
            <span className="text-muted-foreground inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
          </div>
          <h2 className="text-lg font-semibold leading-snug group-hover:text-foreground transition-colors mb-2">
            {article.title}
          </h2>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
        {article.intro}
      </p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(article.publishedAt)}</span>
        <span className="inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
          Leer
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const categoria = searchParams.categoria as Article["category"] | undefined;
  const categorias = getAllCategories();

  const articulos = categoria
    ? getArticlesByCategory(categoria)
    : getAllArticles();

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/#hero"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Recursos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Guías, comparativas y casos prácticos para comercios que quieren
            mejorar su presencia online en Córdoba y Valle de Punilla. Sin
            tecnicismos, sin humo.
          </p>
        </header>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              !categoria
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            Todos
          </Link>
          {categorias.map((cat) => (
            <Link
              key={cat}
              href={`/blog?categoria=${encodeURIComponent(cat)}`}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                categoria === cat
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Lista de artículos */}
        <div className="grid gap-5 sm:grid-cols-2">
          {articulos.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {articulos.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No hay artículos en esta categoría todavía.
          </div>
        )}

        {/* CTA al final */}
        <section className="mt-20 rounded-3xl border border-border bg-card/30 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
            ¿Querés una web para tu comercio?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            Charlemos por WhatsApp sin compromiso. Te cuento qué se puede hacer
            con tu caso particular y cuánto invertirías.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-green-600 hover:bg-green-700 text-white"
            asChild
          >
            <a
              href="https://wa.me/5493517656918?text=Hola%20Gonzalo%2C%20vi%20tu%20blog%20y%20quiero%20consultar%20por%20un%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </section>
      </div>
    </main>
  );
}
