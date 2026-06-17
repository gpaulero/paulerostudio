import { PrismaClient } from '@prisma/client'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Prisma Client singleton — funciona tanto en dev (SQLite/local Postgres)
// como en producción (Neon Postgres serverless en Vercel).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Usamos el PrismaClient estándar. Para apps serverless en Vercel,
// el adapter @prisma/adapter-neon sería lo óptimo pero requiere
// configuración extra. El cliente estándar funciona bien con
// DATABASE_URL directa (Neon soporta pgbouncer mode connection string).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // En producción, no loguear queries (performance + ruido en logs de Vercel)
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
