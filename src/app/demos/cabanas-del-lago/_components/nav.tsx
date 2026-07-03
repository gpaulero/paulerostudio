"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/demos/cabanas-del-lago", label: "Inicio" },
  { href: "/demos/cabanas-del-lago/cabanas", label: "Cabañas" },
  { href: "/demos/cabanas-del-lago/tarifas", label: "Tarifas" },
  { href: "/demos/cabanas-del-lago/contacto", label: "Contacto" },
];

export default function CabinNav() {
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
          ? "bg-[#F4F0E8]/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/demos/cabanas-del-lago" className="flex items-baseline gap-2">
          <span
            className="text-2xl font-semibold text-[#2D4A3E] tracking-tight"
            style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
          >
            Cabañas del Lago
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#2D4A3E]/80 hover:text-[#D97746] transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/demos/cabanas-del-lago/contacto"
              className="bg-[#D97746] hover:bg-[#C0653A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              Consultar disponibilidad
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#2D4A3E]"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-[#F4F0E8] border-t border-[#2D4A3E]/10 mt-3">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-[#2D4A3E]/80 hover:text-[#D97746] hover:bg-[#2D4A3E]/5 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3">
              <Link
                href="/demos/cabanas-del-lago/contacto"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-[#D97746] text-white px-5 py-2.5 rounded-full text-sm font-medium"
              >
                Consultar disponibilidad
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
