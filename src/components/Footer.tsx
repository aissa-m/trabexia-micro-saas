import Link from "next/link";

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

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-slate-600 dark:text-slate-300 sm:text-left">
            © {new Date().getFullYear()} Trabexia. Oportunidades en logística, transporte, mecánica y
            otras áreas técnicas.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-brand dark:text-slate-300 dark:hover:text-white"
            >
              {Icons.home}
              Inicio
            </Link>
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-brand dark:text-slate-300 dark:hover:text-white"
            >
              {Icons.form}
              Candidatura
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
