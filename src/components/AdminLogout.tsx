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
      className="text-sm text-gray-600 hover:text-red-600"
    >
      Cerrar sesión
    </button>
  );
}
