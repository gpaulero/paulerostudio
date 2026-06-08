"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: WhatsAppFloatingButton
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Botón flotante de WhatsApp que aparece en la esquina inferior
// derecha. Siempre visible para que el cliente pueda escribirte
// en cualquier momento, sin tener que scrollear hasta Contacto.
//
// Se oculta cuando el usuario está en la sección de Contacto
// para no duplicar el botón.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsAppFloatingButton() {
  const whatsappNumber = "5493517656918";
  const whatsappMessage = "Hola Gonzalo, vi tu portfolio y me interesa saber más";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Estado: ¿mostrar el botón? (se oculta si estamos cerca de Contacto)
  const [visible, setVisible] = useState(true);
  // Estado: ¿mostrar tooltip? (aparece después de 3 segundos)
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Mostrar tooltip después de 3 segundos
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000);
    // Ocultar tooltip después de 8 segundos
    const hideTooltip = setTimeout(() => setShowTooltip(false), 8000);

    // Ocultar botón cuando el usuario scrollea cerca de la sección Contacto
    const onScroll = () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Si la sección de contacto está visible en pantalla, ocultar botón
        setVisible(rect.top > window.innerHeight || rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTooltip);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Tooltip que aparece brevemente */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-3 bg-foreground text-background text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
              >
                ¿Tenés un proyecto? Escribime
                {/* Flechita del tooltip */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón circular de WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-green-600/30"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WhatsAppFloatingButton;
