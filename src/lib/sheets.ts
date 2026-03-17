import type {
  Candidate,
  CandidateRow,
  CandidateStatus,
} from "@/types/candidate";
import { SHEET_ARRAY_ORDER, SHEET_COLUMN_KEYS } from "@/types/candidate";
import { classifyCandidate } from "./classification";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

function normalizeBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string")
    return ["true", "1", "sí", "si", "yes"].includes(value.toLowerCase().trim());
  return false;
}

/**
 * Normaliza la fila recibida de Google Sheets a un objeto con claves snake_case.
 * - Si la fila es array: usa SHEET_ARRAY_ORDER (orden real que devuelve el script).
 * - Si es objeto: toma solo las claves snake_case esperadas.
 */
export function normalizeSheetRow(row: CandidateRow): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (Array.isArray(row)) {
    SHEET_ARRAY_ORDER.forEach((key, i) => {
      out[key] = row[i];
    });
    return out;
  }
  const obj = row as Record<string, unknown>;
  SHEET_COLUMN_KEYS.forEach((key) => {
    out[key] = obj[key];
  });
  return out;
}

/**
 * Convierte una fila normalizada (solo claves snake_case) a Candidate (camelCase).
 * Lee únicamente las claves de Sheets; no reutiliza valores de otros campos.
 */
export function rowToCandidate(
  row: Record<string, unknown>,
  idOverride?: string
): Candidate {
  const id = idOverride ?? String(row.id ?? "");
  const fecha = row.fecha;
  const nombre = row.nombre;
  const ciudad = row.ciudad;
  const nacionalidad_europea = row.nacionalidad_europea;
  const pais_ue = row.pais_ue;
  const prefijo_telefono = row.prefijo_telefono;
  const telefono = row.telefono;
  const edad = row.edad;
  const carnet_b = row.carnet_b;
  const nivel_ingles = row.nivel_ingles;
  const experiencia = row.experiencia;
  const estado_sistema = row.estado_sistema;
  const contactado = row.contactado;
  const archivado = row.archivado;

  return {
    id,
    createdAt: fecha != null && String(fecha).trim() !== "" ? String(fecha) : "",
    nombre: nombre != null ? String(nombre) : "",
    ciudad: ciudad != null ? String(ciudad) : "",
    nacionalidadEuropea:
      nacionalidad_europea != null && String(nacionalidad_europea).trim() === "Sí"
        ? "Sí"
        : "No",
    paisUE: pais_ue != null ? String(pais_ue) : "",
    prefijoTelefono: prefijo_telefono != null ? String(prefijo_telefono) : "",
    telefono: telefono != null ? String(telefono) : "",
    edad:
      edad != null && String(edad).trim() !== ""
        ? parseInt(String(edad), 10) || 0
        : 0,
    carnetB:
      carnet_b != null && String(carnet_b).trim() === "Sí" ? "Sí" : "No",
    nivelIngles: nivel_ingles != null ? String(nivel_ingles) : "",
    experienciaBreve: experiencia != null ? String(experiencia) : "",
    estado: (estado_sistema != null && String(estado_sistema).trim() !== ""
      ? String(estado_sistema)
      : "DUDA") as CandidateStatus,
    contactado: normalizeBoolean(contactado),
    archivado: normalizeBoolean(archivado),
  };
}

const LOG_PREFIX = "[CANDIDATURA]";

export async function sheetsFetch(
  action: string,
  payload?: Record<string, unknown>
): Promise<{ ok: boolean; data?: unknown; error?: string }> {
  if (!APPS_SCRIPT_URL?.trim()) {
    return { ok: false, error: "GOOGLE_APPS_SCRIPT_URL no configurada" };
  }
  try {
    if (action === "append") {
      console.log(`${LOG_PREFIX} Sending data to Apps Script`);
    }
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });

    const rawText = await res.text();
    let data: Record<string, unknown> = {};
    try {
      data = rawText ? (JSON.parse(rawText) as Record<string, unknown>) : {};
    } catch {
      if (action === "append") {
        console.log(`${LOG_PREFIX} Response body (no JSON):`, rawText?.slice(0, 500));
      }
    }

    if (action === "append") {
      console.log(`${LOG_PREFIX} Response status:`, res.status, res.statusText);
      console.log(`${LOG_PREFIX} Response body:`, JSON.stringify(data, null, 2));
      if (!res.ok) {
        console.log(`${LOG_PREFIX} Response status (not 200):`, res.status);
        console.log(`${LOG_PREFIX} Response body (error):`, JSON.stringify(data, null, 2));
      }
    }

    if (!res.ok) {
      return { ok: false, error: (data as { error?: string }).error ?? "Error en Sheets" };
    }
    // Apps Script devuelve siempre 200; errores vienen en body como { success: false, error: "..." }
    if ((data as { success?: boolean }).success === false) {
      return {
        ok: false,
        error: (data as { error?: string }).error ?? "Error en Sheets",
      };
    }
    return { ok: true, data };
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    if (action === "append") {
      console.error(`${LOG_PREFIX} ERROR:`, error.message);
      console.error(`${LOG_PREFIX} ERROR stack:`, error.stack);
    }
    return { ok: false, error: error.message };
  }
}

export async function appendCandidate(formData: {
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
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  const estado = classifyCandidate(formData);
  const createdAt = new Date().toISOString();
  const result = await sheetsFetch("append", {
    row: {
      nombre: formData.nombre,
      ciudad: formData.ciudad,
      nacionalidadEuropea: formData.nacionalidadEuropea,
      paisUE: formData.paisUE,
      prefijoTelefono: formData.prefijoTelefono,
      telefono: formData.telefono,
      edad: formData.edad,
      carnetB: formData.carnetB,
      nivelIngles: formData.nivelIngles,
      experienciaBreve: formData.experienciaBreve,
      estado,
      contactado: false,
      archivado: false,
      createdAt,
    },
  });
  if (!result.ok) return { ok: false, error: result.error };
  const id = (result.data as { id?: string })?.id;
  return { ok: true, id };
}

export async function getCandidates(filters?: {
  estado?: CandidateStatus;
  archivado?: boolean;
  search?: string;
}): Promise<{ ok: boolean; candidates?: Candidate[]; error?: string }> {
  const result = await sheetsFetch("getAll", filters ?? {});
  if (!result.ok) return { ok: false, error: result.error };
  const rows = (result.data as { rows?: CandidateRow[] })?.rows ?? [];
  const candidates = rows.map((r, i) => {
    const normalized = normalizeSheetRow(r);
    return rowToCandidate(normalized, String(normalized.id ?? i + 1));
  });
  return { ok: true, candidates };
}

export async function getCandidateById(
  id: string
): Promise<{ ok: boolean; candidate?: Candidate; error?: string }> {
  const result = await sheetsFetch("getById", { id });
  if (!result.ok) return { ok: false, error: result.error };
  const rawRow = (result.data as { row?: CandidateRow })?.row;
  if (rawRow == null) return { ok: false, error: "No encontrado" };

  const normalized = normalizeSheetRow(rawRow);
  const candidate = rowToCandidate(normalized, id);

  // Debug temporal: verificar mapeo fila → Candidate
  console.log(`${LOG_PREFIX} [getCandidateById] id=`, id);
  console.log(`${LOG_PREFIX} [getCandidateById] fila cruda:`, JSON.stringify(rawRow));
  console.log(`${LOG_PREFIX} [getCandidateById] Candidate:`, JSON.stringify(candidate));

  return { ok: true, candidate };
}

export async function updateCandidate(
  id: string,
  updates: Partial<Pick<Candidate, "estado" | "contactado" | "archivado">>
): Promise<{ ok: boolean; error?: string }> {
  const result = await sheetsFetch("update", { id, updates });
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function deleteCandidate(id: string): Promise<{ ok: boolean; error?: string }> {
  const result = await sheetsFetch("delete", { id });
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}
