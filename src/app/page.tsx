import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Truck,
  Wrench,
  Boxes,
  Factory,
  Building2,
  Globe2,
  MapPin,
  CheckCircle2,
  ClipboardList,
  Users,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-trabexia-primary via-slate-900 to-trabexia-secondary text-white py-20 sm:py-24 px-4">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="mx-auto max-w-4xl rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl px-6 py-10 sm:px-10 sm:py-12 shadow-2xl">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-black/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20">
                    <Truck className="h-5 w-5" />
                  </span>
                  Talento técnico para logística, transporte e industria
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                  Conectamos profesionales con empresas líderes en Europa
                </h1>
                <p className="text-base sm:text-lg text-slate-100/90 max-w-2xl">
                  Trabexia es el puente entre candidatos y compañías en sectores como logística y
                  distribución, transporte y reparto, mecánica y mantenimiento, y operaciones
                  industriales. Un solo formulario, múltiples oportunidades.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <Link
                    href="/formulario"
                    className="inline-flex items-center gap-2 rounded-2xl bg-brand px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
                  >
                    Enviar candidatura
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <p className="text-sm text-slate-100/80">
                    Sin registro ni compromiso. Te contactamos si tu perfil encaja con nuestros
                    proyectos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sectores */}
        <section className="bg-slate-950 py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Sectores con los que trabajamos
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Oportunidades en logística, transporte, mecánica y operaciones
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Colaboramos con empresas que necesitan perfiles operativos y técnicos para diferentes
                entornos: calles, almacenes, talleres y centros logísticos.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm backdrop-blur hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Logística y reparto</h3>
                <p className="text-sm text-slate-300">
                  Conductores, repartidores y personal de última milla en entornos urbanos y
                  regionales.
                </p>
              </div>
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm backdrop-blur hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Boxes className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Almacén y operaciones</h3>
                <p className="text-sm text-slate-300">
                  Preparación de pedidos, picking, carretillas, coordinación de flujos y stock.
                </p>
              </div>
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm backdrop-blur hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Mecánica y mantenimiento</h3>
                <p className="text-sm text-slate-300">
                  Técnicos de mantenimiento, mecánicos de flota y perfiles especializados.
                </p>
              </div>
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm backdrop-blur hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Factory className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Entornos industriales</h3>
                <p className="text-sm text-slate-300">
                  Operarios, supervisores y personal técnico en plantas y centros de producción.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Empresas colaboradoras */}
        <section className="bg-slate-950 px-4 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)] backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">
                <div className="space-y-3 max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Empresas colaboradoras
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                    Proyectos con operadores logísticos e industria europea
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300">
                    Trabajamos con compañías del sector logístico e industrial, incluyendo proyectos
                    vinculados a grandes plataformas como Amazon y otros operadores de referencia.
                  </p>
                  <p className="text-xs text-slate-400">
                    Los nombres concretos de las empresas pueden variar según cada campaña de
                    contratación, pero el estándar de calidad y requisitos se mantiene.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center text-xs sm:text-sm text-slate-100">
                    <Building2 className="mx-auto mb-2 h-6 w-6 text-cyan-300" />
                    Operadores logísticos
                  </div>
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center text-xs sm:text-sm text-slate-100">
                    <Truck className="mx-auto mb-2 h-6 w-6 text-cyan-300" />
                    Proyectos vinculados a Amazon
                  </div>
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center text-xs sm:text-sm text-slate-100">
                    <Factory className="mx-auto mb-2 h-6 w-6 text-cyan-300" />
                    Industria y centros productivos
                  </div>
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center text-xs sm:text-sm text-slate-100">
                    <Boxes className="mx-auto mb-2 h-6 w-6 text-cyan-300" />
                    Centros de distribución
                  </div>
                  <div className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-center text-xs sm:text-sm text-slate-100 col-span-2 sm:col-span-1">
                    <Users className="mx-auto mb-2 h-6 w-6 text-cyan-300" />
                    Equipos multiculturales
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oportunidades en Europa */}
        <section className="bg-slate-950 px-4 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Oportunidades en Europa
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                Trabaja en distintos países europeos
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Dependiendo del proyecto, podrás optar a posiciones en España, Alemania, Irlanda y
                otros países europeos, con acompañamiento durante el proceso de selección.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">España</p>
                    <h3 className="text-lg font-semibold text-white">Plataformas logísticas y reparto</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Oportunidades en ciudades clave para transporte urbano, almacenes y hubs
                  logísticos.
                </p>
                <p className="text-xs text-slate-400">
                  Puestos de conducción, almacén, supervisión y soporte operativo.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Alemania</p>
                    <h3 className="text-lg font-semibold text-white">Logística e industria avanzada</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Proyectos en un entorno industrial y logístico muy desarrollado, con equipos
                  internacionales.
                </p>
                <p className="text-xs text-slate-400">
                  Se valora especialmente la experiencia técnica y el conocimiento de inglés o
                  alemán.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Irlanda</p>
                    <h3 className="text-lg font-semibold text-white">Centros de distribución</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  Oportunidades en almacenes, operaciones de paquetería y soporte a plataformas de
                  comercio electrónico.
                </p>
                <p className="text-xs text-slate-400">
                  Posiciones para perfiles de almacén, reparto y coordinación de operaciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="bg-slate-950 px-4 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Proceso
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Cómo funciona</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Paso 1
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">Envíanos tu candidatura</h3>
                <p className="text-sm text-slate-300">
                  Rellena el formulario con tus datos, experiencia e intereses. Solo te llevará unos
                  minutos.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Paso 2
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">Te conectamos con proyectos</h3>
                <p className="text-sm text-slate-300">
                  Nuestro equipo revisa tu perfil y lo contrasta con las necesidades de las empresas
                  con las que colaboramos.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Paso 3
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">Te acompañamos en el proceso</h3>
                <p className="text-sm text-slate-300">
                  Si tu perfil encaja, nos pondremos en contacto contigo para explicarte las
                  condiciones y próximos pasos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perfiles que valoramos */}
        <section className="bg-slate-950 px-4 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)] backdrop-blur-xl">
              <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-start">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                    Perfiles que valoramos
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                    Más que requisitos, buscamos actitud y potencial
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300">
                    No todas las posiciones exigen las mismas condiciones. Estos son los aspectos que
                    más tenemos en cuenta a la hora de valorar candidaturas.
                  </p>
                </div>
                <ul className="space-y-3 text-sm sm:text-base text-slate-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span>
                      <span className="font-medium">Actitud, compromiso y responsabilidad</span>{" "}
                      para trabajar en entornos dinámicos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span>
                      <span className="font-medium">Disponibilidad para trabajar en distintos
                        horarios</span>{" "}
                      y entornos (almacén, calle, taller, planta).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span>
                      <span className="font-medium">Experiencia en logística, transporte, mecánica u
                        otras áreas técnicas</span>{" "}
                      será muy valorada, aunque no siempre imprescindible.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span>
                      <span className="font-medium">Permiso de conducción adecuado</span> cuando el
                      puesto lo requiera (por ejemplo, carnet B para reparto).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span>
                      <span className="font-medium">Conocimientos básicos de inglés u otros
                        idiomas</span>{" "}
                      según el país y el proyecto.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-slate-950 px-4 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-gradient-to-r from-trabexia-primary to-trabexia-secondary px-6 py-8 sm:px-10 sm:py-10 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/15 text-cyan-300">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    ¿Listo para dar el siguiente paso?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-100/90 mt-1">
                    Cuéntanos tu perfil y te avisaremos cuando tengamos una oportunidad alineada
                    contigo.
                  </p>
                </div>
              </div>
              <Link
                href="/formulario"
                className="inline-flex items-center gap-2 btn-primary whitespace-nowrap shrink-0"
              >
                Ir al formulario
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
