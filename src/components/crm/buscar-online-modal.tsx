"use client";

import { useState, useMemo } from "react";
import { Globe, X, Loader2, Search, CheckCircle2, AlertCircle } from "lucide-react";

const RUBROS_SUGERIDOS = [
  "Concesionaria",
  "Hotel",
  "Restaurante",
  "Cafetería",
  "Inmobiliaria",
  "Boutique / Tienda de ropa",
  "Farmacia",
  "Veterinaria",
  "Gimnasio",
  "Clínica / Consultorio",
  "Estética / Peluquería",
  "Ferretería",
  "Bodega / Vinoteca",
  "Panadería",
  "Carpintería",
  "Estación de servicio",
  "Estudio jurídico",
  "Estudio contable",
  "Distribuidora",
  "Tienda de electrónica",
];

const ZONAS_SUGERIDAS = [
  "Villa Carlos Paz",
  "Carlos Paz",
  "Cosquín",
  "La Falda",
  "Valle Hermoso",
  "Capilla del Monte",
  "La Cumbre",
  "Tanti",
  "Santa María de Punilla",
  "Bialet Massé",
  "Villa Giardino",
  "Huerta Grande",
  "La Cumbrecita",
  "San Esteban",
  "Cruz del Eje",
];

type Result = {
  id: string;
  nombre: string;
  webUrl: string | null;
};

export function BuscarOnlineModal({
  onClose,
  onCreated,
  rubrosExistentes = [],
  zonasExistentes = [],
}: {
  onClose: () => void;
  onCreated: () => void;
  rubrosExistentes?: string[];
  zonasExistentes?: string[];
}) {
  const [rubro, setRubro] = useState("");
  const [zona, setZona] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    nuevos: Result[];
    duplicados: number;
    totalResultados: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Combinar sugerencias con los que ya existen en la BD
  const rubrosOptions = useMemo(() => {
    const set = new Set([...RUBROS_SUGERIDOS, ...rubrosExistentes]);
    return Array.from(set).sort();
  }, [rubrosExistentes]);

  const zonasOptions = useMemo(() => {
    const set = new Set([...ZONAS_SUGERIDAS, ...zonasExistentes]);
    return Array.from(set).sort();
  }, [zonasExistentes]);

  const canSubmit = rubro.trim() && zona.trim() && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/comercios/buscar-online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rubro: rubro.trim(), zona: zona.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al buscar");
        return;
      }
      setResult({
        message: data.message,
        nuevos: data.nuevos || [],
        duplicados: data.duplicados || 0,
        totalResultados: data.totalResultados || 0,
      });
      if ((data.nuevos || []).length > 0) {
        onCreated();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl border border-neutral-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-neutral-900">
              Buscar comercios online
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-1.5 rounded-md hover:bg-neutral-100 disabled:opacity-50"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 overflow-y-auto flex-1 space-y-4">
          <p className="text-sm text-neutral-600">
            Ingresá un rubro y una zona. El sistema busca en internet comercios reales de ese rubro en esa zona,
            extrae sus datos de contacto y los carga automáticamente en el CRM (sin repetir los que ya tenés).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Rubro <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
                list="rubros-list"
                placeholder="Ej: Concesionaria"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="rubros-list">
                {rubrosOptions.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Zona <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                list="zonas-list"
                placeholder="Ej: Villa Carlos Paz"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="zonas-list">
                {zonasOptions.map((z) => (
                  <option key={z} value={z} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Estado: error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Estado: resultado */}
          {result && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{result.message}</span>
              </div>

              {result.nuevos.length > 0 && (
                <div className="border border-neutral-200 rounded-md overflow-hidden">
                  <div className="bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 border-b border-neutral-200">
                    {result.nuevos.length} comercio{result.nuevos.length === 1 ? "" : "s"} agregado{result.nuevos.length === 1 ? "" : "s"} a la base
                  </div>
                  <ul className="divide-y divide-neutral-100 max-h-60 overflow-y-auto">
                    {result.nuevos.map((c) => (
                      <li key={c.id} className="px-3 py-2 text-sm flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-neutral-900 truncate">{c.nombre}</span>
                        </div>
                        {c.webUrl && (
                          <a
                            href={c.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-600 hover:underline flex-shrink-0 truncate max-w-[40%]"
                            title={c.webUrl}
                          >
                            Ver web
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-xs text-neutral-500 grid grid-cols-2 gap-2">
                <span>Total resultados en la búsqueda: <strong>{result.totalResultados}</strong></span>
                <span>Duplicados omitidos: <strong>{result.duplicados}</strong></span>
              </div>
            </div>
          )}

          {/* Hint mientras carga */}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 bg-blue-50 border border-blue-200 rounded-md p-3">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>
                Buscando en internet comercios de <strong>{rubro}</strong> en <strong>{zona}</strong>… Esto puede tardar 10-20 segundos.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-200 flex items-center justify-end gap-2">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-md disabled:opacity-50 transition"
          >
            {result ? "Cerrar" : "Cancelar"}
          </button>
          {!result && (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {loading ? "Buscando…" : "Buscar y agregar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
