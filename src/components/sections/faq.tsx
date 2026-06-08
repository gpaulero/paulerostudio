"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: FAQ (Preguntas Frecuentes)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Sección de preguntas frecuentes que responde las dudas más
// comunes ANTES de que el cliente te escriba. Esto genera
// confianza y reduce fricción en la conversión.
//
// Usa un accordion simple con useState para abrir/cerrar.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "./animated-section";

function FAQ() {
  // Estado: índice de la pregunta abierta (null = ninguna)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cuánto tarda un proyecto?",
      answer: "Depende de la complejidad. Una landing page puede estar lista en 1 semana, un sitio completo en 2-4 semanas, y un e-commerce en 4-6 semanas. En la primera charla te doy un estimado preciso según tu caso.",
    },
    {
      question: "¿Trabajás con clientes de todo el país?",
      answer: "Sí, trabajo de forma remota con clientes de toda Argentina y Latinoamérica. Las reuniones son por videollamada y el seguimiento es constante, así que la distancia no es un problema.",
    },
    {
      question: "¿Qué pasa después de que se lanza el sitio?",
      answer: "Ofrezco planes de mantenimiento mensual que incluyen actualizaciones, backups, monitoreo de seguridad y soporte técnico. También podés contactarme por cualquier consulta puntual, siempre estoy disponible.",
    },
    {
      question: "¿Usás templates o WordPress?",
      answer: "No. Todos mis proyectos se construyen desde cero con Next.js y React. Esto significa que tu sitio va a ser único, más rápido y más seguro que uno hecho con templates o WordPress genérico.",
    },
    {
      question: "¿Cómo es el proceso de pago?",
      answer: "Generalmente trabajo con un 50% al inicio y 50% al entregar. Para proyectos grandes, podemos armar un calendario de pagos por etapas. Acepto transferencia bancaria y MercadoPago.",
    },
    {
      question: "¿Podéo actualizar el contenido yo mismo?",
      answer: "Sí. Los sitios que desarrollo incluyen un panel de administración donde podés modificar textos, imágenes, productos y más sin necesidad de saber programar. Si necesitás algo más complejo, yo me encargo.",
    },
  ];

  return (
    <AnimatedSection
      id="faq"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            05 / FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Preguntas
            <br />
            <span className="text-muted-foreground">frecuentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div
                className="border border-border/50 rounded-lg overflow-hidden transition-colors hover:border-foreground/20"
              >
                {/* Pregunta — clickable para abrir/cerrar */}
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-medium text-sm sm:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Respuesta — se muestra/oculta con animación */}
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default FAQ;
