"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  ShoppingCart,
  Server,
  Settings,
  ArrowRight,
  ExternalLink,
  Mail,
  Menu,
  X,
  ChevronDown,
  Camera,
  Palette,
  Zap,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ─────────── Animated Section Wrapper ─────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────── Navigation ─────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Inicio", href: "#hero" },
    { label: "Sobre mí", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/logo-mark.png"
            alt="Paulero Studio"
            className="w-8 h-8 rounded-sm object-contain"
          />
          <span className="font-semibold text-lg tracking-tight">
            Paulero Studio
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            asChild
          >
            <a href="#contact">
              Hablemos
              <ArrowRight className="ml-1 w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-fit"
                asChild
              >
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  Hablemos
                  <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────── Hero ─────────── */
function Hero() {
  const roles = [
    "Desarrollador Web",
    "Diseñador Digital",
    "Fotógrafo",
    "Creador de Experiencias",
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Disponible para nuevos proyectos
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Gonzalo
          <br />
          <span className="text-muted-foreground">Paulero</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 h-10 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground font-light"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Creo sitios web que combinan <strong className="text-foreground">diseño impecable</strong> con{" "}
          <strong className="text-foreground">funcionalidad real</strong>. Rápidos, hermosos y
          listos para hacer crecer tu negocio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-full px-8 text-base"
            asChild
          >
            <a href="#contact">
              Iniciar proyecto
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-base"
            asChild
          >
            <a href="#projects">Ver trabajos</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20"
        >
          <a href="#about" className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs mb-2">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── About ─────────── */
function About() {
  const highlights = [
    { icon: Camera, label: "Fotógrafo", desc: "Ojo visual entrenado" },
    { icon: Palette, label: "Diseñador", desc: "Estudiante de Lic. en Diseño" },
    { icon: Code2, label: "Desarrollador", desc: "Backend y frontend robusto" },
    { icon: Zap, label: "Rendimiento", desc: "Sitios rápidos por defecto" },
  ];

  return (
    <AnimatedSection id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
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

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="bg-card/50 border-border/50 hover:border-foreground/20 transition-colors h-full">
                  <CardContent className="p-6">
                    <item.icon className="w-8 h-8 mb-4 text-foreground/80" />
                    <h3 className="font-semibold text-base">{item.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── Services ─────────── */
function Services() {
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
        "Tu sitio web necesita cuidado constante. Ofrezco planes de mantenimiento mensual que incluyen actualizaciones, monitoreo de rendimiento, backups, seguridad y soporte técnico. Para que vos te enfoques en tu negocio.",
      features: ["Actualizaciones", "Backups automáticos", "Monitoreo 24/7", "Soporte prioritario"],
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
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-lg bg-foreground/5">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
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

/* ─────────── Projects ─────────── */
function Projects() {
  const projects = [
    {
      title: "Compucity",
      subtitle: "E-commerce de tecnología",
      description:
        "Tienda online completa para una empresa de computación. Catálogo dinámico con filtros avanzados, carrito de compra, pasarelas de pago integradas y un panel de administración robusto para gestionar productos, stock y pedidos. Diseñado para escalar.",
      image: "/project-compucity.png",
      tags: ["E-commerce", "Backend Complejo", "Panel Admin", "Pagos Online"],
      status: "Fase final",
    },
    {
      title: "Etersomos",
      subtitle: "Registros Akáshicos & Bienestar",
      description:
        "Sitio web para un emprendimiento de registros akáshicos, con un backend potente que permite gestionar reservas de sesiones, contenido dinámico y comunicación con clientes. Una experiencia digital que refleja la esencia del servicio espiritual.",
      image: "/project-etersomos.png",
      tags: ["Sitio Web", "Backend Personalizado", "Reservas", "Contenido Dinámico"],
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
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-muted/20 aspect-video lg:aspect-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-foreground/90 text-background font-medium">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
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
                    <div>
                      <Button variant="outline" className="rounded-full group/btn">
                        Ver detalles
                        <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
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

/* ─────────── Process ─────────── */
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
              <span className="text-5xl font-bold text-foreground/5">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold mt-2 mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
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

/* ─────────── Contact ─────────── */
function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would send to an API
    const mailtoLink = `mailto:gonzalo@paulerostudio.com?subject=Nuevo%20proyecto%20de%20${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0ADe:%20${encodeURIComponent(formState.email)}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <AnimatedSection
      id="contact"
      className="py-24 sm:py-32 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-sm font-mono text-muted-foreground mb-3">
              05 / Contacto
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              ¿Tenés un
              <br />
              <span className="text-muted-foreground">proyecto en mente?</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Charlamos. Contame tu idea y te digo cómo puedo ayudarte.
              Sin compromiso, sin presiones — una simple conversación para
              ver si somos un buen match.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hola@paulerostudio.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Monitor className="w-4 h-4" />
                <span className="text-sm">Remoto — Argentina & Latam</span>
              </div>
            </div>
          </div>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground text-sm">
                    Te respondo lo antes posible
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre
                    </label>
                    <Input
                      placeholder="Tu nombre"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Contame sobre tu proyecto
                    </label>
                    <Textarea
                      placeholder="¿Qué necesitás? ¿Para qué tipo de negocio?"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      rows={5}
                      className="bg-background/50 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full text-base"
                  >
                    Enviar mensaje
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark.png"
              alt="Paulero Studio"
              className="w-6 h-6 rounded-sm object-contain"
            />
            <span className="text-sm font-medium">Paulero Studio</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gonzalo Paulero. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── Main Page ─────────── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
