# Caché de respuestas · 2026-10-18

## Petición y decisión

Tras distinguir favoritos de caché, el alumno propone duraciones de varias horas y acepta la recomendación de tres horas, renovación por cambio de día UTC y consulta manual con un minuto entre intentos. Autoriza implementarlo.

## Cambios

- Nuevo `js/cache.js` con copia de respuesta, validación, caducidad y marca de consulta independiente de los favoritos.
- `js/api.js` decide entre red y copia y devuelve datos con procedencia, hora y aviso. Conserva fetch, async/await, validación y espera máxima de quince segundos.
- `app.js` distingue carga normal y actualización manual, manteniendo la transformación y la sincronización de favoritos.
- Mensaje de procedencia y avisos en vista y HTML, con estilo mínimo.
- Actualización de README, estudio, guía de almacenamiento, contexto, decisiones y registro de IA. Autopsias finales conservadas.

## Comprobaciones realizadas por el agente

- Sintaxis de los JavaScript y compilación de producción con Vite.
- Chromium con API real: 367 ofertas, respuesta persistida de aproximadamente 0,9 MB en JSON, favoritos conservados y una sola petición total tras cargar, recargar y pulsar actualizar veinte veces seguidas dentro del minuto.
- Reloj y respuestas simulados: copia vigente un milisegundo antes de tres horas y caducada a las tres horas exactas; cambio UTC con copia de solo treinta y un minutos; respuesta de tienda de otro día, marca futura, JSON corrupto y estructura guardada inválida.
- Actualización manual: espera de sesenta segundos, conservación tras recargar, consulta permitida al cumplirse el minuto y cambios de vista sin consultas.
- Errores HTTP 500, red, JSON y estructura: caché y favoritos sin sobrescritura; copia vigente como alternativa, copia caducada no presentada como actual, reintento limitado y recuperación.
- Acceso bloqueado y cuota agotada: vista y control de consultas en memoria con aviso, sin excepciones no controladas.
- Tienda vacía, fecha inválida sin sustituir la copia, nueva tienda que reinicia favoritos y conservación de otras claves.
- Capturas de favoritos en escritorio y tienda en móvil inspeccionadas; sin desbordamiento horizontal en 320, 390, 768 y 1366 píxeles.

Las herramientas y scripts de comprobación se mantienen fuera del repositorio y no se incorporan como dependencias. Estas pruebas no se atribuyen al alumno.

## Pendiente del alumno

Comprobar en su navegador la recarga con caché, la actualización manual y los favoritos. Después realizar su commit y push antes de continuar con el contraste de la entrega.
