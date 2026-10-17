# Contexto del proyecto

## Identificación

- Asignatura: Web Development I, the Client · U-tad.
- Unidad: U2 · JavaScript avanzado y herramientas del frontend.
- Misión: M2 · Async Odyssey.
- Repositorio: <https://github.com/chiissuu/M2-PWIC>.
- Carpeta: `M2-PWIC`, dentro de la carpeta global `PWIC`, junto a `aim-trainer`.
- Proyecto: Fortnite Daily Shop!, identidad de título aportada por el alumno; inicialmente denominado Tienda de Fortnite.
- Estado: avance visual anterior confirmado por el alumno y guardado en `c88e8d9`, comprobado en `main` local. Retoques con Garet, halo azul hielo y nueva cabecera de favoritos implementados y comprobados por el agente; pendientes de revisión y commit del alumno.

## Objetivo y rúbrica

Crear una aplicación con Vite que consuma una API pública real, transforme los datos y los muestre en el DOM.

| Apartado | Requisitos compartidos por el alumno | Puntos |
| --- | --- | ---: |
| Asincronía | `fetch`, `async/await`, `try/catch`, `response.ok` y estados de carga y error visibles. | 20 |
| Transformación de datos | Métodos de array como `map`, `filter` y `reduce` con una utilidad real. | 15 |
| Módulos y estructura | Separar API, lógica y renderizado mediante módulos ES. | 15 |
| Robustez | Manejar respuestas vacías, errores de red y datos inesperados. | 10 |
| Originalidad | Temática y presentación propias. | 10 |
| Checks automáticos | README, declaración de IA, limpieza, commits, tecnología y estructura. | 30 |

Bonus: caché en `localStorage` para evitar peticiones repetidas. Los detalles de los checks automáticos y la fecha límite todavía no se han facilitado.

## Base actual

- `index.html` contiene cabecera con enlaces a tienda y favoritos, controles, mensajes de estado y contenedores de las dos vistas.
- `styles.css` organiza tarjetas y secciones, con navegación lateral en escritorio y horizontal en móvil.
- `app.js` coordina la carga inicial, la actualización, el reintento, las estrellas y el cambio de vista mediante el hash de la URL. Conserva la tienda actual en memoria.
- `js/api.js` consulta `https://fortnite-api.com/v2/shop?language=es`, comprueba `response.ok`, limita la espera a 15 segundos y valida la lista de ofertas.
- `js/datos.js` normaliza ofertas con `map`, descarta entradas inválidas con `filter` y agrupa por sección mediante `reduce`.
- `js/datos.js` también obtiene una tienda filtrada por favoritos conservando sus secciones.
- `js/favoritos.js` guarda fecha UTC e identificadores bajo `m2-pwic:favoritos-diarios`, valida los datos recuperados y reinicia la selección al confirmar otra fecha de rotación.
- `js/vista.js` crea tarjetas y enlaces, mantiene las estrellas y el contador y representa tienda, favoritos, carga, vacíos y errores.
- `assets/fortnite-daily-shop.png` contiene el PNG original del título aportado por el alumno. `assets/waves.svg` conserva el trazado aportado, con relleno adaptado al color de la cabecera.
- `assets/burbank-big-condensed-black.otf` contiene la fuente local; los dos archivos tipográficos aportados eran idénticos y se conserva una sola copia.
- `assets/garet-heavy.ttf` contiene la fuente aportada para descripción y footer.
- `package.json` define `dev`, `build` y `preview`, con Vite como única dependencia directa.
- `docs/` conserva contexto, tareas, decisiones, estudio, uso de IA, reflexiones y sesiones.

Las imágenes se cargan desde las direcciones recibidas en la API. Cada oferta se muestra una sola vez, aunque incluya varios artículos; no se descompone el precio de los lotes. Los nombres se insertan con `textContent` y las imágenes fallidas tienen una alternativa visible.

## Alcance confirmado

El alumno elige comenzar por la tienda actual de Fortnite organizada y después autoriza favoritos diarios: estrella por oferta y acceso a una vista de favoritos en la cabecera. Se mantiene una tarjeta por oferta completa, incluidos los lotes. No se han añadido presupuesto, compras, estadísticas de jugadores, mapas, buscadores ni caché de respuestas.

Recorrido: abrir la página, cargar la tienda, consultar ofertas por secciones y actualizar cuando se desee. Si falla la consulta, aparece un mensaje y un botón de reintento.

La selección de favoritos se conserva al recargar dentro de la misma fecha de rotación UTC y se reinicia solo cuando una respuesta válida confirma otra fecha. La aplicación no sondea automáticamente la API. Una fecha inválida no modifica lo guardado y desactiva las estrellas; un fallo de consulta no ejecuta la sincronización. Si falla el almacenamiento, la selección sigue en memoria con aviso. Si una oferta deja de aparecer en una respuesta válida de la misma rotación, se retira de la selección disponible.

`#favoritos` muestra la selección y el enlace a `#contenido` vuelve a la tienda. Las tarjetas se reutilizan y los cambios de vista no hacen nuevas peticiones. Los favoritos guardan solo identificadores y fecha, por lo que necesitan cargar la tienda para confirmar la rotación y reconstruir las tarjetas; no son una caché ni una vista sin conexión.

## Comprobación del primer bloque

El agente probó sintaxis, compilación y Chromium con la tienda real, además de errores y datos incompletos simulados. Se revisaron capturas a 1366 × 900 y 390 × 844 y desbordamiento en siete anchos entre 320 y 1366 píxeles. Se probaron controles de teclado y la espera máxima. El alumno indica que todo funciona correctamente; no se le atribuye la ejecución de las pruebas detalladas del agente.

## Aprendizaje en curso

El alumno ha leído la explicación inicial y solicita un repaso por puntos antes de ampliar funcionalidades. `Estudio.md` recoge el endpoint, GET y JSON, la separación de módulos, el papel de Vite y del navegador, asincronía, construcción del DOM y errores. `UsosMapFilterReduce.md` desarrolla parámetros, retornos, ejemplos y usos reales de esos métodos.

Se aclara que `prepararTienda` normaliza y agrupa datos, mientras que `mostrarTienda` crea el DOM. El alumno ya conocía `querySelector`; pide destacar la creación dinámica con `createElement`, `textContent`, `className` y `append`. La comprensión práctica completa sigue en revisión.

`localStorage.md` desarrolla en un documento independiente el almacenamiento, el esquema JSON, la relación entre módulos, las funciones y los recorridos de carga y selección. `Estudio.md` incorpora la explicación de los botones mediante degradados, bisel, sombras, transformaciones y estados CSS.

## Propuestas del alumno

El alumno quiere una herramienta que le resulte útil y propone trabajar con Spotify o analizar datos de Fortnite, especialmente de torneos. Confirma disponer de Spotify Premium. Los recursos disponibles, las restricciones y las comprobaciones se recogen en [[Investigacion-APIs]]. No asumir que la API inicialmente enlazada de Fortnite proporciona clasificaciones competitivas.

Después de valorar el acceso de terceros, se priorizan recursos gratuitos sin claves ni inicio de sesión. La elección final para este primer bloque es la tienda de Fortnite-API. Las propuestas de presupuesto y mapas no forman parte del alcance confirmado.

## Método de trabajo

El 17 de octubre el alumno confirma el guardado y el reinicio diario de favoritos. Se prepara la declaración de IA del README siguiendo M1 y se proponen temas para su Autopsia, cuya redacción final sigue siendo suya. La caché de respuestas del bonus es independiente del almacenamiento de favoritos y todavía no está implementada. El siguiente cierre es el commit/push del alumno y la entrega de su reflexión; la evaluación del repositorio queda para cuando la solicite después.

Desarrollar bloques pequeños, comprobarlos y explicar los conceptos desconocidos antes de cerrar cada avance. El alumno gestiona los commits y los pushes. Registrar únicamente pruebas realizadas y conservar literalmente su redacción final de la Autopsia.

La misión M3 permitirá reconstruir o reinventar esta aplicación con React 19. En M2 se trabajará con JavaScript y DOM.

## Diseño visual actual

Se conserva el PNG completo con transparencia y texto alternativo en un `h1`, la descripción aportada y el separador SVG sin frase superior ni línea amarilla. El alumno solicita revisar el diseño previo oscuro con fuente Fortnite, fondo claro y botones más grandes.

Paleta actual: hero y footer negros; halo azul hielo ampliado detrás del PNG; página `#f4f5f7`, tarjetas blancas, zona de imagen negra y texto oscuro. Los enlaces principales aumentan hasta 448 × 128 píxeles en escritorio y se adaptan en móvil. Actualización, reintento y estrellas comparten el acabado facetado mediante `--acabado-diamante`. La fuente Burbank se usa en la interfaz y Garet Heavy en descripción y footer. Las secciones se separan con 72 píxeles de margen inferior.

En favoritos se ocultan la fecha y el resumen generales. Una sola cabecera muestra «Favoritos del día (fecha de la tienda en UTC)», el texto explicativo solicitado y el recuento específico de elementos guardados. La fecha corresponde a la respuesta cargada y no al reloj del equipo. Los identificadores, la caducidad y el formato de localStorage se mantienen.

El relleno del SVG y `--fondo-cabecera` son negros y deben mantenerse iguales si se modifica ese color. El SVG nuevo tiene el mismo trazado que el anterior, por lo que se adapta su presentación. No se cambian la consulta, los datos ni la lógica de favoritos en este bloque.
