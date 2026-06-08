"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Pricing (Planes y precios)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra precios con selector de moneda (USD, ARS, MXN, COP, CLP,
// BRL, UYU, PEN). Las cotizaciones se obtienen en tiempo real desde
// /api/exchange y se cachean por 1 hora.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Bot, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "./animated-section";

// ─── Configuración de monedas ──────────────────────────────────
const CURRENCIES = [
  { code: "USD", label: "USD", flag: "🇺🇸", symbol: "$", decimals: 0 },
  { code: "ARS", label: "ARS", flag: "🇦🇷", symbol: "$", decimals: 0 },
  { code: "MXN", label: "MXN", flag: "🇲🇽", symbol: "$", decimals: 0 },
  { code: "COP", label: "COP", flag: "🇨🇴", symbol: "$", decimals: 0 },
  { code: "CLP", label: "CLP", flag: "🇨🇱", symbol: "$", decimals: 0 },
  { code: "BRL", label: "BRL", flag: "🇧🇷", symbol: "R$", decimals: 0 },
  { code: "UYU", label: "UYU", flag: "🇺🇾", symbol: "$", decimals: 0 },
  { code: "PEN", label: "PEN", flag: "🇵🇪", symbol: "S/", decimals: 0 },
];

// Precios base en USD
const PRICES_USD = {
  landing: 250,
  completo: 450,
  ecommerce: 600,
  mantenimiento: 25,
};

interface ExchangeRates {
  ARS: number;
  MXN: number;
  COP: number;
  CLP: number;
  BRL: number;
  UYU: number;
  PEN: number;
  updated: string;
}

function formatPrice(amount: number, currency: typeof CURRENCIES[number]): string {
  const formatted = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: currency.decimals,
  }).format(Math.round(amount));
  return `${currency.symbol}${formatted}`;
}

function Pricing() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch exchange rates
    fetch("/api/exchange")
      .then((res) => res.json())
      .then((data) => {
        if (data.ARS) setRates(data);
      })
      .catch(() => {
        // Silencioso — se quedan en USD
      });
  }, []);

  // Convierte USD a la moneda seleccionada
  const convert = (usd: number): number => {
    if (selectedCurrency === "USD" || !rates) return usd;
    const rate = rates[selectedCurrency as keyof ExchangeRates];
    return typeof rate === "number" ? usd * rate : usd;
  };

  const currency = CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0];

  const plans = [
    {
      name: "Landing Page",
      priceUSD: PRICES_USD.landing,
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
      priceUSD: PRICES_USD.completo,
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
      priceUSD: PRICES_USD.ecommerce,
      period: selectedCurrency === "USD"
        ? "pago único + 25 USD/mes"
        : `pago único + ${formatPrice(convert(PRICES_USD.mantenimiento), currency)}/mes`,
      description: "Tienda online completa para vender 24/7 con pasarelas de pago y gestión de stock.",
      features: [
        "Todo lo de Sitio Web Completo",
        "Catálogo de productos con filtros",
        "Carrito de compra",
        "Pasarelas de pago (MercadoPago, etc.)",
        "Gestión de stock y pedidos",
        "Panel admin para productos",
        selectedCurrency === "USD"
          ? "Mantenimiento de tienda incluido (25 USD/mes)"
          : `Mantenimiento de tienda incluido (${formatPrice(convert(PRICES_USD.mantenimiento), currency)}/mes)`,
        "4-6 semanas de entrega",
      ],
      highlight: false,
    },
  ];

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

        {/* Selector de moneda */}
        {mounted && (
          <div className="mt-10 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Ver precios en:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                    selectedCurrency === c.code
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-card/50 border-border/50 text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  {c.flag} {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nota de cotización */}
        {mounted && selectedCurrency !== "USD" && rates && (
          <p className="mt-3 text-xs text-muted-foreground">
            Cotización aproximada actualizada al {new Date(rates.updated).toLocaleDateString("es-AR")}. El precio final se confirma en USD al momento de contratar.
          </p>
        )}

        {/* Grid de 3 columnas para los planes */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
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
                    <span className="text-3xl font-bold">
                      {formatPrice(convert(plan.priceUSD), currency)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      {selectedCurrency !== "USD" ? `${currency.label}` : ""} {plan.period}
                    </span>
                    {selectedCurrency !== "USD" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ≈ {plan.priceUSD} USD
                      </p>
                    )}
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
                    Obligatorio para E-commerce, opcional para los demás planes.
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-2xl font-bold">
                  {mounted ? formatPrice(convert(PRICES_USD.mantenimiento), currency) : "25 USD"}
                </span>
                <span className="text-sm text-muted-foreground">/mes</span>
                {selectedCurrency !== "USD" && (
                  <p className="text-xs text-muted-foreground">≈ 25 USD/mes</p>
                )}
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
