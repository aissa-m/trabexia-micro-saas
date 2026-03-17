import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Truck,
  Wrench,
  Package,
  MapPin,
  Euro,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function EmpleosPage() {
  const today = new Date();
  const formattedDate = formatDate(today);
  const lastUpdate = "Última actualización hace 1h";

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero */}
        <section className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 text-xs font-medium text-cyan-200 mb-4">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20">
              <Truck className="h-3.5 w-3.5" />
            </span>
            Empleos · {formattedDate} · {lastUpdate}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            Ofertas de empleo disponibles
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-slate-300">
            Explora oportunidades profesionales en logística, transporte, mecánica y sectores
            relacionados en distintos países de Europa. Todas las posiciones se gestionan a través del
            formulario de candidatura de Trabexia.
          </p>
        </section>

        {/* Cards de ofertas */}
        <section className="space-y-8">
          {/* Oferta 1 */}
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  <Wrench className="h-4 w-4" />
                  Mecánica · Vehículos pesados
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1">
                    Mecánico de camiones – Irlanda
                  </h2>
                  <p className="text-sm text-slate-300">
                    Empresa irlandesa busca mecánico de vehículos pesados para trabajar en Galway. Se
                    requiere experiencia en mantenimiento, reparación y diagnóstico de vehículos
                    industriales, con conocimientos de electromecánica e hidráulica.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-sm text-slate-200">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Ubicación
                      </p>
                      <p>Galway, Irlanda</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <Euro className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Salario anual
                      </p>
                      <p>40.000 € – 45.000 €</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <Clock className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Horario
                      </p>
                      <p>Lunes a viernes · 7:00 – 17:00</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 text-sm text-slate-200">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Funciones principales
                    </h3>
                    <ul className="space-y-1.5">
                      <li>· Mantenimiento de flota</li>
                      <li>· Reparación mecánica y diagnóstico de averías</li>
                      <li>· Mantenimiento preventivo y correctivo</li>
                      <li>· Trabajo con sistemas hidráulicos</li>
                      <li>· Inspecciones técnicas y control de estado</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Vehículos habituales
                    </h3>
                    <ul className="space-y-1.5">
                      <li>· Camiones articulados y rígidos</li>
                      <li>· Furgonetas y vehículos de empresa</li>
                      <li>· Camiones cisterna y vehículos especiales</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 space-y-4">
                <div className="rounded-2xl bg-slate-900 border border-slate-700/70 px-4 py-4 text-sm text-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Requisitos
                  </h3>
                  <ul className="space-y-1.5">
                    <li>· Mínimo 5 años de experiencia en mecánica</li>
                    <li>· Experiencia con vehículos industriales</li>
                    <li>· Conocimientos de electromecánica</li>
                    <li>· Carnet de conducir clase C</li>
                    <li>· Nivel básico o intermedio de inglés</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-900 border border-emerald-700/70 px-4 py-4 text-sm text-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Beneficios
                  </h3>
                  <ul className="space-y-1.5">
                    <li>· Contrato permanente</li>
                    <li>· Alojamiento proporcionado</li>
                    <li>· Vehículo de empresa</li>
                    <li>· Plan de pensiones</li>
                    <li>· Baja por enfermedad pagada</li>
                    <li>· Descuentos para empleados</li>
                  </ul>
                </div>
                <Link
                  href="/formulario"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
                >
                  Solicitar puesto
                  <CheckCircle2 className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Oferta 2 */}
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  <Truck className="h-4 w-4" />
                  Transporte de larga distancia
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1">
                    Conductor de camión de larga distancia
                  </h2>
                  <p className="text-sm text-slate-300">
                    Posición estable para conducción de camiones pesados en rutas de larga distancia
                    por Alemania y países limítrofes, con condiciones competitivas y pluses.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-sm text-slate-200">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Ubicación
                      </p>
                      <p>Helmstedt, Baja Sajonia (Alemania)</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <Building2 className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Contrato
                      </p>
                      <p>Indefinido · Jornada completa</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <Euro className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Salario aprox.
                      </p>
                      <p>3.000 € netos / mes</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 text-sm text-slate-200">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Condiciones y horario
                    </h3>
                    <ul className="space-y-1.5">
                      <li>· Inicio inmediato</li>
                      <li>· Dietas incluidas</li>
                      <li>· Recargo nocturno del 25 %</li>
                      <li>· Horas extra remuneradas</li>
                      <li>· 45 horas semanales (máx. 10 h diarias)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Funciones principales
                    </h3>
                    <ul className="space-y-1.5">
                      <li>· Conducción de camiones pesados</li>
                      <li>· Carga y descarga de mercancía</li>
                      <li>· Control de documentación de transporte</li>
                      <li>· Mantenimiento básico del vehículo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 space-y-4">
                <div className="rounded-2xl bg-slate-900 border border-slate-700/70 px-4 py-4 text-sm text-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Requisitos
                  </h3>
                  <ul className="space-y-1.5">
                    <li>· Permiso de conducir CE</li>
                    <li>· Tarjeta de conductor</li>
                    <li>· Código 95 en vigor</li>
                    <li>· Nacionalidad de la UE</li>
                    <li>· Conocimientos de alemán o inglés</li>
                    <li>· Disponibilidad para noches y fines de semana</li>
                  </ul>
                </div>
                <Link
                  href="/formulario"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
                >
                  Solicitar puesto
                  <CheckCircle2 className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* Oferta 3 */}
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                  <Package className="h-4 w-4" />
                  Reparto de paquetería
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1">
                    Repartidor de paquetería – Amazon
                  </h2>
                  <p className="text-sm text-slate-300">
                    Oportunidad para repartidores de paquetería en proyectos vinculados a Amazon en
                    Alemania, con rutas optimizadas y flota de furgonetas oficiales.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-sm text-slate-200">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Ubicación
                      </p>
                      <p>Alemania · Hamburgo y Hannover</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <Euro className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Salario hora
                      </p>
                      <p>15,20 € / hora</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/70 px-3 py-2">
                    <Clock className="h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                        Jornada
                      </p>
                      <p>40 horas semanales</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 text-sm text-slate-200">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Detalle salarial
                    </h3>
                    <ul className="space-y-1.5">
                      <li>· Salario mensual aprox.: 2.200 – 2.550 €</li>
                      <li>· Incentivos por rendimiento</li>
                      <li>· Bonificaciones semanales para los mejores repartidores</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Requisitos y beneficios
                    </h3>
                    <ul className="space-y-1.5">
                      <li>· Carnet de conducir B</li>
                      <li>· Nacionalidad de la UE</li>
                      <li>· Experiencia básica conduciendo</li>
                      <li>· Rutas optimizadas y furgonetas oficiales</li>
                      <li>· Alojamiento cercano disponible</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-amber-600/60 px-4 py-4 text-sm text-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Bonificaciones
                  </h3>
                  <ul className="space-y-1.5">
                    <li>· 100 € al mejor repartidor semanal</li>
                    <li>· 75 € al segundo</li>
                    <li>· 50 € al tercero</li>
                  </ul>
                </div>
              </div>

              <div className="w-full lg:w-64 flex flex-col justify-between gap-4">
                <div className="rounded-2xl bg-slate-900 border border-slate-700/70 px-4 py-4 text-sm text-slate-100">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Resumen del puesto
                  </h3>
                  <p className="text-sm text-slate-200 mb-2">
                    Ideal para perfiles dinámicos que disfrutan conduciendo y trabajando de forma
                    autónoma, con foco en objetivos diarios y atención al cliente final.
                  </p>
                </div>
                <Link
                  href="/formulario"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
                >
                  Solicitar puesto
                  <CheckCircle2 className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </section>

        {/* CTA final */}
        <section className="mt-12 sm:mt-16">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-trabexia-primary to-trabexia-secondary px-6 py-8 sm:px-10 sm:py-10 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  ¿Te interesa alguno de estos puestos?
                </h2>
                <p className="text-sm sm:text-base text-slate-100/90">
                  Envíanos tu candidatura y nuestro equipo valorará tu perfil para estas y otras
                  oportunidades.
                </p>
              </div>
              <Link
                href="/formulario"
                className="inline-flex items-center gap-2 btn-primary whitespace-nowrap shrink-0"
              >
                Enviar candidatura
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

