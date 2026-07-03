"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/demos/parrilla-la-esquina", label: "Inicio" },
  { href: "/demos/parrilla-la-esquina/menu", label: "Menú" },
  { href: "/demos/parrilla-la-esquina/reservas", label: "Reservas" },
  { href: "/demos/parrilla-la-esquina/contacto", label: "Contacto" },
];

export default function ParrillaNav() {
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
          ? "bg-[#1A1614]/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/demos/parrilla-la-esquina"
          className="flex items-center gap-2 group"
        >
          <span
            className="text-2xl font-bold tracking-tight text-[#F5EDE3]"
            style={{ fontFamily: "var(--font-parrilla-display), serif" }}
          >
            La Esquina
          </span>
          <span className="text-xs text-[#C89B5C] tracking-widest uppercase">
            Parrilla
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#F5EDE3]/90 hover:text-[#C89B5C] transition-colors text-sm font-medium tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/demos/parrilla-la-esquina/reservas"
              className="bg-[#B8412C] hover:bg-[#9F3625] text-[#F5EDE3] px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              Reservar mesa
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#F5EDE3]"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1A1614] border-t border-[#C89B5C]/20 mt-3">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-[#F5EDE3]/90 hover:text-[#C89B5C] hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3">
              <Link
                href="/demos/parrilla-la-esquina/reservas"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-[#B8412C] text-[#F5EDE3] px-5 py-2.5 rounded-full text-sm font-medium"
              >
                Reservar mesa
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
