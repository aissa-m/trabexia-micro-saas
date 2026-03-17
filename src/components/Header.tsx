import Link from "next/link";
import Image from "next/image";

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
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand rounded-lg">
          <Image
            src="/img/logo_nombre_sin_fondo.png"
            alt="Trabexia"
            width={190}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand font-medium transition px-3 py-2 rounded-lg hover:bg-brand-light"
          >
            {Icons.home}
            Inicio
          </Link>
          <Link
            href="/formulario"
            className="inline-flex items-center gap-2 btn-primary text-sm"
          >
            {Icons.form}
            Candidatura
          </Link>
        </nav>
      </div>
    </header>
  );
}
