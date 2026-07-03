"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/demos/estudio-fernandez-romero", label: "Inicio" },
  { href: "/demos/estudio-fernandez-romero/areas-de-practica", label: "Áreas de práctica" },
  { href: "/demos/estudio-fernandez-romero/equipo", label: "Equipo" },
  { href: "/demos/estudio-fernandez-romero/contacto", label: "Contacto" },
];

export default function LawNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAF7]/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/demos/estudio-fernandez-romero"
          className="flex items-baseline gap-2"
        >
          <span
            className="text-2xl font-semibold tracking-tight text-[#0F2A47]"
            style={{ fontFamily: "var(--font-law-display), serif" }}
          >
            Fernández
          </span>
          <span className="text-[#C5A572] text-2xl font-light">&</span>
          <span
            className="text-2xl font-semibold tracking-tight text-[#0F2A47]"
            style={{ fontFamily: "var(--font-law-display), serif" }}
          >
            Romero
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#0F2A47]/80 hover:text-[#C5A572] transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/demos/estudio-fernandez-romero/contacto"
              className="bg-[#0F2A47] hover:bg-[#1A3A5A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              Consulta gratuita
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#0F2A47]"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-[#FAFAF7] border-t border-[#0F2A47]/10 mt-3">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-[#0F2A47]/80 hover:text-[#C5A572] hover:bg-[#0F2A47]/5 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3">
              <Link
                href="/demos/estudio-fernandez-romero/contacto"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-[#0F2A47] text-white px-5 py-2.5 rounded-full text-sm font-medium"
              >
                Consulta gratuita
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
