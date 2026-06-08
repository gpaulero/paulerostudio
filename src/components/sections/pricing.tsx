"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Pricing (Planes y precios)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra rangos de precios para que el cliente sepa si está
// dentro de su presupuesto ANTES de escribirte. Esto filtra
// consultas que no van a llegar a nada y ahorra tiempo a todos.
//
// NOTA: Los precios son orientativos ("desde"). El precio final
// se define según la complejidad de cada proyecto.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

function Pricing() {
  const plans = [
    {
      name: "Landing Page",
      price: "250 USD",
      period: "pago único",
      description: "Ideal para emprendedores que necesitan presencia online rápida y profesional.",
      features: [
        "Diseño a medida (no templates)",
        "Hasta 5 secciones",
        "100% responsive (mobile + desktop)",
        "SEO básico optimizado",
        "Formulario de contacto / WhatsApp",
        "Deploy en producción incluido",
        "1 semana de entrega",
      ],
      highlight: false,
    },
    {
      name: "Sitio Web Completo",
      price: "450 USD",
      period: "pago único",
      description: "Para negocios que necesitan más que una vitrina: funcionalidades reales y backend robusto.",
      features: [
        "Todo lo de Landing Page",
        "Secciones ilimitadas",
        "Backend con base de datos",
        "Panel de administración",
        "Contenido dinámico (CMS)",
        "Integración con APIs",
        "2-4 semanas de entrega",
      ],
      highlight: true,
    },
    {
      name: "E-commerce",
      price: "600 USD",
      period: "pago único + 25 USD/mes",
      description: "Tienda online completa para vender 24/7 con pasarelas de pago y gestión de stock.",
      features: [
        "Todo lo de Sitio Web Completo",
        "Catálogo de productos con filtros",
        "Carrito de compra",
        "Pasarelas de pago (MercadoPago, etc.)",
        "Gestión de stock y pedidos",
        "Panel admin para productos",
        "Mantenimiento de tienda incluido (25 USD/mes)",
        "4-6 semanas de entrega",
      ],
      highlight: false,
    },
  ];

  // Precio del plan de mantenimiento mensual
  const maintenancePrice = "25 USD/mes";

  return (
    <AnimatedSection
      id="pricing"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            Planes / Precios
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Inversión
            <br />
            <span className="text-muted-foreground">transparente</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Precios orientativos. Cada proyecto es único, así que el precio
            final se ajusta según tus necesidades. Sin sorpresas ni costos
            ocultos — sabés exactamente qué estás pagando antes de empezar.
          </p>
        </div>

        {/* Grid de 3 columnas para los planes */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className={`h-full transition-all duration-300 ${
                plan.highlight
                  ? "bg-card border-foreground/30 shadow-lg shadow-foreground/5"
                  : "bg-card/50 border-border/50 hover:border-foreground/20"
              }`}>
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Badge "Popular" en el plan destacado */}
                  {plan.highlight && (
                    <span className="self-start px-3 py-1 text-xs rounded-full bg-foreground text-background font-medium mb-4">
                      Más elegido
                    </span>
                  )}

                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-6">
                    {plan.description}
                  </p>

                  {/* Precio */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                  </div>

                  {/* Lista de features con checks */}
                  <div className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-foreground/70 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botón CTA del plan */}
                  <Button
                    className={`rounded-full w-full ${
                      plan.highlight
                        ? ""
                        : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href="#contact">
                      Consultar
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Card de mantenimiento — separada porque es mensual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300">
            <CardContent className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-foreground/5 shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Mantenimiento & Soporte</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Actualizaciones, backups, monitoreo de rendimiento, seguridad y soporte técnico.
                    Obligatorio para E-commerce, opcional para los demás planes. Para que tu sitio siga funcionando perfecto mientras vos te enfocás en tu negocio.
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-2xl font-bold">{maintenancePrice}</span>
                <Button
                  variant="outline"
                  className="rounded-full ml-4"
                  asChild
                >
                  <a href="#contact">Consultar</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card de chatbot con IA — addon para cualquier plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4"
        >
          <Card className="bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300">
            <CardContent className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-foreground/5 shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Chatbot con IA</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Un asistente virtual que atiende consultas 24/7, informa sobre tus servicios, califica leads y deriva a WhatsApp para cerrar ventas. Se suma a cualquier plan.
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-sm text-muted-foreground">Incluido en todos los planes</span>
                <Button
                  variant="outline"
                  className="rounded-full ml-4"
                  asChild
                >
                  <a href="#contact">Consultar</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default Pricing;
