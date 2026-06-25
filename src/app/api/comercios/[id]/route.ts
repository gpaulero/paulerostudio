import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const comercio = await db.comercio.findUnique({
      where: { id },
      include: {
        seguimientos: { orderBy: { createdAt: "desc" } },
      },
    });
    if (!comercio) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ comercio });
  } catch (e) {
    console.error("GET /api/comercios/[id] error:", e);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const allowed = [
      "nombre", "rubro", "zona", "direccion", "telefono", "whatsapp", "email",
      "webUrl", "redesSociales", "estadoWeb", "prioridad", "estado",
      "notas", "pitchSugerido", "proximaAccion", "fechaProximaAccion",
    ];
    const data: Record<string, unknown> = {};
    for (const k of allowed) {
      if (k in body) data[k] = body[k] ?? null;
    }

    const updated = await db.comercio.update({
      where: { id },
      data,
    });
    return NextResponse.json({ comercio: updated });
  } catch (e) {
    console.error("PATCH /api/comercios/[id] error:", e);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await db.comercio.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/comercios/[id] error:", e);
    return NextResponse.json({ error: "Error al borrar" }, { status: 500 });
  }
}
