# Sesión 2026-10-16 · Primera tienda organizada

## Alcance elegido por el alumno

Mostrar únicamente la tienda de Fortnite de forma organizada y decidir posibles ampliaciones después de revisarla.

## Implementación

- Sustituida la plantilla por cabecera, fecha, resumen, navegación por secciones y tarjetas.
- Separados petición, transformación y DOM en `js/api.js`, `js/datos.js` y `js/vista.js`, coordinados por `app.js`.
- Consulta pública en español con `fetch`, comprobación HTTP, validación y espera máxima de 15 segundos.
- Normalización con `map`, filtrado de entradas inválidas y agrupación con `reduce`.
- Una tarjeta y un precio por oferta completa, incluidos lotes, música, instrumentos y vehículos.
- Carga, error con reintento, tienda vacía y actualización sin duplicados.
- Alternativas para datos incompletos e imágenes fallidas.

No se añadieron dependencias, caché, buscadores, favoritos, presupuesto ni estadísticas.

## Error encontrado y corrección

La navegación horizontal ensanchaba la página móvil hasta unos 3080 píxeles por el tamaño mínimo automático de una columna `1fr`. Se corrigió con `minmax(0, 1fr)` en la regla de pantallas estrechas. Las comprobaciones posteriores pasaron.

## Comprobaciones del agente

- Sintaxis de los cuatro archivos JavaScript y compilación de Vite correctas.
- Chromium con la API real: 412 ofertas en 23 secciones en la rotación consultada.
- Navegación, actualización sin duplicados y transformación sin modificar los datos recibidos.
- Capturas revisadas a 1366 × 900 y 390 × 844 píxeles CSS.
- Ausencia de desbordamiento horizontal a 1366, 800, 768, 481, 480, 390 y 320 píxeles de ancho.
- Teclado: salto al contenido, actualización y enlaces de sección.
- Respuestas simuladas: carga, vacío, HTTP 500, red interrumpida, estructura inválida y JSON inválido; reintento y recuperación.
- Datos simulados: campos ausentes, fecha inválida, imagen fallida, precio cero o no numérico, música y lotes. El HTML recibido como nombre se muestra literalmente.
- Petición sin respuesta cancelada a los 15 segundos, con controles para reintentar.
- Sin excepciones JavaScript no capturadas en los casos comprobados.

Las pruebas se ejecutaron mediante el navegador y las herramientas del agente. No se guardaron scripts auxiliares en el repositorio. No constituyen una confirmación manual del alumno.

## Pendiente

Revisión visual y dudas del alumno antes del commit personal de este avance. Consultar [[Pendientes]].
