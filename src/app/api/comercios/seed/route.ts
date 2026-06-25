import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const RUBRO_CONCESIONARIA = "Concesionaria";

const PRESET: Array<{
  nombre: string;
  zona: string;
  direccion: string;
  telefono: string;
  tipo: string;
  webUrl: string;
  redes: string;
  estadoWeb: string;
  prioridad: string;
  notas: string;
  pitch: string;
}> = [
  { nombre: "Automotores Martínez", zona: "Carlos Paz", direccion: "Villa Carlos Paz", telefono: "(3541) 206969 / (3541) 760004", tipo: "0km + usados multimarca", webUrl: "https://sites.google.com/view/automotoresmartinez", redes: "FB: Automotores Martínez", estadoWeb: "Amateur (Google Sites)", prioridad: "Alta", notas: "0km multimarca. Solo Google Sites muy básico.", pitch: "Landing Page con catálogo 0km/usados" },
  { nombre: "AutoFamily", zona: "Carlos Paz", direccion: "Av. Perón 711, Villa Carlos Paz", telefono: "(03541) 760004", tipo: "Usados y 0km multimarca", webUrl: "https://autofamily.com.ar", redes: "IG: @autofamily__ (+30 años)", estadoWeb: "Existe (timeout)", prioridad: "Media", notas: "+30 años, +100 autos stock.", pitch: "Refresh / E-commerce con stock" },
  { nombre: "DG Automotores", zona: "Carlos Paz", direccion: "Av. San Martín 1678 / Cárcano 696", telefono: "Desde IG", tipo: "Usados + 0km", webUrl: "https://www.dgautomotores.com.ar", redes: "IG activo", estadoWeb: "Decente pero simple", prioridad: "Baja", notas: "HTML muy liviano (2KB).", pitch: "E-commerce con catálogo" },
  { nombre: "Montironi Ford", zona: "Carlos Paz", direccion: "Av. Illia 615, Villa Carlos Paz", telefono: "0800-444-1111", tipo: "0km oficial Ford", webUrl: "https://montironiford.com", redes: "IG: @montironiok", estadoWeb: "Decente (WordPress)", prioridad: "Baja", notas: "Concesionaria oficial Ford.", pitch: "Chatbot IA para calificar leads" },
  { nombre: "CBA Automotores", zona: "Carlos Paz", direccion: "Av. Cárcano 1909, Villa Carlos Paz", telefono: "(3541) 377489 / (3541) 232400", tipo: "0km + usados + consignaciones", webUrl: "https://cbaautomotores.com.ar", redes: "IG: @cba_automotores.vcp", estadoWeb: "Decente", prioridad: "Baja", notas: "Financiación 75% solo DNI.", pitch: "Chatbot IA para calificar leads" },
  { nombre: "Angle Automotores", zona: "Carlos Paz", direccion: "Fleming S/N, La Cuesta, VCP", telefono: "(03541) 43-4847", tipo: "Usados multimarca", webUrl: "Sin web propia", redes: "FB: Angle Automotores", estadoWeb: "Sin web (solo FB + Autocosmos)", prioridad: "Alta", notas: "Empresa joven con experiencia.", pitch: "Landing Page con stock" },
  { nombre: "Torino Select Garage", zona: "Carlos Paz", direccion: "Ramón J. Cárcano 1608 esq. Ibsen, VCP", telefono: "WhatsApp 351 242 9960", tipo: "Usados premium", webUrl: "Sin web propia", redes: "IG: @torinoselectgarage", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Usados premium/gama alta.", pitch: "Landing con galería premium" },
  { nombre: "Redolfi Automotores", zona: "Carlos Paz", direccion: "Diego de Velázquez 40, VCP", telefono: "+54 9 3541 279366", tipo: "Usados", webUrl: "Sin web propia", redes: "FB: Redolfi Automotores", estadoWeb: "Sin web (solo FB)", prioridad: "Alta", notas: "Solo FB.", pitch: "Landing Page 250 USD" },
  { nombre: "V-Cars Automotores", zona: "Carlos Paz", direccion: "Villa Carlos Paz", telefono: "Desde IG", tipo: "0km Ford/Fiat/Chevy/Renault/VW", webUrl: "Sin web propia", redes: "IG mencionado", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Cumplió 1 año en Carlos Paz.", pitch: "Sitio Completo con catálogo 0km" },
  { nombre: "Aspen Automotores", zona: "Carlos Paz", direccion: "Villa Carlos Paz", telefono: "Desde IG", tipo: "Camionetas 0km (Chevy/VW/Toyota/Ford)", webUrl: "Sin web propia", redes: "IG mencionado", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Nicho: solo camionetas.", pitch: "E-commerce con filtros marca/modelo" },
  { nombre: "Pablo Automotores", zona: "Carlos Paz", direccion: "Rene Simón 1380, VCP", telefono: "Desde FB", tipo: "VW 0km y usados", webUrl: "Sin web propia", redes: "IG + FB", estadoWeb: "Sin web (solo IG + FB)", prioridad: "Alta", notas: "Especialista VW.", pitch: "Landing enfocada en VW" },
  { nombre: "Giorgis Motoworld", zona: "Carlos Paz", direccion: "Av. Libertad 21, VCP", telefono: "03541-420994 / 427529", tipo: "Motos Honda oficial", webUrl: "Sin web propia", redes: "FB: Giorgis Motoworld", estadoWeb: "Sin web (solo FB + Honda)", prioridad: "Alta", notas: "Honda oficial. 3 años garantía.", pitch: "La marca debería exigirle mejor web" },
  { nombre: "AMES Motos (suc. Carlos Paz)", zona: "Carlos Paz", direccion: "Av. Libertad 365, VCP", telefono: "(03541) 439180 / Wpp (0351) 153111944", tipo: "Motos Honda oficial", webUrl: "Sin web propia", redes: "IG: @ames.motos", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Honda oficial. 40 años trayectoria. Sucursal Cba Capital.", pitch: "Sitio Completo con catálogo Honda" },
  { nombre: "E-Motors VCP", zona: "Carlos Paz", direccion: "Villa Carlos Paz", telefono: "Desde IG", tipo: "Motos eléctricas + repuestos", webUrl: "Sin web propia", redes: "IG: @emotors.vcp", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Nicho: motos eléctricas.", pitch: "E-commerce motos + repuestos" },
  { nombre: "MOTOCARCANO", zona: "Carlos Paz", direccion: "Av. Perón 725, VCP", telefono: "Desde Portal Moto Latino", tipo: "Motos + cuatriciclos", webUrl: "Sin web propia", redes: "Listing Portal Moto Latino", estadoWeb: "Sin web (solo marketplace)", prioridad: "Alta", notas: "Solo marketplace de terceros.", pitch: "Landing Page" },
  { nombre: "La Falda Automotores", zona: "La Falda", direccion: "Av. España 1273, La Falda", telefono: "03548-422170 / +5493548554319", tipo: "0km + usados multimarca", webUrl: "https://lafaldaautomotores.com", redes: "IG: @lafaldaautomotores (35 años)", estadoWeb: "Existe (403 a bots)", prioridad: "Media", notas: "35 años trayectoria, +100 vehículos.", pitch: "Refresh del sitio" },
  { nombre: "SP Automotores", zona: "La Falda", direccion: "Av. España 1186, La Falda", telefono: "Desde Canva site", tipo: "Vehículos exclusivos", webUrl: "https://spautomotores.my.canva.site", redes: "—", estadoWeb: "Amateur (Canva)", prioridad: "Alta", notas: "Hecho en Canva.", pitch: "Landing Page profesional" },
  { nombre: "Paolini Automotores", zona: "La Falda", direccion: "Av. España 601, La Falda", telefono: "WhatsApp 3548 468411 / 468710", tipo: "Renault 0km + usados", webUrl: "Sin web propia", redes: "IG: @paoliniautomotores", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Solo IG. Vende Sandero 0km.", pitch: "Landing Page" },
  { nombre: "Ruta 38 Automotores", zona: "La Falda", direccion: "La Falda (sobre Ruta 38)", telefono: "Desde FB", tipo: "Usados multimarca", webUrl: "Sin web propia", redes: "FB: Ruta 38 Automotores (+20 años)", estadoWeb: "Sin web (solo FB)", prioridad: "Alta", notas: "+20 años. Sobre Ruta 38 — alto tráfico.", pitch: "Landing con catálogo de usados" },
  { nombre: "Dos Ruedas La Falda", zona: "La Falda", direccion: "Av. Buenos Aires 565, La Falda", telefono: "Desde IG/Wix", tipo: "Motos + cuatriciclos + service", webUrl: "https://dosruedasconsultas.wixsite.com/dos-ruedas", redes: "IG: @dosruedas_lafalda", estadoWeb: "Amateur (Wix)", prioridad: "Alta", notas: "Wix amateur. Service técnico de motos.", pitch: "Refresh a sitio profesional" },
  { nombre: "Automotores Valle Hermoso", zona: "Valle Hermoso", direccion: "Gral. Paz 32, Valle Hermoso", telefono: "3513568287", tipo: "Usados multimarca", webUrl: "Sin web propia", redes: "IG + listing gtm.com.ar", estadoWeb: "Sin web (solo IG + listing)", prioridad: "Alta", notas: "Pueblo chico, sin web propia.", pitch: "Oportunidad clara — competencia local nula" },
  { nombre: "Baco Automotores", zona: "Valle Hermoso", direccion: "Ruta Nacional 38 N° 299, Valle Hermoso", telefono: "Desde FB", tipo: "Usados + créditos prendarios", webUrl: "Sin web propia", redes: "FB: Baco Automotores", estadoWeb: "Sin web (solo FB)", prioridad: "Alta", notas: "Sobre Ruta 38 — alta exposición. Créditos en pesos.", pitch: "Landing con calculadora de cuotas" },
  { nombre: "Automotores Chahin", zona: "Cosquín", direccion: "Av. San Martín 361, Cosquín", telefono: "(0351) 4657536 / (03543) ...", tipo: "0km oficial KIA + Mitsubishi", webUrl: "https://www.automotoreschahin.com.ar", redes: "IG: @automotoreschahin", estadoWeb: "Obsoleta (no responsive)", prioridad: "Media", notas: "KIA + Mitsubishi oficial. Web sin viewport.", pitch: "Refresh — la marca debería exigir mejor imagen" },
  { nombre: "Radke Automotores", zona: "Cosquín", direccion: "San Martín esq. Libertad, Cosquín", telefono: "3541576579", tipo: "Usados + remolques", webUrl: "Sin web propia", redes: "FB: Radke Automotores", estadoWeb: "Sin web (solo FB)", prioridad: "Alta", notas: "Esquina transitada de Cosquín.", pitch: "Landing Page" },
  { nombre: "Salman Automotores", zona: "Cosquín", direccion: "Av. Cap. Aviador Omar Castillo 2023, Cosquín", telefono: "Desde gtm.com.ar", tipo: "Usados", webUrl: "Sin web propia", redes: "Listing gtm.com.ar", estadoWeb: "Sin web (solo listing)", prioridad: "Alta", notas: "Solo listado en guía.", pitch: "Landing Page" },
  { nombre: "J.P. Automotores", zona: "Cosquín", direccion: "Av. A. Sabattini 4290, Cosquín", telefono: "Desde InfoisInfo", tipo: "0km + usados (Creditfacil)", webUrl: "Sin web propia", redes: "Listing InfoisInfo", estadoWeb: "Sin web (solo listing)", prioridad: "Alta", notas: "Financiación con Creditfacil.", pitch: "Landing con simulador de cuotas" },
  { nombre: "Temprana Automotores", zona: "Cosquín", direccion: "Tucumán 1067, Cosquín", telefono: "(03541) 45-1309", tipo: "Usados", webUrl: "Sin web propia", redes: "Listing licuo.com.ar", estadoWeb: "Sin web (solo listing)", prioridad: "Alta", notas: "Solo en guía telefónica.", pitch: "Pitch directo" },
  { nombre: "Cetrogar Motos", zona: "Cosquín", direccion: "Cosquín", telefono: "Desde web", tipo: "Motos Honda + Yamaha + Corven oficial", webUrl: "https://cetrogarmotos.com.ar", redes: "—", estadoWeb: "Existe (timeout)", prioridad: "Media", notas: "Concesionario oficial Honda/Yamaha/Corven.", pitch: "Verificar sitio, posible refresh" },
  { nombre: "TodoMoto Cosquín", zona: "Cosquín", direccion: "Cosquín", telefono: "Desde FB", tipo: "Repuestos motos + accesorios", webUrl: "Sin web propia", redes: "FB: TodoMoto Cosquin", estadoWeb: "Sin web (solo FB)", prioridad: "Alta", notas: "Rubro repuestos.", pitch: "E-commerce de repuestos con envío" },
  { nombre: "Rios Automotores", zona: "Capilla del Monte", direccion: "Capilla del Monte", telefono: "3548481809", tipo: "0km + usados familiar", webUrl: "Sin web propia", redes: "FB + IG: @riosautomotores", estadoWeb: "Sin web (solo FB + IG + listing)", prioridad: "Alta", notas: "Concesionaria familiar.", pitch: "Pitch cálido — tono familiar" },
  { nombre: "Sus Autos", zona: "Capilla del Monte", direccion: "38 y Pio Collivadino, Capilla del Monte", telefono: "3548-404520", tipo: "Autos + motos 0km y usados", webUrl: "Sin web propia", redes: "IG: @susautosok", estadoWeb: "Sin web (solo IG)", prioridad: "Alta", notas: "Mixto autos + motos.", pitch: "Landing con dos secciones (autos/motos)" },
  { nombre: "Reyna Automotores", zona: "La Cumbre", direccion: "25 de Mayo 448, La Cumbre", telefono: "(03548) 452-107", tipo: "Usados", webUrl: "Sin web propia", redes: "Listing gtm.com.ar + licuo.com.ar", estadoWeb: "Sin web (solo listings)", prioridad: "Alta", notas: "Pueblo chico, poca competencia.", pitch: "Pitch directo" },
];

export async function POST(_request: NextRequest) {
  try {
    const count = await db.comercio.count();
    if (count > 0) {
      return NextResponse.json({
        ok: true,
        message: `Ya hay ${count} comercios cargados. Precarga omitida.`,
      });
    }

    const created = await db.comercio.createMany({
      data: PRESET.map((p) => ({
        nombre: p.nombre,
        rubro: RUBRO_CONCESIONARIA,
        zona: p.zona,
        direccion: p.direccion,
        telefono: p.telefono,
        whatsapp: null,
        email: null,
        webUrl: p.webUrl === "Sin web propia" ? null : p.webUrl,
        redesSociales: p.redes,
        estadoWeb: p.estadoWeb,
        prioridad: p.prioridad,
        pitchSugerido: p.pitch,
        notas: p.notas,
        estado: "Sin contactar",
      })),
    });

    return NextResponse.json({
      ok: true,
      message: `Precarga completa: ${created.count} comercios cargados.`,
    });
  } catch (e) {
    console.error("POST /api/comercios/seed error:", e);
    return NextResponse.json({ error: "Error en precarga" }, { status: 500 });
  }
}
