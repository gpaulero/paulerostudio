-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Migración inicial — CRM Paulero Studio
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Ejecutar este SQL en el SQL Editor de Neon (https://neon.tech)
-- después de crear la base de datos.
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Tabla: Comercio
CREATE TABLE IF NOT EXISTS "Comercio" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nombre" TEXT NOT NULL,
    "rubro" TEXT NOT NULL,
    "zona" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "webUrl" TEXT,
    "redesSociales" TEXT,
    "estadoWeb" TEXT,
    "prioridad" TEXT NOT NULL DEFAULT 'Alta',
    "estado" TEXT NOT NULL DEFAULT 'Sin contactar',
    "notas" TEXT,
    "pitchSugerido" TEXT,
    "proximaAccion" TEXT,
    "fechaProximaAccion" TIMESTAMP(3),

    CONSTRAINT "Comercio_pkey" PRIMARY KEY ("id")
);

-- Tabla: Seguimiento
CREATE TABLE IF NOT EXISTS "Seguimiento" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comercioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "resultado" TEXT,

    CONSTRAINT "Seguimiento_pkey" PRIMARY KEY ("id")
);

-- FK: Seguimiento → Comercio (con cascade delete)
ALTER TABLE "Seguimiento"
    ADD CONSTRAINT "Seguimiento_comercioId_fkey"
    FOREIGN KEY ("comercioId") REFERENCES "Comercio"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Índices para mejorar performance de queries comunes
CREATE INDEX IF NOT EXISTS "Comercio_zona_idx" ON "Comercio"("zona");
CREATE INDEX IF NOT EXISTS "Comercio_rubro_idx" ON "Comercio"("rubro");
CREATE INDEX IF NOT EXISTS "Comercio_estado_idx" ON "Comercio"("estado");
CREATE INDEX IF NOT EXISTS "Comercio_prioridad_idx" ON "Comercio"("prioridad");
CREATE INDEX IF NOT EXISTS "Seguimiento_comercioId_idx" ON "Seguimiento"("comercioId");
