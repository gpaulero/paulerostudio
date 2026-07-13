"""
Carga leads de los CSV generados por prospectar_maps.py al CRM (Prisma/SQLite).

Lee todos los CSVs en prospeccion-carlos-paz/leads-*.csv y los inserta
en la tabla Comercio. Si ya existe un comercio con mismo nombre+zona,
lo salta (no duplica).

Uso:
    python3 scripts/cargar_leads_crm.py            # carga todos
    python3 scripts/cargar_leads_crm.py --dry-run  # solo muestra qué cargaría
"""

import csv
import sqlite3
import sys
import argparse
import re
from pathlib import Path
from datetime import datetime

DB_PATH = "/home/z/my-project/db/custom.db"
LEADS_DIR = Path("/home/z/my-project/prospeccion-carlos-paz")


def normalizar_telefono(raw: str) -> str:
    """Devuelve teléfono en formato E.164 sin + (ej: 5493541741621)."""
    if not raw:
        return ""
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("54"):
        digits = digits[2:]
    if digits.startswith("9") and len(digits) >= 10:
        digits = digits[1:]
    if digits and not digits.startswith("54"):
        digits = "549" + digits
    return digits


def parse_rubro_zona(filename: str) -> tuple[str, str]:
    """leads-restaurant-villa-carlos-paz.csv → ('restaurant', 'villa carlos paz')."""
    # Quitar prefix y suffix
    name = filename.replace("leads-", "").replace(".csv", "")
    # Split por primer guion que separa rubro de zona
    parts = name.split("-", 1)
    if len(parts) != 2:
        return name, ""
    rubro = parts[0].replace("-", " ")
    zona = parts[1].replace("-", " ")
    return rubro, zona


def inferir_prioridad(oportunidad: str) -> str:
    """Del campo 'oportunidad' del CSV, infiere prioridad."""
    if "Sin web" in oportunidad:
        return "Alta"
    if "Con web" in oportunidad:
        return "Media"
    return "Media"


def inferir_estado_web(oportunidad: str, web: str) -> str:
    if "Sin web" in oportunidad or not web:
        return "Sin web propia"
    return "Existe"


def inferir_pitch(rubro: str, nombre: str) -> str:
    """Genera un pitch sugerido por rubro."""
    pitches = {
        "restaurant": f"Web con menú digital, reservas online y botón de WhatsApp para pedidos. Demo: paulerostudio.com/demos/parrilla-la-esquina",
        "cabañas": f"Web con galería por cabaña, tarifas visibles, WhatsApp flotante. Demo: paulerostudio.com/demos/cabanas-del-lago",
        "abogados": f"Web con páginas por área de práctica, consultas por WhatsApp. Demo: paulerostudio.com/demos/estudio-fernandez-romero",
    }
    return pitches.get(rubro, "Web profesional a medida con Next.js + SEO local.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Solo mostrar, no cargar")
    args = parser.parse_args()

    csvs = sorted(LEADS_DIR.glob("leads-*.csv"))
    if not csvs:
        print("✗ No hay CSVs para cargar.")
        sys.exit(1)

    print(f"=== Cargando {len(csvs)} CSVs al CRM ===\n")

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    total_cargados = 0
    total_skipped = 0

    for csv_path in csvs:
        rubro, zona = parse_rubro_zona(csv_path.name)
        print(f"📄 {csv_path.name}")
        print(f"   Rubro: {rubro!r} | Zona: {zona!r}")

        with open(csv_path, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                nombre = row.get("nombre", "").strip()
                if not nombre:
                    continue

                telefono = row.get("telefono", "").strip()
                telefono_norm = normalizar_telefono(telefono)
                web = row.get("web", "").strip()
                direccion = row.get("direccion", "").strip()
                oportunidad = row.get("oportunidad", "").strip()
                link_maps = row.get("link_maps", "").strip()

                prioridad = inferir_prioridad(oportunidad)
                estado_web = inferir_estado_web(oportunidad, web)
                pitch = inferir_pitch(rubro, nombre)
                notas = f"Extraído de Google Maps el {datetime.now().strftime('%Y-%m-%d')}. Link: {link_maps}"

                # Check duplicados por nombre+zona
                existing = c.execute(
                    "SELECT id FROM Comercio WHERE nombre = ? AND zona = ?",
                    (nombre, zona.title())
                ).fetchone()
                if existing:
                    print(f"   ⏭ Skip (duplicado): {nombre}")
                    total_skipped += 1
                    continue

                if args.dry_run:
                    print(f"   [DRY] + {nombre} | {telefono_norm or 'sin tel'} | {oportunidad}")
                    total_cargados += 1
                    continue

                # Insertar
                # Schema: id, createdAt, updatedAt, nombre, rubro, zona, direccion,
                # telefono, whatsapp, email, webUrl, redesSociales, estadoWeb, prioridad,
                # estado, notas, pitchSugerido, proximaAccion, fechaProximaAccion
                comercio_id = f"cm_{int(datetime.now().timestamp()*1000)}_{total_cargados}"
                c.execute("""
                    INSERT INTO Comercio (
                        id, createdAt, updatedAt, nombre, rubro, zona, direccion,
                        telefono, whatsapp, email, webUrl, redesSociales, estadoWeb,
                        prioridad, estado, notas, pitchSugerido, proximaAccion, fechaProximaAccion
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    comercio_id,
                    datetime.now().isoformat(),
                    datetime.now().isoformat(),
                    nombre,
                    rubro.title(),
                    zona.title(),
                    direccion or None,
                    telefono or None,
                    telefono_norm or None,
                    None,  # email
                    web or None,
                    None,  # redesSociales
                    estado_web,
                    prioridad,
                    "Sin contactar",
                    notas,
                    pitch,
                    "Enviar WhatsApp de presentación",
                    None,
                ))
                total_cargados += 1
                tel_display = telefono_norm or "—"
                print(f"   ✓ {nombre[:45]:45} | {tel_display:15} | {oportunidad}")

        print()

    if not args.dry_run:
        conn.commit()

    # Resumen
    print("=" * 60)
    print(f"RESUMEN")
    print(f"  Cargados:     {total_cargados}")
    print(f"  Duplicados:   {total_skipped}")
    if not args.dry_run:
        db_count = c.execute("SELECT COUNT(*) FROM Comercio").fetchone()[0]
        print(f"  Total en DB:  {db_count}")
        print(f"\n💡 Verlos en: http://localhost:3000/admin")
        print(f"💡 API:        http://localhost:3000/api/comercios")

    conn.close()


if __name__ == "__main__":
    main()
