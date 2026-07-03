import Link from "next/link";
import { Wifi, Coffee, Dog, Waves, ArrowRight, MapPin, Star, Quote } from "lucide-react";
import CabinNav from "./_components/nav";
import CabinFooter from "./_components/footer";

const features = [
  { icon: Waves, title: "Frente al lago", text: "Salida directa al jardín con vista al lago San Roque." },
  { icon: Wifi, title: "Wifi alta velocidad", text: "Fibra óptica 200MB. Para los que trabajan remoto." },
  { icon: Coffee, title: "Desayuno incluido", text: "Facturas, panes caseros, mermeladas y café de la casa." },
  { icon: Dog, title: "Pet friendly", text: "Tus mascotas son bienvenidas sin costo adicional." },
];

const cabanas = [
  {
    nombre: "Cabaña del Bosque",
    capacidad: "2 personas",
    precio: "$45.000",
    foto: "/demos/cabin-hero-2.jpg",
    desc: "Ideal para parejas. Jacuzzi, hogar a leña, vista al bosque.",
  },
  {
    nombre: "Cabaña del Lago",
    capacidad: "4 personas",
    precio: "$65.000",
    foto: "/demos/cabin-hero-1.jpg",
    desc: "La más pedida. Deck con parrilla frente al lago.",
  },
  {
    nombre: "Cabaña Familiar",
    capacidad: "6 personas",
    precio: "$85.000",
    foto: "/demos/cabin-interior-1.jpg",
    desc: "Dos dormitorios, dos baños, cocina equipada, living amplio.",
  },
];

const testimonios = [
  {
    texto:
      "La cabaña del lago es tal cual las fotos. El desayuno riquísimo y la atención de Marian y Gustavo impecable. Vamos a volver.",
    autor: "Florencia M.",
    origen: "Buenos Aires",
  },
  {
    texto:
      "Fuimos con el perro y lo atendieron re bien. La ubicación es perfecta: cerca del centro pero con total tranquilidad.",
    autor: "Diego R.",
    origen: "Córdoba Capital",
  },
  {
    texto:
      "La cabaña impecable, el jacuzzi con vista al lago increíble. Reservamos directo por WhatsApp y todo fue clarísimo.",
    autor: "Carolina V.",
    origen: "Rosario",
  },
];

export default function CabinHome() {
  return (
    <>
      <CabinNav />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src="/demos/cabin-hero-1.jpg"
            alt="Cabaña en el bosque frente al lago"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D4A3E]/90 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl">
            <p
              className="text-[#D97746] text-2xl mb-3"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Valle de Punilla · Córdoba
            </p>
            <h1
              className="text-white text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[0.95]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Tu escapada frente al lago
            </h1>
            <p className="text-white/90 text-xl mb-8 max-w-xl leading-relaxed">
              Cabañas a 10 minutos del centro de Villa Carlos Paz. Reservá
              directo con sus dueños, sin comisiones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demos/cabanas-del-lago/cabanas"
                className="bg-[#D97746] hover:bg-[#C0653A] text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Ver cabañas
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demos/cabanas-del-lago/contacto"
                className="border border-white/40 hover:border-white text-white px-8 py-4 rounded-full font-medium transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10"
              >
                Consultar disponibilidad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-[#F4F0E8] border-b border-[#2D4A3E]/10">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2D4A3E]/10 mb-4">
                <f.icon className="w-6 h-6 text-[#2D4A3E]" />
              </div>
              <h3 className="font-semibold text-[#2D4A3E] mb-2">{f.title}</h3>
              <p className="text-sm text-[#2D4A3E]/60 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CABAÑAS */}
      <section className="py-24 sm:py-32 px-6 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-[#D97746] text-2xl mb-2"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Nuestras cabañas
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 text-[#2D4A3E]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Tres opciones para tu escapada
            </h2>
            <p className="text-[#2D4A3E]/60 leading-relaxed">
              Todas con vista al lago o al bosque, cocina equipada, baño completo
              y parking. Reservá por noche, semana o quincena.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cabanas.map((c, i) => (
              <Link
                key={i}
                href="/demos/cabanas-del-lago/cabanas"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#2D4A3E]/5">
                  <img
                    src={c.foto}
                    alt={c.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#2D4A3E]">
                      {c.nombre}
                    </h3>
                    <span className="text-[#D97746] font-bold text-sm whitespace-nowrap">
                      {c.precio}
                      <span className="text-[#2D4A3E]/40 font-normal text-xs">
                        {" "}/noche
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-[#2D4A3E]/60 mb-3">{c.capacidad}</p>
                  <p className="text-sm text-[#2D4A3E]/70 leading-relaxed">
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#D97746] font-medium mt-4 group-hover:gap-2 transition-all">
                    Ver detalles
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AMBIENTE — imagen grande */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="/demos/cabin-interior-1.jpg"
            alt="Interior de cabaña con hogar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2D4A3E]/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <Quote className="w-12 h-12 text-[#D97746] mx-auto mb-6" />
          <p
            className="text-3xl sm:text-4xl mb-6 leading-tight"
            style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
          >
            "Queríamos que la gente se sienta como en su casa de fin de semana.
            Pero con vista al lago."
          </p>
          <p className="text-sm tracking-widest uppercase text-[#D97746]">
            — Mariana y Gustavo, dueños
          </p>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 sm:py-32 px-6 bg-[#F4F0E8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-[#D97746] text-2xl mb-2"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Huéspedes felices
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#2D4A3E]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Lo que dicen de nosotros
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-[#2D4A3E]/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-[#D97746] fill-[#D97746]"
                    />
                  ))}
                </div>
                <p className="text-[#2D4A3E]/80 leading-relaxed mb-6 italic">
                  "{t.texto}"
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-[#2D4A3E]">{t.autor}</p>
                  <p className="text-[#2D4A3E]/50 text-xs">{t.origen}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="py-24 sm:py-32 px-6 bg-[#2D4A3E] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-[#D97746] text-2xl mb-2"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Cómo llegar
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              A 10 minutos del centro de VCP
            </h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Estamos sobre la costa del lago San Roque, en la zona de El Embarcadero.
              Desde el centro de Villa Carlos Paz son 10 minutos en auto por la
              costanera. Desde Córdoba Capital, 45 minutos por autopista.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#D97746] flex-shrink-0" />
                <span>Av. del Lago s/n, Villa Carlos Paz</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 text-[#D97746] flex-shrink-0 text-center text-lg">•</span>
                <span>A 45 min de Córdoba Capital</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 text-[#D97746] flex-shrink-0 text-center text-lg">•</span>
                <span>A 10 min del centro de VCP</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 text-[#D97746] flex-shrink-0 text-center text-lg">•</span>
                <span>A 5 min del reloj Cucú</span>
              </li>
            </ul>
            <Link
              href="/demos/cabanas-del-lago/contacto"
              className="inline-flex items-center gap-2 bg-[#D97746] hover:bg-[#C0653A] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Consultar cómo llegar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-2xl overflow-hidden h-96 shadow-2xl">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-64.5080%2C-31.3800%2C-64.4780%2C-31.3600&layer=mapnik&marker=-31.3700%2C-64.4930"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Ubicación Cabañas del Lago"
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 sm:py-32 px-6 bg-[#F4F0E8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#2D4A3E] leading-tight"
            style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
          >
            Reservá tu próxima escapada
          </h2>
          <p className="text-[#2D4A3E]/70 text-lg mb-10 leading-relaxed">
            Reservá directo con nosotros por WhatsApp. Sin comisiones, sin
            intermediarios. Atendido por sus dueños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demos/cabanas-del-lago/contacto"
              className="bg-[#D97746] hover:bg-[#C0653A] text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
            >
              Consultar disponibilidad
            </Link>
            <a
              href="https://wa.me/5493541234567?text=Hola%2C%20quiero%20reservar%20una%20caba%C3%B1a"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2D4A3E]/30 hover:border-[#2D4A3E] text-[#2D4A3E] px-8 py-4 rounded-full font-medium transition-all"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>

      <CabinFooter />
    </>
  );
}
