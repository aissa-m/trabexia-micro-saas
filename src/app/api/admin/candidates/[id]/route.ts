import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";
import { getCandidateById, updateCandidate, deleteCandidate } from "@/lib/sheets";
import type { CandidateStatus } from "@/types/candidate";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await hasAdminSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const result = await getCandidateById(id);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "No encontrado" },
      { status: result.error === "No encontrado" ? 404 : 500 }
    );
  }

  return NextResponse.json(result.candidate);
}

const VALID_ESTADOS: CandidateStatus[] = ["APTO", "DESCARTADO", "DUDA"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await hasAdminSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updates: {
    estado?: CandidateStatus;
    contactado?: boolean;
    archivado?: boolean;
  } = {};
  if (
    body.estado !== undefined &&
    VALID_ESTADOS.includes(body.estado as CandidateStatus)
  ) {
    updates.estado = body.estado as CandidateStatus;
  }
  if (body.contactado !== undefined) updates.contactado = Boolean(body.contactado);
  if (body.archivado !== undefined) updates.archivado = Boolean(body.archivado);

  const result = await updateCandidate(id, updates);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Error al actualizar" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await hasAdminSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteCandidate(id);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Error al borrar" },
      { status: result.error === "No encontrado" ? 404 : 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
