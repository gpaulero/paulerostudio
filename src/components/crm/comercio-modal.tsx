"use client";

import { useState, useEffect } from "react";
import type { Comercio, Seguimiento } from "@/lib/crm-types";
import {
  WhatsAppIcon, ExternalLink, MapPin, Phone, Mail, X,
} from "@/components/crm/icons";
import { Trash2, Save, Plus, Globe, Tag, AlertCircle } from "lucide-react";

const ESTADOS = [
  "Sin contactar", "Contactado", "Respondio", "Reunion", "Cerrado", "Rechazado",
];

const ESTADO_STYLES: Record<string, string> = {
  "Sin contactar": "bg-neutral-100 text-neutral-700 border-neutral-300",
  "Contactado": "bg-amber-100 text-amber-800 border-amber-300",
  "Respondio": "bg-blue-100 text-blue-800 border-blue-300",
  "Reunion": "bg-violet-100 text-violet-800 border-violet-300",
  "Cerrado": "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Rechazado": "bg-rose-100 text-rose-800 border-rose-300",
};

const TIPOS_SEGUIMIENTO = [
  "nota", "whatsapp", "llamada", "email", "reunion", "cierre",
];

function extractWhatsApp(tel: string | null): string | null {
  if (!tel) return null;
  const digits = tel.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("54")) return digits;
  if (digits.length === 10) return `549${digits}`;
  if (digits.length === 11 && digits.startsWith("9")) return `54${digits}`;
  if (digits.length === 13 && digits.startsWith("549")) return digits;
  if (digits.length === 12 && digits.startsWith("54")) return digits;
  return digits;
}

function formatFecha(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-AR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function ComercioModal({
  comercio,
  onClose,
  onUpdated,
}: {
  comercio: Comercio;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [tab, setTab] = useState<"info" | "seguimientos" | "editar">("info");
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([]);
  const [loadingSeg, setLoadingSeg] = useState(true);

  // Form de nuevo seguimiento
  const [nuevoSegTipo, setNuevoSegTipo] = useState("whatsapp");
  const [nuevoSegTexto, setNuevoSegTexto] = useState("");
  const [nuevoSegEstado, setNuevoSegEstado] = useState<string>("");
  const [savingSeg, setSavingSeg] = useState(false);

  // Form de edición
  const [editForm, setEditForm] = useState({
    nombre: comercio.nombre,
    rubro: comercio.rubro,
    zona: comercio.zona,
    direccion: comercio.direccion || "",
    telefono: comercio.telefono || "",
    whatsapp: comercio.whatsapp || "",
    email: comercio.email || "",
    webUrl: comercio.webUrl || "",
    redesSociales: comercio.redesSociales || "",
    estadoWeb: comercio.estadoWeb || "",
    prioridad: comercio.prioridad,
    notas: comercio.notas || "",
    pitchSugerido: comercio.pitchSugerido || "",
    proximaAccion: comercio.proximaAccion || "",
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [editMsg, setEditMsg] = useState<string | null>(null);

  // Cambio rápido de estado
  const [estadoActual, setEstadoActual] = useState(comercio.estado);
  const [cambiandoEstado, setCambiandoEstado] = useState(false);

  useEffect(() => {
    setEstadoActual(comercio.estado);
  }, [comercio.estado]);

  useEffect(() => {
    async function fetchSeg() {
      try {
        const res = await fetch(`/api/comercios/${comercio.id}`);
        const data = await res.json();
        setSeguimientos(data.comercio?.seguimientos || []);
      } catch {
        // ignore
      } finally {
        setLoadingSeg(false);
      }
    }
    fetchSeg();
  }, [comercio.id]);

  const wpp = comercio.whatsapp || extractWhatsApp(comercio.telefono);

  const handleCambiarEstado = async (nuevo: string) => {
    setCambiandoEstado(true);
    try {
      await fetch(`/api/comercios/${comercio.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevo }),
      });
      setEstadoActual(nuevo);
      onUpdated();
    } finally {
      setCambiandoEstado(false);
    }
  };

  const handleAgregarSeguimiento = async () => {
    if (!nuevoSegTexto.trim()) return;
    setSavingSeg(true);
    try {
      const res = await fetch(`/api/comercios/${comercio.id}/seguimientos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: nuevoSegTipo,
          contenido: nuevoSegTexto,
          cambiarEstadoA: nuevoSegEstado || undefined,
        }),
      });
      const data = await res.json();
      if (data.seguimiento) {
        setSeguimientos([data.seguimiento, ...seguimientos]);
        setNuevoSegTexto("");
        setNuevoSegEstado("");
        if (nuevoSegEstado) {
          setEstadoActual(nuevoSegEstado);
        }
        onUpdated();
      }
    } finally {
      setSavingSeg(false);
    }
  };

  const handleGuardarEdicion = async () => {
    setSavingEdit(true);
    setEditMsg(null);
    try {
      const res = await fetch(`/api/comercios/${comercio.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setEditMsg("Guardado ✓");
        onUpdated();
        setTimeout(() => setEditMsg(null), 2500);
      } else {
        setEditMsg("Error al guardar");
      }
    } finally {
      setSavingEdit(false);
    }
  };

  const handleEliminar = async () => {
    if (!confirm(`¿Eliminar "${comercio.nombre}"? Esta acción no se puede deshacer.`)) return;
    await fetch(`/api/comercios/${comercio.id}`, { method: "DELETE" });
    onUpdated();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 truncate">
                {comercio.nombre}
              </h2>
              <span className={`inline-block px-2 py-0.5 rounded-full border text-xs font-medium ${ESTADO_STYLES[estadoActual] || ESTADO_STYLES["Sin contactar"]}`}>
                {estadoActual}
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-1 flex items-center gap-3 flex-wrap">
              <span>{comercio.zona}</span>
              <span className="text-neutral-300">·</span>
              <span>{comercio.rubro}</span>
              {comercio.prioridad && (
                <>
                  <span className="text-neutral-300">·</span>
                  <span className={`font-medium ${comercio.prioridad === "Alta" ? "text-red-600" : comercio.prioridad === "Media" ? "text-amber-600" : "text-emerald-600"}`}>
                    Prio. {comercio.prioridad}
                  </span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 transition shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 border-b border-neutral-200 flex gap-1">
          {([
            { id: "info", label: "Info" },
            { id: "seguimientos", label: `Seguimiento${seguimientos.length ? ` (${seguimientos.length})` : ""}` },
            { id: "editar", label: "Editar" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t-md transition border-b-2 -mb-px ${
                tab === t.id
                  ? "text-emerald-700 border-emerald-600"
                  : "text-neutral-600 border-transparent hover:text-neutral-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === "info" && (
            <>
              {/* Acciones rápidas */}
              <div className="flex flex-wrap gap-2">
                {wpp && (
                  <a
                    href={`https://wa.me/${wpp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Abrir WhatsApp
                  </a>
                )}
                {comercio.webUrl && (
                  <a
                    href={comercio.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-300 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver web
                  </a>
                )}
                {comercio.telefono && (
                  <a
                    href={`tel:${comercio.telefono.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-300 transition"
                  >
                    <Phone className="w-4 h-4" />
                    Llamar
                  </a>
                )}
                {comercio.email && (
                  <a
                    href={`mailto:${comercio.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-300 transition"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                )}
              </div>

              {/* Cambio rápido de estado */}
              <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                <div className="text-xs font-medium text-neutral-600 mb-2">
                  Cambiar estado rápidamente:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ESTADOS.map((e) => (
                    <button
                      key={e}
                      onClick={() => handleCambiarEstado(e)}
                      disabled={cambiandoEstado || estadoActual === e}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition ${
                        estadoActual === e
                          ? ESTADO_STYLES[e] + " opacity-100 ring-2 ring-offset-1 ring-emerald-400"
                          : "bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Datos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {comercio.direccion && (
                  <InfoItem icon={<MapPin className="w-4 h-4" />} label="Dirección" value={comercio.direccion} />
                )}
                {comercio.telefono && (
                  <InfoItem icon={<Phone className="w-4 h-4" />} label="Teléfono" value={comercio.telefono} />
                )}
                {comercio.email && (
                  <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={comercio.email} />
                )}
                {comercio.webUrl && (
                  <InfoItem icon={<Globe className="w-4 h-4" />} label="Web" value={comercio.webUrl} link={comercio.webUrl} />
                )}
                {comercio.redesSociales && (
                  <InfoItem icon={<Tag className="w-4 h-4" />} label="Redes sociales" value={comercio.redesSociales} />
                )}
                {comercio.estadoWeb && (
                  <InfoItem icon={<AlertCircle className="w-4 h-4" />} label="Estado web" value={comercio.estadoWeb} />
                )}
              </div>

              {/* Pitch sugerido */}
              {comercio.pitchSugerido && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                    Pitch sugerido
                  </div>
                  <div className="text-sm text-emerald-900">{comercio.pitchSugerido}</div>
                </div>
              )}

              {/* Notas internas */}
              {comercio.notas && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                    Notas internas
                  </div>
                  <div className="text-sm text-amber-900 whitespace-pre-wrap">{comercio.notas}</div>
                </div>
              )}

              {/* Próxima acción */}
              {comercio.proximaAccion && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
                    Próxima acción
                  </div>
                  <div className="text-sm text-blue-900">{comercio.proximaAccion}</div>
                </div>
              )}
            </>
          )}

          {tab === "seguimientos" && (
            <div className="space-y-4">
              {/* Form nuevo seguimiento */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 space-y-2">
                <div className="text-xs font-medium text-neutral-700">Agregar seguimiento</div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={nuevoSegTipo}
                    onChange={(e) => setNuevoSegTipo(e.target.value)}
                    className="px-2 py-1.5 text-sm border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {TIPOS_SEGUIMIENTO.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <select
                    value={nuevoSegEstado}
                    onChange={(e) => setNuevoSegEstado(e.target.value)}
                    className="px-2 py-1.5 text-sm border border-neutral-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">— sin cambiar estado —</option>
                    {ESTADOS.map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={nuevoSegTexto}
                  onChange={(e) => setNuevoSegTexto(e.target.value)}
                  rows={2}
                  placeholder="Qué pasó? Qué te dijeron? Qué acordaron?"
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAgregarSeguimiento}
                    disabled={!nuevoSegTexto.trim() || savingSeg}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-md transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Agregar
                  </button>
                </div>
              </div>

              {/* Historial */}
              <div>
                <div className="text-sm font-medium text-neutral-700 mb-2">
                  Historial ({seguimientos.length})
                </div>
                {loadingSeg ? (
                  <div className="text-sm text-neutral-500 text-center py-4">Cargando...</div>
                ) : seguimientos.length === 0 ? (
                  <div className="text-sm text-neutral-500 text-center py-6 bg-neutral-50 rounded-md border border-dashed border-neutral-300">
                    Sin seguimientos todavía. Agregá el primero arriba.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {seguimientos.map((s) => (
                      <div
                        key={s.id}
                        className="border border-neutral-200 rounded-md p-3 bg-white"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                              {s.tipo}
                            </span>
                            {s.resultado && (
                              <span className="text-xs text-neutral-600">
                                · {s.resultado}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-400">
                            {formatFecha(s.createdAt)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-800 whitespace-pre-wrap">
                          {s.contenido}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "editar" && (
            <div className="space-y-3">
              <Field label="Nombre *">
                <input
                  type="text"
                  value={editForm.nombre}
                  onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Rubro *">
                  <input
                    type="text"
                    list="rubros-list"
                    value={editForm.rubro}
                    onChange={(e) => setEditForm({ ...editForm, rubro: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <datalist id="rubros-list">
                    <option value="Concesionaria" />
                    <option value="Hotel" />
                    <option value="Restaurante" />
                    <option value="Tienda" />
                    <option value="Inmobiliaria" />
                    <option value="Estudio profesional" />
                    <option value="Otro" />
                  </datalist>
                </Field>
                <Field label="Zona *">
                  <input
                    type="text"
                    list="zonas-list"
                    value={editForm.zona}
                    onChange={(e) => setEditForm({ ...editForm, zona: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <datalist id="zonas-list">
                    <option value="Carlos Paz" />
                    <option value="La Falda" />
                    <option value="Valle Hermoso" />
                    <option value="Cosquín" />
                    <option value="Capilla del Monte" />
                    <option value="La Cumbre" />
                  </datalist>
                </Field>
              </div>
              <Field label="Dirección">
                <input
                  type="text"
                  value={editForm.direccion}
                  onChange={(e) => setEditForm({ ...editForm, direccion: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Teléfono">
                  <input
                    type="text"
                    value={editForm.telefono}
                    onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </Field>
                <Field label="WhatsApp (E.164, sin +)">
                  <input
                    type="text"
                    placeholder="5493541206969"
                    value={editForm.whatsapp}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </Field>
              </div>
              <Field label="Email">
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <Field label="Web URL">
                <input
                  type="url"
                  value={editForm.webUrl}
                  onChange={(e) => setEditForm({ ...editForm, webUrl: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <Field label="Redes sociales">
                <input
                  type="text"
                  value={editForm.redesSociales}
                  onChange={(e) => setEditForm({ ...editForm, redesSociales: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Estado web">
                  <input
                    type="text"
                    list="estadoweb-list"
                    value={editForm.estadoWeb}
                    onChange={(e) => setEditForm({ ...editForm, estadoWeb: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <datalist id="estadoweb-list">
                    <option value="Sin web propia" />
                    <option value="Sin web (solo Facebook)" />
                    <option value="Sin web (solo Instagram)" />
                    <option value="Amateur (Canva)" />
                    <option value="Amateur (Wix)" />
                    <option value="Amateur (Google Sites)" />
                    <option value="Obsoleta (no responsive)" />
                    <option value="Decente" />
                  </datalist>
                </Field>
                <Field label="Prioridad">
                  <select
                    value={editForm.prioridad}
                    onChange={(e) => setEditForm({ ...editForm, prioridad: e.target.value as "Alta" | "Media" | "Baja" })}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </Field>
              </div>
              <Field label="Pitch sugerido (qué ofrecerle)">
                <input
                  type="text"
                  value={editForm.pitchSugerido}
                  onChange={(e) => setEditForm({ ...editForm, pitchSugerido: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <Field label="Notas internas">
                <textarea
                  rows={3}
                  value={editForm.notas}
                  onChange={(e) => setEditForm({ ...editForm, notas: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>
              <Field label="Próxima acción">
                <input
                  type="text"
                  value={editForm.proximaAccion}
                  onChange={(e) => setEditForm({ ...editForm, proximaAccion: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </Field>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <button
                  onClick={handleEliminar}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-md transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar
                </button>
                <div className="flex items-center gap-3">
                  {editMsg && <span className="text-xs text-emerald-700">{editMsg}</span>}
                  <button
                    onClick={handleGuardarEdicion}
                    disabled={savingEdit}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-md transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, link }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <div className="bg-neutral-50 rounded-md p-2.5 border border-neutral-200">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-neutral-500 mb-0.5">
        {icon}
        <span>{label}</span>
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-emerald-700 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <div className="text-sm text-neutral-800">{value}</div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
