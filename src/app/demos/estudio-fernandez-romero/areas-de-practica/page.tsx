import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import LawNav from "../_components/nav";
import LawFooter from "../_components/footer";

const areas = [
  {
    nombre: "Derecho Laboral",
    desc: "Asesoramiento y representación en todos los aspectos de la relación laboral. Defendemos tanto a trabajadores como a empleadores.",
    casos: [
      "Despidos sin causa y con causa",
      "Liquidaciones y reclamos salariales",
      "Accidentes de trabajo (ART)",
      "Hostigamiento laboral (mobbing)",
      "Reclamos por horas extras",
      "Reincorporaciones",
    ],
  },
  {
    nombre: "Derecho Civil",
    desc: "Resolución de conflictos entre particulares. Daños, contratos, responsabilidad civil.",
    casos: [
      "Daños y perjuicios",
      "Accidentes de tránsito",
      "Responsabilidad profesional",
      "Redacción y revisión de contratos",
      "Reclamos por vicios ocultos",
      "Conflictos vecinales",
    ],
  },
  {
    nombre: "Derecho Penal",
    desc: "Defensa técnica en causas penales. Asistencia desde la etapa de investigación hasta el juicio.",
    casos: [
      "Defensa en causas penales",
      "Representación de querellantes",
      "Excarcelaciones",
      "Suspensión de juicio a prueba",
      "Delitos económicos",
      "Defensa del consumidor (penal)",
    ],
  },
  {
    nombre: "Derecho Comercial",
    desc: "Asesoramiento a empresas y emprendedores. Contratos, sociedades, concursos y quiebras.",
    casos: [
      "Constitución de sociedades",
      "Contratos comerciales",
      "Concursos y quiebras",
      "Recupero de créditos",
      "Fusiones y adquisiciones",
      "Asesoramiento a startups",
    ],
  },
  {
    nombre: "Derecho de Familia",
    desc: "Acompañamiento en momentos sensibles. Claridad y firmeza para resolver conflictos familiares.",
    casos: [
      "Divorcios express y contenciosos",
      "Cuota alimentaria",
      "Régimen de comunicación (visitas)",
      "Adopciones",
      "Unión convivencial",
      "Violencia familiar",
    ],
  },
  {
    nombre: "Sucesiones",
    desc: "Gestión completa de herencias. Te guiamos paso a paso en un proceso que suele ser confuso.",
    casos: [
      "Declaratoria de herederos",
      "Partición de bienes",
      "Renuncia a herencia",
      "Sucesiones con bienes en el exterior",
      "Testamentos",
      "Auditoría sucesoria",
    ],
  },
];

export default function LawAreas() {
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
              Áreas de práctica
            </p>
            <h1
              className="text-5xl sm:text-6xl font-semibold mb-6 text-[#0F2A47]"
              style={{ fontFamily: "var(--font-law-display), serif" }}
            >
              Servicios legales integrales
            </h1>
            <p className="text-[#0F2A47]/60 leading-relaxed">
              Cada área es atendida por un especialista del estudio. Si tu caso es
              interdisciplinario, lo trabajamos en equipo.
            </p>
          </div>

          <div className="space-y-12">
            {areas.map((area, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-8 sm:p-10 border border-[#0F2A47]/10 hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2
                      className="text-3xl font-semibold mb-4 text-[#0F2A47]"
                      style={{ fontFamily: "var(--font-law-display), serif" }}
                    >
                      {area.nombre}
                    </h2>
                    <p className="text-[#0F2A47]/70 leading-relaxed mb-6">
                      {area.desc}
                    </p>
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-[#C5A572] mb-3">
                      Casos típicos que atendemos
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm text-[#0F2A47]/70">
                      {area.casos.map((c, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center md:border-l md:border-[#0F2A47]/10 md:pl-8">
                    <p className="text-sm text-[#0F2A47]/60 mb-4">
                      ¿Tu caso entra en esta área?
                    </p>
                    <a
                      href={`https://wa.me/5491145678900?text=Hola%2C%20tengo%20un%20caso%20de%20${area.nombre.toLowerCase().replace(/\s/g, "%20")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#0F2A47] hover:bg-[#1A3A5A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors mb-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Consultar
                    </a>
                    <Link
                      href="/demos/estudio-fernandez-romero/contacto"
                      className="inline-flex items-center justify-center gap-2 border border-[#0F2A47]/30 hover:border-[#0F2A47] text-[#0F2A47] px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                    >
                      Agendar consulta
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LawFooter />
    </>
  );
}
