"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAULERO STUDIO — Portfolio Web
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// ARCHIVO: src/app/page.tsx
// Este es el archivo principal de tu sitio web.
// En Next.js con App Router, page.tsx es lo que se muestra
// cuando alguien visita la ruta "/" (la página de inicio).
//
// CONCEPTOS CLAVE:
// - "use client" → Indica que este componente se ejecuta en el
//   navegador del usuario (cliente), no en el servidor.
//   Necesario para usar useState, useEffect, animaciones, etc.
// - Componente → Una función que devuelve HTML (JSX).
//   Cada sección (Hero, About, etc.) es un componente separado.
// - JSX → Es como HTML pero dentro de JavaScript. Permite
//   usar variables, condicionales y loops dentro del HTML.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// IMPORTACIONES
// Traemos herramientas de React y librerías externas
import { useState, useEffect, useRef } from "react";
// framer-motion: librería para animaciones suaves
import { motion, useInView, AnimatePresence } from "framer-motion";
// lucide-react: librería de íconos (como FontAwesome pero moderno)
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
// Componentes de shadcn/ui: componentes pre-construidos con estilo consistente
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: AnimatedSection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Es un "wrapper" (envoltorio) que agrega animación de entrada
// a cualquier sección. Cuando la sección entra en pantalla
// (viewport), aparece con un fade-in + deslizamiento hacia arriba.
//
// CÓMO FUNCIONA:
// - useRef: crea una referencia al elemento HTML para observarlo
// - useInView: detecta cuándo el elemento es visible en pantalla
// - once: true → la animación ocurre solo la primera vez
// - margin: "-80px" → dispara cuando falta 80px para ser visible
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AnimatedSection({
  children,       // El contenido que envuelve (cualquier HTML/componente)
  className = "", // Clases CSS opcionales
  delay = 0,      // Retraso en segundos antes de animar
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
      initial={{ opacity: 0, y: 40 }}           // Estado inicial: invisible + 40px abajo
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} // Visible o no
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Navigation (Barra de navegación)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Barra fija arriba que cambia de estilo al hacer scroll.
// Incluye menú hamburguesa para mobile.
//
// CONCEPTOS:
// - useState: guarda estado del componente (¿scrolleó? ¿menú abierto?)
// - useEffect: ejecuta código cuando el componente se monta
//   (similar a DOMContentLoaded en JS vanilla)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Navigation() {
  // Estado: ¿el usuario scrolleó más de 40px?
  const [scrolled, setScrolled] = useState(false);
  // Estado: ¿el menú mobile está abierto?
  const [mobileOpen, setMobileOpen] = useState(false);

  // useEffect: se ejecuta una vez cuando el componente carga
  // Escucha el evento "scroll" para saber si hay que cambiar el nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    // El return limpia el listener cuando el componente se desmonta
    // (buena práctica para evitar memory leaks)
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // Array vacío = ejecutar solo una vez al montar

  // Links de navegación - array de objetos
  const links = [
    { label: "Inicio", href: "#hero" },
    { label: "Sobre mí", href: "#about" },
    { label: "Servicios", href: "#services" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}   // Empieza 80px arriba (fuera de pantalla)
      animate={{ y: 0 }}      // Se desliza a su posición
      transition={{ duration: 0.6, ease: "easeOut" }}
      // Template literal: usa la clase con fondo si scrolleó, transparente si no
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + nombre del estudio */}
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

        {/* Links desktop - ocultos en mobile (hidden md:flex) */}
        <div className="hidden md:flex items-center gap-8">
          {/* .map() recorre el array y crea un <a> por cada link */}
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          {/* asChild: el Button renderiza el <a> en lugar de un <button> */}
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

        {/* Botón hamburguesa - visible solo en mobile (md:hidden) */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {/* Condicional: muestra X o Menu según el estado */}
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú desplegable mobile con animación de entrada/salida */}
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
                  onClick={() => setMobileOpen(false)} // Cierra menú al clickear
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Hero (Sección principal)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// La primera sección que ve el visitante. Ocupa toda la pantalla.
// Tiene texto que rota mostrando tus roles (Desarrollador, Diseñador, etc.)
//
// CONCEPTOS:
// - setInterval: cambia el rol cada 3 segundos
// - AnimatePresence: anima la salida del texto anterior y entrada del nuevo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Hero() {
  // Array de roles que rotan
  const roles = [
    "Desarrollador Web",
    "Diseñador Digital",
    "Fotógrafo",
    "Creador de Experiencias",
  ];
  // Estado: índice del rol actual que se muestra
  const [roleIndex, setRoleIndex] = useState(0);

  // Cada 3 segundos, cambia al siguiente rol
  // El % (módulo) hace que vuelva a 0 después del último
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval); // Limpia el intervalo
  }, [roles.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo con overlay oscuro */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        {/* Gradiente que oscurece la imagen para que el texto sea legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grilla decorativa sutil (efecto técnico) */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Contenido del hero (texto, botones) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge "Disponible" con punto verde pulsante */}
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

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Paulero
          <br />
          <span className="text-muted-foreground">Studio</span>
        </motion.h1>

        {/* Texto rotativo de roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 h-10 flex items-center justify-center"
        >
          {/* AnimatePresence permite animar la salida del rol anterior */}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}  // Al cambiar el key, React desmonta y remonta
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

        {/* Párrafo descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Creo sitios web que combinan <strong className="text-foreground">diseño</strong> con{" "}
          <strong className="text-foreground">funcionalidad real</strong>. Rápidos y
          listos para hacer crecer tu negocio.
        </motion.p>

        {/* Botones CTA (Call To Action) */}
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

        {/* Indicador de scroll con flecha que rebota */}
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: About (Sobre mí)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Sección con tu foto, descripción y 4 cards de habilidades.
// Usa grid de 2 columnas en desktop, 1 en mobile.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda: texto */}
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

          {/* Columna derecha: foto + cards de habilidades */}
          <div className="space-y-8">
            {/* Tu foto con aspecto 3:4 (retrato) */}
            <div className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border/50">
              <img
                src="/gonzalo-photo.png"
                alt="Gonzalo Paulero"
                className="w-full h-full object-cover"
              />
              {/* Degradado sutil en la parte inferior de la foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
            {/* Grid 2x2 de cards con habilidades */}
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
        </div>
      </div>
    </AnimatedSection>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Services (Servicios)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra 4 servicios en cards con ícono, descripción y tags.
// Grid de 2 columnas en desktop, 1 en mobile.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Projects (Proyectos)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra tus proyectos reales con imagen, descripción y tags.
// Cada proyecto es una card grande con imagen a un lado y texto al otro.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Projects() {
  // Datos de proyectos - acá agregás más cuando tengas nuevos clientes
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
                  <div className="relative overflow-hidden bg-muted/20 aspect-video lg:aspect-auto">
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Process (Proceso de trabajo)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Muestra los 4 pasos de cómo trabajás con clientes.
// Grid de 4 columnas en desktop, 2 en tablet, 1 en mobile.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Contact (Formulario de contacto)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Formulario que abre el cliente de email del visitante.
// Muestra un mensaje de éxito por 3 segundos después de enviar.
//
// NOTA: Actualmente usa mailto: (abre la app de email).
// En producción se puede conectar a un servicio como Formspree,
// Resend o un API route propio de Next.js.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Contact() {
  // Estado del formulario: objeto con 3 campos
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  // Estado: ¿se envió el formulario?
  const [submitted, setSubmitted] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene recarga de la página
    // Crea un link mailto: con los datos del formulario
    const mailtoLink = `mailto:gonzalo@paulerostudio.com?subject=Nuevo%20proyecto%20de%20${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0ADe:%20${encodeURIComponent(formState.email)}`;
    window.open(mailtoLink, "_blank");
    // Muestra mensaje de éxito por 3 segundos
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
          {/* Columna izquierda: info de contacto */}
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

          {/* Columna derecha: formulario */}
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-8">
              {/* Condicional: muestra mensaje de éxito o el formulario */}
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
                      // ...formState copia todos los campos, y solo sobreescribe "name"
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Footer (Pie de página)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Simple: logo + copyright. Se queda abajo de todo.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
          {/* Año dinámico - se actualiza solo */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gonzalo Paulero. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE PRINCIPAL: Home
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Este es el componente que se exporta y renderiza como página.
// Es como el "índice" que arma toda la página juntando las secciones.
//
// ESTRUCTURA:
// - div contenedor con min-h-screen (mínimo alto de pantalla)
// - flex flex-col para que el footer se quede abajo
// - main con flex-1 para que el contenido empuje el footer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
