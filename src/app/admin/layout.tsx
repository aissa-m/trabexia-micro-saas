import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { hasAdminSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { AdminLogout } from "@/components/AdminLogout";

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/img/logo_nombre_sin_fondo.png"
              alt="Trabexia"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
            <span className="text-gray-500 text-sm hidden sm:inline">Admin</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-trabexia-primary"
            >
              Panel
            </Link>
            <AdminLogout />
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
