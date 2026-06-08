"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: TechStack (Stack tecnológico)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra las tecnologías que usás, agrupadas por categoría.
// Los mejores portfolios siempre muestran su stack para que
// el cliente sepa CON QUÉ trabajás. Esto también ayuda con SEO
// porque Google indexa los nombres de tecnologías.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { Server, Settings, Check, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

function TechStack() {
  // Tecnologías agrupadas por categoría
  const categories = [
    {
      name: "Frontend",
      icon: Layers,
      techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      name: "Backend",
      icon: Server,
      techs: ["Node.js", "Prisma", "PostgreSQL", "REST APIs", "Auth"],
    },
    {
      name: "Herramientas",
      icon: Settings,
      techs: ["Vercel", "Git", "Figma", "VSC", "Linux"],
    },
  ];

  return (
    <AnimatedSection className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            Stack / Tecnologías
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Lo que uso
            <br />
            <span className="text-muted-foreground">para construir</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Trabajo con tecnologías modernas y probadas. Cada herramienta
            se elige pensando en rendimiento, escalabilidad y mantenibilidad
            a largo plazo.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-foreground/5">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                  </div>
                  <div className="space-y-3">
                    {cat.techs.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="w-3.5 h-3.5 text-foreground/60 shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default TechStack;
