import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { hasAdminSession } from "@/lib/auth";
import { AdminLogout } from "@/components/AdminLogout";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") ?? "";
  const isLoginPage =
    pathname === "/admin/login" || pathname.startsWith("/admin/login/");

  if (!isLoginPage) {
    const session = await hasAdminSession();
    if (!session) redirect("/admin/login");
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/img/logo.svg"
              alt="Trabexia"
              width={48}
              height={48}
              className="h-11 w-auto"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Trabexia
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Admin
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle compact className="sm:hidden" />
            <ThemeToggle className="hidden sm:inline-flex" />
            <Link
              href="/admin"
              className="text-sm text-slate-600 transition hover:text-trabexia-primary dark:text-slate-300 dark:hover:text-white"
            >
              Panel
            </Link>
            <AdminLogout />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
