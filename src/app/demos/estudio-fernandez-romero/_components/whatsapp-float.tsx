"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export default function LawWhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/541143215678?text=Hola%2C%20quiero%20solicitar%20una%20consulta%20gratuita"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar consulta por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pl-4 pr-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
      style={{
        background: "#0F2A47",
        color: "#FAFAF7",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        pointerEvents: show ? "auto" : "none",
        boxShadow: "0 12px 30px -10px rgba(15, 42, 71, 0.55)",
      }}
    >
      <Phone className="w-4 h-4" style={{ color: "#C5A572" }} />
      <span className="text-sm font-semibold hidden sm:inline">Consulta gratuita</span>
    </a>
  );
}
