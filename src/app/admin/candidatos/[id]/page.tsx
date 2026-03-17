"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Candidate, CandidateStatus } from "@/types/candidate";
import { PAISES_UE } from "@/lib/constants";

const ESTADOS: CandidateStatus[] = ["APTO", "DESCARTADO", "DUDA"];

function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function paisLabel(code: string) {
  return PAISES_UE.find((p) => p.value === code)?.label ?? code;
}

/** Muestra "—" cuando el valor está vacío; evita reutilizar otros campos. */
function displayValue(
  value: string | number | undefined | null,
  options?: { emptyNumberAsDash?: boolean }
): string | number {
  if (value === undefined || value === null) return "—";
  if (typeof value === "string" && value.trim() === "") return "—";
  if (typeof value === "number" && options?.emptyNumberAsDash && value === 0) return "—";
  return value;
}

/* Inline SVG icons (no dependency) */
const Icons = {
  back: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  map: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  flag: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  car: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a2 2 0 012 2v2m-6 12h2m2 0h-2v-2m0 0v-2h2v2m0 0v2h-2m2-4h-2v-2m0 0v-2h2v2z" />
    </svg>
  ),
  language: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  briefcase: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  clock: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  pencil: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  archive: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  ),
  trash: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  save: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
        <p className="mt-0.5 font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function AdminCandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [localEstado, setLocalEstado] = useState<CandidateStatus | "">("");
  const [localContactado, setLocalContactado] = useState(false);
  const [localArchivado, setLocalArchivado] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/candidates/${id}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          const msg =
            data.error ||
            (r.status === 404 ? "Candidato no encontrado." : `Error del servidor (${r.status}).`);
          throw new Error(msg);
        }
        return data;
      })
      .then((data) => {
        if (!cancelled) {
          setCandidate(data);
          setLocalEstado(data.estado);
          setLocalContactado(data.contactado ?? false);
          setLocalArchivado(data.archivado ?? false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          const detail = e.message ?? "Error al cargar el candidato.";
          setError(
            detail +
              " Comprueba que el enlace sea correcto y que la integración con Google Sheets (getById) esté activa."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSave = async () => {
    if (!candidate) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/candidates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado: localEstado,
          contactado: localContactado,
          archivado: localArchivado,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Error al guardar");
        setSaving(false);
        return;
      }
      setCandidate((prev) =>
        prev
          ? {
              ...prev,
              estado: localEstado as CandidateStatus,
              contactado: localContactado,
              archivado: localArchivado,
            }
          : null
      );
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!candidate) return;
    if (!confirm(`¿Borrar definitivamente a ${candidate.nombre}? Esta acción no se puede deshacer.`)) return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/candidates/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const serverMsg = data.error ?? (res.status === 404 ? "Candidato no encontrado." : "Error del servidor.");
        setError(
          `No se pudo borrar el candidato. ${serverMsg} (código ${res.status}). Comprueba que el script de Google Sheets tenga la acción "delete" desplegada.`
        );
        setDeleting(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error de conexión";
      setError(
        `No se pudo borrar: ${msg}. Comprueba la conexión y que GOOGLE_APPS_SCRIPT_URL esté configurada.`
      );
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-10 h-10 border-2 border-trabexia-primary border-t rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">Cargando candidato...</p>
      </div>
    );
  }

  if (error && !candidate) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-trabexia-primary hover:underline font-medium"
        >
          {Icons.back}
          Volver al panel
        </Link>
        <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 border border-red-100">
          <p className="font-semibold mb-1">No se pudo cargar el candidato</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!candidate) return null;

  const hasChanges =
    localEstado !== candidate.estado ||
    localContactado !== candidate.contactado ||
    localArchivado !== candidate.archivado;

  const statusStyles = {
    APTO: "bg-emerald-50 text-emerald-800 border-emerald-200",
    DESCARTADO: "bg-red-50 text-red-800 border-red-200",
    DUDA: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-trabexia-primary font-medium transition"
        >
          {Icons.back}
          Volver al panel
        </Link>
      </div>

      {/* Card principal */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {/* Cabecera con nombre y estado */}
        <div className="bg-gradient-to-r from-trabexia-primary/5 to-transparent px-6 py-6 sm:px-8 sm:py-8 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-trabexia-primary/10 text-trabexia-primary font-bold text-xl">
              {candidate.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {candidate.nombre}
              </h1>
              <p className="mt-0.5 text-sm text-gray-500">
                Candidato · ID {id.slice(0, 8)}…
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${statusStyles[candidate.estado] ?? statusStyles.DUDA}`}
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-75" />
              {candidate.estado}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-0">
          {/* Columna izquierda: datos personales y permisos */}
          <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-gray-100">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
              {Icons.user}
              Datos personales
            </h2>
            <div className="space-y-0">
              <InfoRow icon={Icons.map} label="Ciudad" value={displayValue(candidate.ciudad)} />
              <InfoRow icon={Icons.globe} label="Nacionalidad europea" value={displayValue(candidate.nacionalidadEuropea)} />
              <InfoRow icon={Icons.flag} label="País UE" value={displayValue(paisLabel(candidate.paisUE))} />
              <InfoRow icon={Icons.phone} label="Prefijo telefónico" value={displayValue(candidate.prefijoTelefono)} />
              <InfoRow icon={Icons.phone} label="Teléfono" value={displayValue(candidate.telefono)} />
              <InfoRow icon={Icons.calendar} label="Edad" value={displayValue(candidate.edad, { emptyNumberAsDash: true })} />
            </div>

            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 mt-8 mb-4">
              {Icons.car}
              Permisos y formación
            </h2>
            <div className="space-y-0">
              <InfoRow icon={Icons.car} label="Carnet B" value={displayValue(candidate.carnetB)} />
              <InfoRow icon={Icons.language} label="Nivel de inglés" value={displayValue(candidate.nivelIngles)} />
            </div>
          </div>

          {/* Columna derecha: experiencia y fechas */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
              {Icons.briefcase}
              Experiencia
            </h2>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
              <p className="text-gray-900 whitespace-pre-wrap text-sm leading-relaxed">
                {displayValue(candidate.experienciaBreve) as string}
              </p>
            </div>

            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 mt-8 mb-4">
              {Icons.clock}
              Registro
            </h2>
            <div className="space-y-0">
              <InfoRow icon={Icons.clock} label="Fecha de registro" value={formatDate(candidate.createdAt)} />
              {candidate.updatedAt && (
                <InfoRow icon={Icons.clock} label="Última actualización" value={formatDate(candidate.updatedAt)} />
              )}
            </div>
          </div>
        </div>

        {/* Sección Editar estado */}
        <div className="bg-gray-50/80 border-t border-gray-100 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700 mb-4">
            {Icons.pencil}
            Editar estado
          </h2>
          {error && (
            <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 text-sm border border-red-100 mb-4">
              {error}
            </div>
          )}
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5">
                Estado
              </label>
              <select
                value={localEstado}
                onChange={(e) => setLocalEstado(e.target.value as CandidateStatus)}
                className="input-field w-auto min-w-[160px]"
              >
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localContactado}
                onChange={(e) => setLocalContactado(e.target.checked)}
                className="rounded border-gray-300 text-trabexia-primary focus:ring-trabexia-primary"
              />
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                {Icons.phone}
                Contactado
              </span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localArchivado}
                onChange={(e) => setLocalArchivado(e.target.checked)}
                className="rounded border-gray-300 text-trabexia-primary focus:ring-trabexia-primary"
              />
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                {Icons.archive}
                Archivado
              </span>
            </label>
            {hasChanges && (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 btn-primary disabled:opacity-60"
              >
                {Icons.save}
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            )}
          </div>
        </div>

        {/* Borrar */}
        <div className="px-6 sm:px-8 py-4 border-t border-gray-200 bg-white">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition"
          >
            {Icons.trash}
            {deleting ? "Borrando..." : "Borrar candidato"}
          </button>
        </div>
      </div>
    </div>
  );
}
