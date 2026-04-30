import { PAISES_UE } from "@/lib/constants";

export function formatDate(value: string, withTime = false): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const options: Intl.DateTimeFormatOptions = withTime
    ? {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : { day: "2-digit", month: "2-digit", year: "numeric" };

  return new Intl.DateTimeFormat("es-ES", options).format(date);
}

export function paisLabel(code: string): string {
  if (!code) return "—";
  const normalized = code.toUpperCase();
  return PAISES_UE.find((p) => p.value === normalized)?.label ?? code;
}

export function buildWhatsAppUrl(prefijo: string, telefono: string): string | null {
  const raw = `${prefijo ?? ""}${telefono ?? ""}`;
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  const message =
    "Hola, Te escribimos desde Trabexia porque has sido preseleccionado/a para un puesto en Amazon en Alemania tras revisar tu candidatura. Queríamos saber si sigues interesado/a en continuar con el proceso. En caso afirmativo, te facilitaremos los siguientes pasos lo antes posible. Quedamos a la espera de tu respuesta. Un saludo";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
