/**
 * Países de la Unión Europea (27 miembros).
 */
export const PAISES_UE: { value: string; label: string }[] = [
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Bélgica" },
  { value: "BG", label: "Bulgaria" },
  { value: "HR", label: "Croacia" },
  { value: "CY", label: "Chipre" },
  { value: "CZ", label: "República Checa" },
  { value: "DK", label: "Dinamarca" },
  { value: "EE", label: "Estonia" },
  { value: "FI", label: "Finlandia" },
  { value: "FR", label: "Francia" },
  { value: "DE", label: "Alemania" },
  { value: "GR", label: "Grecia" },
  { value: "HU", label: "Hungría" },
  { value: "IE", label: "Irlanda" },
  { value: "IT", label: "Italia" },
  { value: "LV", label: "Letonia" },
  { value: "LT", label: "Lituania" },
  { value: "LU", label: "Luxemburgo" },
  { value: "MT", label: "Malta" },
  { value: "NL", label: "Países Bajos" },
  { value: "PL", label: "Polonia" },
  { value: "PT", label: "Portugal" },
  { value: "RO", label: "Rumanía" },
  { value: "SK", label: "Eslovaquia" },
  { value: "SI", label: "Eslovenia" },
  { value: "ES", label: "España" },
  { value: "SE", label: "Suecia" },
];

export const NIVELES_INGLES = [
  { value: "", label: "Selecciona nivel" },
  { value: "A1", label: "A1 - Básico" },
  { value: "A2", label: "A2 - Elemental" },
  { value: "B1", label: "B1 - Intermedio" },
  { value: "B2", label: "B2 - Intermedio-alto" },
  { value: "C1", label: "C1 - Avanzado" },
  { value: "C2", label: "C2 - Dominio" },
  { value: "Nativo", label: "Nativo" },
];

export const EDAD_MIN = 23;
export const EDAD_MAX = 45;

/**
 * Prefijos telefónicos europeos (solo Europa).
 * Valor = prefijo con + (ej. +34). Etiqueta = "País (+XX)".
 */
export const PREFIJOS_EUROPEOS: { value: string; label: string }[] = [
  { value: "+34", label: "España (+34)" },
  { value: "+351", label: "Portugal (+351)" },
  { value: "+33", label: "Francia (+33)" },
  { value: "+49", label: "Alemania (+49)" },
  { value: "+39", label: "Italia (+39)" },
  { value: "+44", label: "Reino Unido (+44)" },
  { value: "+31", label: "Países Bajos (+31)" },
  { value: "+32", label: "Bélgica (+32)" },
  { value: "+43", label: "Austria (+43)" },
  { value: "+41", label: "Suiza (+41)" },
  { value: "+48", label: "Polonia (+48)" },
  { value: "+40", label: "Rumanía (+40)" },
  { value: "+30", label: "Grecia (+30)" },
  { value: "+36", label: "Hungría (+36)" },
  { value: "+420", label: "República Checa (+420)" },
  { value: "+46", label: "Suecia (+46)" },
  { value: "+45", label: "Dinamarca (+45)" },
  { value: "+358", label: "Finlandia (+358)" },
  { value: "+353", label: "Irlanda (+353)" },
  { value: "+386", label: "Eslovenia (+386)" },
  { value: "+421", label: "Eslovaquia (+421)" },
  { value: "+370", label: "Lituania (+370)" },
  { value: "+371", label: "Letonia (+371)" },
  { value: "+372", label: "Estonia (+372)" },
  { value: "+352", label: "Luxemburgo (+352)" },
  { value: "+356", label: "Malta (+356)" },
  { value: "+357", label: "Chipre (+357)" },
  { value: "+385", label: "Croacia (+385)" },
  { value: "+359", label: "Bulgaria (+359)" },
  { value: "+47", label: "Noruega (+47)" },
  { value: "+354", label: "Islandia (+354)" },
];
