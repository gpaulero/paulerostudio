import Link from "next/link";
import { ArrowLeft, Calendar, Users, Clock, MessageCircle } from "lucide-react";
import ParrillaNav from "../_components/nav";
import ParrillaFooter from "../_components/footer";

export default function ParrillaReservas() {
  return (
    <>
      <ParrillaNav />
      <div className="pt-24 bg-[#F5EDE3] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link
            href="/demos/parrilla-la-esquina"
            className="inline-flex items-center gap-2 text-[#B8412C] hover:text-[#9F3625] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-12">
            <p className="text-[#B8412C] text-sm tracking-[0.3em] uppercase mb-4">
              Reservas
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              Reservá tu mesa
            </h1>
            <p className="text-[#1A1614]/60 max-w-2xl mx-auto leading-relaxed">
              Completá el formulario y te confirmamos por WhatsApp en menos de 2
              horas. Para reservas de más de 8 personas escribinos directo.
            </p>
          </div>

          {/* Formulario */}
          <form className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1614] mb-2">
                  Nombre y apellido *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1614]/20 bg-[#F5EDE3] focus:outline-none focus:border-[#B8412C] focus:ring-2 focus:ring-[#B8412C]/20 transition-all"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1614] mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1614]/20 bg-[#F5EDE3] focus:outline-none focus:border-[#B8412C] focus:ring-2 focus:ring-[#B8412C]/20 transition-all"
                  placeholder="+54 9 351 ..."
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#1A1614] mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Fecha *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1614]/20 bg-[#F5EDE3] focus:outline-none focus:border-[#B8412C] focus:ring-2 focus:ring-[#B8412C]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1614] mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Hora *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1614]/20 bg-[#F5EDE3] focus:outline-none focus:border-[#B8412C] focus:ring-2 focus:ring-[#B8412C]/20 transition-all"
                >
                  <option value="">Elegir hora</option>
                  <option>20:00</option>
                  <option>20:30</option>
                  <option>21:00</option>
                  <option>21:30</option>
                  <option>22:00</option>
                  <option>22:30</option>
                  <option>23:00</option>
                  <option>12:30 (domingos)</option>
                  <option>13:00 (domingos)</option>
                  <option>13:30 (domingos)</option>
                  <option>14:00 (domingos)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1614] mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Personas *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#1A1614]/20 bg-[#F5EDE3] focus:outline-none focus:border-[#B8412C] focus:ring-2 focus:ring-[#B8412C]/20 transition-all"
                >
                  <option value="">Cantidad</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                  <option>Más de 8 (consultar)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1A1614] mb-2">
                Mensaje (opcional)
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-[#1A1614]/20 bg-[#F5EDE3] focus:outline-none focus:border-[#B8412C] focus:ring-2 focus:ring-[#B8412C]/20 transition-all resize-none"
                placeholder="Ocasión especial, mesa al lado del río, alergias, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B8412C] hover:bg-[#9F3625] text-[#F5EDE3] py-4 rounded-full font-medium transition-all hover:scale-[1.02]"
            >
              Solicitar reserva
            </button>
            <p className="text-xs text-[#1A1614]/50 text-center mt-4">
              Te confirmamos por WhatsApp en menos de 2 horas. No se Cobra
              reserva anticipada.
            </p>
          </form>

          {/* Info adicional */}
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            <div className="bg-[#1A1614] text-[#F5EDE3] p-6 rounded-2xl">
              <MessageCircle className="w-8 h-8 text-[#C89B5C] mb-4" />
              <h3 className="text-lg font-semibold mb-2">¿Prefieres WhatsApp?</h3>
              <p className="text-sm text-[#F5EDE3]/70 mb-4">
                Reservá directo sin formulario. Respondemos enseguida.
              </p>
              <a
                href="https://wa.me/5493541123456?text=Hola%2C%20quiero%20reservar%20una%20mesa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Escribir ahora
              </a>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#1A1614]/10">
              <Calendar className="w-8 h-8 text-[#B8412C] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Política de reservas</h3>
              <ul className="text-sm text-[#1A1614]/70 space-y-1">
                <li>· Mesa reservada por 90 minutos</li>
                <li>· Cancelar con 4hs de anticipación</li>
                <li>· Llegar 10 min antes de la hora</li>
                <li>· Grupos de 8+ requieren seña</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ParrillaFooter />
    </>
  );
}
