import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tipo, contenido, resultado, cambiarEstadoA } = body;

    if (!contenido || !tipo) {
      return NextResponse.json(
        { error: "Faltan campos: tipo, contenido" },
        { status: 400 }
      );
    }

    const seg = await db.seguimiento.create({
      data: {
        comercioId: id,
        tipo,
        contenido,
        resultado: resultado || null,
      },
    });

    if (cambiarEstadoA) {
      await db.comercio.update({
        where: { id },
        data: { estado: cambiarEstadoA },
      });
    }

    return NextResponse.json({ seguimiento: seg });
  } catch (e) {
    console.error("POST seguimiento error:", e);
    return NextResponse.json({ error: "Error al crear seguimiento" }, { status: 500 });
  }
}
