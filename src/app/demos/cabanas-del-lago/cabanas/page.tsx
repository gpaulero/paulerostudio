import Link from "next/link";
import { ArrowLeft, Users, BedDouble, Bath, Wifi, Car, ArrowRight } from "lucide-react";
import CabinNav from "../_components/nav";
import CabinFooter from "../_components/footer";

const cabanas = [
  {
    nombre: "Cabaña del Bosque",
    capacidad: "2 personas",
    habitaciones: "1 dormitorio",
    banos: "1 baño",
    precio: "$45.000",
    fotos: ["/demos/cabin-hero-2.jpg", "/demos/cabin-interior-2.jpg"],
    desc: "Nuestra cabaña más íntima, ideal para parejas. Escondida entre los árboles, con jacuzzi privado en el deck y hogar a leña para las noches frías. La vista es al bosque de pinos.",
    amenities: ["Jacuzzi privado", "Hogar a leña", "Cocina equipada", "Wifi 200MB", "Aire acondicionado", "Smart TV", "Deck con parrilla", "Parking privado"],
  },
  {
    nombre: "Cabaña del Lago",
    capacidad: "4 personas",
    habitaciones: "2 dormitorios",
    banos: "1 baño",
    precio: "$65.000",
    fotos: ["/demos/cabin-hero-1.jpg", "/demos/cabin-interior-1.jpg"],
    desc: "La más pedida. Deck con parrilla y hamaca paraguaya con vista directa al lago San Roque. Dormitorio principal con vista al agua. Perfecta para familias o grupos de amigos.",
    amenities: ["Vista al lago", "Deck con parrilla", "Cocina equipada", "Wifi 200MB", "Aire acondicionado", "Smart TV", "Cochera cubierta", "Hamaca paraguaya"],
  },
  {
    nombre: "Cabaña Familiar",
    capacidad: "6 personas",
    habitaciones: "3 dormitorios",
    banos: "2 baños",
    precio: "$85.000",
    fotos: ["/demos/cabin-interior-1.jpg", "/demos/cabin-interior-2.jpg"],
    desc: "La más amplia. Ideal para familias grandes o grupos. Living comedor amplio con hogar a leña, dos dormitorios con vista al lago, cocina completa. Tiene espacio para tres vehículos.",
    amenities: ["3 dormitorios", "2 baños", "Hogar a leña", "Cocina completa", "Wifi 200MB", "Aire acondicionado", "Smart TV 55\"", "Cochera para 3 autos", "Patio con parrilla"],
  },
];

export default function CabinCabanas() {
  return (
    <>
      <CabinNav />
      <div className="pt-24 bg-[#F4F0E8] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-16">
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
              Nuestras cabañas
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6 text-[#2D4A3E]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Elegí tu escapada
            </h1>
            <p className="text-[#2D4A3E]/60 leading-relaxed">
              Tres cabañas únicas, todas con vista al lago o al bosque. Precios
              por noche, no incluye limpieza final.
            </p>
          </div>

          <div className="space-y-16">
            {cabanas.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#2D4A3E]/10 grid lg:grid-cols-2"
              >
                {/* Galería */}
                <div className="grid grid-cols-2 gap-1">
                  {c.fotos.map((foto, j) => (
                    <div
                      key={j}
                      className={`aspect-[4/3] overflow-hidden bg-[#2D4A3E]/5 ${
                        j === 0 ? "col-span-2 aspect-[16/9]" : ""
                      }`}
                    >
                      <img
                        src={foto}
                        alt={`${c.nombre} foto ${j + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="p-8 sm:p-10">
                  <h2
                    className="text-3xl font-bold mb-2 text-[#2D4A3E]"
                    style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
                  >
                    {c.nombre}
                  </h2>
                  <p
                    className="text-[#D97746] text-xl mb-4"
                    style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
                  >
                    {c.precio}{" "}
                    <span className="text-[#2D4A3E]/40 text-sm">
                      / noche
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-[#2D4A3E]/70 mb-6">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#D97746]" />
                      {c.capacidad}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="w-4 h-4 text-[#D97746]" />
                      {c.habitaciones}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Bath className="w-4 h-4 text-[#D97746]" />
                      {c.banos}
                    </span>
                  </div>

                  <p className="text-[#2D4A3E]/80 leading-relaxed mb-6">
                    {c.desc}
                  </p>

                  <h3 className="text-sm font-semibold tracking-widest uppercase text-[#D97746] mb-3">
                    Comodidades
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-[#2D4A3E]/70 mb-8">
                    {c.amenities.map((a, j) => (
                      <span key={j} className="flex items-start gap-2">
                        <span className="text-[#D97746] mt-1">•</span>
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/5493541234567?text=Hola%2C%20quiero%20reservar%20${c.nombre.toLowerCase().replace(/\s/g, "%20")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#D97746] hover:bg-[#C0653A] text-white px-5 py-3 rounded-full font-medium transition-colors"
                    >
                      Reservar esta cabaña
                    </a>
                    <Link
                      href="/demos/cabanas-del-lago/tarifas"
                      className="flex-1 text-center border border-[#2D4A3E]/30 hover:border-[#2D4A3E] text-[#2D4A3E] px-5 py-3 rounded-full font-medium transition-colors"
                    >
                      Ver tarifas
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CabinFooter />
    </>
  );
}
