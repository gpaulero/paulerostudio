import Link from "next/link";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

export default function CabinFooter() {
  return (
    <footer className="bg-[#2D4A3E] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3
              className="text-3xl font-semibold mb-3 text-[#D97746]"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Cabañas del Lago
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Frente al lago San Roque, a 10 min del centro de Villa Carlos Paz.
              Tu escapada al Valle de Punilla.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#D97746]">
              Cabañas
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Cabaña del Bosque (2 personas)</li>
              <li>Cabaña del Lago (4 personas)</li>
              <li>Cabaña Familiar (6 personas)</li>
              <li>
                <Link
                  href="/demos/cabanas-del-lago/cabanas"
                  className="hover:text-[#D97746] transition-colors"
                >
                  Ver todas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#D97746]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href="/demos/cabanas-del-lago"
                  className="hover:text-[#D97746] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/cabanas-del-lago/tarifas"
                  className="hover:text-[#D97746] transition-colors"
                >
                  Tarifas
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/cabanas-del-lago/contacto"
                  className="hover:text-[#D97746] transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#D97746]">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D97746] flex-shrink-0" />
                <span>Av. del Lago s/n<br />Villa Carlos Paz, Córdoba</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97746] flex-shrink-0" />
                <span>+54 3541 23-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D97746] flex-shrink-0" />
                <span>hola@cabanasdellago.com.ar</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#D97746] flex-shrink-0" />
                <span>@cabanasdellago</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            © 2026 Cabañas del Lago. Reservá directo, sin comisiones. Atendido por
            sus dueños.
          </p>
        </div>
      </div>
    </footer>
  );
}
