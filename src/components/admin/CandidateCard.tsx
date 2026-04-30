import Link from "next/link";
import type { Candidate } from "@/types/candidate";
import { CandidateStatusBadge } from "@/components/admin/CandidateStatusBadge";
import { formatDate } from "@/lib/adminCandidate";

function displayPhone(candidate: Candidate): string {
  const value = [candidate.prefijoTelefono, candidate.telefono].filter(Boolean).join(" ").trim();
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
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900">{candidate.nombre}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{candidate.ciudad || "—"}</p>
        </div>
        <CandidateStatusBadge estado={candidate.estado} />
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>{displayPhone(candidate)}</p>
        <p className="text-xs text-gray-500">Alta: {formatDate(candidate.createdAt)}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-2.5 py-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={candidate.contactado}
            disabled={isUpdating || isDeleting}
            onChange={() => onToggleContactado(candidate)}
            className="rounded border-gray-300 text-trabexia-primary focus:ring-trabexia-primary"
          />
          Contactado
        </label>
        <label className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-2.5 py-2 text-xs text-gray-700">
          <input
            type="checkbox"
            checked={candidate.archivado}
            disabled={isUpdating || isDeleting}
            onChange={() => onToggleArchivado(candidate)}
            className="rounded border-gray-300 text-trabexia-primary focus:ring-trabexia-primary"
          />
          Archivado
        </label>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/admin/candidatos/${candidate.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Ver detalle
        </Link>
        <button
          type="button"
          onClick={() => onDelete(candidate)}
          disabled={isDeleting || isUpdating}
          className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
        >
          {isDeleting ? "Borrando..." : "Borrar"}
        </button>
      </div>
    </article>
  );
}
