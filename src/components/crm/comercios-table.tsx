"use client";

import type { Comercio } from "@/app/page";
import { WhatsAppIcon, ExternalLink, MapPin, Phone } from "@/components/crm/icons";
import { RefreshCw } from "lucide-react";

const ESTADO_STYLES: Record<string, string> = {
  "Sin contactar": "bg-neutral-100 text-neutral-700 border-neutral-300",
  "Contactado": "bg-amber-100 text-amber-800 border-amber-300",
  "Respondio": "bg-blue-100 text-blue-800 border-blue-300",
  "Reunion": "bg-violet-100 text-violet-800 border-violet-300",
  "Cerrado": "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Rechazado": "bg-rose-100 text-rose-800 border-rose-300",
};

const PRIORIDAD_STYLES: Record<string, string> = {
  "Alta": "bg-red-50 text-red-700 border-red-200",
  "Media": "bg-amber-50 text-amber-700 border-amber-200",
  "Baja": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// Convierte strings tipo "(3541) 206969 / (3541) 760004" o "WhatsApp 351 242 9960"
// al formato E.164 sin "+", asumiendo Argentina (54 9 + área + número)
function extractWhatsApp(tel: string | null): string | null {
  if (!tel) return null;
  // Quitar todo lo que no sea dígito
  const digits = tel.replace(/\D/g, "");
  if (!digits) return null;
  // Si ya empieza con 54, devolver
  if (digits.startsWith("54")) return digits;
  // Si tiene 10 dígitos (área + número sin 15), prepend 549
  if (digits.length === 10) return `549${digits}`;
  // Si tiene 11 y empieza con 9 (ya con 15), prepend 54
  if (digits.length === 11 && digits.startsWith("9")) return `54${digits}`;
  // Si tiene 13 y empieza con 549, ya está
  if (digits.length === 13 && digits.startsWith("549")) return digits;
  // Si tiene 12 (54 + 10 dígitos)
  if (digits.length === 12 && digits.startsWith("54")) return digits;
  return digits; // fallback: devolver solo dígitos
}

export function ComerciosTable({
  comercios,
  loading,
  onSelect,
  onRefresh,
}: {
  comercios: Comercio[];
  loading: boolean;
  onSelect: (id: string) => void;
  onRefresh: () => void;
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center text-neutral-500">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
        Cargando comercios...
      </div>
    );
  }

  if (comercios.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
        <p className="text-neutral-700 font-medium">Sin comercios para mostrar</p>
        <p className="text-sm text-neutral-500 mt-1">
          Probá cargar el relevamiento inicial o agregá un comercio nuevo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Comercio</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Zona</th>
              <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Rubro</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Estado web</th>
              <th className="text-left px-4 py-3 font-medium">Estado</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Prio.</th>
              <th className="text-right px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {comercios.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="hover:bg-emerald-50/40 cursor-pointer transition"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-neutral-900">{c.nombre}</div>
                  {c.direccion && (
                    <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate max-w-[260px]">{c.direccion}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-neutral-700">{c.zona}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-neutral-700">{c.rubro}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {c.estadoWeb ? (
                    <span className="text-xs text-neutral-600">{c.estadoWeb}</span>
                  ) : (
                    <span className="text-xs text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full border text-xs font-medium ${ESTADO_STYLES[c.estado] || ESTADO_STYLES["Sin contactar"]}`}
                  >
                    {c.estado}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span
                    className={`inline-block px-2 py-0.5 rounded border text-xs font-medium ${PRIORIDAD_STYLES[c.prioridad] || ""}`}
                  >
                    {c.prioridad}
                  </span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    {(() => {
                      const wpp = c.whatsapp || extractWhatsApp(c.telefono);
                      if (!wpp) return null;
                      return (
                        <a
                          href={`https://wa.me/${wpp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Abrir WhatsApp"
                          className="p-1.5 rounded-md text-emerald-600 hover:bg-emerald-100 transition"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                        </a>
                      );
                    })()}
                    {c.webUrl && (
                      <a
                        href={c.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ver web"
                        className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-100 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {c.telefono && (
                      <a
                        href={`tel:${c.telefono.replace(/\s/g, "")}`}
                        title="Llamar"
                        className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-100 transition"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 text-xs text-neutral-500 border-t border-neutral-100 bg-neutral-50">
        Mostrando {comercios.length} comercios
      </div>
    </div>
  );
}
