import Link from "next/link";

export default function ParrillaFooter() {
  return (
    <footer className="bg-[#1A1614] text-[#F5EDE3] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-bold mb-3 text-[#C89B5C]"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              La Esquina
            </h3>
            <p className="text-sm text-[#F5EDE3]/60 leading-relaxed">
              Parrilla argentina desde 1998. Tres generaciones cuidando el fuego
              lento en Villa Carlos Paz.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#C89B5C]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-[#F5EDE3]/70">
              <li>
                <Link
                  href="/demos/parrilla-la-esquina"
                  className="hover:text-[#C89B5C] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/parrilla-la-esquina/menu"
                  className="hover:text-[#C89B5C] transition-colors"
                >
                  Menú
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/parrilla-la-esquina/reservas"
                  className="hover:text-[#C89B5C] transition-colors"
                >
                  Reservas
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/parrilla-la-esquina/contacto"
                  className="hover:text-[#C89B5C] transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#C89B5C]">
              Horarios
            </h4>
            <ul className="space-y-2 text-sm text-[#F5EDE3]/70">
              <li>Lunes — Cerrado</li>
              <li>Martes a Jueves — 20:00 a 00:00</li>
              <li>Viernes y Sábado — 20:00 a 01:30</li>
              <li>Domingo — 12:30 a 16:00 y 20:00 a 23:00</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#C89B5C]">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-[#F5EDE3]/70">
              <li>Av. San Martín 1234</li>
              <li>Villa Carlos Paz, Córdoba</li>
              <li>
                <a
                  href="tel:+543541123456"
                  className="hover:text-[#C89B5C] transition-colors"
                >
                  +54 3541 12-3456
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5493541123456"
                  className="hover:text-[#C89B5C] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@parrillalaesquina.com.ar"
                  className="hover:text-[#C89B5C] transition-colors"
                >
                  hola@parrillalaesquina.com.ar
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F5EDE3]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#F5EDE3]/40">
            © 2026 Parrilla La Esquina. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-[#F5EDE3]/40">
            <a href="#" className="hover:text-[#C89B5C] transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-[#C89B5C] transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-[#C89B5C] transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
