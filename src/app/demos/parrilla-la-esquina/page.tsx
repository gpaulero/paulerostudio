import Link from "next/link";
import { Clock, MapPin, Phone, Flame, ArrowRight, Star } from "lucide-react";
import ParrillaNav from "./_components/nav";
import ParrillaFooter from "./_components/footer";

const especialidades = [
  {
    nombre: "Asado de tira",
    descripcion: "Costilla de novillo cocida 4 horas a fuego lento",
    precio: "$12.500",
  },
  {
    nombre: "Bife de chorizo",
    descripcion: "400g de chorizo de novillo a la parrilla con chimichurri de la casa",
    precio: "$14.800",
  },
  {
    nombre: "Vacío",
    descripcion: "Corte clásico argentino, jugoso, con crocante de grasa",
    precio: "$11.200",
  },
  {
    nombre: "Mollejas",
    descripcion: "Mollejas de corazón, doradas al punto exacto",
    precio: "$9.800",
  },
];

const features = [
  {
    icon: Flame,
    title: "Fuego lento",
    text: "Cocción a leña de quebracho durante 4 horas. Sin atajos, sin gas.",
  },
  {
    icon: Star,
    title: "3 generaciones",
    text: "La misma receta familiar desde 1998. El oficio se hereda, no se copia.",
  },
  {
    icon: MapPin,
    title: "Frente al río",
    text: "A 50 metros del río San Antonio. Las mejores vistas de Villa Carlos Paz.",
  },
];

export default function ParrillaHome() {
  return (
    <>
      <ParrillaNav />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/demos/parrilla-hero-1.jpg"
            alt="Asado argentino a la parrilla"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-[#C89B5C] text-sm tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "var(--font-parrilla-body), sans-serif" }}
          >
            Villa Carlos Paz · Córdoba · Desde 1998
          </p>
          <h1
            className="text-[#F5EDE3] text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
            style={{ fontFamily: "var(--font-parrilla-display), serif" }}
          >
            Parrilla
            <br />
            <span className="text-[#C89B5C] italic">La Esquina</span>
          </h1>
          <p
            className="text-[#F5EDE3]/90 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-parrilla-body), sans-serif" }}
          >
            Fuego lento, sabores auténticos. La parrilla más tradicional de Villa
            Carlos Paz, frente al río.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demos/parrilla-la-esquina/reservas"
              className="bg-[#B8412C] hover:bg-[#9F3625] text-[#F5EDE3] px-8 py-4 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Reservar mesa
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demos/parrilla-la-esquina/menu"
              className="border border-[#F5EDE3]/40 hover:border-[#F5EDE3] text-[#F5EDE3] px-8 py-4 rounded-full font-medium transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10"
            >
              Ver menú completo
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-[#F5EDE3]/50 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-[#F5EDE3]/70 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* TOP BAR — info util */}
      <section className="bg-[#1A1614] text-[#F5EDE3] py-6">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Clock className="w-5 h-5 text-[#C89B5C] flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Martes a Domingo</p>
              <p className="text-[#F5EDE3]/60">20:00 — 01:30 · Dom también al mediodía</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-[#C89B5C] flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Av. San Martín 1234</p>
              <p className="text-[#F5EDE3]/60">Villa Carlos Paz, Córdoba</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <Phone className="w-5 h-5 text-[#C89B5C] flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Reservas</p>
              <p className="text-[#F5EDE3]/60">+54 3541 12-3456</p>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#B8412C] text-sm tracking-[0.3em] uppercase mb-4">
              Nuestra historia
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              Tres generaciones al lado del fuego
            </h2>
            <div className="space-y-4 text-[#1A1614]/80 leading-relaxed">
              <p>
                Empezó en 1998, cuando Don Alberto puso la primera parrilla en la
                esquina de San Martín y Belgrano. Era un quincho chico, con cinco
                mesas y una sola premisa: cocinar al fuego lento de quebracho, sin
                atajos. Los turistas que pasaban por Villa Carlos Paz lo
                descubrían por el olor a leña desde la calle.
              </p>
              <p>
                Veintiocho años después, la parrilla sigue en el mismo lugar. Don
                Alberto ya no está, pero su hijo Gustavo y su nieto Tomás —que es
                el tercero en poner su nombre al cuadro de parrilleros— mantienen
                la misma receta, el mismo fuego, la misma madera. Lo que cambió
                fueron las mesas: hoy son veinticinco, todas con vista al río San
                Antonio.
              </p>
              <p>
                No hacemos gastronomía molecular. No hacemos fusiones. Hacemos
                parrilla argentina de la de verdad: asado de tira, vacío,
                mollejas, bife de chorizo. Y lo hacemos bien. Esa es toda la
                filosofía de La Esquina.
              </p>
            </div>
            <Link
              href="/demos/parrilla-la-esquina/menu"
              className="inline-flex items-center gap-2 mt-8 text-[#B8412C] hover:text-[#9F3625] font-medium transition-colors group"
            >
              Conocé nuestro menú
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/demos/parrilla-interior-1.jpg"
              alt="Interior cálido del restaurant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#1A1614] py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B8412C]/20 border border-[#C89B5C]/30 mb-6">
                  <f.icon className="w-7 h-7 text-[#C89B5C]" />
                </div>
                <h3
                  className="text-2xl font-semibold text-[#F5EDE3] mb-3"
                  style={{ fontFamily: "var(--font-parrilla-display), serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-[#F5EDE3]/60 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className="py-24 sm:py-32 px-6 bg-[#F5EDE3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#B8412C] text-sm tracking-[0.3em] uppercase mb-4">
              Especialidades de la casa
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-parrilla-display), serif" }}
            >
              Lo que pedimos, lo que amamos
            </h2>
            <p className="text-[#1A1614]/60 max-w-2xl mx-auto leading-relaxed">
              Los cortes que nos definen. Todos cocinados a leña de quebracho, con
              tiempos que no se apuran.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {especialidades.map((plato, i) => (
              <div
                key={i}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#1A1614]/5">
                  <img
                    src={
                      i % 2 === 0
                        ? "/demos/parrilla-food-1.jpg"
                        : "/demos/parrilla-hero-2.jpg"
                    }
                    alt={plato.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "var(--font-parrilla-display), serif",
                      }}
                    >
                      {plato.nombre}
                    </h3>
                    <span className="text-[#B8412C] font-bold whitespace-nowrap">
                      {plato.precio}
                    </span>
                  </div>
                  <p className="text-sm text-[#1A1614]/60 leading-relaxed">
                    {plato.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/demos/parrilla-la-esquina/menu"
              className="inline-flex items-center gap-2 bg-[#1A1614] hover:bg-[#2A2520] text-[#F5EDE3] px-8 py-4 rounded-full font-medium transition-all group"
            >
              Ver menú completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* AMBIENTE — big quote */}
      <section className="py-24 sm:py-32 px-6 bg-[#1A1614] text-[#F5EDE3]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl text-[#C89B5C] mb-6" style={{ fontFamily: "var(--font-parrilla-display), serif" }}>
            "
          </div>
          <blockquote
            className="text-3xl sm:text-4xl font-medium leading-tight mb-8"
            style={{ fontFamily: "var(--font-parrilla-display), serif" }}
          >
            El secreto no está en la carne ni en el fuego. Está en la paciencia.
            Cuatro horas por asado. Sin excepciones.
          </blockquote>
          <cite className="text-[#C89B5C] text-sm tracking-widest uppercase not-italic">
            — Gustavo, parrillero, segunda generación
          </cite>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 sm:py-32 px-6 bg-[#F5EDE3]">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-parrilla-display), serif" }}
          >
            ¿Reservamos tu mesa?
          </h2>
          <p className="text-[#1A1614]/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Los fines de semana se llenan rápido. Reservá con anticipación para no
            quedarte sin lugar. Por WhatsApp en 2 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demos/parrilla-la-esquina/reservas"
              className="bg-[#B8412C] hover:bg-[#9F3625] text-[#F5EDE3] px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
            >
              Reservar online
            </Link>
            <a
              href="https://wa.me/5493541123456?text=Hola%2C%20quiero%20reservar%20una%20mesa"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1A1614]/30 hover:border-[#1A1614] text-[#1A1614] px-8 py-4 rounded-full font-medium transition-all"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>

      <ParrillaFooter />
    </>
  );
}
