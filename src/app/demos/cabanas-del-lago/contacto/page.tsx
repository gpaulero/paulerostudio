import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import CabinNav from "../_components/nav";
import CabinFooter from "../_components/footer";

export default function CabinContacto() {
  return (
    <>
      <CabinNav />
      <div className="pt-24 bg-[#F4F0E8] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Link
            href="/demos/cabanas-del-lago"
            className="inline-flex items-center gap-2 text-[#D97746] hover:text-[#C0653A] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-[#D97746] text-2xl mb-2"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Contacto
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6 text-[#2D4A3E]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Consultá disponibilidad
            </h1>
            <p className="text-[#2D4A3E]/60 leading-relaxed">
              Reservá directo con nosotros. Respondemos en menos de 1 hora en
              horario diurno por WhatsApp.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulario */}
            <form className="bg-white rounded-2xl p-8 sm:p-10 border border-[#2D4A3E]/10">
              <h3
                className="text-2xl font-semibold mb-6 text-[#2D4A3E]"
                style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
              >
                Consulta de reserva
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all"
                      placeholder="+54 ..."
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                      Check-in *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                      Check-out *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                      Cabaña de interés
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all">
                      <option>Cualquiera</option>
                      <option>Cabaña del Bosque (2 pax)</option>
                      <option>Cabaña del Lago (4 pax)</option>
                      <option>Cabaña Familiar (6 pax)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                      Huéspedes
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D4A3E] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[#2D4A3E]/20 bg-[#F4F0E8] focus:outline-none focus:border-[#D97746] focus:ring-2 focus:ring-[#D97746]/20 transition-all resize-none"
                    placeholder="Viajo con mascota, ocasión especial, consultas adicionales..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D97746] hover:bg-[#C0653A] text-white py-4 rounded-full font-medium transition-all hover:scale-[1.02]"
                >
                  Enviar consulta
                </button>
                <p className="text-xs text-[#2D4A3E]/50 text-center">
                  Respondemos en menos de 1 hora en horario diurno.
                </p>
              </div>
            </form>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-[#2D4A3E] text-white rounded-2xl p-8">
                <h3
                  className="text-2xl font-semibold mb-6 text-[#D97746]"
                  style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
                >
                  Contacto directo
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-[#D97746] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">WhatsApp (preferido)</p>
                      <a
                        href="https://wa.me/5493541234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#D97746] transition-colors"
                      >
                        +54 9 3541 23-4567
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#D97746] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Teléfono fijo</p>
                      <a
                        href="tel:+543541234567"
                        className="text-white hover:text-[#D97746] transition-colors"
                      >
                        +54 3541 23-4567
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#D97746] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <a
                        href="mailto:hola@cabanasdellago.com.ar"
                        className="text-white hover:text-[#D97746] transition-colors break-all"
                      >
                        hola@cabanasdellago.com.ar
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D97746] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Dirección</p>
                      <p className="text-white">
                        Av. del Lago s/n<br />
                        Villa Carlos Paz, Córdoba
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#D97746] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Check-in / Check-out</p>
                      <p className="text-white">
                        Check-in: 15:00 hs<br />
                        Check-out: 11:00 hs
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#D97746]/10 border border-[#D97746]/30 rounded-2xl p-8">
                <h3
                  className="text-xl font-semibold mb-3 text-[#2D4A3E]"
                  style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
                >
                  Atendido por sus dueños
                </h3>
                <p className="text-sm text-[#2D4A3E]/70 leading-relaxed mb-4">
                  Mariana y Gustavo viven en el predio. Te reciben personalmente y
                  están disponibles para lo que necesites durante tu estadía.
                </p>
                <a
                  href="https://wa.me/5493541234567?text=Hola%2C%20quiero%20consultar%20disponibilidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#D97746] hover:bg-[#C0653A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Escribir a Mariana y Gustavo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CabinFooter />
    </>
  );
}
