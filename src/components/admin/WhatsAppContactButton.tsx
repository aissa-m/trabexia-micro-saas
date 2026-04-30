import Link from "next/link";

export function WhatsAppContactButton({
  href,
  className = "",
  unavailableClassName = "",
}: {
  href: string | null;
  className?: string;
  unavailableClassName?: string;
}) {
  if (!href) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 ${unavailableClassName}`.trim()}
      >
        Teléfono no disponible
      </div>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 ${className}`.trim()}
    >
      Contactar por WhatsApp
    </Link>
  );
}
