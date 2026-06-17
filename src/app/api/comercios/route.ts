import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/comercios — listar todos (con filtros opcionales)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rubro = searchParams.get("rubro");
    const zona = searchParams.get("zona");
    const estado = searchParams.get("estado");
    const prioridad = searchParams.get("prioridad");
    const q = searchParams.get("q");

    const where: Record<string, unknown> = {};
    if (rubro && rubro !== "todos") where.rubro = rubro;
    if (zona && zona !== "todas") where.zona = zona;
    if (estado && estado !== "todos") where.estado = estado;
    if (prioridad && prioridad !== "todas") where.prioridad = prioridad;
    if (q && q.trim()) {
      where.OR = [
        { nombre: { contains: q } },
        { direccion: { contains: q } },
        { telefono: { contains: q } },
        { notas: { contains: q } },
        { redesSociales: { contains: q } },
      ];
    }

    const comercios = await db.comercio.findMany({
      where,
      orderBy: [
        { prioridad: "asc" },
        { zona: "asc" },
        { nombre: "asc" },
      ],
      include: { seguimientos: { orderBy: { createdAt: "desc" }, take: 1 } },
    });
    return NextResponse.json({ comercios });
  } catch (e) {
    console.error("GET /api/comercios error:", e);
    return NextResponse.json({ error: "Error al listar" }, { status: 500 });
  }
}

// POST /api/comercios — crear nuevo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre, rubro, zona, direccion, telefono, whatsapp, email,
      webUrl, redesSociales, estadoWeb, prioridad, pitchSugerido,
    } = body;

    if (!nombre || !rubro || !zona) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: nombre, rubro, zona" },
        { status: 400 }
      );
    }

    const nuevo = await db.comercio.create({
      data: {
        nombre,
        rubro,
        zona,
        direccion: direccion || null,
        telefono: telefono || null,
        whatsapp: whatsapp || null,
        email: email || null,
        webUrl: webUrl || null,
        redesSociales: redesSociales || null,
        estadoWeb: estadoWeb || null,
        prioridad: prioridad || "Alta",
        pitchSugerido: pitchSugerido || null,
        estado: "Sin contactar",
      },
    });
    return NextResponse.json({ comercio: nuevo });
  } catch (e) {
    console.error("POST /api/comercios error:", e);
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}
