# Decisiones del proyecto

Registrar aquí elecciones que afecten a la estructura, el funcionamiento o la defensa. Para cada una, indicar motivo y alternativa descartada.

## Base con Vite y JavaScript

**Decisión:** utilizar Vite con JavaScript y módulos ES. Vite será la única dependencia directa de esta plantilla y se instalará como dependencia de desarrollo.

**Motivo:** Vite es un requisito de M2 y proporciona servidor de desarrollo y compilación. No hace falta incorporar un framework para consumir una API y actualizar el DOM.

**Alternativa descartada:** preparar la aplicación con React desde el inicio, que corresponde a M3 y ampliaría el alcance de este bloque.

## Separación gradual de responsabilidades

**Decisión:** conservar HTML, CSS y JavaScript separados, con `app.js` como entrada. Añadir los módulos de API, datos y vista cuando se defina la primera funcionalidad.

**Motivo:** permite revisar una plantilla pequeña sin introducir funciones o archivos vacíos que todavía no tienen una responsabilidad real.

**Alternativa descartada:** crear de antemano módulos y abstracciones sin haber elegido API ni recorrido.

## Acceso gratuito sin autenticación del visitante

**Decisión:** priorizar endpoints que permitan utilizar la funcionalidad principal gratis y sin cuenta, clave o autorización individual del visitante.

**Motivo:** facilita que otra persona pruebe la aplicación y mantiene el alcance centrado en las peticiones, los datos y el DOM de M2. No se conoce el procedimiento exacto del evaluador y no se presenta este criterio como una exigencia adicional de la rúbrica.

**Alternativa descartada para la propuesta actual:** Spotify, por requerir autorización y limitar los usuarios de las aplicaciones nuevas en desarrollo. Las estadísticas personales y los proveedores de torneos con clave quedan fuera del alcance inicial sin credenciales. Se elige la consulta pública de la tienda de Fortnite-API.

## Comenzar únicamente con la tienda organizada

**Decisión del alumno:** desarrollar primero la visualización de la tienda y valorar las ampliaciones después de comprobarla.

**Motivo:** permite concentrar el aprendizaje en peticiones, arrays, módulos y DOM, con un resultado visible y fácil de revisar.

**Alternativa descartada para este bloque:** añadir un planificador de presupuesto, estadísticas, mapas o más secciones funcionales desde el comienzo.

## Una tarjeta por oferta y agrupación por sección

**Decisión:** mantener cada oferta completa y agruparla por `layout.name`, con «Más ofertas» para nombres de sección ausentes.

**Motivo:** la respuesta incluye lotes con varios artículos y un precio conjunto. Una tarjeta por oferta conserva la relación entre lo que se muestra y su precio. `map`, `filter` y `reduce` preparan los datos antes de que la vista los pinte.

**Alternativa descartada:** convertir cada artículo de un lote en una oferta independiente; repetiría el precio del conjunto y podría confundir al usuario.

## Diseño inicial y carga de imágenes

**Decisión:** cabecera azul, precios legibles y tarjetas con imágenes reales. Navegación lateral en escritorio y una fila desplazable de enlaces en móvil. Las imágenes utilizan carga diferida y una alternativa si fallan.

**Motivo:** da prioridad al contenido de la tienda sin descargar de inmediato todas las imágenes de una rotación extensa. No se han añadido tipografías, librerías ni recursos gráficos nuevos al repositorio.

**Alternativa descartada:** ampliar primero la portada o añadir animaciones en lugar de comprobar las ofertas y los estados.

## Favoritos limitados a la rotación actual

**Decisión del alumno:** elegir favoritos diarios entre las dos opciones comparadas. Cada estrella selecciona una oferta completa; la selección se conserva al recargar dentro de la misma rotación.

**Motivo técnico:** guardar identificadores y el día UTC indicado por la API permite recuperar las tarjetas desde la tienda actual sin duplicar sus datos. La selección se reinicia al confirmar otra fecha válida de rotación, no al cambiar el reloj local ni ante un fallo de red. Si una oferta deja la respuesta actual, se elimina su identificador de la selección disponible.

**Alternativa descartada para este bloque:** favoritos entre días, que necesitarían conservar datos de tarjetas antiguas y distinguir precios históricos de disponibilidad actual. La caché de respuestas del bonus queda pendiente como funcionalidad distinta.

## Vista interna y módulo de almacenamiento

**Decisión:** añadir `js/favoritos.js`, con almacenamiento bajo una clave propia y esquema versionado; utilizar `#favoritos` para cambiar de vista y reutilizar las tarjetas existentes.

**Motivo:** conserva la separación entre persistencia, datos y DOM. El hash permite abrir la vista directamente y usar el historial del navegador sin añadir dependencias ni una configuración de varias páginas. Los cambios de vista utilizan la tienda en memoria y no repiten peticiones.

**Alternativas descartadas:** duplicar HTML y lógica en otra página, o mezclar accesos a `localStorage` dentro de cada tarjeta. Si el almacenamiento falla, se permite continuar en memoria y se avisa; si la fecha de rotación no es válida, se desactiva la selección para no sobrescribir la anterior sin una referencia fiable.

## Identidad visual aportada y paleta oscura

**Decisión del alumno:** sustituir el título por el PNG aportado, usar su nueva descripción, quitar la frase superior, sustituir la línea amarilla por su SVG de onda y aplicar fondo gris oscuro con imágenes sobre negro.

**Implementación:** PNG original completo dentro del `h1`, con texto alternativo «Fortnite Daily Shop!». Cabecera azul petróleo oscuro para acompañar las letras plateadas; SVG con el mismo relleno. Controles y texto claros, con colores plateados para selección y foco. No se modifica la lógica JavaScript.

**Motivo:** seguir los recursos y la dirección visual del alumno manteniendo la lectura, los controles y la adaptación móvil. Se conserva el PNG original de aproximadamente 2,7 MB; no se genera ni se sustituye por una imagen nueva. Una optimización futura sería una tarea independiente.

## Revisión del hero, fuente local y fondo claro

**Decisión posterior del alumno:** probar hero negro con degradado rojo detrás del PNG, fondo gris muy claro en tienda y favoritos, tipografía Fortnite excepto descripción y footer y enlaces principales más grandes y separados.

**Implementación:** los dos OTF aportados tienen el mismo SHA-256 y familia interna «Burbank Big Cd Bk»; se copia uno a `assets/` y se declara con `@font-face`. La descripción y el footer conservan Segoe UI. El nuevo SVG tiene el mismo trazado que el anterior y se adapta a negro para cerrar el hero sobre el fondo claro.

**Botones:** acabado plateado mediante degradado, borde luminoso, sombras de bisel e inclinación leve; texto con inclinación compensada. Hover más claro y elevado, pulsación más baja, foco visible y eliminación del movimiento cuando se solicita reducirlo. Se utiliza CSS sin bibliotecas ni imágenes nuevas de botones.

**Footer:** a petición del alumno, solo la atribución a Fortnite-API, en blanco y negrita sobre negro a todo el ancho, sin línea divisoria.

**Alternativa reemplazada:** hero azul petróleo y fondo oscuro de la revisión anterior. Es una prueba visual solicitada; el PNG original y la lógica de favoritos se conservan.
