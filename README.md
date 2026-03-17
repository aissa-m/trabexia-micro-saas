# Trabexia – Web de captación de candidatos

Landing y formulario de candidatura para Trabexia, con panel de administración protegido y almacenamiento en Google Sheets.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Vercel** (despliegue)
- **Google Sheets** vía Google Apps Script (sin base de datos tradicional)

## Estructura del proyecto

```
Trabexia/
├── public/
│   └── img/                    # Logos (copiar aquí desde img/ de la raíz)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── candidatura/    # POST formulario → Sheets
│   │   │   ├── auth/           # login, logout, session
│   │   │   └── admin/candidates/  # GET lista, GET/PATCH por id
│   │   ├── admin/              # Panel protegido
│   │   │   ├── login/
│   │   │   ├── candidatos/[id]/
│   │   │   └── layout.tsx      # Comprueba sesión
│   │   ├── formulario/         # Página del formulario público
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── CandidateForm.tsx
│   │   └── AdminLogout.tsx
│   ├── lib/
│   │   ├── auth.ts             # Sesión admin (cookie)
│   │   ├── classification.ts  # Reglas APTO/DESCARTADO/DUDA
│   │   ├── constants.ts        # Países UE, niveles inglés
│   │   ├── sheets.ts           # Llamadas a Google Apps Script
│   │   └── validation.ts       # Validación formulario
│   ├── types/
│   │   └── candidate.ts
│   └── middleware.ts           # Protege /admin (no /admin/login)
├── docs/
│   └── GOOGLE_APPS_SCRIPT.md   # Código y pasos para Sheets
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Configuración paso a paso

### 1. Instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Copia el ejemplo y rellena los valores:

```bash
cp .env.example .env.local
```

Edita `.env.local`:

- **ADMIN_USER**: usuario para entrar al panel admin (ej: `admin`).
- **ADMIN_PASSWORD**: contraseña del panel (usa una segura).
- **GOOGLE_APPS_SCRIPT_URL**: URL de la aplicación web de Google Apps Script (ver punto 3).

### 3. Google Sheets y Apps Script

1. Crea una hoja en Google Sheets con la cabecera indicada en `docs/GOOGLE_APPS_SCRIPT.md`.
2. Extensiones → Apps Script y pega el código del mismo documento.
3. Implementar → Nueva implementación → Aplicación web. Quién tiene acceso: **Cualquier persona**.
4. Copia la URL de la aplicación web (termina en `/exec`) y ponla en `GOOGLE_APPS_SCRIPT_URL` en `.env.local`.

### 4. Logos

Los componentes usan:

- `/img/logo_nombre_sin_fondo.png` (cabecera)
- `/img/logo.png` (landing)

En Next.js las rutas estáticas están en `public/`. Copia el contenido de tu carpeta `img/` (en la raíz del proyecto) a `public/img/`:

- `public/img/logo_nombre_sin_fondo.png`
- `public/img/logo.png`

### 5. Arrancar en local

```bash
npm run dev
```

- Landing: http://localhost:3000  
- Formulario: http://localhost:3000/formulario  
- Login admin: http://localhost:3000/admin/login  
- Panel: http://localhost:3000/admin (tras iniciar sesión)

### 6. Desplegar en Vercel

1. Sube el proyecto a un repositorio Git (GitHub, GitLab, etc.).
2. En [Vercel](https://vercel.com): Import Project → elige el repo.
3. En **Environment Variables** añade las mismas variables que en `.env.local`:
   - `ADMIN_USER`
   - `ADMIN_PASSWORD`
   - `GOOGLE_APPS_SCRIPT_URL`
4. Deploy. La URL de producción será algo como `https://tu-proyecto.vercel.app`.

**Importante**: No subas `.env` ni `.env.local` al repositorio (ya están en `.gitignore`).

## Reglas de clasificación automática

Al enviar el formulario se calcula el estado:

- **APTO**: nacionalidad europea Sí, país UE seleccionado, carnet B Sí, edad entre 23 y 45.
- **DESCARTADO**: no cumple lo anterior (datos completos y coherentes).
- **DUDA**: datos incompletos, ambiguos o inconsistentes (ej. edad fuera de rango, europeo Sin país, etc.).

En el panel admin puedes cambiar el estado manualmente, marcar como contactado y archivar.

## Sin base de datos ni registro

- No hay registro de candidatos: solo envío del formulario.
- No hay registro de admins: el acceso al panel se controla con `ADMIN_USER` y `ADMIN_PASSWORD` en variables de entorno.
- Todos los datos de candidatos se guardan en Google Sheets mediante el script de Apps Script.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing pública |
| `/formulario` | Formulario de candidatura |
| `/admin/login` | Login del panel (credenciales en env) |
| `/admin` | Panel de candidatos (protegido) |
| `/admin/candidatos/[id]` | Detalle y edición de un candidato (protegido) |
