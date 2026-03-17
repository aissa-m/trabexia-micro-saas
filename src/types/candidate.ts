/**
 * Estados posibles de un candidato según reglas automáticas o manuales.
 */
export type CandidateStatus = "APTO" | "DESCARTADO" | "DUDA";

/**
 * Datos del formulario de candidatura (entrada).
 */
export interface CandidateFormData {
  nombre: string;
  ciudad: string;
  nacionalidadEuropea: "Sí" | "No";
  paisUE: string;
  prefijoTelefono: string;
  telefono: string;
  edad: string;
  carnetB: "Sí" | "No";
  nivelIngles: string;
  experienciaBreve: string;
}

/**
 * Candidato en la app (camelCase). Usado en panel y detalle.
 */
export interface Candidate {
  id: string;
  createdAt: string;
  nombre: string;
  ciudad: string;
  nacionalidadEuropea: "Sí" | "No";
  paisUE: string;
  prefijoTelefono: string;
  telefono: string;
  edad: number;
  carnetB: "Sí" | "No";
  nivelIngles: string;
  experienciaBreve: string;
  estado: CandidateStatus;
  contactado: boolean;
  archivado: boolean;
  updatedAt?: string;
}

/**
 * Claves exactas de las columnas de Google Sheets (objeto snake_case).
 */
export const SHEET_COLUMN_KEYS = [
  "id",
  "fecha",
  "nombre",
  "ciudad",
  "nacionalidad_europea",
  "pais_ue",
  "prefijo_telefono",
  "telefono",
  "edad",
  "carnet_b",
  "nivel_ingles",
  "experiencia",
  "estado_sistema",
  "estado_admin",
  "contactado",
  "archivado",
] as const;

/**
 * Orden real en que el script de Google Sheets devuelve las columnas cuando la fila es un array.
 * (Puede diferir del orden de la cabecera si el script construye el array en otro orden.)
 */
export const SHEET_ARRAY_ORDER: readonly string[] = [
  "id",
  "fecha",
  "nombre",
  "nacionalidad_europea", // 4º en el array = nacionalidad (en hoja suele ser 5º)
  "ciudad",
  "pais_ue",
  "prefijo_telefono",
  "telefono",
  "edad",
  "carnet_b",
  "nivel_ingles",
  "experiencia",
  "estado_sistema",
  "estado_admin",
  "contactado",
  "archivado",
];

/**
 * Fila tal como puede devolverla Google Sheets:
 * - Objeto con claves snake_case (nombres de columnas)
 * - O array de valores en el mismo orden que SHEET_COLUMN_KEYS
 */
export type CandidateRow =
  | { [K in (typeof SHEET_COLUMN_KEYS)[number]]?: unknown }
  | unknown[];
