# M2 · Async Odyssey

U2 · JavaScript avanzado y herramientas del frontend.
Web Development I, the Client · U-tad.

## Descripción del proyecto

Plantilla inicial de la segunda misión. La temática y la API pública se elegirán en el siguiente bloque. La aplicación se desarrollará con JavaScript, módulos ES y Vite.

Esta base muestra una página de presentación y un mensaje escrito desde JavaScript. Todavía no realiza peticiones ni implementa las funcionalidades de la misión.

## Cómo probarlo

Requiere Node.js compatible con Vite y npm. Para la versión instalada de Vite, Node.js debe ser 20.19 o superior dentro de la rama 20, o 22.12 o superior. La preparación se realiza con Node.js 24.17.0 y npm 11.13.0.

Desde la carpeta del repositorio:

```powershell
npm ci
npm run dev
```

Abre la dirección que indique el terminal. La página debe mostrar «Plantilla inicial» y el mensaje «Base preparada. La idea y la API se definirán en el siguiente bloque.».

Para generar y servir la versión de producción:

```powershell
npm run build
npm run preview
```

Utiliza el servidor de Vite para ejecutar los módulos ES.

## Tecnologías y dependencias

- HTML para la estructura semántica.
- CSS para la presentación.
- JavaScript con módulos ES para el comportamiento.
- Vite 8.3.4 como dependencia de desarrollo.

## Archivos

| Archivo o carpeta | Responsabilidad |
| --- | --- |
| `index.html` | Estructura de la página y entrada al módulo JavaScript. |
| `styles.css` | Estilos iniciales. |
| `app.js` | Punto de entrada de la aplicación. |
| `assets/` | Recursos gráficos y otros archivos locales que se incorporen al proyecto. |
| `package.json` | Datos del proyecto, scripts y dependencia de Vite. |
| `package-lock.json` | Versiones de las dependencias para instalaciones reproducibles. |
| `.gitignore` | Exclusiones de dependencias instaladas, compilación y archivos locales. |
| `docs/` | Contexto, decisiones, aprendizaje y seguimiento utilizados con Obsidian. |
| `AGENTS.md` | Metodología de trabajo para futuras sesiones. |

## Funcionalidades del programa

- Página inicial con HTML y CSS separados.
- Mensaje actualizado desde un módulo JavaScript.
- Scripts para desarrollo, compilación y previsualización.

Los requisitos y las funcionalidades por desarrollar se siguen en `docs/Pendientes.md`.

## Comprobaciones realizadas

### Comprobación manual del alumno

El alumno comprobó las versiones de Node.js, npm y Vite, arrancó `npm run dev` y confirmó mediante una captura que la página inicial muestra sus estilos y el mensaje escrito desde JavaScript.

### Comprobaciones del agente o herramientas

- `node --check app.js`: sintaxis correcta.
- `npm run build`: compilación de producción correcta.
- Servidor de desarrollo: HTML, CSS y JavaScript respondieron con HTTP 200 y el contenido esperado.
- Exclusiones de Git comprobadas para dependencias, compilación, configuración de Obsidian y temporales.

Estas comprobaciones no sustituyen una revisión visual ni ejecutan el DOM en un navegador real.

## Uso de IA

El alumno proporcionó el enunciado, la rúbrica y la teoría, y solicitó una plantilla inicial con documentación de seguimiento. Codex ayudó a preparar los archivos base, la configuración de Vite y los documentos Markdown.

La temática, la API y las funcionalidades concretas todavía no se han elegido. El registro de asistencia, aportaciones propias y verificaciones se mantiene durante el desarrollo en `docs/Uso-IA.md` y se resumirá aquí para la entrega.

### Preguntas y decisiones del desarrollo

- Se conserva la separación entre HTML, CSS y JavaScript de M1.
- Se incorpora Vite porque lo exige M2 y permite trabajar con módulos ES mediante un servidor de desarrollo.
- Se explicó la relación con Live Server: ambos permiten ver cambios durante el desarrollo; Vite también procesa módulos y dependencias y genera la versión de producción.

## Autopsia

Pendiente de redacción por el alumno al finalizar la misión. Durante el desarrollo se recogerán decisiones, alternativas y limitaciones en `docs/Autopsia.md`.
