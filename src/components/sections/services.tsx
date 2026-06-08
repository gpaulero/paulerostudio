"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Services (Servicios)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra 4 servicios en cards con ícono, descripción y tags.
// Grid de 2 columnas en desktop, 1 en mobile.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { Code2, ShoppingCart, Server, Settings, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

function Services() {
  // Array de servicios con todos sus datos
  const services = [
    {
      icon: Code2,
      title: "Desarrollo Web",
      description:
        "Sitios web a medida con las tecnologías más modernas. Desde landing pages hasta plataformas complejas, cada proyecto se construye con código limpio, rápido y escalable. Interfaces intuitivas que reflejan la identidad de tu marca.",
      features: ["Next.js / React", "Responsive Design", "SEO Optimizado", "Accesibilidad"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description:
        "Tiendas online completas que no solo se ven bien, sino que venden. Catálogos dinámicos, carritos de compra, pasarelas de pago y gestión de inventario. Todo lo que necesitás para vender online de forma profesional.",
      features: ["Catálogo de productos", "Pasarelas de pago", "Gestión de stock", "Panel administrativo"],
    },
    {
      icon: Server,
      title: "Backend & APIs",
      description:
        "La columna vertebral de tu proyecto. Desarrollo backends robustos con bases de datos bien estructuradas, APIs seguras y arquitectura escalable. Para que tu sitio no solo funcione hoy, sino que crezca con tu negocio.",
      features: ["Bases de datos", "APIs REST", "Autenticación", "Arquitectura escalable"],
    },
    {
      icon: Settings,
      title: "Mantenimiento & Soporte",
      description:
        "Tu sitio web necesita cuidado constante. Ofrezco planes de mantenimiento mensual que incluyen actualizaciones, monitoreo de rendimiento, backups, seguridad y soporte técnico. Obligatorio para E-commerce, opcional para los demás planes.",
      features: ["Actualizaciones", "Backups automáticos", "Monitoreo 24/7", "Soporte prioritario", "25 USD/mes"],
    },
    {
      icon: Bot,
      title: "Chatbot con IA",
      description:
        "Agregá un asistente virtual a tu web que atiende consultas 24/7, responde sobre tus servicios, califica leads y deriva a WhatsApp para cerrar ventas. Un vendedor que nunca duerme, integrado a tu sitio.",
      features: ["IA conversacional", "Derivación a WhatsApp", "Calificación de leads", "Respuestas 24/7"],
    },
  ];

  return (
    <AnimatedSection
      id="services"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            02 / Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Lo que hago
            <br />
            <span className="text-muted-foreground">por tu negocio</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            No solo creo sitios web. Construyo herramientas digitales que ayudan a
            tu negocio a crecer, con un enfoque en diseño, rendimiento y
            funcionalidad real.
          </p>
        </div>

        {/* Grid de 2 columnas para las cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300 h-full group">
                <CardContent className="p-8">
                  {/* Ícono + número del servicio */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-lg bg-foreground/5">
                      <service.icon className="w-6 h-6" />
                    </div>
                    {/* Número con ceros a la izquierda (01, 02, etc.) */}
                    <span className="text-sm font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  {/* Tags/badges de features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs rounded-full border border-border bg-background/50 text-muted-foreground"
                      >
                        {feature}
                      </span>
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

export default Services;
