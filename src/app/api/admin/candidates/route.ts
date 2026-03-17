import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";
import { getCandidates } from "@/lib/sheets";
import type { CandidateStatus } from "@/types/candidate";

export async function GET(request: NextRequest) {
  const session = await hasAdminSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const estado = searchParams.get("estado") as CandidateStatus | null;
  const archivado = searchParams.get("archivado");
  const search = searchParams.get("search") ?? undefined;

  const filters: { estado?: CandidateStatus; archivado?: boolean; search?: string } = {};
  if (estado && ["APTO", "DESCARTADO", "DUDA"].includes(estado)) filters.estado = estado;
  if (archivado !== null && archivado !== undefined) {
    filters.archivado = archivado === "true";
  }
  if (search?.trim()) filters.search = search.trim();

  const result = await getCandidates(filters);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Error al cargar candidatos" },
      { status: 500 }
    );
  }

  return NextResponse.json({ candidates: result.candidates ?? [] });
}
