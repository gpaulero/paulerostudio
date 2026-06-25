// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Tipos compartidos del CRM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Centraliza los tipos Comercio y Seguimiento para que puedan ser
// importados por la página /admin y por los componentes en
// src/components/crm/* sin depender de @/app/page.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
