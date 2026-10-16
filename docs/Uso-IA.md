# Seguimiento del uso de IA

Este registro servirá para redactar la declaración pública del README a partir del trabajo realmente realizado.

## 2026-10-16 · Plantilla inicial

- **Herramienta:** ChatGPT mediante Codex. La identificación concreta del modelo se anotará a partir del selector utilizado por el alumno antes de cerrar la declaración.
- **Petición del alumno:** preparar README, HTML, CSS, JavaScript y carpetas de recursos y documentación antes de comenzar la aplicación.
- **Aportación propia:** enunciado, rúbrica, teoría, metodología, repositorio de GitHub y petición del alcance inicial. El alumno configuró la conexión del repositorio local con GitHub.
- **Ayuda de IA:** preparación de los archivos base, scripts de Vite, exclusiones de Git y documentos de seguimiento.
- **Comprobaciones del agente:** sintaxis mediante `node --check app.js`, compilación con `npm run build`, respuestas HTTP 200 y contenido esperado del HTML, CSS y módulo JavaScript mediante el servidor de desarrollo; exclusiones de Git para dependencias, compilación, Obsidian y temporales. Estas pruebas no ejecutan la interfaz en un navegador real.
- **Comprobaciones del alumno:** versiones de Node.js, npm y Vite verificadas en PowerShell; servidor de desarrollo arrancado; captura del navegador que confirma la página inicial con sus estilos y el mensaje escrito desde JavaScript.
- **Preguntas trabajadas:** cómo verificar la instalación y arrancar la aplicación, qué terminal utilizar y en qué se parece Vite a Live Server y qué aporta además del servidor de desarrollo. La explicación se recoge en `Estudio.md`.
- **Decisiones pendientes:** temática, API, funcionalidades y diseño definitivo.

## 2026-10-16 · Investigación de APIs

- **Petición del alumno:** investigar los datos y usos de Spotify Web API y Fortnite-API para crear una herramienta personal que cumpla M2.
- **Aportación propia:** propone las dos temáticas, aporta los enlaces y confirma que tiene Spotify Premium.
- **Ayuda de IA:** consulta de fuentes primarias, comparación de requisitos y límites, distinción entre estadísticas generales y datos de torneos, y búsqueda de una alternativa especializada.
- **Comprobaciones del agente:** solicitudes públicas sin credenciales a la tienda y al mapa de Fortnite-API (HTTP 200), y al endpoint de estadísticas (HTTP 401 por ausencia de clave). Las respuestas incluyeron cabeceras CORS abiertas. No se ha probado OAuth de Spotify ni peticiones autenticadas de Fortnite.
- **Decisiones pendientes:** elección de API y utilidad concreta. No se han registrado aplicaciones, contratado servicios ni añadido credenciales.
- **Seguimiento:** resultados y fuentes en `Investigacion-APIs.md`. No se ha cambiado el código de la plantilla.

## 2026-10-16 · Alcance de una web gratuita de Fortnite

- **Aportación del alumno:** pide priorizar el acceso gratuito y propone una web de Fortnite con portada, tienda y estadísticas; solicita valorar si resulta demasiado sencilla.
- **Ayuda de IA:** distingue estadísticas personales de métricas de islas, comprueba recursos públicos y propone una utilidad de planificación de presupuesto para dar sentido a los métodos de array.
- **Comprobaciones del agente:** HTTP 200 y cabeceras CORS abiertas en tienda, búsqueda de cosméticos y catálogo de islas de Epic. Las métricas de una isla concreta todavía no se han probado.
- **Estado:** propuestas pendientes de confirmación, sin cambios en la aplicación ni nuevas dependencias. Detalles en `Investigacion-APIs.md`.

## 2026-10-16 · Primera tienda organizada

- **Decisión del alumno:** mostrar únicamente la tienda organizada y valorar ampliaciones después.
- **Ayuda de IA:** implementación de la petición y los módulos de datos y vista, diseño inicial, manejo de errores y actualización de documentación.
- **Comprobaciones del agente:** sintaxis y compilación; Chromium con la API real; estados simulados de carga, vacío, HTTP, JSON, red y estructura inválidos; datos incompletos; reintento, actualización, teclado y móvil. El detalle se recoge en `Sesiones/2026-10-16-Tienda-organizada.md`.
- **Corrección durante la revisión:** columna móvil cambiada de `1fr` a `minmax(0, 1fr)` para contener la navegación horizontal.
- **Aportación pendiente del alumno:** revisar visualmente esta versión, preguntar por los conceptos que necesite repasar y realizar el commit cuando cierre el avance.
- **Alcance:** no se han añadido dependencias ni funcionalidades de presupuesto, estadísticas, filtros, favoritos o caché.

## 2026-10-16 · Explicación de la API y del recorrido

- **Petición del alumno:** entender el flujo y las funciones ya implementadas, porque no ha trabajado antes con APIs y quiere poder hacer cambios por su cuenta.
- **Ayuda de IA:** lectura del código actual y explicación de HTTP, JSON, promesas, `async/await`, módulos, normalización, métodos de array y creación del DOM. Se amplía `Estudio.md` con funciones, ejemplos y pasos para inspeccionar la petición en el navegador.
- **Alcance:** documentación educativa; no se cambian funcionalidades, configuración ni dependencias y no se ejecutan nuevas pruebas de la aplicación.
- **Pendiente del alumno:** repasar el recorrido, realizar sus propias comprobaciones y plantear las dudas restantes. No se da por confirmada su comprensión del código.

## 2026-10-16 · Repaso por puntos y apuntes de arrays

- **Aportación del alumno:** lee la explicación, propone los conceptos y esquemas que quiere conservar, acepta la separación de módulos y confirma que la versión funciona correctamente. Indica que ya conocía `querySelector` y que lo explicó en la defensa de M1.
- **Preguntas reales:** si Vite interpreta el JSON; cómo se relacionan petición, normalización, agrupación y creación del DOM; cómo funcionan `async`, `await`, `fetch`, `map`, `filter` y `reduce`.
- **Ayuda de IA:** ampliación de `Estudio.md`, creación de `UsosMapFilterReduce.md` y comentarios breves en HTML y JavaScript. Se aclara que el navegador interpreta el JSON y que `prepararTienda` prepara datos mientras `mostrarTienda` crea el DOM.
- **Alcance:** apuntes y comentarios; no se añaden funcionalidades, dependencias ni cambios de configuración.
- **Autopsia:** se registran temas técnicos para valorar después, sin redactar la reflexión final del alumno.
- **Git:** el alumno solicita comandos para guardar el avance y mantiene la ejecución de add, commit y push.
- **Comprobaciones del agente en este bloque:** sintaxis de los cuatro archivos JavaScript, compilación de producción y formato del diff correctos; `node_modules` y `dist` continúan excluidos de Git. No se repiten las pruebas funcionales de navegador, dado que solo se han modificado comentarios y documentación.

## 2026-10-16 · Consulta sobre favoritos y persistencia

- **Propuesta del alumno:** estrella en cada oferta, acceso a favoritos en la cabecera y comparación entre selección diaria y conservación entre rotaciones.
- **Ayuda de IA:** revisión de los datos normalizados y consulta de documentación de MDN sobre persistencia, origen y cuotas. Comparación de las dos opciones y recomendación de guardar una copia de los datos necesarios para favoritos que sobrevivan a la rotación.
- **Aclaración sobre la misión:** guardar favoritos no sustituye la caché de respuestas que evita peticiones repetidas y constituye el bonus.
- **Estado:** se registra la explicación en `Estudio.md`; comportamiento pendiente de elección. No se implementan favoritos, caché, navegación ni cambios visuales y no se ejecutan pruebas nuevas de la aplicación.

## 2026-10-16 · Implementación de favoritos diarios

- **Decisión del alumno:** elegir favoritos limitados a la rotación actual, tras comparar las dos opciones. Solicita desarrollo, explicación y comandos de commit y push.
- **Ayuda de IA:** módulo de almacenamiento validado, estrellas, contador, vista interna y filtrado de secciones; coordinación con la carga de la tienda, tratamiento de errores y actualización de apuntes.
- **Comprobaciones del agente:** sintaxis, compilación, Chromium con la API real y respuestas simuladas; persistencia, cambio de fecha, conservación ante errores de consulta, fecha inválida, almacenamiento corrupto o bloqueado, cuota, vacío, teclado, historial y móvil. Detalle en `Sesiones/2026-10-16-Favoritos-diarios.md`.
- **Estado:** funcionalidad implementada, sin dependencias nuevas. Falta la revisión del alumno de este bloque y su commit/push. Guardar favoritos no implementa la caché de respuestas del bonus.
- **Aprendizaje documentado:** JSON serializado, clave versionada, Set de identificadores, fecha UTC, delegación de eventos y reutilización de tarjetas sin consultar de nuevo al alternar vistas.

## Registro de los siguientes bloques

Anotar fecha, petición concreta, aportación del alumno, ayuda recibida, dudas reales, correcciones y comprobaciones. No atribuir al alumno revisiones que todavía no haya confirmado.
