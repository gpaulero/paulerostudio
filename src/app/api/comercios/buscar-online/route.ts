import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getZai } from "@/lib/zai";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/comercios/buscar-online
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Busca comercios por rubro + zona usando web_search del z-ai-web-dev-sdk.
// Luego usa el LLM para extraer datos estructurados de los resultados.
// Finalmente, guarda los nuevos comercios en la BD (idempotente por nombre+zona).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type SearchResult = {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank?: number;
  date?: string;
};

type ComercioExtraido = {
  nombre: string;
  direccion?: string | null;
  telefono?: string | null;
  webUrl?: string | null;
  redesSociales?: string | null;
  estadoWeb?: string | null;
  notas?: string | null;
};

// Normaliza un nombre para comparar duplicados: minúsculas, sin acentos, sin sufijos legales
function normalizeName(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/(s\.?r\.?l|s\.?a\.?|sas|srl|sa|empresa|el|la|los|las)\b/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

// Detecta si un dominio pertenece a un generador de sitios amateur
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

// Filtra resultados que son claramente directorios, no comercios reales
function esDirectorioONoComercio(r: SearchResult): boolean {
  const host = (r.host_name || "").toLowerCase();
  const name = (r.name || "").toLowerCase();
  const DIRECTORIOS = [
    "google.com/maps", "maps.app.goo", "google.com",
    "facebook.com", "instagram.com", "youtube.com", "tiktok.com",
    "yelp.com", "tripadvisor", "guia-telefonica", "paginasamarillas",
    "infoisinfo", "todopueblos", "guiamore", "ciudad.com",
    "wikipedia.org", "wikidata",
  ];
  for (const d of DIRECTORIOS) {
    if (host.includes(d) || name.includes(d)) return true;
  }
  return false;
}

// Llama al LLM para extraer comercios estructurados de los resultados crudos
async function extraerComerciosConLLM(
  rubro: string,
  zona: string,
  resultados: SearchResult[]
): Promise<ComercioExtraido[]> {
  const zai = await getZai();

  const contexto = resultados
    .map((r, i) => `#${i + 1}
TÍTULO: ${r.name}
URL: ${r.url}
DESCRIPCIÓN: ${r.snippet}`)
    .join("\n\n");

  const systemPrompt = `Sos un asistente que extrae información estructurada de resultados de búsquedas web.
Vas a recibir resultados de buscar "${rubro} en ${zona}" y tenés que identificar los COMERCIOS REALES (no directorios, no notas periodísticas, no Wikipedia).

Reglas:
1. Solo incluí comercios que tengan un nombre identificable y que sean CLARAMENTE del rubro "${rubro}".
2. Si un resultado no parece un comercio real del rubro buscado, NO lo incluyas. Es mejor devolver [] que incluir falsos positivos.
3. Si los resultados no contienen comercios reales claramente identificables (son directorios, blogs, notas, o no relevantes), devolvé {"comercios": []}.
4. Si no hay dirección o teléfono, dejá null (no inventes).
5. Si el comercio solo está mencionado en un directorio (Facebook, InfoisInfo, Guía), igualmente incluílo pero poné su webUrl como null y agregá una nota indicando dónde se lo encontró.
6. Para estadoWeb inferí: "Sin web propia" si no tiene URL propia, "Amateur (Canva/Wix/Google Sites)" si la URL lo indica, "Existe" si tiene dominio propio.
7. En redesSociales poné IG/FB si se mencionan en el snippet, formato "IG: @xxx" o "FB: Nombre".
8. En notas poné cualquier dato relevante (años de trayectoria, especialidad, etc.).
9. NUNCA inventes comercios que no aparezcan explícitamente en los resultados de búsqueda.

Devolvé EXCLUSIVAMENTE un JSON válido con esta forma, sin markdown ni explicación:
{
  "comercios": [
    {
      "nombre": "string",
      "direccion": "string | null",
      "telefono": "string | null",
      "webUrl": "string | null",
      "redesSociales": "string | null",
      "estadoWeb": "string | null",
      "notas": "string | null"
    }
  ]
}`;

  const userPrompt = `Resultados de búsqueda para "${rubro} en ${zona}, Córdoba, Argentina":

${contexto}

Extraé todos los comercios reales que encuentres. Devolvé solo JSON.`;

  const completion = await zai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    thinking: { type: "disabled" },
  });

  const content = completion.choices?.[0]?.message?.content || "";
  // Extraer JSON aunque venga con markdown
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return [];

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return Array.isArray(parsed.comercios) ? parsed.comercios : [];
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rubro, zona } = body;

    if (!rubro || !zona) {
      return NextResponse.json(
        { error: "Faltan campos: rubro y zona son obligatorios" },
        { status: 400 }
      );
    }

    // ── Paso 1: web_search ──────────────────────────────────────
    const zai = await getZai();

    const query = `${rubro} en ${zona}, Córdoba, Argentina contacto dirección teléfono`;
    const searchResults = (await zai.functions.invoke("web_search", {
      query,
      num: 20,
    })) as SearchResult[];

    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      return NextResponse.json({
        ok: true,
        message: `No se encontraron resultados para "${rubro} en ${zona}"`,
        nuevos: [],
        duplicados: 0,
        totalResultados: 0,
      });
    }

    // Filtrar directorios/redes sociales antes de mandar al LLM
    const candidatos = searchResults.filter((r) => !esDirectorioONoComercio(r));

    // ── Paso 2: extraer comercios con LLM ───────────────────────
    const extraidos = await extraerComerciosConLLM(rubro, zona, candidatos);

    if (extraidos.length === 0) {
      return NextResponse.json({
        ok: true,
        message: `Se buscaron resultados pero no se pudieron identificar comercios concretos. Probá con otro rubro o zona.`,
        nuevos: [],
        duplicados: 0,
        totalResultados: searchResults.length,
      });
    }

    // ── Paso 3: idempotencia — consultar comercios existentes ──
    const existentes = await db.comercio.findMany({
      where: { zona },
      select: { nombre: true },
    });
    const existentesSet = new Set(existentes.map((c) => normalizeName(c.nombre)));

    // ── Paso 4: crear los nuevos comercios ──────────────────────
    const nuevos: Array<{ id: string; nombre: string; webUrl: string | null }> = [];
    let duplicados = 0;
    const vistos = new Set<string>(); // para no duplicar dentro del mismo lote

    for (const c of extraidos) {
      const nombreLimpio = (c.nombre || "").trim();
      if (!nombreLimpio) continue;

      const key = normalizeName(nombreLimpio);
      if (!key || key.length < 3) continue;
      if (existentesSet.has(key) || vistos.has(key)) {
        duplicados++;
        continue;
      }
      vistos.add(key);

      // Inferir estadoWeb si no vino del LLM
      const estadoWebFinal = c.estadoWeb || detectarEstadoWeb(c.webUrl);

      // Determinar prioridad basada en estado web
      const prioridad =
        estadoWebFinal.includes("Sin web") || estadoWebFinal.includes("Amateur")
          ? "Alta"
          : estadoWebFinal.includes("Existe")
          ? "Media"
          : "Baja";

      const creado = await db.comercio.create({
        data: {
          nombre: nombreLimpio,
          rubro,
          zona,
          direccion: c.direccion || null,
          telefono: c.telefono || null,
          whatsapp: null,
          email: null,
          webUrl: c.webUrl || null,
          redesSociales: c.redesSociales || null,
          estadoWeb: estadoWebFinal,
          prioridad,
          estado: "Sin contactar",
          notas: c.notas || `Encontrado vía búsqueda online (${new Date().toLocaleDateString("es-AR")})`,
          pitchSugerido: null,
        },
      });

      nuevos.push({
        id: creado.id,
        nombre: creado.nombre,
        webUrl: creado.webUrl,
      });
    }

    return NextResponse.json({
      ok: true,
      message: `${nuevos.length} comercio${nuevos.length === 1 ? "" : "s"} nuevo${nuevos.length === 1 ? "" : "s"} encontrado${nuevos.length === 1 ? "" : "s"} para "${rubro}" en ${zona}.` +
        (duplicados > 0 ? ` ${duplicados} ya estaban cargados.` : ""),
      nuevos,
      duplicados,
      totalResultados: searchResults.length,
    });
  } catch (e) {
    console.error("POST /api/comercios/buscar-online error:", e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `Error al buscar online: ${msg}` },
      { status: 500 }
    );
  }
}
