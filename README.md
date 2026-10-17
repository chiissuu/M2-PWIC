# Fortnite Daily Shop!

M2 · Async Odyssey — U2 · JavaScript avanzado y herramientas del frontend.
Web Development I, the Client · U-tad.

## Descripción del proyecto

Aplicación desarrollada con HTML, CSS, JavaScript y Vite que consulta la tienda actual de Fortnite y organiza sus ofertas por secciones. Cada tarjeta muestra una imagen, el nombre, el tipo y el precio en pavos; los lotes conservan una sola tarjeta y un único precio por oferta.

La identidad visual utiliza el PNG de título, el separador SVG y las fuentes aportados por el alumno. Hero negro con un halo azul hielo amplio detrás del título, tienda y favoritos sobre gris muy claro y zonas de imagen negras. Burbank se utiliza en la interfaz y Garet Heavy en la descripción y el footer. Los enlaces principales son grandes y el acabado plateado con volumen se comparte con actualización, reintento y estrellas. El footer es negro con atribución blanca. El título conserva un encabezado `h1` con texto alternativo y la onda es decorativa.

La página muestra la fecha de la rotación, el número de ofertas y enlaces para recorrer las secciones. Permite actualizar los datos y distingue carga, error y tienda vacía. Los datos proceden de [Fortnite-API](https://fortnite-api.com/), un servicio comunitario no oficial de Epic Games. La consulta utilizada no requiere cuenta ni API key.

Cada oferta tiene una estrella para añadirla a favoritos de la rotación actual. La cabecera permite alternar entre tienda y favoritos sin volver a consultar la API. La selección se guarda en `localStorage` y se conserva al recargar durante la misma rotación; se reinicia al cargar una respuesta válida de otro día de rotación UTC.

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
6. Marca algunas estrellas y abre «Favoritos» en la cabecera. Comprueba las tarjetas seleccionadas y quita alguna pulsando su estrella.
7. Recarga y verifica que la selección sigue disponible durante esa rotación. También puedes abrir directamente la dirección con `#favoritos`.

Los favoritos pertenecen a este navegador y al origen de la página. Si el navegador impide guardarlos o agota la cuota, se muestra un aviso y la selección funciona en memoria mientras la página permanezca abierta. Una fecha de rotación inválida desactiva las estrellas sin borrar lo guardado; un error de consulta tampoco elimina la selección. No se comprueba automáticamente el cambio de tienda: se detecta al abrir o actualizar la página con éxito.

Se guardan identificadores y fecha, no las imágenes ni una copia completa de la tienda. Esta funcionalidad todavía no implementa el bonus de caché: abrir o actualizar la página sigue consultando la API para confirmar la rotación.

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
| `js/favoritos.js` | Lectura, validación y guardado de favoritos por día de rotación. |
| `js/vista.js` | Tarjetas, navegación, fechas, precios y estados de la interfaz. |
| `assets/` | PNG original del título y SVG de onda aportados por el alumno. |
| `assets/burbank-big-condensed-black.otf` | Fuente local utilizada en la tienda y los controles; se carga con `@font-face`. |
| `assets/garet-heavy.ttf` | Fuente local de descripción y footer. |
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
- Favoritos diarios con estrellas accesibles, contador y vista propia dentro de la aplicación.
- Cabecera de favoritos con una sola fecha de tienda, explicación y recuento de elementos seleccionados; los metadatos generales solo aparecen en la tienda.
- Persistencia en `localStorage`, validación de datos guardados y alternativa en memoria si falla el almacenamiento.

Los requisitos y las funcionalidades por desarrollar se siguen en `docs/Pendientes.md`.

El funcionamiento del almacenamiento, su relación con cada módulo y los esquemas de carga y selección se explican en [docs/localStorage.md](docs/localStorage.md). Los efectos de los botones y la carga de fuentes se explican en [docs/Estudio.md](docs/Estudio.md).

## Comprobaciones realizadas

### Comprobación manual del alumno

El alumno comprobó Node.js, npm, Vite y la plantilla previa en el navegador. Después confirmó que la versión funcional de la tienda funciona correctamente y solicitó repasar su código antes de continuar. El 17 de octubre confirmó también que los favoritos se guardan en su sección y que la selección se reinicia al cambiar el día de la tienda. Estas confirmaciones no implican que haya repetido todas las pruebas detalladas del agente.

### Comprobaciones del agente o herramientas

- `node --check` sobre `app.js` y los cuatro módulos de `js/`: sintaxis correcta.
- `npm run build`: compilación de producción correcta.
- Chromium con la API real: 412 ofertas en 23 secciones en la rotación consultada el 16 de octubre de 2026; navegación y renderizado completos.
- Comprobación de escritorio y móvil, sin desbordamiento horizontal en anchos de 1366, 800, 768, 481, 480, 390 y 320 píxeles CSS.
- Teclado: enlace para saltar al contenido, actualización y activación de enlaces de sección.
- Respuestas simuladas en navegador: carga, tienda vacía, HTTP 500, interrupción de red, JSON inválido y estructura inesperada; reintento y recuperación correctos.
- Datos simulados incompletos: lotes, música, imágenes ausentes o fallidas, precio cero o inválido, fecha no válida y HTML mostrado como texto literal.
- Actualización sin duplicar tarjetas y transformación sin modificar los datos recibidos.
- Petición sin respuesta: cancelación a los 15 segundos y controles disponibles para reintentar.
- Exclusiones de Git comprobadas para dependencias, compilación, configuración de Obsidian y temporales.
- Favoritos con la API real: selección de dos ofertas, recarga directa de `#favoritos` y vuelta mediante el historial sin peticiones adicionales al cambiar de vista.
- Favoritos con respuestas simuladas: persistencia, eliminación por teclado, vacío, cambio de fecha, fecha inválida y conservación de la selección ante errores HTTP, de red y estructura.
- Almacenamiento simulado corrupto, estructura guardada incorrecta, acceso bloqueado y cuota agotada: recuperación o selección en memoria con aviso, sin errores JavaScript no controlados.
- Capturas de favoritos revisadas en escritorio y móvil; sin desbordamiento en 1440, 1024, 801, 800, 480, 390 y 320 píxeles CSS.
- Diseño oscuro: recursos cargados, descripción solicitada, PNG original sin modificaciones y zona de imágenes negra; capturas revisadas y nueve anchos entre 320 y 1920 píxeles sin desbordamientos ni solapamientos entre título y navegación. Contraste de los seis pares de texto/fondo comprobados superior a 4,5:1. Estados de carga, error y vacío, y favoritos con recarga y teclado comprobados.
- Revisión posterior de diseño: fuente local cargada y excepciones de descripción y footer confirmadas; hero negro y rojo, fondos claros, imágenes negras y footer de ancho completo. Nueve anchos sin desbordamiento ni solapamiento de título y navegación; hover, movimiento reducido, favoritos con recarga y teclado y seis pares de contraste superiores a 4,5:1. Capturas de hero, tienda, favoritos y footer inspeccionadas.
- Retoques posteriores: Garet cargada en descripción y footer, botones ampliados y acabado compartido comprobados; cabecera de favoritos con recuentos 0/1/2, fecha inválida, error y reintento. Recarga, teclado y retorno a tienda correctos; nueve anchos sin desbordamientos ni solapamientos de título y navegación.

Las pruebas de interfaz se ejecutaron en Chromium sin interfaz visible y se inspeccionaron capturas de escritorio y móvil. Son comprobaciones del agente; no sustituyen la revisión personal del alumno. No se han incorporado herramientas de pruebas como dependencias del proyecto ni se han guardado pruebas auxiliares en el repositorio.

## Uso de IA

Para esta segunda misión he utilizado ChatGPT a través de Codex como ayuda para investigar APIs, desarrollar la aplicación y estudiar los conceptos nuevos. Mantengo la metodología de M1: trabajar por fases, revisar el resultado y preguntar por el código que necesito comprender antes de continuar. En esta misión no había trabajado antes con APIs, por lo que pedí explicar el recorrido completo desde la petición hasta las tarjetas de la tienda.

**Trabajo propio y asistido:** he aportado el enunciado y la rúbrica, las propuestas de temática, la elección de una tienda de Fortnite organizada y la decisión de guardar favoritos diarios. También he proporcionado el título gráfico, los separadores, las fuentes y los textos, y he dirigido los cambios de diseño mediante indicaciones y capturas. Realizo mis comprobaciones manuales y ejecuto los comandos de Git y GitHub.

Codex generó la plantilla y participó en la implementación de la petición a la API, la normalización y agrupación de datos, los módulos ES, el renderizado del DOM y la gestión de carga, errores y respuestas vacías. También implementó el almacenamiento de favoritos, las estrellas y la navegación entre vistas, integró los recursos gráficos y desarrolló los estilos y la adaptación a pantallas pequeñas. Además, preparó comentarios, apuntes de estudio y comprobaciones de sintaxis, compilación y navegador. La asistencia incluye generación de código y documentación, además de explicaciones.

He confirmado manualmente el funcionamiento de la tienda y de los favoritos, incluido el reinicio al cambiar el día de la tienda. Las comprobaciones detalladas realizadas con herramientas se identifican por separado en este README. La Autopsia final queda pendiente de mi propia redacción.

### Metodología y seguimiento

El trabajo se ha dividido en bloques: plantilla con Vite, elección de API y tienda organizada, repaso del flujo, favoritos diarios y ajustes visuales. Durante el desarrollo he preguntado por `fetch`, `async/await`, JSON, módulos, métodos de array, creación de elementos del DOM y persistencia. Los documentos de estudio permiten repasar las explicaciones y preparar cambios posteriores.

`docs/` contiene apuntes de aprendizaje, contexto y seguimiento utilizados como bóveda de Obsidian. Es documentación interna: no forma parte del funcionamiento de la aplicación ni pretende acreditar su calidad. Para instalar y utilizar la web no es necesario consultar esa carpeta; este README reúne la documentación pública y la declaración de IA. El registro de asistencia se conserva en `docs/Uso-IA.md`.

### Preguntas y decisiones del desarrollo

- Se conserva la separación entre HTML, CSS y JavaScript de M1.
- Se incorpora Vite porque lo exige M2 y permite trabajar con módulos ES mediante un servidor de desarrollo.
- Se explicó la relación con Live Server: ambos permiten ver cambios durante el desarrollo; Vite también procesa módulos y dependencias y genera la versión de producción.
- Se investigó qué datos ofrecen Spotify y Fortnite-API, qué autorización necesitan y si permiten trabajar con estadísticas de torneos.
- El alumno eligió un alcance inicial centrado en mostrar la tienda organizada; las ampliaciones se valorarán después de revisar esta versión.
- Se mantiene una tarjeta por oferta para conservar el precio de los lotes y se separan datos, petición y DOM para facilitar el aprendizaje y la futura reconstrucción con React.
- El alumno pidió entender el recorrido completo antes de ampliar la aplicación; se preparó una explicación de la consulta HTTP, JSON, asincronía, transformación de arrays y construcción del DOM en `docs/Estudio.md`.
- Durante el repaso preguntó si Vite interpreta el JSON y cómo se crean las tarjetas desde JavaScript. Se aclararon las responsabilidades del navegador y se preparó `docs/UsosMapFilterReduce.md` con parámetros, retornos y usos reales de los métodos de array.
- Se compararon favoritos diarios y persistentes entre tiendas, y el alumno eligió la opción diaria con fecha e identificadores en `localStorage`.
- Se aclaró que persistir favoritos no implementa la caché de respuestas del bonus: la carga y la actualización siguen consultando la API.

## Autopsia

Pendiente de redacción por el alumno al finalizar la misión. Durante el desarrollo se recogerán decisiones, alternativas y limitaciones en `docs/Autopsia.md`.
