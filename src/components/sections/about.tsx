"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: About (Sobre mí)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Sección con tu foto, descripción y 4 cards de habilidades.
// Usa grid de 2 columnas en desktop, 1 en mobile.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { Camera, Palette, Code2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

function About() {
  // Datos de las 4 cards de habilidades
  // Cada una tiene un ícono (importado de lucide-react), título y descripción
  const highlights = [
    { icon: Camera, label: "Fotógrafo", desc: "Ojo visual entrenado" },
    { icon: Palette, label: "Diseñador", desc: "Estudiante de Lic. en Diseño" },
    { icon: Code2, label: "Desarrollador", desc: "Backend y frontend robusto" },
    { icon: Zap, label: "Rendimiento", desc: "Sitios rápidos por defecto" },
  ];

  return (
    <AnimatedSection id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid: 2 columnas en desktop (lg), 1 en mobile */}
        {/* order-2 / order-1 invierte el orden visual en desktop: foto izquierda, texto derecha */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda: foto + cards de habilidades */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Tu foto con aspecto 3:4 (retrato) */}
            <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 lg:ml-auto rounded-2xl overflow-hidden border border-border/50">
              <img
                src="/gonzalo-photo.png"
                alt="Gonzalo Paulero"
                className="w-full h-full object-cover"
              />
              {/* Degradado sutil en la parte inferior de la foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
            {/* Grid 2x2 de cards con habilidades */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto lg:mx-0 lg:ml-auto">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-card/50 border-border/50 hover:border-foreground/20 transition-colors h-full">
                    <CardContent className="p-5">
                      {/* Renderiza el ícono dinámicamente */}
                      <item.icon className="w-6 h-6 mb-3 text-foreground/80" />
                      <h3 className="font-medium text-sm">{item.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Columna derecha: texto */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-mono text-muted-foreground mb-3">
              01 / Sobre mí
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Donde el diseño
              <br />
              <span className="text-muted-foreground">se encuentra con el código</span>
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Soy Gonzalo Paulero, un profesional que combina la sensibilidad visual del
                diseño y la fotografía con la precisión del desarrollo web. Mi enfoque es
                simple: cada sitio que creo debe ser tan hermoso como funcional.
              </p>
              <p>
                Con experiencia en e-commerce y proyectos con backends complejos, entiendo
                que un sitio web no es solo una vitrina — es una herramienta que debe
                funcionar para el dueño del negocio. Por eso priorizo la velocidad, la
                usabilidad y que cada funcionalidad tenga un propósito real.
              </p>
              <p>
                Estudio la Licenciatura en Diseño, lo que me permite abordar cada proyecto
                con una mirada profesional sobre tipografía, composición y experiencia de
                usuario. Sumado a mi formación como fotógrafo, puedo ofrecer un nivel de
                detail visual que pocos desarrolladores pueden igualar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default About;
