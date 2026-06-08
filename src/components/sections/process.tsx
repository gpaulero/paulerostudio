"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Process (Proceso de trabajo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra los 4 pasos de cómo trabajás con clientes.
// Grid de 4 columnas en desktop, 2 en tablet, 1 en mobile.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./animated-section";

function Process() {
  const steps = [
    {
      num: "01",
      title: "Conocernos",
      desc: "Charlamos sobre tu negocio, tus objetivos y lo que necesitás. Sin compromiso, sin jerga técnica — una conversación simple para entender tu visión.",
    },
    {
      num: "02",
      title: "Proponer",
      desc: "Te presento una propuesta clara con alcance, tiempos y presupuesto. Sin sorpresas ni costos ocultos. Sabés exactamente qué vas a recibir antes de empezar.",
    },
    {
      num: "03",
      title: "Construir",
      desc: "Desarrollo tu proyecto con actualizaciones constantes. Vas viendo el progreso en tiempo real y podés dar feedback en cada etapa. Nada de esperar hasta el final.",
    },
    {
      num: "04",
      title: "Lanzar & Acompañar",
      desc: "Tu sitio sale al mundo, pero mi trabajo no termina ahí. Te acompaño con mantenimiento, soporte y mejoras continuas para que tu negocio siga creciendo.",
    },
  ];

  return (
    <AnimatedSection
      id="process"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            04 / Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Cómo
            <br />
            <span className="text-muted-foreground">trabajamos</span>
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Número grande decorativo (casi invisible, es solo estético) */}
              <span className="text-5xl font-bold text-foreground/5">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold mt-2 mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
              {/* Flecha entre pasos (solo visible en desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-4 w-8">
                  <ArrowRight className="w-4 h-4 text-foreground/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Process;
