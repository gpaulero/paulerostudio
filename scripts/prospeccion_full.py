#!/usr/bin/env python3
"""
Prospección completa en lote — recorre múltiples rubros × zonas
y manda todos los leads a Telegram con pitch sugerido por rubro.

Uso:
    python3 prospeccion_full.py
    python3 prospeccion_full.py --rubros "Hotel,Restaurante" --zonas "La Falda"
"""

import argparse
import sys
import time

sys.path.insert(0, "/home/z/my-project/scripts")
from prospeccion import prospeccion, enviar_leads_telegram, send_telegram

# Configuración base
RUBROS_DEFAULT = [
    "Hotel",
    "Restaurante",
    "Inmobiliaria",
    "Concesionaria",
    "Veterinaria",
    "Gimnasio",
    "Panadería",
    "Peluquería",
]

ZONAS_DEFAULT = [
    "La Falda",
    "Cosquín",
    "Villa Carlos Paz",
]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--rubros", default=None,
                        help="Lista separada por comas (default: 8 rubros)")
    parser.add_argument("--zonas", default=None,
                        help="Lista separada por comas (default: 3 zonas)")
    args = parser.parse_args()

    rubros = args.rubros.split(",") if args.rubros else RUBROS_DEFAULT
    zonas = args.zonas.split(",") if args.zonas else ZONAS_DEFAULT

    print(f"\n{'='*70}")
    print(f"  PROSPECCIÓN COMPLETA")
    print(f"  Rubros ({len(rubros)}): {', '.join(rubros)}")
    print(f"  Zonas ({len(zonas)}): {', '.join(zonas)}")
    print(f"  Total búsquedas: {len(rubros) * len(zonas)}")
    print(f"{'='*70}\n")

    # Aviso inicial
    send_telegram(
        f"📋 <b>Plan de prospección</b>\n\n"
        f"🏷️ Rubros ({len(rubros)}): {', '.join(rubros)}\n"
        f"📍 Zonas ({len(zonas)}): {', '.join(zonas)}\n"
        f"🔍 Total búsquedas: {len(rubros) * len(zonas)}\n\n"
        f"Arrancando ahora. Te mando resultados por rubro×zona a medida que avanzo."
    )

    stats = {
        "total_busquedas": 0,
        "total_leads": 0,
        "total_alta": 0,
        "total_media": 0,
        "errores": 0,
    }
    start_time = time.time()

    for zona in zonas:
        send_telegram(f"📍 <b>Zona: {zona}</b> — arrancando con {len(rubros)} rubros...")
        print(f"\n>>> ZONA: {zona}")

        for rubro in rubros:
            stats["total_busquedas"] += 1
            print(f"\n>>> Buscando {rubro} en {zona}...")
            try:
                leads = prospeccion(rubro, zona)
                stats["total_leads"] += len(leads)
                stats["total_alta"] += sum(1 for l in leads if l["prioridad"] == "Alta")
                stats["total_media"] += sum(1 for l in leads if l["prioridad"] == "Media")

                if leads:
                    enviar_leads_telegram(leads, rubro, zona)
                else:
                    send_telegram(
                        f"ℹ️ <b>{rubro}</b> en <b>{zona}</b>: 0 leads encontrados."
                    )
            except Exception as e:
                print(f"⚠️ Error procesando {rubro} en {zona}: {e}")
                stats["errores"] += 1
                send_telegram(
                    f"⚠️ Error procesando <b>{rubro}</b> en <b>{zona}</b>: {str(e)[:100]}"
                )

            # Pausa corta entre búsquedas para no rate-limit
            time.sleep(2)

    elapsed = time.time() - start_time
    minutes = int(elapsed // 60)
    seconds = int(elapsed % 60)

    # Resumen final
    resumen = (
        f"✅ <b>Prospección completada</b>\n\n"
        f"⏱️ Tiempo total: {minutes}m {seconds}s\n"
        f"🔍 Búsquedas: {stats['total_busquedas']}\n"
        f"📊 Leads encontrados: {stats['total_leads']}\n"
        f"🔥 Alta prioridad: {stats['total_alta']}\n"
        f"🟡 Media prioridad: {stats['total_media']}\n"
        f"⚠️ Errores: {stats['errores']}\n\n"
        f"💡 <i>Recomendación:</i> empezá por los 🔥 Alta (sin web propia) "
        f"— son los más receptivos a una propuesta de web profesional.\n\n"
        f"Cada lead tiene un botón <b>Abrir WhatsApp</b> con el pitch "
        f"pre-escrito para ese rubro. Apretá, personalizá, enviá. 🚀"
    )
    send_telegram(resumen)
    print(f"\n{'='*70}")
    print(f"  ✅ COMPLETADO en {minutes}m {seconds}s")
    print(f"  Leads: {stats['total_leads']} ({stats['total_alta']} alta, {stats['total_media']} media)")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()
