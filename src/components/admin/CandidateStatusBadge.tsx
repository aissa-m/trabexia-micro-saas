import type { CandidateStatus } from "@/types/candidate";

const STATUS_STYLES: Record<CandidateStatus, string> = {
  APTO: "bg-emerald-50 text-emerald-700 border-emerald-200",
  DESCARTADO: "bg-red-50 text-red-700 border-red-200",
  DUDA: "bg-amber-50 text-amber-700 border-amber-200",
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
