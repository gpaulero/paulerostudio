"use client";

import type { Comercio } from "@/lib/crm-types";

export function CrmDashboard({ comercios }: { comercios: Comercio[] }) {
  const total = comercios.length;
  const sinContactar = comercios.filter((c) => c.estado === "Sin contactar").length;
  const contactados = comercios.filter((c) =>
    ["Contactado", "Respondio", "Reunion"].includes(c.estado)
  ).length;
  const cerrados = comercios.filter((c) => c.estado === "Cerrado").length;
  const rechazados = comercios.filter((c) => c.estado === "Rechazado").length;
  const altaPrioridad = comercios.filter((c) => c.prioridad === "Alta").length;

  const tasaCierre = total > 0 ? Math.round((cerrados / total) * 100) : 0;

  const cards = [
    {
      label: "Total comercios",
      value: total,
      color: "neutral",
      detail: "en la base",
    },
    {
      label: "Sin contactar",
      value: sinContactar,
      color: "red",
      detail: "pendientes de primer contacto",
    },
    {
      label: "En proceso",
      value: contactados,
      color: "amber",
      detail: "contactados / respondieron / reunión",
    },
    {
      label: "Cerrados",
      value: cerrados,
      color: "emerald",
      detail: "ventas concretadas",
    },
    {
      label: "Tasa de cierre",
      value: `${tasaCierre}%`,
      color: "blue",
      detail: `${cerrados} de ${total}`,
    },
    {
      label: "Prioridad alta",
      value: altaPrioridad,
      color: "rose",
      detail: "foco principal",
    },
  ];

  const colorMap: Record<string, string> = {
    neutral: "bg-neutral-50 border-neutral-200 text-neutral-900",
    red: "bg-red-50 border-red-200 text-red-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    rose: "bg-rose-50 border-rose-200 text-rose-900",
  };

  const labelColor: Record<string, string> = {
    neutral: "text-neutral-500",
    red: "text-red-700",
    amber: "text-amber-700",
    emerald: "text-emerald-700",
    blue: "text-blue-700",
    rose: "text-rose-700",
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-lg border p-3 sm:p-4 ${colorMap[card.color]}`}
        >
          <div className={`text-[11px] sm:text-xs font-medium ${labelColor[card.color]}`}>
            {card.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold mt-1">{card.value}</div>
          <div className="text-[10px] sm:text-xs text-neutral-500 mt-1 hidden sm:block">
            {card.detail}
          </div>
        </div>
      ))}
    </div>
  );
}
