# Tienda de Fortnite

M2 · Async Odyssey — U2 · JavaScript avanzado y herramientas del frontend.
Web Development I, the Client · U-tad.

## Descripción del proyecto

Aplicación desarrollada con HTML, CSS, JavaScript y Vite que consulta la tienda actual de Fortnite y organiza sus ofertas por secciones. Cada tarjeta muestra una imagen, el nombre, el tipo y el precio en pavos; los lotes conservan una sola tarjeta y un único precio por oferta.

La página muestra la fecha de la rotación, el número de ofertas y enlaces para recorrer las secciones. Permite actualizar los datos y distingue carga, error y tienda vacía. Los datos proceden de [Fortnite-API](https://fortnite-api.com/), un servicio comunitario no oficial de Epic Games. La consulta utilizada no requiere cuenta ni API key.

El proyecto practica peticiones asíncronas, transformación de arrays, módulos ES y renderizado del DOM. Los precios y la disponibilidad deben confirmarse dentro del juego.

## Cómo probarlo

Requiere Node.js compatible con Vite y npm. Para la versión instalada de Vite, Node.js debe ser 20.19 o superior dentro de la rama 20, o 22.12 o superior. La preparación se realiza con Node.js 24.17.0 y npm 11.13.0.

Desde la carpeta del repositorio:

```powershell
npm ci
npm run dev
```

1. Abre la dirección que indique el terminal.
2. Espera a que se cargue la tienda y comprueba la fecha de la rotación.
3. Recorre las ofertas y utiliza los enlaces para saltar entre secciones.
4. Pulsa «Actualizar tienda» y comprueba que las tarjetas se reemplazan.
5. Para comprobar el error, activa el modo sin conexión en las herramientas de desarrollo del navegador y actualiza la tienda. Restablece la conexión y pulsa «Volver a intentar».

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
| `js/api.js` | Petición HTTP, límite de espera y validación de la respuesta. |
| `js/datos.js` | Normalización, filtrado de entradas inválidas y agrupación de ofertas. |
| `js/vista.js` | Tarjetas, navegación, fechas, precios y estados de la interfaz. |
| `assets/` | Recursos gráficos y otros archivos locales que se incorporen al proyecto. |
| `package.json` | Datos del proyecto, scripts y dependencia de Vite. |
| `package-lock.json` | Versiones de las dependencias para instalaciones reproducibles. |
| `.gitignore` | Exclusiones de dependencias instaladas, compilación y archivos locales. |
| `docs/` | Contexto, decisiones, aprendizaje y seguimiento utilizados con Obsidian. |
| `AGENTS.md` | Metodología de trabajo para futuras sesiones. |

## Funcionalidades del programa

- Consulta real mediante `fetch`, `async/await`, `response.ok` y manejo de errores con `try/catch/finally`.
- `map` transforma las entradas de la API en ofertas con un formato común.
- `filter` descarta entradas sin un identificador válido.
- `reduce` agrupa las ofertas por el nombre de sección que proporciona la API.
- Tarjetas para cosméticos de Battle Royale, música, instrumentos y vehículos; lotes mostrados como una oferta completa.
- Navegación por secciones, actualización y recuperación mediante reintento.
- Estados visibles de carga, error y ausencia de ofertas; espera máxima de 15 segundos por petición.
- Alternativas para imágenes fallidas, precios ausentes y fechas no válidas.
- Diseño adaptable y controles utilizables mediante teclado.

Los requisitos y las funcionalidades por desarrollar se siguen en `docs/Pendientes.md`.

## Comprobaciones realizadas

### Comprobación manual del alumno

El alumno comprobó Node.js, npm, Vite y la plantilla previa en el navegador. Después confirma que la versión funcional de la tienda funciona correctamente y solicita repasar su código antes de continuar. Esta confirmación general no implica que haya repetido todas las pruebas detalladas del agente.

### Comprobaciones del agente o herramientas

- `node --check` sobre `app.js` y los tres módulos de `js/`: sintaxis correcta.
- `npm run build`: compilación de producción correcta.
- Chromium con la API real: 412 ofertas en 23 secciones en la rotación consultada el 16 de octubre de 2026; navegación y renderizado completos.
- Comprobación de escritorio y móvil, sin desbordamiento horizontal en anchos de 1366, 800, 768, 481, 480, 390 y 320 píxeles CSS.
- Teclado: enlace para saltar al contenido, actualización y activación de enlaces de sección.
- Respuestas simuladas en navegador: carga, tienda vacía, HTTP 500, interrupción de red, JSON inválido y estructura inesperada; reintento y recuperación correctos.
- Datos simulados incompletos: lotes, música, imágenes ausentes o fallidas, precio cero o inválido, fecha no válida y HTML mostrado como texto literal.
- Actualización sin duplicar tarjetas y transformación sin modificar los datos recibidos.
- Petición sin respuesta: cancelación a los 15 segundos y controles disponibles para reintentar.
- Exclusiones de Git comprobadas para dependencias, compilación, configuración de Obsidian y temporales.

Las pruebas de interfaz se ejecutaron en Chromium sin interfaz visible y se inspeccionaron capturas de escritorio y móvil. Son comprobaciones del agente; no sustituyen la revisión personal del alumno. No se han incorporado herramientas de pruebas como dependencias del proyecto ni se han guardado pruebas auxiliares en el repositorio.

## Uso de IA

El alumno proporcionó el enunciado, la rúbrica y la teoría, y solicitó una plantilla inicial con documentación de seguimiento. Codex ayudó a preparar los archivos base, la configuración de Vite y los documentos Markdown.

El alumno propuso Spotify y Fortnite como posibles temáticas y decidió comenzar mostrando únicamente la tienda de Fortnite organizada. Codex ayudó a investigar las APIs, a implementar la consulta y los módulos de datos y vista, y a comprobar casos de error y adaptación a móvil.

El alumno aporta las decisiones de alcance y gestiona Git y GitHub. El registro de asistencia, aportaciones propias y verificaciones se mantiene en `docs/Uso-IA.md`.

### Preguntas y decisiones del desarrollo

- Se conserva la separación entre HTML, CSS y JavaScript de M1.
- Se incorpora Vite porque lo exige M2 y permite trabajar con módulos ES mediante un servidor de desarrollo.
- Se explicó la relación con Live Server: ambos permiten ver cambios durante el desarrollo; Vite también procesa módulos y dependencias y genera la versión de producción.
- Se investigó qué datos ofrecen Spotify y Fortnite-API, qué autorización necesitan y si permiten trabajar con estadísticas de torneos.
- El alumno eligió un alcance inicial centrado en mostrar la tienda organizada; las ampliaciones se valorarán después de revisar esta versión.
- Se mantiene una tarjeta por oferta para conservar el precio de los lotes y se separan datos, petición y DOM para facilitar el aprendizaje y la futura reconstrucción con React.
- El alumno pidió entender el recorrido completo antes de ampliar la aplicación; se preparó una explicación de la consulta HTTP, JSON, asincronía, transformación de arrays y construcción del DOM en `docs/Estudio.md`.
- Durante el repaso preguntó si Vite interpreta el JSON y cómo se crean las tarjetas desde JavaScript. Se aclararon las responsabilidades del navegador y se preparó `docs/UsosMapFilterReduce.md` con parámetros, retornos y usos reales de los métodos de array.

## Autopsia

Pendiente de redacción por el alumno al finalizar la misión. Durante el desarrollo se recogerán decisiones, alternativas y limitaciones en `docs/Autopsia.md`.
