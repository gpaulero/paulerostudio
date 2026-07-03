import Link from "next/link";
import { ArrowRight, Scale, Award, Users, ShieldCheck, Phone, MessageCircle } from "lucide-react";
import LawNav from "./_components/nav";
import LawFooter from "./_components/footer";

const areas = [
  {
    nombre: "Derecho Laboral",
    desc: "Despidos, accidentes de trabajo,liquidaciones, reclamos salariales.",
    icon: "⚖️",
  },
  {
    nombre: "Derecho Civil",
    desc: "Contratos, daños y perjuicios, responsabilidad civil, sucesiones.",
    icon: "🏛️",
  },
  {
    nombre: "Derecho Penal",
    desc: "Defensa en causas penales, querellante, excarcelaciones.",
    icon: "🛡️",
  },
  {
    nombre: "Derecho Comercial",
    desc: "Sociedades, contratos comerciales, quiebras, recuperos.",
    icon: "📊",
  },
  {
    nombre: "Derecho de Familia",
    desc: "Divorcios, cuota alimentaria, régimen de visitas, adopciones.",
    icon: "👨‍👩‍👧",
  },
  {
    nombre: "Sucesiones",
    desc: "Heredas, declaratorias de herederos, partición de bienes.",
    icon: "📜",
  },
];

const stats = [
  { value: "25+", label: "Años de experiencia" },
  { value: "500+", label: "Casos resueltos" },
  { value: "98%", label: "Clientes satisfechos" },
];

const equipo = [
  {
    nombre: "Dr. Ricardo Fernández",
    rol: "Socio fundador",
    area: "Derecho Laboral",
    foto: "/demos/law-attorney-1.jpg",
  },
  {
    nombre: "Dra. Laura Romero",
    rol: "Socia",
    area: "Civil & Familia",
    foto: "/demos/law-attorney-2.jpg",
  },
  {
    nombre: "Dr. Martín Aguirre",
    rol: "Asociado senior",
    area: "Penal & Comercial",
    foto: "/demos/law-attorney-3.jpg",
  },
];

const testimonios = [
  {
    texto:
      "Me asesoraron en un despido injustificado. Profesionalismo absoluto de principio a fin. Recuperé mi indemnización en menos de lo esperado.",
    autor: "M. R.",
    caso: "Cliente — Derecho Laboral",
  },
  {
    texto:
      "Después de años peleando con mis hermanos por la herencia, el estudio logró un acuerdo que nos dejó a todos conformes. Recomendados.",
    autor: "J. P.",
    caso: "Cliente — Sucesiones",
  },
  {
    texto:
      "Atención clara, sin tecnicismos. Siempre supe en qué etapa estaba mi caso y qué podía esperar. Eso no se consigue en cualquier lado.",
    autor: "C. D.",
    caso: "Cliente — Derecho Civil",
  },
];

export default function LawHome() {
  return (
    <>
      <LawNav />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/demos/law-office-1.jpg"
            alt="Oficina del estudio jurídico"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A47]/95 via-[#0F2A47]/80 to-[#0F2A47]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <p
              className="text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "var(--font-law-body), sans-serif" }}
            >
              Estudio Jurídico · Desde 2001
            </p>
            <h1
              className="text-white text-5xl sm:text-6xl md:text-7xl font-semibold mb-8 leading-[1.05]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Defendemos tus derechos con experiencia y compromiso
            </h1>
            <p className="text-white/80 text-xl mb-10 leading-relaxed max-w-xl">
              Más de 25 años asesorando a personas y empresas. Consulta gratuita,
              respuesta clara, estrategia definida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demos/estudio-fernandez-romero/contacto"
                className="bg-[#C5A572] hover:bg-[#B8955F] text-[#0F2A47] px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Agendar consulta gratuita
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demos/estudio-fernandez-romero/areas-de-practica"
                className="border border-white/40 hover:border-white text-white px-8 py-4 rounded-full font-medium transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10"
              >
                Ver áreas de práctica
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0F2A47] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div
                className="text-5xl sm:text-6xl font-semibold text-[#C5A572] mb-2"
                style={{ fontFamily: "var(--font-law-display), serif" }}
              >
                {s.value}
              </div>
              <div className="text-sm tracking-widest uppercase text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÁREAS */}
      <section className="py-24 sm:py-32 px-6 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-4">
              Áreas de práctica
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold mb-6 text-[#0F2A47]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Soluciones legales para cada situación
            </h2>
            <p className="text-[#0F2A47]/60 leading-relaxed">
              Asesoramiento especializado en las principales ramas del derecho. Si
              tu caso no está listado, consultanos igual.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, i) => (
              <Link
                key={i}
                href="/demos/estudio-fernandez-romero/areas-de-practica"
                className="group bg-white border border-[#0F2A47]/10 hover:border-[#C5A572] rounded-lg p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3
                  className="text-2xl font-semibold mb-3 text-[#0F2A47]"
                  style={{ fontFamily: "var(--font-law-display), serif" }}
                >
                  {area.nombre}
                </h3>
                <p className="text-[#0F2A47]/60 leading-relaxed mb-4">
                  {area.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-[#C5A572] font-medium group-hover:gap-2 transition-all">
                  Consultar este caso
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-24 sm:py-32 px-6 bg-[#0F2A47] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-4">
              Por qué elegirnos
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              No prometemos. Demostramos.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C5A572] mb-6">
                <Award className="w-7 h-7 text-[#C5A572]" />
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-law-display), serif" }}
              >
                Experiencia probada
              </h3>
              <p className="text-white/70 leading-relaxed">
                Más de 500 casos resueltos en 25 años. Sabemos qué funciona y qué
                no, porque lo hemos visto muchas veces.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C5A572] mb-6">
                <Users className="w-7 h-7 text-[#C5A572]" />
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-law-display), serif" }}
              >
                Atención personalizada
              </h3>
              <p className="text-white/70 leading-relaxed">
                Un abogado del estudio toma tu caso de principio a fin. No te pasa
                de mano en mano ni te atienden pasantes.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C5A572] mb-6">
                <ShieldCheck className="w-7 h-7 text-[#C5A572]" />
              </div>
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-law-display), serif" }}
              >
                Transparencia total
              </h3>
              <p className="text-white/70 leading-relaxed">
                Honorarios claros desde la primera consulta. Sin sorpresas, sin
                letra chica, sin costos ocultos. Te decimos todo de entrada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO PREVIEW */}
      <section className="py-24 sm:py-32 px-6 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-4">
              Nuestro equipo
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold mb-6 text-[#0F2A47]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Profesionales con vocación
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {equipo.map((miembro, i) => (
              <div
                key={i}
                className="group bg-white rounded-lg overflow-hidden border border-[#0F2A47]/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#0F2A47]/5">
                  <img
                    src={miembro.foto}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className="text-xl font-semibold text-[#0F2A47] mb-1"
                    style={{ fontFamily: "var(--font-law-display), serif" }}
                  >
                    {miembro.nombre}
                  </h3>
                  <p className="text-sm text-[#C5A572] font-medium mb-1">
                    {miembro.rol}
                  </p>
                  <p className="text-sm text-[#0F2A47]/60">{miembro.area}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/demos/estudio-fernandez-romero/equipo"
              className="inline-flex items-center gap-2 text-[#0F2A47] hover:text-[#C5A572] font-medium transition-colors group"
            >
              Conocé al equipo completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 sm:py-32 px-6 bg-[#0F2A47] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C5A572] text-sm tracking-[0.3em] uppercase mb-4">
              Testimonios
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonios.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
              >
                <div className="text-4xl text-[#C5A572] mb-4" style={{ fontFamily: "var(--font-law-display), serif" }}>
                  "
                </div>
                <p className="text-white/80 leading-relaxed mb-6 italic">
                  {t.texto}
                </p>
                <div className="text-sm">
                  <p className="font-semibold text-[#C5A572]">{t.autor}</p>
                  <p className="text-white/50 text-xs">{t.caso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 sm:py-32 px-6 bg-[#FAFAF7]">
        <div className="max-w-4xl mx-auto text-center">
          <Scale className="w-12 h-12 text-[#C5A572] mx-auto mb-6" />
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-[#0F2A47] leading-tight"
            style={{ fontFamily: "var(--font-law-display), serif" }}
          >
            ¿Necesitás asesoramiento legal?
          </h2>
          <p className="text-[#0F2A47]/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Primera consulta gratuita, sin compromiso. Evaluamos tu caso y te
            decimos honestamente si tenemos cómo ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demos/estudio-fernandez-romero/contacto"
              className="bg-[#0F2A47] hover:bg-[#1A3A5A] text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Agendar consulta
            </Link>
            <a
              href="https://wa.me/5491145678900?text=Hola%2C%20quiero%20una%20consulta%20legal"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#0F2A47]/30 hover:border-[#0F2A47] text-[#0F2A47] px-8 py-4 rounded-full font-medium transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>

      <LawFooter />
    </>
  );
}
