"use client";

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
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedSection({
  children,       // El contenido que envuelve (cualquier HTML/componente)
  className = "", // Clases CSS opcionales
  delay = 0,      // Retraso en segundos antes de animar
  id,             // ID para navegación con anclas (#about, #services, etc.)
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
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

export default AnimatedSection;
