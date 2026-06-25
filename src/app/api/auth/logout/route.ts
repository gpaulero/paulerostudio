import { NextResponse } from "next/server";

// Logout: borra la cookie de sesión
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("crm_session");
  return response;
}
