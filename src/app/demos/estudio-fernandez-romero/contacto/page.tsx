import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import LawNav from "../_components/nav";
import LawFooter from "../_components/footer";

export default function LawContacto() {
  return (
    <>
      <LawNav />
      <div className="pt-24 bg-[#FAFAF7] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Link
            href="/demos/estudio-fernandez-romero"
            className="inline-flex items-center gap-2 text-[#C5A572] hover:text-[#B8955F] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-4">
              Contacto
            </p>
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-6 text-[#0F2A47]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Consulta gratuita
            </h1>
            <p className="text-[#0F2A47]/60 leading-relaxed">
              La primera consulta no tiene costo. Evaluamos tu caso, te damos una
              opinión profesional y recién ahí decidís si querés avanzar con
              nosotros.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulario */}
            <form className="bg-white rounded-lg p-8 sm:p-10 border border-[#0F2A47]/10">
              <h3
                className="text-2xl font-semibold mb-6 text-[#0F2A47]"
                style={{ fontFamily: "var(--font-law-display), serif" }}
              >
                Contanos tu caso
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#0F2A47] mb-2">
                    Nombre y apellido *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#0F2A47]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20 transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#0F2A47] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#0F2A47]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F2A47] mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-[#0F2A47]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20 transition-all"
                      placeholder="+54 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2A47] mb-2">
                    Área del caso *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#0F2A47]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20 transition-all"
                  >
                    <option value="">Elegir área</option>
                    <option>Derecho Laboral</option>
                    <option>Derecho Civil</option>
                    <option>Derecho Penal</option>
                    <option>Derecho Comercial</option>
                    <option>Derecho de Familia</option>
                    <option>Sucesiones</option>
                    <option>No estoy seguro / Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F2A47] mb-2">
                    Contanos brevemente tu caso *
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#0F2A47]/20 bg-[#FAFAF7] focus:outline-none focus:border-[#C5A572] focus:ring-2 focus:ring-[#C5A572]/20 transition-all resize-none"
                    placeholder="Describí tu situación en pocas líneas. No hace falta que incluyas nombres ni datos sensibles en este primer contacto."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F2A47] hover:bg-[#1A3A5A] text-white py-4 rounded-full font-medium transition-all hover:scale-[1.02]"
                >
                  Enviar consulta
                </button>
                <p className="text-xs text-[#0F2A47]/50 text-center">
                  Te respondemos en menos de 24hs hábiles. Tu información es
                  confidencial.
                </p>
              </div>
            </form>

            {/* Info de contacto */}
            <div className="space-y-8">
              <div className="bg-[#0F2A47] text-white rounded-lg p-8">
                <h3
                  className="text-2xl font-semibold mb-6 text-[#C5A572]"
                  style={{ fontFamily: "var(--font-law-display), serif" }}
                >
                  Datos directos
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C5A572] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Teléfono</p>
                      <a
                        href="tel:+541145678900"
                        className="text-white hover:text-[#C5A572] transition-colors"
                      >
                        +54 11 4567-8900
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C5A572] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <a
                        href="mailto:contacto@fernandezromero.legal"
                        className="text-white hover:text-[#C5A572] transition-colors break-all"
                      >
                        contacto@fernandezromero.legal
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-[#C5A572] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">WhatsApp</p>
                      <a
                        href="https://wa.me/5491145678900"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#C5A572] transition-colors"
                      >
                        +54 9 11 4567-8900
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C5A572] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Zona de atención</p>
                      <p className="text-white">Atendemos en toda la región</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#C5A572] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Horarios</p>
                      <p className="text-white">
                        Lunes a Viernes<br />9:00 — 19:00
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#C5A572]/10 border border-[#C5A572]/30 rounded-lg p-8">
                <h3
                  className="text-xl font-semibold mb-3 text-[#0F2A47]"
                  style={{ fontFamily: "var(--font-law-display), serif" }}
                >
                  Urgencias penales 24hs
                </h3>
                <p className="text-sm text-[#0F2A47]/70 mb-4">
                  Si vos o un familiar están siendo detenidos o imputados en una
                  causa, atendemos las 24hs. Llamá al teléfono de guardia.
                </p>
                <a
                  href="tel:+541145678900"
                  className="inline-flex items-center gap-2 bg-[#0F2A47] hover:bg-[#1A3A5A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LawFooter />
    </>
  );
}
