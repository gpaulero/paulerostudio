import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import LawNav from "../_components/nav";
import LawFooter from "../_components/footer";

const equipo = [
  {
    nombre: "Dr. Ricardo Fernández",
    rol: "Socio fundador",
    area: "Derecho Laboral · Derecho Comercial",
    foto: "/demos/law-attorney-1.jpg",
    bio: "Abogado graduado de la Universidad Nacional con más de 25 años de ejercicio profesional. Especialista en derecho laboral y relaciones individuales y colectivas de trabajo. Matrícula Nº 1-2345.",
    formacion: [
      "Abogado — Universidad Nacional (1998)",
      "Especialización en Derecho Laboral — UBA (2002)",
      "Miembro del Colegio de Abogados",
      "Ex docente universitario (2005-2015)",
    ],
  },
  {
    nombre: "Dra. Laura Romero",
    rol: "Socia",
    area: "Derecho Civil · Derecho de Familia · Sucesiones",
    foto: "/demos/law-attorney-2.jpg",
    bio: "Especialista en conflictos familiares y sucesiones. Su enfoque prioriza la mediación antes del litigio, pero litiga con firmeza cuando es necesario. Matrícula Nº 1-3456.",
    formacion: [
      "Abogada — Universidad Nacional (2003)",
      "Especialización en Derecho de Familia — UBA (2008)",
      "Mediadora registrada",
      "Miembro de la Asociación de Derecho de Familia",
    ],
  },
  {
    nombre: "Dr. Martín Aguirre",
    rol: "Asociado senior",
    area: "Derecho Penal · Derecho Comercial",
    foto: "/demos/law-attorney-3.jpg",
    bio: "Defensor en causas penales complejas. Ex juez de garantías, conoce el sistema desde adentro. Asesora también a empresas en temas de compliance y delitos económicos. Matrícula Nº 1-4567.",
    formacion: [
      "Abogado — Universidad Nacional (2008)",
      "Maestría en Derecho Penal — UBA (2013)",
      "Ex Juez de Garantías (2015-2020)",
      "Profesor adjunto de Derecho Penal",
    ],
  },
];

export default function LawEquipo() {
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
              Nuestro equipo
            </p>
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-6 text-[#0F2A47]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Los profesionales detrás del estudio
            </h1>
            <p className="text-[#0F2A47]/60 leading-relaxed">
              Cada caso es atendido personalmente por uno de nuestros socios o
              asociados senior. Sin intermediarios, sin pasantes a cargo de tu
              causa.
            </p>
          </div>

          <div className="space-y-16">
            {equipo.map((miembro, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden border border-[#0F2A47]/10 grid md:grid-cols-3"
              >
                {/* Foto */}
                <div className="aspect-[3/4] md:aspect-auto md:h-full overflow-hidden bg-[#0F2A47]/5">
                  <img
                    src={miembro.foto}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="md:col-span-2 p-8 sm:p-10">
                  <p className="text-[#C5A572] text-sm tracking-widest uppercase mb-2">
                    {miembro.rol}
                  </p>
                  <h2
                    className="text-3xl sm:text-4xl font-semibold mb-3 text-[#0F2A47]"
                    style={{ fontFamily: "var(--font-law-display), serif" }}
                  >
                    {miembro.nombre}
                  </h2>
                  <p className="text-[#0F2A47]/60 mb-6">{miembro.area}</p>

                  <p className="text-[#0F2A47]/80 leading-relaxed mb-8">
                    {miembro.bio}
                  </p>

                  <h3 className="text-sm font-semibold tracking-widest uppercase text-[#C5A572] mb-3">
                    Formación
                  </h3>
                  <ul className="space-y-2 text-sm text-[#0F2A47]/70 mb-8">
                    {miembro.formacion.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-[#C5A572] mt-1">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://wa.me/5491145678900?text=Hola%2C%20quiero%20una%20consulta%20con%20${miembro.nombre.toLowerCase().replace(/\s/g, "%20")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0F2A47] hover:bg-[#1A3A5A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Solicitar consulta
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 bg-[#0F2A47] text-white rounded-2xl p-10">
            <h3
              className="text-3xl font-semibold mb-4"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              ¿No sabés con quién hablar?
            </h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Contanos tu caso y te derivamos al profesional indicado. Sin costo,
              sin compromiso.
            </p>
            <a
              href="https://wa.me/5491145678900?text=Hola%2C%20quiero%20una%20consulta%20y%20no%20s%C3%A9%20qu%C3%A9%20%C3%A1rea%20me%20corresponde"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C5A572] hover:bg-[#B8955F] text-[#0F2A47] px-6 py-3 rounded-full font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <LawFooter />
    </>
  );
}
