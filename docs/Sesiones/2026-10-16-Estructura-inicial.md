# Sesión 2026-10-16 · Estructura inicial

## Objetivo

Preparar una plantilla pequeña y documentada antes de elegir la idea y la API de M2.

## Trabajo realizado

- Confirmada la conexión con `chiissuu/M2-PWIC` y la rama `main`.
- Preparados `index.html`, `styles.css` y `app.js` como archivos separados.
- Añadido `package.json` con Vite y los scripts de desarrollo, compilación y previsualización.
- Creada la carpeta `assets/` con `.gitkeep` para conservarla en Git.
- Preparados README, instrucciones de trabajo, exclusiones y documentación de seguimiento.
- Iniciado el registro de uso de IA y la preparación de posibles reflexiones de la Autopsia.

## Verificación

- Dependencias instaladas y `package-lock.json` generado.
- `node --check app.js` completado correctamente.
- `npm run build` completado correctamente.
- HTML, CSS y JavaScript servidos con HTTP 200 y contenido esperado mediante Vite.
- Exclusiones de Git comprobadas para `node_modules/`, `dist/`, `.obsidian/` y `tmp/`.

- El alumno confirmó en PowerShell Node.js 24.17.0, npm 11.13.0 y Vite 8.3.4, y arrancó el servidor de desarrollo.
- Su captura del navegador muestra la página inicial con los estilos y el mensaje escrito desde JavaScript. Esta confirmación se limita a la pantalla inicial mostrada.

## Aprendizaje

Se explicó para qué sirve Vite, cómo comprobar su instalación, qué terminal utilizar y qué añade frente a Live Server. La explicación se recoge en `Estudio.md` y la asistencia en `Uso-IA.md`.

## Siguiente paso

El alumno realizará el primer commit de la base revisada. Después compartirá sus ideas para elegir la API y delimitar una primera versión.
