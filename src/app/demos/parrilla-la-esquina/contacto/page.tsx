import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import ParrillaNav from "../_components/nav";
import ParrillaFooter from "../_components/footer";

export default function ParrillaContacto() {
  return (
    <>
      <ParrillaNav />
      <div className="pt-24 bg-[#F5EDE3] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Link
            href="/demos/parrilla-la-esquina"
            className="inline-flex items-center gap-2 text-[#B8412C] hover:text-[#9F3625] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-12">
            <p className="text-[#B8412C] text-sm tracking-[0.3em] uppercase mb-4">
              Contacto
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              Vení a vernos
            </h1>
            <p className="text-[#1A1614]/60 max-w-2xl mx-auto leading-relaxed">
              Estamos en la esquina de San Martín y Belgrano, a 50 metros del río
              San Antonio. Te esperamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Info de contacto */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8412C]/10 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#B8412C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1614] mb-1">Dirección</h3>
                  <p className="text-[#1A1614]/60">
                    Av. San Martín 1234 (esquina Belgrano)
                    <br />
                    Villa Carlos Paz, Córdoba, Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8412C]/10 flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#B8412C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1614] mb-1">Teléfono</h3>
                  <p className="text-[#1A1614]/60">
                    <a
                      href="tel:+543541123456"
                      className="hover:text-[#B8412C] transition-colors"
                    >
                      +54 3541 12-3456
                    </a>
                    <br />
                    <a
                      href="https://wa.me/5493541123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B8412C] transition-colors inline-flex items-center gap-1 mt-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp: +54 9 3541 12-3456
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8412C]/10 flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#B8412C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1614] mb-1">Email</h3>
                  <p className="text-[#1A1614]/60">
                    <a
                      href="mailto:hola@parrillalaesquina.com.ar"
                      className="hover:text-[#B8412C] transition-colors"
                    >
                      hola@parrillalaesquina.com.ar
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8412C]/10 flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#B8412C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1614] mb-1">Horarios</h3>
                  <ul className="text-[#1A1614]/60 text-sm space-y-1">
                    <li>Lunes — Cerrado</li>
                    <li>Martes a Jueves — 20:00 a 00:00</li>
                    <li>Viernes y Sábado — 20:00 a 01:30</li>
                    <li>Domingo — 12:30 a 16:00 y 20:00 a 23:00</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8412C]/10 flex-shrink-0">
                  <Instagram className="w-5 h-5 text-[#B8412C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1614] mb-1">Redes</h3>
                  <p className="text-[#1A1614]/60">
                    <a href="#" className="hover:text-[#B8412C] transition-colors mr-4">
                      Instagram @parrillalaesquina
                    </a>
                    <a href="#" className="hover:text-[#B8412C] transition-colors">
                      <Facebook className="inline w-4 h-4" /> Facebook
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-96 bg-[#1A1614]/10">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-64.5020%2C-31.4250%2C-64.4820%2C-31.4150&layer=mapnik&marker=-31.4200%2C-64.4920"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Ubicación Parrilla La Esquina"
                />
              </div>
              <p className="text-sm text-[#1A1614]/60 mt-3 text-center">
                Av. San Martín 1234, Villa Carlos Paz
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#1A1614] text-[#F5EDE3] rounded-2xl p-10">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              ¿Alguna duda?
            </h3>
            <p className="text-[#F5EDE3]/70 mb-6 max-w-xl mx-auto">
              Escribinos por WhatsApp y te respondemos enseguida. Para reservas de
              eventos privados o grupos grandes, también.
            </p>
            <a
              href="https://wa.me/5493541123456?text=Hola%2C%20tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <ParrillaFooter />
    </>
  );
}
