"use client";

import Link from "next/link";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENTE: Footer (Pie de página)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Simple: logo + links + copyright. Se queda abajo de todo.
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

          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Recursos
            </Link>
            <a
              href="https://wa.me/5493517656918?text=Hola%20Gonzalo%2C%20vi%20tu%20portfolio%20y%20quiero%20consultar%20por%20un%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              WhatsApp
            </a>
          </nav>

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

export default Footer;
