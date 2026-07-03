import Link from "next/link";
import { ArrowLeft, Check, X, CreditCard, Calendar } from "lucide-react";
import CabinNav from "../_components/nav";
import CabinFooter from "../_components/footer";

const tarifas = [
  {
    nombre: "Cabaña del Bosque",
    capacidad: "2 personas",
    baja: "$35.000",
    media: "$45.000",
    alta: "$65.000",
  },
  {
    nombre: "Cabaña del Lago",
    capacidad: "4 personas",
    baja: "$55.000",
    media: "$65.000",
    alta: "$95.000",
  },
  {
    nombre: "Cabaña Familiar",
    capacidad: "6 personas",
    baja: "$70.000",
    media: "$85.000",
    alta: "$120.000",
  },
];

const temporada = [
  { tipo: "Temporada baja", meses: "Marzo a Noviembre (excepto feriados)", color: "bg-[#2D4A3E]" },
  { tipo: "Temporada media", meses: "Fines de semana largos, octubre, diciembre parcial", color: "bg-[#8B6F47]" },
  { tipo: "Temporada alta", meses: "Enero, febrero, semana santa, feriados nacionales", color: "bg-[#D97746]" },
];

const incluido = [
  "Desayuno continental para todos los huéspedes",
  "Ropa de cama y toallas (cambio cada 3 días)",
  "Wifi alta velocidad 200MB",
  "Cocina completamente equipada",
  "Aire acondicionado / calefacción",
  "Estacionamiento privado",
  "Limpieza final",
];

const noIncluido = [
  "Lavandería (servicio adicional $5.000)",
  "Traslados (consultar)",
  "Excursiones (asesoramiento gratuito)",
  "Mascotas: aceptadas sin cargo",
];

const formasPago = [
  "Transferencia bancaria (10% de descuento)",
  "Mercado Pago",
  "Tarjetas de crédito (3 cuotas sin interés)",
  "Tarjetas de débito",
  "Efectivo al arribo",
];

export default function CabinTarifas() {
  return (
    <>
      <CabinNav />
      <div className="pt-24 bg-[#F4F0E8] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/demos/cabanas-del-lago"
            className="inline-flex items-center gap-2 text-[#D97746] hover:text-[#C0653A] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="text-center mb-16">
            <p
              className="text-[#D97746] text-2xl mb-2"
              style={{ fontFamily: "var(--font-cabin-accent), cursive" }}
            >
              Tarifas
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold mb-6 text-[#2D4A3E]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Precios claros, sin sorpresas
            </h1>
            <p className="text-[#2D4A3E]/60 max-w-2xl mx-auto leading-relaxed">
              Reservá directo y ahorrá hasta 20% vs plataformas como Airbnb o
              Booking. Estadía mínima 2 noches en temporada alta.
            </p>
          </div>

          {/* Temporadas */}
          <div className="mb-12">
            <h2
              className="text-2xl font-semibold mb-6 text-[#2D4A3E]"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              Temporadas
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {temporada.map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-[#2D4A3E]/10"
                >
                  <div className={`w-8 h-2 rounded-full mb-3 ${t.color}`} />
                  <h3 className="font-semibold text-[#2D4A3E] mb-1">{t.tipo}</h3>
                  <p className="text-sm text-[#2D4A3E]/60">{t.meses}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabla de tarifas */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#2D4A3E]/10 mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2D4A3E] text-white">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium">Cabaña</th>
                    <th className="text-left p-4 text-sm font-medium">Capacidad</th>
                    <th className="text-right p-4 text-sm font-medium">Baja</th>
                    <th className="text-right p-4 text-sm font-medium">Media</th>
                    <th className="text-right p-4 text-sm font-medium bg-[#D97746]">Alta</th>
                  </tr>
                </thead>
                <tbody>
                  {tarifas.map((t, i) => (
                    <tr
                      key={i}
                      className="border-t border-[#2D4A3E]/10 hover:bg-[#F4F0E8]/50"
                    >
                      <td className="p-4 font-semibold text-[#2D4A3E]">
                        {t.nombre}
                      </td>
                      <td className="p-4 text-sm text-[#2D4A3E]/70">
                        {t.capacidad}
                      </td>
                      <td className="p-4 text-right text-[#2D4A3E]/70">
                        {t.baja}
                      </td>
                      <td className="p-4 text-right text-[#2D4A3E]/70">
                        {t.media}
                      </td>
                      <td className="p-4 text-right font-bold text-[#D97746] bg-[#D97746]/5">
                        {t.alta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-[#F4F0E8] text-xs text-[#2D4A3E]/60 text-center">
              Tarifas por noche en pesos argentinos. Sujetas a modificación sin
              previo aviso. Reserva confirmada con seña del 30%.
            </div>
          </div>

          {/* Incluido / No incluido */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-[#2D4A3E]/10">
              <h3 className="text-xl font-semibold mb-4 text-[#2D4A3E]">
                Incluido en el precio
              </h3>
              <ul className="space-y-3">
                {incluido.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2D4A3E]/80">
                    <Check className="w-4 h-4 text-[#D97746] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#2D4A3E]/10">
              <h3 className="text-xl font-semibold mb-4 text-[#2D4A3E]">
                No incluido (opcional)
              </h3>
              <ul className="space-y-3">
                {noIncluido.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2D4A3E]/80">
                    <X className="w-4 h-4 text-[#2D4A3E]/40 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Políticas */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#2D4A3E] text-white rounded-2xl p-8">
              <Calendar className="w-8 h-8 text-[#D97746] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Política de cancelación</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>· Cancelación 15+ días antes: devolución del 100%</li>
                <li>· Cancelación 7-14 días antes: devolución del 50%</li>
                <li>· Cancelación menos de 7 días: sin devolución</li>
                <li>· No show: sin devolución</li>
                <li>· Modificación de fechas: gratis según disponibilidad</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#2D4A3E]/10">
              <CreditCard className="w-8 h-8 text-[#D97746] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[#2D4A3E]">Formas de pago</h3>
              <ul className="space-y-2 text-sm text-[#2D4A3E]/80">
                {formasPago.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D97746] mt-1">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#D97746] rounded-2xl p-10">
            <h3
              className="text-3xl font-bold mb-4 text-white"
              style={{ fontFamily: "var(--font-cabin-body), sans-serif" }}
            >
              ¿Listo para reservar?
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Consultá disponibilidad por WhatsApp. Respondemos en menos de 1 hora
              en horario diurno.
            </p>
            <Link
              href="/demos/cabanas-del-lago/contacto"
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#D97746] px-6 py-3 rounded-full font-medium transition-colors"
            >
              Consultar disponibilidad
            </Link>
          </div>
        </div>
      </div>
      <CabinFooter />
    </>
  );
}
