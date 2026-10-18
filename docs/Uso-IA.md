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

## 2026-10-16 · Recursos del alumno y diseño oscuro

- **Aportación propia del alumno:** PNG del título, SVG de onda, texto exacto de descripción y petición de eliminar la frase superior y usar fondo gris oscuro con imágenes sobre negro.
- **Ayuda de IA:** integración de los recursos locales, ajuste de HTML y CSS, elección de tonos oscuros y plateados a partir del PNG y adaptación de los controles y las dos vistas.
- **Comprobaciones del agente:** PNG original idéntico por SHA-256, compilación correcta, recursos cargados, contraste de seis pares de texto/fondo superior a 4,5:1, nueve anchos sin solapamientos ni desbordamientos y capturas de escritorio y móvil inspeccionadas. API real y favoritos con recarga y teclado; carga, error y vacío simulados. Detalles en `Sesiones/2026-10-16-Diseno-oscuro.md`.
- **Alcance:** presentación y documentación; sin cambios en JavaScript ni dependencias nuevas. Pendiente de revisión visual del alumno y de su commit/push.

## 2026-10-16 · Guía de almacenamiento y revisión visual

- **Petición del alumno:** documento independiente `localStorage.md`; fuente Fortnite excepto descripción y footer; hero negro con degradado rojo; botones principales más grandes y con acabado plateado; fondo de tienda claro y footer negro con una única atribución enlazada.
- **Aportación propia:** tres capturas para mostrar el estado de hero, tienda y favoritos, otro SVG, dos archivos OTF y la dirección de diseño que quiere probar. Pide aprender cómo se diseñan los botones.
- **Ayuda de IA:** comprobación de que ambos OTF son idénticos, integración de una sola fuente y del SVG, ajustes de HTML/CSS, creación de la guía de almacenamiento y explicación de degradados, sombras y estados de botones en `Estudio.md`.
- **Comprobaciones del agente:** compilación y carga de fuente, tipografías excluidas, colores y contenido de footer, hover y movimiento reducido, nueve anchos sin desbordamiento ni solapamiento de título y navegación, seis pares de contraste superiores a 4,5:1 y favoritos con persistencia y teclado. Capturas de hero, tienda, favoritos y footer inspeccionadas.
- **Alcance:** presentación y documentación; no se cambia la lógica de favoritos ni se añaden dependencias npm. Pendientes la valoración personal del alumno sobre esta prueba visual y su commit/push.

## 2026-10-16 · Pulido visual y cabecera de favoritos

- **Aportación del alumno:** confirma el commit anterior y valora positivamente el diseño. Aporta Garet Heavy y capturas con tamaños y separación deseados; redacta los textos de favoritos.
- **Ayuda de IA:** integración de la fuente, halo azul hielo más amplio, botones mayores y acabado compartido, margen de secciones y adaptación de la vista de favoritos para una sola fecha y recuento.
- **Comprobaciones del agente:** sintaxis y compilación; fuentes, hover, teclado, recarga y retorno a tienda; recuentos 0/1/2, fecha de API, fecha inválida, error y reintento; nueve anchos y capturas de escritorio y móvil. Detalle en `Sesiones/2026-10-16-Pulido-y-cabecera-favoritos.md`.
- **Alcance:** presentación, cambios pequeños de vista y documentación. No se cambia el formato de localStorage ni se añaden dependencias. Pendiente de revisión y commit/push del alumno.

## 2026-10-17 · Declaración pública y preparación de la Autopsia

- **Petición del alumno:** comandos de commit y push, aclaración sobre el bonus de caché, propuestas para redactar su Autopsia y declaración de IA siguiendo M1.
- **Confirmación propia:** indica que los favoritos se guardan en su sección y se reinician al cambiar el día de tienda. No se le atribuye la ejecución de pruebas detalladas adicionales.
- **Ayuda de IA:** lectura del README de M1 y del código actual; adaptación de la declaración pública con las aportaciones reales y la metodología, explicación de la diferencia entre favoritos y caché y preguntas sobre decisiones técnicas para la reflexión del alumno.
- **Documentación interna:** se describe `docs/` como apuntes y seguimiento de Obsidian. La instalación, el funcionamiento y la declaración pública se mantienen en README.
- **Alcance:** documentación; no se implementa caché ni se cambian código, dependencias o configuración. La Autopsia final sigue pendiente de redacción literal del alumno. No se repiten pruebas funcionales de navegador para estos cambios de texto.

## 2026-10-18 · Incorporación de las autopsias del alumno

- **Aportación del alumno:** elige favoritos diarios y lotes como temas, redacta sus reflexiones a partir de prototipos y aclaraciones y entrega el texto que desea publicar.
- **Ayuda de IA:** borradores breves siguiendo el estilo de M1, explicación de una decisión y contraste de imprecisiones con el código. Tras su revisión, el alumno pide incorporar su última versión.
- **Cambios:** incorporación de esa versión al README y al documento de Autopsia, adaptación de encabezados Markdown y actualización del seguimiento y de la declaración de IA. No se reescribe la reflexión recibida.
- **Comprobaciones:** correspondencia del texto incorporado y formato del diff; no se ejecutan nuevas pruebas funcionales porque solo se modifica documentación.
- **Siguiente paso acordado:** commit y push ejecutados por el alumno y posterior revisión frente a la rúbrica cuando comparta el repositorio.

## 2026-10-18 · Caché de respuestas

- **Decisión del alumno:** tras aclarar el texto del bonus, acepta tres horas de validez, caducidad por día UTC y actualización manual con un minuto entre consultas. Solicita implementarlo.
- **Ayuda de IA:** diseño de la separación, módulo de caché, coordinación con API y app, mensaje de procedencia y documentación educativa. Se conservan la lógica de favoritos y las autopsias finales.
- **Comprobaciones del agente:** sintaxis, compilación, API real persistida y recarga sin consulta; reloj y respuestas simulados para caducidad, medianoche, espera, fallos de red y almacenamiento, vacío y fecha inválida; favoritos, cuatro anchos y capturas. Detalle en `Sesiones/2026-10-18-Cache-de-respuestas.md`.
- **Alcance:** se implementa el bonus sin dependencias nuevas. El almacenamiento es local por origen; no hay consultas periódicas ni un límite global entre navegadores.
- **Pendiente propio:** revisión del alumno y ejecución de commit y push. No se presenta la comprobación del agente como revisión personal suya.

## 2026-10-18 · Confirmación de revisión personal

- **Confirmación del alumno:** ha revisado la caché y el README y confirma su funcionamiento. Solicita sustituir la frase que aún dejaba pendiente su revisión.
- **Ayuda de IA:** actualización de esa frase y del seguimiento documental, sin atribuir al alumno las pruebas detalladas del agente ni modificar sus autopsias.
- **Comprobación:** formato del diff; no se repiten pruebas funcionales porque no cambian código, dependencias ni configuración.
- **Git:** el alumno ejecutará personalmente commit y push del ajuste.

## Registro de los siguientes bloques

Anotar fecha, petición concreta, aportación del alumno, ayuda recibida, dudas reales, correcciones y comprobaciones. No atribuir al alumno revisiones que todavía no haya confirmado.
