import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/comercios/lead-from-n8n
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Endpoint que recibe leads ya enriquecidos desde un workflow n8n
// (Google Maps scraper, web search + LLM, Instagram, Facebook, etc.)
// y los guarda en el CRM de forma idempotente.
//
// Autenticación: header `x-crm-api-key` con valor de env CRM_API_KEY.
// Si CRM_API_KEY no está seteada en el entorno, se permite cualquier
// request (modo dev). En producción, SIEMPRE setear CRM_API_KEY.
//
// Body (JSON):
// {
//   "nombre":     "Restaurante La Posada",          // obligatorio
//   "rubro":      "Restaurante",                     // obligatorio
//   "zona":       "La Falda",                        // obligatorio
//   "direccion":  "Av. San Martín 123",              // opcional
//   "telefono":   "(03541) 123456",                  // opcional
//   "whatsapp":   "5493541123456",                   // opcional, E.164 sin +
//   "email":      "info@laposada.com",               // opcional
//   "webUrl":     "https://laposada.com",            // opcional
//   "redesSociales": "IG: @laposada | FB: La Posada",// opcional
//   "estadoWeb":  null | "Sin web propia" | "Amateur (Canva)" | "Existe",  // opcional, se infiere si null
//   "prioridad":  null | "Alta" | "Media" | "Baja",  // opcional, se infiere si null
//   "fuente":     "google_maps" | "instagram" | "facebook" | "directorio_ar" | "web_search", // recomendado
//   "notas":      "Encontrado vía n8n Google Maps scraper",  // opcional
//   "pitchSugerido": null                            // opcional
// }
//
// Respuesta:
//   201 → { ok: true, created: true, comercio: {...} }
//   200 → { ok: true, created: false, duplicado: true, comercio: {...} }  (ya existía)
//   400 → { error: "..." }         (faltan campos)
//   401 → { error: "API key inválida" }
//   500 → { error: "..." }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type LeadInput = {
  nombre?: string;
  rubro?: string;
  zona?: string;
  direccion?: string | null;
  telefono?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  webUrl?: string | null;
  redesSociales?: string | null;
  estadoWeb?: string | null;
  prioridad?: string | null;
  fuente?: string | null;
  notas?: string | null;
  pitchSugerido?: string | null;
};

// Normaliza un nombre para comparar duplicados: minúsculas, sin acentos, sin sufijos legales
function normalizeName(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/(s\.?r\.?l|s\.?a\.?|sas|srl|sa|empresa|el|la|los|las|srl\s*$|sa\s*$)\b/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

// Detecta estado de la web a partir de la URL
function detectarEstadoWeb(url: string | null | undefined): string {
  if (!url) return "Sin web propia";
  const u = url.toLowerCase();
  if (u.includes("canva.site")) return "Amateur (Canva)";
  if (u.includes("wixsite.com") || u.includes("wix.com")) return "Amateur (Wix)";
  if (u.includes("sites.google.com")) return "Amateur (Google Sites)";
  if (u.includes("facebook.com") || u.includes("instagram.com")) return "Sin web (solo red social)";
  if (u.includes("wordpress.com")) return "Amateur (WordPress.com)";
  if (u.includes("shopify")) return "E-commerce (Shopify)";
  if (u.includes("mercadolibre") || u.includes("demotores") || u.includes("autocosmos")) return "Solo en marketplace";
  return "Existe (a verificar)";
}

// Infiere prioridad a partir del estado web
function inferirPrioridad(estadoWeb: string): "Alta" | "Media" | "Baja" {
  if (estadoWeb.includes("Sin web") || estadoWeb.includes("Amateur")) return "Alta";
  if (estadoWeb.includes("Existe") || estadoWeb.includes("E-commerce")) return "Media";
  return "Baja";
}

// Valida API key
function validarApiKey(request: NextRequest): boolean {
  const expected = process.env.CRM_API_KEY;
  // Si no hay API key configurada, permitir (modo dev local).
  // En producción, SIEMPRE setear CRM_API_KEY en Vercel.
  if (!expected) return true;
  const received = request.headers.get("x-crm-api-key");
  return received === expected;
}

export async function POST(request: NextRequest) {
  try {
    // ── Autenticación ──────────────────────────────────────────
    if (!validarApiKey(request)) {
      return NextResponse.json(
        { error: "API key inválida. Enviar header 'x-crm-api-key'." },
        { status: 401 }
      );
    }

    // ── Parsear body ───────────────────────────────────────────
    const body = (await request.json()) as LeadInput | LeadInput[];

    // n8n a veces envuelve todo en un array. Manejar ambos casos.
    const leads: LeadInput[] = Array.isArray(body) ? body : [body];

    if (leads.length === 0) {
      return NextResponse.json(
        { error: "Body vacío o sin leads." },
        { status: 400 }
      );
    }

    // Si envían un batch, procesar todos y devolver resumen
    const resultados: Array<{
      nombre: string;
      creado: boolean;
      duplicado: boolean;
      id?: string;
      error?: string;
    }> = [];

    for (const lead of leads) {
      const nombreLimpio = (lead.nombre || "").trim();
      const rubro = (lead.rubro || "").trim();
      const zona = (lead.zona || "").trim();

      if (!nombreLimpio || !rubro || !zona) {
        resultados.push({
          nombre: nombreLimpio || "(sin nombre)",
          creado: false,
          duplicado: false,
          error: "Faltan campos obligatorios: nombre, rubro, zona",
        });
        continue;
      }

      // ── Idempotencia: buscar por nombre normalizado + zona ──
      const key = normalizeName(nombreLimpio);
      if (key.length < 3) {
        resultados.push({
          nombre: nombreLimpio,
          creado: false,
          duplicado: false,
          error: "Nombre demasiado corto o inválido",
        });
        continue;
      }

      // Traer todos los comercios de esa zona y comparar normalizados
      const existentes = await db.comercio.findMany({
        where: { zona },
        select: { id: true, nombre: true },
      });
      const existente = existentes.find((c) => normalizeName(c.nombre) === key);

      if (existente) {
        resultados.push({
          nombre: nombreLimpio,
          creado: false,
          duplicado: true,
          id: existente.id,
        });
        continue;
      }

      // ── Inferir estadoWeb y prioridad si no vinieron ────────
      const estadoWebFinal = lead.estadoWeb || detectarEstadoWeb(lead.webUrl);
      const prioridadFinal = lead.prioridad || inferirPrioridad(estadoWebFinal);

      // ── Construir nota con fuente + fecha ────────────────────
      const fecha = new Date().toLocaleDateString("es-AR");
      const fuenteLabel = lead.fuente
        ? `Fuente: ${lead.fuente}`
        : "Fuente: n8n workflow";
      const notaBase = lead.notas
        ? `${lead.notas} | ${fuenteLabel} | ${fecha}`
        : `${fuenteLabel} | ${fecha}`;

      // ── Crear el comercio ────────────────────────────────────
      const creado = await db.comercio.create({
        data: {
          nombre: nombreLimpio,
          rubro,
          zona,
          direccion: lead.direccion || null,
          telefono: lead.telefono || null,
          whatsapp: lead.whatsapp || null,
          email: lead.email || null,
          webUrl: lead.webUrl || null,
          redesSociales: lead.redesSociales || null,
          estadoWeb: estadoWebFinal,
          prioridad: prioridadFinal,
          estado: "Sin contactar",
          notas: notaBase,
          pitchSugerido: lead.pitchSugerido || null,
        },
      });

      resultados.push({
        nombre: nombreLimpio,
        creado: true,
        duplicado: false,
        id: creado.id,
      });
    }

    // ── Respuesta ──────────────────────────────────────────────
    const creados = resultados.filter((r) => r.creado).length;
    const duplicados = resultados.filter((r) => r.duplicado).length;
    const errores = resultados.filter((r) => r.error).length;

    // Si fue un solo lead, devolver el comercio individual
    if (leads.length === 1) {
      const r = resultados[0];
      if (r.error) {
        return NextResponse.json({ error: r.error }, { status: 400 });
      }
      if (r.duplicado) {
        const comercio = await db.comercio.findUnique({
          where: { id: r.id! },
        });
        return NextResponse.json({
          ok: true,
          created: false,
          duplicado: true,
          comercio,
        });
      }
      const comercio = await db.comercio.findUnique({
        where: { id: r.id! },
      });
      return NextResponse.json(
        { ok: true, created: true, duplicado: false, comercio },
        { status: 201 }
      );
    }

    // Batch → resumen
    return NextResponse.json({
      ok: true,
      total: leads.length,
      creados,
      duplicados,
      errores,
      resultados,
    });
  } catch (e) {
    console.error("POST /api/comercios/lead-from-n8n error:", e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `Error al procesar lead: ${msg}` },
      { status: 500 }
    );
  }
}
