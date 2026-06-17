"use client";

import { useState, useEffect, useMemo } from "react";
import { CrmDashboard } from "@/components/crm/dashboard";
import { ComerciosTable } from "@/components/crm/comercios-table";
import { ComercioModal } from "@/components/crm/comercio-modal";
import { NuevoComercioModal } from "@/components/crm/nuevo-comercio-modal";
import { Plus, Database, RefreshCw, Search, Globe } from "lucide-react";
import { BuscarOnlineModal } from "@/components/crm/buscar-online-modal";

export type Comercio = {
  id: string;
  nombre: string;
  rubro: string;
  zona: string;
  direccion: string | null;
  telefono: string | null;
  whatsapp: string | null;
  email: string | null;
  webUrl: string | null;
  redesSociales: string | null;
  estadoWeb: string | null;
  prioridad: "Alta" | "Media" | "Baja";
  estado: string;
  notas: string | null;
  pitchSugerido: string | null;
  proximaAccion: string | null;
  fechaProximaAccion: string | null;
  createdAt: string;
  updatedAt: string;
  seguimientos?: Seguimiento[];
};

export type Seguimiento = {
  id: string;
  tipo: string;
  contenido: string;
  resultado: string | null;
  createdAt: string;
};

const ESTADOS = [
  "Sin contactar",
  "Contactado",
  "Respondio",
  "Reunion",
  "Cerrado",
  "Rechazado",
];

export default function HomePage() {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showNuevo, setShowNuevo] = useState(false);
  const [showBuscarOnline, setShowBuscarOnline] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const [rubro, setRubro] = useState("todos");
  const [zona, setZona] = useState("todas");
  const [estado, setEstado] = useState("todos");
  const [prioridad, setPrioridad] = useState("todas");
  const [q, setQ] = useState("");

  const fetchComercios = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (rubro !== "todos") params.set("rubro", rubro);
    if (zona !== "todas") params.set("zona", zona);
    if (estado !== "todos") params.set("estado", estado);
    if (prioridad !== "todas") params.set("prioridad", prioridad);
    if (q.trim()) params.set("q", q.trim());
    try {
      const res = await fetch(`/api/comercios?${params}`);
      const data = await res.json();
      setComercios(data.comercios || []);
    } catch (e) {
      console.error("fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComercios();
  }, [rubro, zona, estado, prioridad]);

  const rubros = useMemo(
    () => Array.from(new Set(comercios.map((c) => c.rubro))).sort(),
    [comercios]
  );
  const zonas = useMemo(
    () => Array.from(new Set(comercios.map((c) => c.zona))).sort(),
    [comercios]
  );

  const handleSeed = async () => {
    if (!confirm("¿Cargar los 32 comercios del relevamiento? Solo si la base está vacía.")) return;
    setSeedLoading(true);
    try {
      const res = await fetch("/api/comercios/seed", { method: "POST" });
      const data = await res.json();
      setSeedMessage(data.message);
      await fetchComercios();
    } catch {
      setSeedMessage("Error al precargar");
    } finally {
      setSeedLoading(false);
    }
  };

  const selectedComercio = comercios.find((c) => c.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
              CRM Prospeción <span className="text-emerald-600">Paulero Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              Gestión de comercios prospectados · Valle de Punilla y región
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seedLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-300 disabled:opacity-50 transition"
              title="Cargar los 32 comercios del relevamiento inicial"
            >
              {seedLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Database className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Cargar relevamiento</span>
              <span className="sm:hidden">Cargar</span>
            </button>
            <button
              onClick={() => setShowBuscarOnline(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition"
              title="Buscar comercios por rubro en internet y cargarlos automáticamente"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buscar online</span>
              <span className="sm:hidden">Online</span>
            </button>
            <button
              onClick={() => setShowNuevo(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nuevo comercio</span>
              <span className="sm:hidden">Nuevo</span>
            </button>
          </div>
        </div>
        {seedMessage && (
          <div className="bg-amber-50 border-t border-amber-200 text-amber-800 text-xs px-4 py-2 text-center">
            {seedMessage}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <CrmDashboard comercios={comercios} />

        <div className="bg-white rounded-lg border border-neutral-200 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Search className="w-4 h-4" />
            <span>Filtros</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Buscar</label>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") fetchComercios(); }}
                placeholder="nombre, teléfono, dirección..."
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Rubro</label>
              <select
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="todos">Todos</option>
                {rubros.map((r) => (<option key={r} value={r}>{r}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Zona</label>
              <select
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="todas">Todas</option>
                {zonas.map((z) => (<option key={z} value={z}>{z}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="todos">Todos</option>
                {ESTADOS.map((e) => (<option key={e} value={e}>{e}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Prioridad</label>
              <select
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="todas">Todas</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>
          {(q || rubro !== "todos" || zona !== "todas" || estado !== "todos" || prioridad !== "todas") && (
            <button
              onClick={() => {
                setQ(""); setRubro("todos"); setZona("todas"); setEstado("todos"); setPrioridad("todas");
              }}
              className="text-xs text-emerald-600 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <ComerciosTable
          comercios={comercios}
          loading={loading}
          onSelect={(id) => setSelectedId(id)}
          onRefresh={fetchComercios}
        />
      </main>

      {selectedComercio && (
        <ComercioModal
          comercio={selectedComercio}
          onClose={() => setSelectedId(null)}
          onUpdated={fetchComercios}
        />
      )}

      {showNuevo && (
        <NuevoComercioModal
          onClose={() => setShowNuevo(false)}
          onCreated={() => { setShowNuevo(false); fetchComercios(); }}
        />
      )}

      {showBuscarOnline && (
        <BuscarOnlineModal
          onClose={() => setShowBuscarOnline(false)}
          onCreated={fetchComercios}
          rubrosExistentes={rubros}
          zonasExistentes={zonas}
        />
      )}
    </div>
  );
}
