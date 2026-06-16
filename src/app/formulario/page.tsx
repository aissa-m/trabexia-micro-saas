import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CandidateForm } from "@/components/CandidateForm";

export const metadata = {
  title: "Candidatura | Trabexia",
  description: "Envía tu candidatura para conductores en Trabexia.",
};

const Icons = {
  document: (
    <svg className="h-8 w-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
};

export default function FormularioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand dark:bg-brand/15">
              {Icons.document}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
              Formulario de candidatura
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-slate-600 dark:text-slate-300">
              Rellena los datos con veracidad. Requisitos: nacionalidad europea, carnet B y edad entre
              23 y 45 años.
            </p>
          </div>
          <CandidateForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
