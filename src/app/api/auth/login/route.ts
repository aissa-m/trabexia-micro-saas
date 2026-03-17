import { NextRequest, NextResponse } from "next/server";
import { validateAdminCredentials, setAdminSession, isAdminConfigured } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin no configurado" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const user = String(body.user ?? "").trim();
    const password = String(body.password ?? "");

    if (!user || !password) {
      return NextResponse.json(
        { ok: false, error: "Usuario y contraseña requeridos" },
        { status: 400 }
      );
    }

    const valid = await validateAdminCredentials(user, password);
    if (!valid) {
      return NextResponse.json(
        { ok: false, error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    await setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
