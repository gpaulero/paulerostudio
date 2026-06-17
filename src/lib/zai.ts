// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper para inicializar el SDK de Z-AI en serverless (Vercel)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// El SDK oficial solo lee de archivos .z-ai-config en:
//   1. process.cwd()/.z-ai-config
//   2. os.homedir()/.z-ai-config
//   3. /etc/.z-ai-config
//
// En Vercel serverless runtime:
//   - process.cwd() = /vercel/path0 (read-only)
//   - os.homedir() = /home/something (read-only o inexistente)
//   - /etc = read-only
//   - /tmp = ESCRIBIBLE ✅
//
// Solución: si ZAI_API_KEY está en env vars, escribimos el config
// en /tmp/.z-ai-config y seteamos HOME=/tmp solo para que el SDK
// lo encuentre al recorrer su lista de paths.
//
// En el entorno Z.ai local, /etc/.z-ai-config ya existe y el SDK
// lo encuentra solo — este helper es no-op.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import fs from 'node:fs';
import path from 'node:path';

let initialized = false;

export async function ensureZaiConfig(): Promise<void> {
  if (initialized) return;

  const apiKey = process.env.ZAI_API_KEY;
  const baseUrl = process.env.ZAI_BASE_URL || 'https://internal-api.z.ai/v1';

  if (apiKey) {
    // Escribir config en /tmp (único directorio escribible en Vercel runtime)
    const configPath = '/tmp/.z-ai-config';
    const config = { baseUrl, apiKey };

    try {
      fs.writeFileSync(configPath, JSON.stringify(config), { mode: 0o644 });
    } catch (err) {
      console.error('zai: no se pudo escribir /tmp/.z-ai-config:', err);
    }

    // Setear HOME=/tmp para que el SDK (que busca en os.homedir()) lo encuentre
    // Hacemos esto solo si HOME no apunta ya a /tmp
    if (process.env.HOME !== '/tmp') {
      process.env.HOME = '/tmp';
    }
  }

  initialized = true;
}

export async function getZai() {
  await ensureZaiConfig();
  const ZAI = (await import('z-ai-web-dev-sdk')).default;
  return await ZAI.create();
}
