import type { CandidateStatus } from "@/types/candidate";

const STATUS_STYLES: Record<CandidateStatus, string> = {
  APTO: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300",
  DESCARTADO:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300",
  DUDA: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300",
};

const STATUS_LABELS: Record<CandidateStatus, string> = {
  APTO: "Apto",
  DESCARTADO: "Descartado",
  DUDA: "Duda",
};

export function CandidateStatusBadge({
  estado,
  className = "",
}: {
  estado: CandidateStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[estado]} ${className}`.trim()}
    >
      {STATUS_LABELS[estado]}
    </span>
  );
}
