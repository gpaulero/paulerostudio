import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LawFooter() {
  return (
    <footer className="bg-[#0F2A47] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-semibold mb-3 text-[#C5A572]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Fernández & Romero
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Estudio jurídico con más de 25 años de trayectoria. Defensa
              profesional y compromiso con cada cliente.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#C5A572]">
              Áreas
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Derecho Laboral</li>
              <li>Derecho Civil</li>
              <li>Derecho Penal</li>
              <li>Derecho Comercial</li>
              <li>Derecho de Familia</li>
              <li>Sucesiones</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#C5A572]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  href="/demos/estudio-fernandez-romero"
                  className="hover:text-[#C5A572] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/estudio-fernandez-romero/areas-de-practica"
                  className="hover:text-[#C5A572] transition-colors"
                >
                  Áreas de práctica
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/estudio-fernandez-romero/equipo"
                  className="hover:text-[#C5A572] transition-colors"
                >
                  Equipo
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/estudio-fernandez-romero/contacto"
                  className="hover:text-[#C5A572] transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 tracking-widest uppercase text-[#C5A572]">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#C5A572] flex-shrink-0" />
                <span>Atendemos en toda la región</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A572] flex-shrink-0" />
                <span>+54 11 4567-8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A572] flex-shrink-0" />
                <span>contacto@fernandezromero.legal</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-[#C5A572] flex-shrink-0" />
                <span>Lunes a Viernes<br />9:00 — 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            © 2026 Estudio Fernández & Romero. Todos los derechos reservados.
            Matrícula profesional verificable en el colegio de abogados
            correspondiente.
          </p>
        </div>
      </div>
    </footer>
  );
}
