# Google Apps Script para Trabexia

Para que la web guarde y lea candidatos en Google Sheets desde el formulario Next.js.

## 1. Columnas exactas de la hoja

La **primera fila (cabecera)** debe tener **exactamente** estas columnas, en este orden:

| 1   | 2    | 3     | 4     | 5                     | 6       | 7                 | 8       | 9   | 10        | 11            | 12           | 13              | 14           | 15         | 16        |
|-----|------|-------|-------|------------------------|---------|-------------------|---------|-----|-----------|---------------|--------------|-----------------|--------------|------------|-----------|
| id  | fecha | nombre | ciudad | nacionalidad_europea   | pais_ue | prefijo_telefono  | telefono | edad | carnet_b  | nivel_ingles  | experiencia  | estado_sistema  | estado_admin | contactado | archivado |

En una sola línea:

```
id  fecha  nombre  ciudad  nacionalidad_europea  pais_ue  prefijo_telefono  telefono  edad  carnet_b  nivel_ingles  experiencia  estado_sistema  estado_admin  contactado  archivado
```

- **id**: UUID generado por el script.
- **fecha**: Fecha/hora de alta (Date).
- **nombre**, **ciudad**: texto.
- **nacionalidad_europea**: "Sí" o "No".
- **pais_ue**: código (ej. ES, PT) o vacío.
- **prefijo_telefono**: prefijo con + (ej. +34).
- **telefono**: número sin prefijo.
- **edad**: número.
- **carnet_b**: "Sí" o "No".
- **nivel_ingles**: A1, A2, B1, etc.
- **experiencia**: texto libre.
- **estado_sistema**: APTO | DESCARTADO | DUDA.
- **estado_admin**: reservado (vacío).
- **contactado**, **archivado**: true/false.

## 2. Script (Code.gs) – append y delete

El backend Next.js envía **camelCase**. El script escribe por **posición** en el mismo orden que las columnas.

```javascript
/**
 * Trabexia - Web App
 * POST JSON: { action: "append", row: { nombre, ciudad, nacionalidadEuropea, paisUE, prefijoTelefono, telefono, edad, carnetB, nivelIngles, experienciaBreve, estado } }
 * Respuesta: { success: true } o { success: false, error: "mensaje" }
 */

const SHEET_NAME = 'Hoja 1';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'No se recibió cuerpo POST' });
    }

    const body = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === 'append') {
      const row = body.row || body;
      appendRow(row);
      return jsonResponse({ success: true });
    }

    if (action === 'delete') {
      deleteRow(body.id);
      return jsonResponse({ success: true });
    }

    return jsonResponse({ success: false, error: 'Action no soportada' });
  } catch (err) {
    var message = err.message || String(err);
    return jsonResponse({ success: false, error: message });
  }
}

function jsonResponse(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No se pudo acceder a la hoja de cálculo');
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    if (!sheet) throw new Error('No se encontró ninguna hoja');
  }
  return sheet;
}

function appendRow(data) {
  var sheet = getSheet();

  sheet.appendRow([
    Utilities.getUuid(),
    new Date(),
    data.nombre || '',
    data.ciudad || '',
    data.nacionalidadEuropea || '',
    data.paisUE || '',
    data.prefijoTelefono || '',
    data.telefono || '',
    data.edad || '',
    data.carnetB || '',
    data.nivelIngles || '',
    data.experienciaBreve || '',
    data.estado || '',
    '',
    false,
    false
  ]);
}

function deleteRow(id) {
  if (!id) throw new Error('Falta id');
  var sheet = getSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) throw new Error('No encontrado');
  var idCol = 1;
  for (var i = lastRow; i >= 2; i--) {
    if (sheet.getRange(i, idCol).getValue() === id) {
      sheet.deleteRow(i);
      return;
    }
  }
  throw new Error('No encontrado');
}
```

## 3. Mapeo formulario (camelCase) → columnas (snake_case)

| Columna (hoja)     | Origen en body (camelCase) |
|--------------------|----------------------------|
| id                 | `Utilities.getUuid()`      |
| fecha              | `new Date()`               |
| nombre             | `data.nombre`              |
| ciudad             | `data.ciudad`             |
| nacionalidad_europea | `data.nacionalidadEuropea` |
| pais_ue            | `data.paisUE`              |
| prefijo_telefono   | `data.prefijoTelefono`     |
| telefono           | `data.telefono`            |
| edad               | `data.edad`                |
| carnet_b           | `data.carnetB`             |
| nivel_ingles       | `data.nivelIngles`         |
| experiencia        | `data.experienciaBreve`    |
| estado_sistema     | `data.estado`              |
| estado_admin       | vacío                      |
| contactado         | false                      |
| archivado          | false                      |

Al **leer** filas (getAll / getById), la app espera objetos con **claves snake_case** (nombre de columnas) y los convierte a camelCase internamente.

## 4. Desplegar como aplicación web

1. **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. **Ejecutar como**: Yo. **Quién tiene acceso**: Cualquier persona.
4. Copiar la URL (termina en `/exec`) → `GOOGLE_APPS_SCRIPT_URL` en Next.js.

## 5. Variable de entorno

En `.env.local` y en Vercel:

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

## 6. Primera ejecución

La primera vez, abrir la URL del script en el navegador y aceptar permisos con la cuenta que creó el script.
