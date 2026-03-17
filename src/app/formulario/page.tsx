import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CandidateForm } from "@/components/CandidateForm";

export const metadata = {
  title: "Candidatura | Trabexia",
  description: "Envía tu candidatura para conductores en Trabexia.",
};

const Icons = {
  document: (
    <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

export default function FormularioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-10 sm:py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-light text-brand mb-4">
              {Icons.document}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Formulario de candidatura
            </h1>
            <p className="text-gray-600 mt-2 max-w-lg mx-auto">
              Rellena los datos con veracidad. Requisitos: nacionalidad europea, carnet B y edad entre 23 y 45 años.
            </p>
          </div>
          <CandidateForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
