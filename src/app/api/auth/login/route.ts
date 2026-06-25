import { NextRequest, NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/auth/login
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Login simple por password compartido.
// El password se configura con la env var CRM_PASSWORD.
// Si no está seteada, se usa un default (solo para dev).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DEFAULT_PASSWORD = "paulero2024";

function generateToken(): string {
  // Token simple: timestamp + random, hasheado con una secuencia corta.
  // No es criptográficamente fuerte pero suficiente para uso personal.
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 12);
  return `${ts}.${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const expectedPassword = process.env.CRM_PASSWORD || DEFAULT_PASSWORD;

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = generateToken();
    const response = NextResponse.json({
      ok: true,
      message: "Login exitoso",
    });
    response.cookies.set("crm_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("POST /api/auth/login error:", e);
    return NextResponse.json(
      { error: "Error al procesar el login" },
      { status: 500 }
    );
  }
}
