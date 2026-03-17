"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Candidate, CandidateStatus } from "@/types/candidate";
import { PAISES_UE } from "@/lib/constants";

const ESTADOS: { value: CandidateStatus | ""; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "APTO", label: "Apto" },
  { value: "DESCARTADO", label: "Descartado" },
  { value: "DUDA", label: "Duda" },
];

function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function paisLabel(code: string) {
  return PAISES_UE.find((p) => p.value === code)?.label ?? code;
}

const Icons = {
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  help: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  filter: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  archive: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  ),
  user: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  map: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>
  ),
  calendar: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  eye: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  trash: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  clipboard: (
    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function MetricCard({
  icon,
  label,
  value,
  color = "gray",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color?: "gray" | "green" | "red" | "amber" | "primary";
}) {
  const colors = {
    gray: "bg-gray-50 border-gray-100 text-gray-900",
    green: "bg-emerald-50 border-emerald-100 text-emerald-700",
    red: "bg-red-50 border-red-100 text-red-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    primary: "bg-trabexia-primary/5 border-trabexia-primary/20 text-trabexia-primary",
  };
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${colors[color]}`}>
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 opacity-80">{icon}</span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</p>
          <p className="text-2xl font-bold mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanelPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterEstado, setFilterEstado] = useState<CandidateStatus | "">("");
  const [filterArchivado, setFilterArchivado] = useState<string>("false");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filterEstado) params.set("estado", filterEstado);
      if (filterArchivado !== "") params.set("archivado", filterArchivado);
      if (search.trim()) params.set("search", search.trim());
      const res = await fetch(`/api/admin/candidates?${params}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Error al cargar");
        setCandidates([]);
        return;
      }
      const data = await res.json();
      setCandidates(data.candidates ?? []);
    } catch {
      setError("Error de conexión");
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [filterEstado, filterArchivado, search]);

  const total = candidates.length;
  const aptos = candidates.filter((c) => c.estado === "APTO").length;
  const descartados = candidates.filter((c) => c.estado === "DESCARTADO").length;
  const duda = candidates.filter((c) => c.estado === "DUDA").length;
  const contactados = candidates.filter((c) => c.contactado).length;

  const handleDelete = async (c: Candidate) => {
    if (!confirm(`¿Borrar a ${c.nombre}? Esta acción no se puede deshacer.`)) return;
    setDeletingId(c.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/candidates/${c.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const serverMsg =
          data.error ??
          (res.status === 404 ? "Candidato no encontrado." : "Error del servidor.");
        setError(
          `No se pudo borrar a ${c.nombre}. ${serverMsg} (código ${res.status}). Comprueba que el script de Google Sheets tenga la acción "delete" desplegada.`
        );
        return;
      }
      setCandidates((prev) => prev.filter((x) => x.id !== c.id));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error de conexión";
      setError(
        `No se pudo borrar: ${msg}. Comprueba la conexión y que GOOGLE_APPS_SCRIPT_URL esté configurada.`
      );
    } finally {
      setDeletingId(null);
    }
  };

  const statusBadge = (estado: CandidateStatus) => {
    const styles = {
      APTO: "bg-emerald-100 text-emerald-800",
      DESCARTADO: "bg-red-100 text-red-800",
      DUDA: "bg-amber-100 text-amber-800",
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[estado] ?? styles.DUDA}`}>
        {estado}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Panel de candidatos</h1>
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
          {Icons.users}
          {total} candidato{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <MetricCard icon={Icons.users} label="Total" value={total} color="gray" />
        <MetricCard icon={Icons.check} label="Aptos" value={aptos} color="green" />
        <MetricCard icon={Icons.x} label="Descartados" value={descartados} color="red" />
        <MetricCard icon={Icons.help} label="Duda" value={duda} color="amber" />
        <MetricCard icon={Icons.phone} label="Contactados" value={contactados} color="primary" />
      </div>

      {/* Filtros */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
          {Icons.filter}
          Filtros
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5">
              {Icons.search}
              Buscar
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nombre o ciudad..."
              className="input-field"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5">
              {Icons.filter}
              Estado
            </label>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as CandidateStatus | "")}
              className="input-field w-auto min-w-[140px]"
            >
              {ESTADOS.map((e) => (
                <option key={e.value || "all"} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5">
              {Icons.archive}
              Archivados
            </label>
            <select
              value={filterArchivado}
              onChange={(e) => setFilterArchivado(e.target.value)}
              className="input-field w-auto min-w-[120px]"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 border border-red-100 flex items-start gap-3">
          {Icons.alert}
          <div>
            <p className="font-semibold">Error al borrar</p>
            <p className="text-sm mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-2 border-trabexia-primary border-t rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Cargando candidatos...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            {Icons.clipboard}
            <p className="mt-4 font-medium text-gray-700">No hay candidatos</p>
            <p className="text-sm text-gray-500 mt-1">Con los filtros actuales no se encontraron resultados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-1.5">{Icons.user} Nombre</span>
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-1.5">{Icons.map} Ciudad</span>
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-1.5">{Icons.phone} Teléfono</span>
                  </th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">País UE</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Edad</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Estado</th>
                    <th className="text-left py-3.5 px-4 font-semibold text-gray-600">Contactado</th>
                  <th className="text-left py-3.5 px-4 font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-1.5">{Icons.calendar} Fecha</span>
                  </th>
                  <th className="text-right py-3.5 px-4 font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{c.nombre}</td>
                    <td className="py-3 px-4 text-gray-600">{c.ciudad}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {[c.prefijoTelefono, c.telefono].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{paisLabel(c.paisUE)}</td>
                    <td className="py-3 px-4 text-gray-600">{c.edad}</td>
                    <td className="py-3 px-4">{statusBadge(c.estado)}</td>
                    <td className="py-3 px-4">
                      {c.contactado ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          {Icons.check}
                          Sí
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{formatDate(c.createdAt)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/candidatos/${c.id}`}
                          className="inline-flex items-center gap-1.5 text-trabexia-primary hover:underline font-medium"
                        >
                          {Icons.eye}
                          Ver
                        </Link>
                        <span className="text-gray-200">|</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(c)}
                          disabled={deletingId === c.id}
                          className="inline-flex items-center gap-1.5 text-red-600 hover:underline text-sm disabled:opacity-50"
                        >
                          {Icons.trash}
                          {deletingId === c.id ? "Borrando..." : "Borrar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
