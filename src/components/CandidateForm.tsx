"use client";

import { useState } from "react";
import { PAISES_UE, NIVELES_INGLES, PREFIJOS_EUROPEOS } from "@/lib/constants";
import { validateForm, hasValidationErrors, type ValidationErrors } from "@/lib/validation";
import type { CandidateFormData } from "@/types/candidate";

const initialForm: CandidateFormData = {
  nombre: "",
  ciudad: "",
  nacionalidadEuropea: "No",
  paisUE: "",
  prefijoTelefono: "",
  telefono: "",
  edad: "",
  carnetB: "No",
  nivelIngles: "",
  experienciaBreve: "",
};

const Icons = {
  user: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  map: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  flag: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  car: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a2 2 0 012 2v2m-6 12h2m2 0h-2v-2m0 0v-2h2v2z" />
    </svg>
  ),
  language: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  briefcase: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  check: (
    <svg className="w-14 h-14 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  send: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function CandidateForm() {
  const [form, setForm] = useState<CandidateFormData>(initialForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "nacionalidadEuropea" && value === "No") {
        next.paisUE = "";
      }
      return next;
    });
    if (name === "nacionalidadEuropea" && value === "No") {
      setErrors((prev) => ({ ...prev, paisUE: undefined }));
    }
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validateForm(form);
    setErrors(errs);
    if (hasValidationErrors(errs)) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        paisUE: form.nacionalidadEuropea === "Sí" ? form.paisUE : "",
      };
      const res = await fetch("/api/candidatura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const errs = { ...data.errors };
          if (form.nacionalidadEuropea !== "Sí") delete errs.paisUE;
          setErrors(errs);
        } else setSubmitError(data.error ?? "Error al enviar");
        return;
      }
      setSuccess(true);
      setForm(initialForm);
      setErrors({});
    } catch {
      setSubmitError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const showPaisUE = form.nacionalidadEuropea === "Sí";

  if (success) {
    return (
      <div className="card p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-light mb-4">
          {Icons.check}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Candidatura enviada
        </h2>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Hemos recibido tu candidatura. Nos pondremos en contacto contigo si tu perfil encaja.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="inline-flex items-center gap-2 btn-primary"
        >
          Enviar otra candidatura
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
        Datos de la candidatura
      </h2>

      {submitError && (
        <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 text-sm border border-red-100 flex items-start gap-3">
          {Icons.alert}
          <span>{submitError}</span>
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
          {Icons.user}
          Nombre completo *
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          className="input-field"
          placeholder="Ej. Juan García"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="ciudad" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
          {Icons.map}
          Ciudad *
        </label>
        <input
          id="ciudad"
          name="ciudad"
          type="text"
          value={form.ciudad}
          onChange={handleChange}
          className="input-field"
          placeholder="Ej. Madrid"
        />
        {errors.ciudad && (
          <p className="mt-1 text-sm text-red-600">{errors.ciudad}</p>
        )}
      </div>

      <div>
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          {Icons.globe}
          ¿Tienes nacionalidad europea? *
        </span>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="nacionalidadEuropea"
              value="Sí"
              checked={form.nacionalidadEuropea === "Sí"}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-brand focus:ring-brand"
            />
            Sí
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="nacionalidadEuropea"
              value="No"
              checked={form.nacionalidadEuropea === "No"}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-brand focus:ring-brand"
            />
            No
          </label>
        </div>
        {errors.nacionalidadEuropea && (
          <p className="mt-1 text-sm text-red-600">{errors.nacionalidadEuropea}</p>
        )}
      </div>

      {showPaisUE && (
        <div>
          <label htmlFor="paisUE" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
            {Icons.flag}
            País de la UE *
          </label>
          <select
            id="paisUE"
            name="paisUE"
            value={form.paisUE}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Selecciona un país</option>
            {PAISES_UE.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          {errors.paisUE && (
            <p className="mt-1 text-sm text-red-600">{errors.paisUE}</p>
          )}
        </div>
      )}

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
          {Icons.phone}
          Teléfono *
        </label>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="w-full sm:w-40">
            <label htmlFor="prefijoTelefono" className="sr-only">Prefijo</label>
            <select
              id="prefijoTelefono"
              name="prefijoTelefono"
              value={form.prefijoTelefono}
              onChange={handleChange}
              className="input-field"
              aria-label="Prefijo telefónico"
            >
              <option value="">Prefijo</option>
              {PREFIJOS_EUROPEOS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            {errors.prefijoTelefono && (
              <p className="mt-1 text-sm text-red-600">{errors.prefijoTelefono}</p>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="telefono" className="sr-only">Número</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              className="input-field"
              placeholder="Ej. 612 345 678"
              aria-label="Número de teléfono"
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="edad" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
          {Icons.calendar}
          Edad (entre 23 y 45) *
        </label>
        <input
          id="edad"
          name="edad"
          type="number"
          min={23}
          max={45}
          value={form.edad}
          onChange={handleChange}
          className="input-field"
          placeholder="Ej. 30"
        />
        {errors.edad && (
          <p className="mt-1 text-sm text-red-600">{errors.edad}</p>
        )}
      </div>

      <div>
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          {Icons.car}
          ¿Tienes carnet B? *
        </span>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="carnetB"
              value="Sí"
              checked={form.carnetB === "Sí"}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-brand focus:ring-brand"
            />
            Sí
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="carnetB"
              value="No"
              checked={form.carnetB === "No"}
              onChange={handleChange}
              className="rounded-full border-gray-300 text-brand focus:ring-brand"
            />
            No
          </label>
        </div>
        {errors.carnetB && (
          <p className="mt-1 text-sm text-red-600">{errors.carnetB}</p>
        )}
      </div>

      <div>
        <label htmlFor="nivelIngles" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
          {Icons.language}
          Nivel de inglés *
        </label>
        <select
          id="nivelIngles"
          name="nivelIngles"
          value={form.nivelIngles}
          onChange={handleChange}
          className="input-field"
        >
          {NIVELES_INGLES.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </select>
        {errors.nivelIngles && (
          <p className="mt-1 text-sm text-red-600">{errors.nivelIngles}</p>
        )}
      </div>

      <div>
        <label htmlFor="experienciaBreve" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
          {Icons.briefcase}
          Experiencia breve *
        </label>
        <textarea
          id="experienciaBreve"
          name="experienciaBreve"
          value={form.experienciaBreve}
          onChange={handleChange}
          rows={4}
          className="input-field resize-y"
          placeholder="Describe tu experiencia como conductor o en logística..."
        />
        {errors.experienciaBreve && (
          <p className="mt-1 text-sm text-red-600">{errors.experienciaBreve}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 btn-accent w-full sm:w-auto disabled:opacity-60 py-3 px-6"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t transparent rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              {Icons.send}
              Enviar candidatura
            </>
          )}
        </button>
      </div>
    </form>
  );
}
