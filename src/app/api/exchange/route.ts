import { NextResponse } from "next/server";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API ROUTE: /api/exchange
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Cotización en tiempo real: USD → ARS (blue) + otras monedas Latam.
// Cachea por 1 hora para no consultar de más.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ExchangeRates {
  ARS: number; // Dólar blue
  MXN: number; // México
  COP: number; // Colombia
  CLP: number; // Chile
  BRL: number; // Brasil
  UYU: number; // Uruguay
  PEN: number; // Perú
  updated: string;
  source: string;
}

// Cache en memoria (se resetea en cada deploy, pero evita llamadas por usuario)
let cachedRates: ExchangeRates | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora en ms

async function fetchArgentineBlueRate(): Promise<number> {
  try {
    // dolarapi.com — API gratuita de cotizaciones argentinas
    const res = await fetch("https://dolarapi.com/v1/dolares/blue", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      return data.venta || data.valor || 0;
    }
  } catch {
    // Si dolarapi falla, probamos alternativa
    try {
      const res2 = await fetch("https://api.bluelytics.com.ar/v2/latest");
      if (res2.ok) {
        const data2 = await res2.json();
        return data2.blue?.value_sell || 0;
      }
    } catch {
      // Silencioso
    }
  }
  return 0;
}

async function fetchGeneralRates(): Promise<Record<string, number> | null> {
  try {
    // open.er-api.com — gratuita, sin API key, soporta todas las monedas
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      return data.rates || null;
    }
  } catch {
    // Silencioso
  }
  return null;
}

export async function GET() {
  try {
    // Verificar cache
    if (cachedRates && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedRates);
    }

    // Fetch en paralelo: dólar blue + monedas generales
    const [blueRate, generalRates] = await Promise.all([
      fetchArgentineBlueRate(),
      fetchGeneralRates(),
    ]);

    if (!generalRates && !blueRate) {
      // Si ambos fallan, devolver error
      return NextResponse.json(
        { error: "No se pudieron obtener las cotizaciones" },
        { status: 503 }
      );
    }

    const rates: ExchangeRates = {
      ARS: blueRate || (generalRates?.ARS || 0),
      MXN: generalRates?.MXN || 0,
      COP: generalRates?.COP || 0,
      CLP: generalRates?.CLP || 0,
      BRL: generalRates?.BRL || 0,
      UYU: generalRates?.UYU || 0,
      PEN: generalRates?.PEN || 0,
      updated: new Date().toISOString(),
      source: blueRate ? "dolarapi+er-api" : "er-api",
    };

    // Actualizar cache
    cachedRates = rates;
    cacheTimestamp = Date.now();

    return NextResponse.json(rates);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Error en /api/exchange:", msg);
    return NextResponse.json(
      { error: "Error al obtener cotizaciones" },
      { status: 500 }
    );
  }
}
