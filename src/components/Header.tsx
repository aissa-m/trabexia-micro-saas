'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Icons = {
  home: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  form: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

export function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-brand rounded-lg"
          onClick={closeMenu}
        >
          <Image
            src="/img/logo.png"
            alt="Trabexia"
            width={56}
            height={56}
            className="h-9 w-auto sm:h-10 md:h-11"
            priority
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            Trabexia
          </span>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand font-medium transition px-3 py-2 rounded-lg hover:bg-brand-light"
            onClick={closeMenu}
          >
            {Icons.home}
            Inicio
          </Link>
          <Link
            href="/empleos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand font-medium transition px-3 py-2 rounded-lg hover:bg-brand-light"
            onClick={closeMenu}
          >
            Empleos
          </Link>
          <Link
            href="/formulario"
            className="inline-flex items-center gap-2 btn-primary text-sm"
            onClick={closeMenu}
          >
            {Icons.form}
            Candidatura
          </Link>
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:text-brand hover:bg-brand-light md:hidden focus:outline-none focus:ring-2 focus:ring-brand"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Panel móvil */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm shadow-sm">
          <nav className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            <Link
              href="/"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={closeMenu}
            >
              <span className="flex items-center gap-2">
                {Icons.home}
                Inicio
              </span>
            </Link>
            <Link
              href="/empleos"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={closeMenu}
            >
              <span>Empleos</span>
            </Link>
            <Link
              href="/formulario"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-white bg-brand hover:bg-brand-dark"
              onClick={closeMenu}
            >
              <span className="flex items-center gap-2">
                {Icons.form}
                Candidatura
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
