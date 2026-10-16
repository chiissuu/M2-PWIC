# Título PNG y diseño oscuro

## Petición del alumno

Usar el PNG aportado como título, cambiar la descripción por su texto literal, retirar la frase superior, adaptar el color de cabecera y controles y sustituir la línea amarilla por el SVG aportado. Fondo de página gris oscuro y zona de imagen de las tarjetas negra.

## Cambios

- `assets/fortnite-daily-shop.png`: copia íntegra del PNG original, con transparencia y tamaño 3150 × 1770.
- `assets/waves.svg`: mismo trazado del recurso aportado, con relleno `#10232c` a juego con la cabecera.
- `index.html`: título de imagen dentro del `h1`, descripción literal, enlace «Mis favoritos» y onda decorativa.
- `styles.css`: cabecera azul petróleo oscuro, página gris carbón, zonas de imagen negras, tarjetas grises y texto claro con controles plateados. Composición adaptable y foco visible.
- Seguimiento, README y apuntes actualizados. No se cambian módulos JavaScript ni dependencias.

## Comprobaciones del agente

- PNG de origen y copia con el mismo SHA-256.
- `npm run build`: correcto, con los recursos incluidos.
- Chromium y API real: 412 ofertas; título e imagen decorativa cargados, descripción exacta y sin la frase retirada.
- Zona de imagen de tarjetas con color calculado `rgb(0, 0, 0)` y cabecera sin el borde amarillo.
- Nueve anchos: 1920, 1440, 1024, 801, 800, 768, 480, 390 y 320 píxeles CSS. Sin desbordamiento horizontal ni solapamiento de título y navegación.
- Contraste de texto frente a fondo en descripción, nombre y tipo de tarjeta, resumen, botón de actualización y enlace de favoritos: todos superiores a 4,5:1. No se presenta esta comprobación parcial como una auditoría completa de accesibilidad.
- Capturas reales de escritorio, móvil y favoritos en móvil inspeccionadas.
- Selección de favorito, navegación, persistencia al recargar la vista de favoritos y retirada por Enter correctas.
- Estados de carga, error HTTP y respuesta vacía simulados: avisos visibles con fondo oscuro. Sin errores JavaScript no controlados.

## Pendientes

Revisión personal del alumno y su commit/push. Se conserva el PNG original de aproximadamente 2,7 MB; no se ha hecho una optimización de imagen ni se han añadido herramientas de tratamiento de imágenes al proyecto.
