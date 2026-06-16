import Link from "next/link";
import type { Candidate } from "@/types/candidate";
import { CandidateStatusBadge } from "@/components/admin/CandidateStatusBadge";
import { formatDate } from "@/lib/adminCandidate";

function displayPhone(candidate: Candidate): string {
  const value = [candidate.prefijoTelefono, candidate.telefono]
    .filter(Boolean)
    .join(" ")
    .trim();
  return value || "—";
}

export function CandidateCard({
  candidate,
  isUpdating,
  isDeleting,
  onToggleContactado,
  onToggleArchivado,
  onDelete,
}: {
  candidate: Candidate;
  isUpdating: boolean;
  isDeleting: boolean;
  onToggleContactado: (candidate: Candidate) => void;
  onToggleArchivado: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
            {candidate.nombre}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {candidate.ciudad || "—"}
          </p>
        </div>
        <CandidateStatusBadge estado={candidate.estado} />
      </div>

      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
        <p>{displayPhone(candidate)}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Alta: {formatDate(candidate.createdAt)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={candidate.contactado}
            disabled={isUpdating || isDeleting}
            onChange={() => onToggleContactado(candidate)}
            className="rounded border-slate-300 text-trabexia-primary focus:ring-trabexia-primary dark:border-slate-600"
          />
          Contactado
        </label>
        <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={candidate.archivado}
            disabled={isUpdating || isDeleting}
            onChange={() => onToggleArchivado(candidate)}
            className="rounded border-slate-300 text-trabexia-primary focus:ring-trabexia-primary dark:border-slate-600"
          />
          Archivado
        </label>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/admin/candidatos/${candidate.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Ver detalle
        </Link>
        <button
          type="button"
          onClick={() => onDelete(candidate)}
          disabled={isDeleting || isUpdating}
          className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
        >
          {isDeleting ? "Borrando..." : "Borrar"}
        </button>
      </div>
    </article>
  );
}
