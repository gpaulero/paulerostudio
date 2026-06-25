import { NextRequest, NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Middleware de autenticación para el CRM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Protege:
//   - /admin (la UI del CRM)
//   - /api/comercios (todos los endpoints del CRM)
// Si no hay cookie crm_session válida → redirect a /login (para UI) o 401 (para API)
// Rutas permitidas sin sesión: /, /login, /api/auth/*, /api/chat, /api/exchange (públicas del sitio)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("crm_session")?.value;

  // Si ya hay sesión, dejá pasar
  if (session && session.length > 5) {
    return NextResponse.next();
  }

  // Sin sesión →
  // Si es una API route, devolvé 401
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "No autorizado", requiresAuth: true },
      { status: 401 }
    );
  }

  // Si es /admin, redirect a /login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Protege /admin y todo lo que cuelgue de ahí
    "/admin/:path*",
    // Protege las APIs del CRM (NO protege /api/auth, /api/chat, /api/exchange)
    "/api/comercios/:path*",
  ],
};
