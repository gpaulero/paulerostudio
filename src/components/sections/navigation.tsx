"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Navigation (Barra de navegación)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Barra fija arriba que cambia de estilo al hacer scroll.
// Incluye menú hamburguesa para mobile y toggle de tema.
//
// CONCEPTOS:
// - useState: guarda estado del componente (¿scrolleó? ¿menú abierto?)
// - useEffect: ejecuta código cuando el componente se monta
//   (similar a DOMContentLoaded en JS vanilla)
// - useTheme: hook de next-themes para cambiar entre claro/oscuro
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function Navigation() {
  // Estado: ¿el usuario scrolleó más de 40px?
  const [scrolled, setScrolled] = useState(false);
  // Estado: ¿el menú mobile está abierto?
  const [mobileOpen, setMobileOpen] = useState(false);
  // Estado: ¿el componente está montado? (para SSR-safe theme toggle)
  const [mounted, setMounted] = useState(false);

  // Hook de next-themes para obtener y cambiar el tema
  const { theme, setTheme } = useTheme();

  // useEffect: se ejecuta una vez cuando el componente carga
  // Marca como montado para renderizar iconos de tema correctamente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- necesario para SSR-safe theme toggle
    setMounted(true);
  }, []);

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
    { label: "Planes", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
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
        <div className="hidden lg:flex items-center gap-6">
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

          {/* Toggle de tema (claro/oscuro) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Cambiar tema"
          >
            {/* Solo renderiza el icono cuando está montado (evita mismatch SSR) */}
            {mounted && (
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.div>
            )}
          </button>

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

        {/* Botón hamburguesa - visible solo en mobile (lg:hidden) */}
        <button
          className="lg:hidden text-foreground"
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
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
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

              {/* Toggle de tema dentro del menú mobile */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {mounted && (
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                )}
                {mounted && (theme === "dark" ? "Modo claro" : "Modo oscuro")}
              </button>

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

export default Navigation;
