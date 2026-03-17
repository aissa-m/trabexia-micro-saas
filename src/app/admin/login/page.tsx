"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Icons = {
  shield: (
    <svg className="w-10 h-10 text-trabexia-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  lock: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  arrowRight: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  home: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.session) router.replace(from);
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al iniciar sesión");
        setLoading(false);
        return;
      }
      router.replace(from);
      router.refresh();
    } catch {
      setError("Error de conexión");
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-10 h-10 border-2 border-trabexia-primary border-t rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">Comprobando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="block focus:outline-none focus:ring-2 focus:ring-trabexia-primary rounded-lg">
            <Image
              src="/img/logo_nombre_sin_fondo.png"
              alt="Trabexia"
              width={160}
              height={48}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-trabexia-primary/5 to-transparent px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0">{Icons.shield}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Panel de administración
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Introduce tus credenciales para acceder
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {error && (
              <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 border border-red-100 flex items-start gap-3">
                {Icons.alert}
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="user"
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5"
              >
                {Icons.user}
                Usuario
              </label>
              <input
                id="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="input-field"
                autoComplete="username"
                placeholder="Nombre de usuario"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5"
              >
                {Icons.lock}
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 btn-primary disabled:opacity-60 py-3"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t transparent rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  {Icons.arrowRight}
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-trabexia-primary font-medium transition"
          >
            {Icons.home}
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
