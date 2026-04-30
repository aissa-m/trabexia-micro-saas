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
  return `https://wa.me/${digits}`;
}
