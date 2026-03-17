import { NextRequest, NextResponse } from "next/server";
import { appendCandidate } from "@/lib/sheets";
import { validateForm, hasValidationErrors } from "@/lib/validation";
import type { CandidateFormData } from "@/types/candidate";

const LOG_PREFIX = "[CANDIDATURA]";

export async function POST(request: NextRequest) {
  try {
    console.log(`${LOG_PREFIX} Request received`);

    const body = await request.json();
    console.log(`${LOG_PREFIX} Body:`, JSON.stringify(body, null, 2));

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    console.log(`${LOG_PREFIX} Apps Script URL:`, appsScriptUrl ?? "(no configurada)");

    const formData: CandidateFormData = {
      nombre: String(body.nombre ?? "").trim(),
      ciudad: String(body.ciudad ?? "").trim(),
      nacionalidadEuropea:
        body.nacionalidadEuropea === "Sí" ? "Sí" : "No",
      paisUE: body.nacionalidadEuropea === "Sí" ? String(body.paisUE ?? "").trim() : "",
      prefijoTelefono: String(body.prefijoTelefono ?? "").trim(),
      telefono: String(body.telefono ?? "").trim(),
      edad: String(body.edad ?? "").trim(),
      carnetB: body.carnetB === "Sí" ? "Sí" : "No",
      nivelIngles: String(body.nivelIngles ?? "").trim(),
      experienciaBreve: String(body.experienciaBreve ?? "").trim(),
    };

    const errors = validateForm(formData);
    if (hasValidationErrors(errors)) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    console.log(`${LOG_PREFIX} Sending data to Apps Script`);
    const result = await appendCandidate(formData);

    console.log(`${LOG_PREFIX} Response from Sheets:`, {
      ok: result.ok,
      id: result.id,
      error: result.error,
    });

    if (!result.ok) {
      return NextResponse.json(
        { success: false, ok: false, error: result.error ?? "Error al guardar" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: result.id });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(`${LOG_PREFIX} ERROR:`, error.message);
    console.error(`${LOG_PREFIX} ERROR stack:`, error.stack);
    return NextResponse.json(
      { success: false, ok: false, error: error.message },
      { status: 500 }
    );
  }
}
