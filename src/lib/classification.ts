import type { CandidateStatus } from "@/types/candidate";
import { PAISES_UE, EDAD_MIN, EDAD_MAX } from "./constants";

export interface ClassificationInput {
  nombre: string;
  ciudad: string;
  nacionalidadEuropea: "Sí" | "No";
  paisUE: string;
  edad: string;
  carnetB: "Sí" | "No";
  nivelIngles: string;
  experienciaBreve: string;
}

/**
 * Determina si hay datos incompletos, ambiguos o inconsistentes => DUDA.
 */
function hasDoubt(data: ClassificationInput): boolean {
  const age = parseInt(data.edad, 10);
  const ageValid = !isNaN(age) && age >= EDAD_MIN && age <= EDAD_MAX;

  // Incompletos: campos vacíos donde se espera valor
  const nameIncomplete = !data.nombre?.trim();
  const cityIncomplete = !data.ciudad?.trim();
  const expIncomplete = !data.experienciaBreve?.trim();
  const nivelIncomplete = !data.nivelIngles?.trim();

  // Inconsistencia: dice Sí nacionalidad europea pero no país
  const europeanYesNoCountry =
    data.nacionalidadEuropea === "Sí" && !data.paisUE?.trim();

  // Inconsistencia: dice No pero tiene país seleccionado (no debería pasar si el form limpia)
  const europeanNoWithCountry =
    data.nacionalidadEuropea === "No" && !!data.paisUE?.trim();

  // Ambiguo: edad fuera de rango pero podría ser error de escritura
  const ageOutOfRange = data.edad?.trim() !== "" && !ageValid;

  if (
    nameIncomplete ||
    cityIncomplete ||
    expIncomplete ||
    nivelIncomplete ||
    europeanYesNoCountry ||
    europeanNoWithCountry ||
    ageOutOfRange
  ) {
    return true;
  }

  // Si nacionalidad es No, no podemos ser APTO
  if (data.nacionalidadEuropea === "No") return false;

  return false;
}

/**
 * Comprueba si cumple todos los requisitos para APTO.
 */
function isApto(data: ClassificationInput): boolean {
  const age = parseInt(data.edad, 10);
  if (isNaN(age) || age < EDAD_MIN || age > EDAD_MAX) return false;
  if (data.nacionalidadEuropea !== "Sí") return false;
  if (!data.paisUE?.trim()) return false;

  const paisUEValues = PAISES_UE.map((p) => p.value);
  if (!paisUEValues.includes(data.paisUE)) return false;

  if (data.carnetB !== "Sí") return false;

  return true;
}

/**
 * Calcula el estado automático: APTO | DESCARTADO | DUDA.
 */
export function classifyCandidate(data: ClassificationInput): CandidateStatus {
  if (hasDoubt(data)) return "DUDA";
  if (isApto(data)) return "APTO";
  return "DESCARTADO";
}
