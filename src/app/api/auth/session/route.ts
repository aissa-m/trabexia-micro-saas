import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await hasAdminSession();
  return NextResponse.json({ ok: true, session });
}
