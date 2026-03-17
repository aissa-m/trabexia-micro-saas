import { PAISES_UE, EDAD_MIN, EDAD_MAX, NIVELES_INGLES, PREFIJOS_EUROPEOS } from "./constants";
import type { CandidateFormData } from "@/types/candidate";

export interface ValidationErrors {
  nombre?: string;
  ciudad?: string;
  nacionalidadEuropea?: string;
  paisUE?: string;
  prefijoTelefono?: string;
  telefono?: string;
  edad?: string;
  carnetB?: string;
  nivelIngles?: string;
  experienciaBreve?: string;
}

export function validateForm(data: CandidateFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.nombre?.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  }

  if (!data.ciudad?.trim()) {
    errors.ciudad = "La ciudad es obligatoria.";
  }

  if (!data.nacionalidadEuropea) {
    errors.nacionalidadEuropea = "Indica si tienes nacionalidad europea.";
  }

  if (data.nacionalidadEuropea === "Sí") {
    const validPaises = PAISES_UE.map((p) => p.value);
    if (!data.paisUE?.trim()) {
      errors.paisUE = "Selecciona un país de la UE.";
    } else if (!validPaises.includes(data.paisUE)) {
      errors.paisUE = "Selecciona un país válido de la UE.";
    }
  }
  // Si nacionalidad europea = No, paisUE debe quedar vacío (se limpia en el formulario)

  const prefijosValidos = PREFIJOS_EUROPEOS.map((p) => p.value);
  if (!data.prefijoTelefono?.trim()) {
    errors.prefijoTelefono = "Selecciona el prefijo telefónico.";
  } else if (!prefijosValidos.includes(data.prefijoTelefono)) {
    errors.prefijoTelefono = "Selecciona un prefijo válido.";
  }

  if (!data.telefono?.trim()) {
    errors.telefono = "El teléfono es obligatorio.";
  } else if (!/^[\d\s\-]{6,20}$/.test(data.telefono.trim())) {
    errors.telefono = "Introduce un número de teléfono válido (solo números, espacios o guiones).";
  }

  const age = data.edad ? parseInt(data.edad, 10) : NaN;
  if (!data.edad?.trim()) {
    errors.edad = "La edad es obligatoria.";
  } else if (isNaN(age)) {
    errors.edad = "La edad debe ser un número.";
  } else if (age < EDAD_MIN || age > EDAD_MAX) {
    errors.edad = `La edad debe estar entre ${EDAD_MIN} y ${EDAD_MAX}.`;
  }

  if (!data.carnetB) {
    errors.carnetB = "Indica si tienes carnet B.";
  }

  const nivelesValidos = NIVELES_INGLES.filter((n) => n.value).map((n) => n.value);
  if (!data.nivelIngles?.trim()) {
    errors.nivelIngles = "Selecciona tu nivel de inglés.";
  } else if (!nivelesValidos.includes(data.nivelIngles)) {
    errors.nivelIngles = "Selecciona un nivel válido.";
  }

  if (!data.experienciaBreve?.trim()) {
    errors.experienciaBreve = "Describe brevemente tu experiencia.";
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
