"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Projects (Proyectos)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra tus proyectos reales con imagen, descripción, stack
// tecnológico y métricas de resultado. Cada proyecto incluye
// la tecnología usada y el impacto que tuvo en el negocio.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

function Projects() {
  // Datos de proyectos - acá agregás más cuando tengas nuevos clientes
  // INCLUYE: tech (stack tecnológico) y metrics (resultados concretos)
  const projects = [
    {
      title: "Compucity",
      subtitle: "E-commerce de tecnología",
      description:
        "Tienda online completa para una empresa de computación. Catálogo dinámico con filtros avanzados, carrito de compra, pasarelas de pago integradas y un panel de administración robusto para gestionar productos, stock y pedidos. Diseñado para escalar.",
      image: "/project-compucity-real.png",
      url: "https://my-project-eight-liard-96.vercel.app/",
      tags: ["E-commerce", "Backend Complejo", "Panel Admin", "Pagos Online"],
      tech: ["Next.js", "React", "Prisma", "PostgreSQL", "Tailwind CSS"],
      metrics: [
        { label: "Productos gestionados", value: "500+" },
        { label: "Categorías con filtros", value: "15+" },
        { label: "Carga inicial", value: "< 2s" },
      ],
      status: "Fase final",
    },
    {
      title: "Etersomos",
      subtitle: "Registros Akáshicos & Bienestar",
      description:
        "Sitio web para un emprendimiento de registros akáshicos, con un backend potente que permite gestionar reservas de sesiones, contenido dinámico y comunicación con clientes. Una experiencia digital que refleja la esencia del servicio espiritual.",
      image: "/project-etersomos-real.png",
      url: "https://etersomos-iota.vercel.app/",
      tags: ["Sitio Web", "Backend Personalizado", "Reservas", "Contenido Dinámico"],
      tech: ["Next.js", "React", "Prisma", "PostgreSQL", "Tailwind CSS"],
      metrics: [
        { label: "Sistema de reservas", value: "Online" },
        { label: "Contenido dinámico", value: "CMS propio" },
        { label: "Carga inicial", value: "< 1.5s" },
      ],
      status: "Entregado",
    },
  ];

  return (
    <AnimatedSection
      id="projects"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            03 / Proyectos
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Trabajo
            <br />
            <span className="text-muted-foreground">real</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Cada proyecto es una solución a medida. No uso templates ni
            atajos — construyo desde cero para que tu negocio tenga algo
            único y funcional.
          </p>
        </div>

        {/* Lista de proyectos con espacio entre cada uno */}
        <div className="mt-16 space-y-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Card className="bg-card/30 border-border/50 overflow-hidden group">
                {/* Grid: imagen a la izquierda, texto a la derecha en desktop */}
                <div className="grid lg:grid-cols-2">
                  {/* Imagen del proyecto con zoom al hover */}
                  {/* aspect-[16/10] siempre — evita que la imagen se "zoomée" en desktop */}
                  <div className="relative overflow-hidden bg-muted/20 aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badge de estado (Fase final / Entregado) */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-foreground/90 text-background font-medium">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Contenido textual del proyecto */}
                  <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="text-sm font-mono text-muted-foreground mb-2">
                      {project.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Métricas de resultado — CUÁNTO IMPACTÓ el proyecto */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-foreground/5 border border-border/50">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-lg font-bold text-foreground">{metric.value}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Stack tecnológico del proyecto */}
                    <div className="mb-6">
                      <p className="text-xs font-mono text-muted-foreground mb-2">Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs rounded-md bg-foreground/10 text-foreground/80 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tags tradicionales del proyecto */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full border border-border bg-background/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="rounded-full group/btn" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          Ver sitio
                          <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Projects;
