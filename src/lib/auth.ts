import { cookies } from "next/headers";

const ADMIN_COOKIE = "trabexia_admin";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 horas

export function getAdminCredentials(): { user: string; password: string } {
  const user = process.env.ADMIN_USER ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  return { user, password };
}

export function isAdminConfigured(): boolean {
  const { user, password } = getAdminCredentials();
  return !!user && !!password;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === "1";
}

export async function validateAdminCredentials(
  user: string,
  password: string
): Promise<boolean> {
  const { user: envUser, password: envPassword } = getAdminCredentials();
  return envUser === user && envPassword === password;
}
