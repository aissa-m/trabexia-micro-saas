'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Icons = {
  home: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  form: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
};

export function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand sm:gap-3"
          onClick={closeMenu}
        >
          <Image
            src="/img/logo.svg"
            alt="Trabexia"
            width={56}
            height={56}
            className="h-9 w-auto sm:h-10 md:h-11"
            priority
          />
          <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl">
            Trabexia
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-600 transition hover:bg-brand-light hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={closeMenu}
          >
            {Icons.home}
            Inicio
          </Link>
          <Link
            href="/empleos"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-600 transition hover:bg-brand-light hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={closeMenu}
          >
            Empleos
          </Link>
          <Link
            href="/formulario"
            className="btn-primary inline-flex items-center gap-2 text-sm"
            onClick={closeMenu}
          >
            {Icons.form}
            Candidatura
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-brand-light hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <nav className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            <ThemeToggle className="mb-2 w-full justify-center" />
            <Link
              href="/"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={closeMenu}
            >
              <span className="flex items-center gap-2">
                {Icons.home}
                Inicio
              </span>
            </Link>
            <Link
              href="/empleos"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={closeMenu}
            >
              <span>Empleos</span>
            </Link>
            <Link
              href="/formulario"
              className="inline-flex w-full items-center justify-between rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
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
