# Favoritos diarios

## Petición del alumno

Tras comparar favoritos diarios y conservados entre días, el alumno elige la primera opción y solicita implementarla, explicar los cambios y preparar comandos de commit y push.

## Cambios

- Nuevo `js/favoritos.js`: lectura validada, esquema versionado, identificadores sin duplicados y fecha UTC de rotación. Clave propia `m2-pwic:favoritos-diarios`.
- Estrellas en las tarjetas con nombre accesible, estado `aria-pressed` y funcionamiento con teclado.
- Enlaces Tienda y Favoritos con contador en la cabecera; vista interna mediante `#favoritos`, compatible con entrada directa e historial.
- `app.js` conserva la tienda actual y coordina sincronización, estrellas y vistas. `seleccionarFavoritos` prepara secciones filtradas sin modificar la tienda completa.
- Reutilización de las tarjetas, limpieza de nodos antes de renderizar y recuperación del foco al retirar un favorito.
- Alternativa en memoria con aviso si el almacenamiento está bloqueado o sin espacio. Fecha inválida: estrellas desactivadas y datos anteriores intactos.
- Documentación de estudio, decisiones, uso de IA y posibles temas de Autopsia actualizada.

## Comprobaciones realizadas por el agente

- `node --check` en `app.js` y los cuatro módulos de `js/`: correcto.
- `npm run build`: correcto, sin dependencias nuevas.
- Chromium con respuestas simuladas: selección por Enter y espacio, contador, estructura guardada, recarga, navegación sin peticiones a la API, eliminación y vacío con conservación del foco.
- Misma rotación: selección conservada; otra fecha UTC: selección vaciada sin tocar una clave ajena de almacenamiento.
- HTTP 500, interrupción de red y estructura inválida: selección guardada intacta y recuperación tras reintento.
- Fecha inválida: no se sobrescribe la selección y las estrellas se desactivan; al recuperar una fecha válida del mismo día se restaura la selección.
- JSON de almacenamiento corrupto o estructura guardada incorrecta: recuperación sin errores no controlados.
- Almacenamiento bloqueado o cuota agotada: aviso y selección en memoria, conservada al actualizar dentro de esa página.
- Lista de tienda válida vacía: estado de favoritos vacío sin errores.
- Anchos 1440, 1024, 801, 800, 480, 390 y 320 píxeles CSS: sin desbordamiento horizontal. Capturas de escritorio y móvil inspeccionadas.
- API real: 412 ofertas, selección de dos, recarga directa de favoritos y navegación mediante historial; dos consultas a la API, correspondientes a entrada y recarga. Cambiar de vista no realizó consultas adicionales. Sin errores JavaScript no controlados.

Las pruebas usan un navegador aislado, no los datos personales del navegador del alumno. No se incorporan dependencias de pruebas ni archivos auxiliares al repositorio.

## Límites y pendientes

El cambio de rotación se detecta al abrir o actualizar con una respuesta válida. No hay sondeo automático ni caché de respuestas. Si una respuesta válida deja de incluir una oferta, se retira de la selección disponible. Los favoritos diarios guardan solo identificadores y fecha, por lo que requieren cargar la tienda para reconstruir las tarjetas.

Queda pendiente la revisión personal del alumno y que ejecute su commit y push. La Autopsia final sigue siendo de su autoría.
