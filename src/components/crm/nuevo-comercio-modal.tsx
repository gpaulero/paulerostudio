"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

const RUBROS_PRESET = ["Concesionaria", "Hotel", "Restaurante", "Tienda", "Inmobiliaria", "Estudio profesional", "Otro"];
const ZONAS_PRESET = ["Carlos Paz", "La Falda", "Valle Hermoso", "Cosquín", "Capilla del Monte", "La Cumbre"];

export function NuevoComercioModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    nombre: "",
    rubro: "Concesionaria",
    zona: "Carlos Paz",
    direccion: "",
    telefono: "",
    whatsapp: "",
    email: "",
    webUrl: "",
    redesSociales: "",
    estadoWeb: "",
    prioridad: "Alta",
    pitchSugerido: "",
    notas: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.rubro.trim() || !form.zona.trim()) {
      setError("Nombre, rubro y zona son obligatorios");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/comercios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al crear");
        return;
      }
      onCreated();
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Nuevo comercio</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Nombre *</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Rubro *</label>
              <input
                type="text"
                list="rubros-nuevo"
                value={form.rubro}
                onChange={(e) => setForm({ ...form, rubro: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="rubros-nuevo">
                {RUBROS_PRESET.map((r) => <option key={r} value={r} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Zona *</label>
              <input
                type="text"
                list="zonas-nuevo"
                value={form.zona}
                onChange={(e) => setForm({ ...form, zona: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="zonas-nuevo">
                {ZONAS_PRESET.map((z) => <option key={z} value={z} />)}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Dirección</label>
            <input
              type="text"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                placeholder="(3541) 123456"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">WhatsApp (E.164, sin +)</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="5493541123456"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Web URL</label>
            <input
              type="url"
              value={form.webUrl}
              onChange={(e) => setForm({ ...form, webUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Estado web</label>
              <input
                type="text"
                list="estadoweb-nuevo"
                value={form.estadoWeb}
                onChange={(e) => setForm({ ...form, estadoWeb: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <datalist id="estadoweb-nuevo">
                <option value="Sin web propia" />
                <option value="Sin web (solo Facebook)" />
                <option value="Sin web (solo Instagram)" />
                <option value="Amateur (Canva)" />
                <option value="Amateur (Wix)" />
                <option value="Obsoleta (no responsive)" />
                <option value="Decente" />
              </datalist>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Prioridad</label>
              <select
                value={form.prioridad}
                onChange={(e) => setForm({ ...form, prioridad: e.target.value as "Alta" | "Media" | "Baja" })}
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Redes sociales</label>
            <input
              type="text"
              value={form.redesSociales}
              onChange={(e) => setForm({ ...form, redesSociales: e.target.value })}
              placeholder="IG: @usuario · FB: Nombre"
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Pitch sugerido</label>
            <input
              type="text"
              value={form.pitchSugerido}
              onChange={(e) => setForm({ ...form, pitchSugerido: e.target.value })}
              placeholder="Qué ofrecerle (ej: Landing Page con catálogo)"
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Notas internas</label>
            <textarea
              rows={3}
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-sm px-3 py-2 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-neutral-200 flex justify-end gap-2 bg-neutral-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-100 rounded-md border border-neutral-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-md transition"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? "Guardando..." : "Crear comercio"}
          </button>
        </div>
      </div>
    </div>
  );
}
