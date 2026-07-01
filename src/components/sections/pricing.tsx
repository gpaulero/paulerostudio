"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Pricing (CTA + Addons)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Sección sin precios públicos. Cada proyecto es único, así que
// el cliente consulta directamente por WhatsApp. Debajo del CTA
// principal se muestran dos addons opcionales (Mantenimiento &
// Soporte y Chatbot con IA) también con botón "Consultar" que
// abre WhatsApp con un mensaje pre-armado.
//
// NOTA: El endpoint /api/exchange y la lógica de cotización se
// mantienen intactos en el código por si se vuelven a usar en
// el futuro, pero no se muestran en la vista.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { motion } from "framer-motion";
import { ArrowRight, Shield, Bot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

// ─── Configuración WhatsApp ─────────────────────────────────────
// Mismo número que usan contact.tsx y whatsapp-button.tsx.
const WHATSAPP_NUMBER = "5493517656918";

function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Mensajes pre-armados por contexto — cada botón abre WhatsApp
// con un texto distinto para que Gonzalo sepa de qué viene el lead.
const WHATSAPP_MESSAGES = {
  general: "Hola Gonzalo, vi tu portfolio y quiero consultar por un proyecto. ¿Podemos charlar?",
  mantenimiento: "Hola Gonzalo, vi tu portfolio y me interesa el servicio de Mantenimiento & Soporte. ¿Me contás más?",
  chatbot: "Hola Gonzalo, vi tu portfolio y me interesa agregar un Chatbot con IA a mi sitio. ¿Me contás más?",
};

function Pricing() {
  return (
    <AnimatedSection
      id="pricing"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ─── CTA principal ─────────────────────────────────────── */}
        <div className="max-w-3xl">
          <p className="text-sm font-mono text-muted-foreground mb-3">
            Trabajemos juntos
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Cada proyecto
            <br />
            <span className="text-muted-foreground">es único.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            No creo en precios enlatados. Una landing para una panadería no es
            lo mismo que una para un estudio jurídico, y un e-commerce con 50
            productos no se cotiza igual que uno con 5.000. Contame qué
            necesitás y te armo una propuesta a medida, sin compromiso.
          </p>

          {/* CTA WhatsApp grande */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 h-14 px-8 text-base"
              asChild
            >
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Charlemos por WhatsApp
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 px-8 text-base"
              asChild
            >
              <a href="#contact">
                Ver otras formas de contacto
              </a>
            </Button>
          </motion.div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Respuesta en menos de 24hs
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              Presupuesto sin compromiso
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              Consulta inicial gratis
            </span>
          </div>
        </div>

        {/* ─── Addons opcionales ────────────────────────────────── */}
        <div className="mt-20">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-muted-foreground font-mono text-sm">+ Addons</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mantenimiento & Soporte */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-foreground/5 shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold">Mantenimiento & Soporte</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Actualizaciones, backups automáticos, monitoreo de
                        rendimiento, parches de seguridad y soporte técnico
                        prioritario. Tu sitio siempre rápido, seguro y al día.
                        Opcional para Landing Page, incluido en proyectos
                        completos y e-commerce.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1" />
                  <Button
                    variant="outline"
                    className="rounded-full w-full sm:w-auto sm:self-start"
                    asChild
                  >
                    <a
                      href={buildWhatsAppLink(WHATSAPP_MESSAGES.mantenimiento)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Consultar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chatbot con IA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-foreground/5 shrink-0">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold">Chatbot con IA</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Un asistente virtual que atiende consultas 24/7 en tu
                        sitio, informa sobre tus servicios, califica leads y
                        deriva a WhatsApp para cerrar ventas. Un vendedor que
                        nunca duerme, integrado a cualquier plan.
                      </p>
                    </div>
                  </div>
                  <div className="flex-1" />
                  <Button
                    variant="outline"
                    className="rounded-full w-full sm:w-auto sm:self-start"
                    asChild
                  >
                    <a
                      href={buildWhatsAppLink(WHATSAPP_MESSAGES.chatbot)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Consultar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default Pricing;
