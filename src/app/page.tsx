import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Icons = {
  truck: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a2 2 0 012 2v2m-6 12h2m2 0h-2v-2m0 0v-2h2v2m0 0v2h-2m2-4h-2v-2m0 0v-2h2v2z" />
    </svg>
  ),
  check: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  document: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  phone: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  arrowRight: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-brand via-brand to-brand-dark text-white py-20 sm:py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur mb-6">
              {Icons.truck}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Conduce con Trabexia
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Únete a nuestra flota. Buscamos conductores con carnet B, nacionalidad europea y ganas de crecer.
            </p>
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 bg-white text-brand font-semibold text-lg px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              Enviar candidatura
              {Icons.arrowRight}
            </Link>
          </div>
        </section>

        {/* Pasos */}
        <section className="py-16 sm:py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Cómo funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-light text-brand mb-4">
                  {Icons.check}
                </div>
                <span className="text-sm font-semibold text-brand uppercase tracking-wide">Paso 1</span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-2 text-lg">Cumple requisitos</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nacionalidad UE, carnet B, edad 23–45 y nivel de inglés.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-light text-brand mb-4">
                  {Icons.document}
                </div>
                <span className="text-sm font-semibold text-brand uppercase tracking-wide">Paso 2</span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-2 text-lg">Rellena el formulario</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Datos básicos y experiencia. Sin registro ni cuenta.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-light text-brand mb-4">
                  {Icons.phone}
                </div>
                <span className="text-sm font-semibold text-brand uppercase tracking-wide">Paso 3</span>
                <h3 className="font-semibold text-gray-900 mt-2 mb-2 text-lg">Te contactamos</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Si tu perfil encaja, nos pondremos en contacto contigo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto rounded-2xl bg-brand-light border border-orange-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/img/logo.png"
                alt="Trabexia"
                width={72}
                height={72}
                className="rounded-xl"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">¿Listo para empezar?</h2>
                <p className="text-gray-600 text-sm mt-0.5">Envía tu candidatura en menos de 2 minutos.</p>
              </div>
            </div>
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 btn-primary whitespace-nowrap shrink-0"
            >
              Ir al formulario
              {Icons.arrowRight}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
