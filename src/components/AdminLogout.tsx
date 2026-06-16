"use client";

import { useRouter } from "next/navigation";

export function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-slate-600 transition hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400"
    >
      Cerrar sesión
    </button>
  );
}
