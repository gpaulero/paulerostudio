"use client";

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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      {/* Gradiente animado como fondo — reemplaza la imagen estática */}
      <div className="absolute inset-0 z-0 animated-gradient" />

      {/* Grilla decorativa sutil (efecto técnico) */}
      <div className="absolute inset-0 z-[1] opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Contenido del hero (texto, botones) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
      </div>
    </section>
  );
}

export default Hero;
