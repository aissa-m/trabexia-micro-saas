import Link from "next/link";

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

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-300 text-center sm:text-left">
            © {new Date().getFullYear()} Trabexia. Oportunidades en logística, transporte, mecánica y
            otras áreas técnicas.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
            >
              {Icons.home}
              Inicio
            </Link>
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
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
