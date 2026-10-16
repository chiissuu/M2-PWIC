# Fuente local, hero y botones

## Petición del alumno

Crear un documento de localStorage y probar una nueva dirección visual: tipografía Fortnite excepto descripción y footer, hero negro con rojo tras el PNG, enlaces principales más grandes y separados con acabado plateado, tienda clara y footer negro simplificado. Aporta tres capturas, otro SVG y dos OTF. Solicita aprender cómo construir los botones.

## Cambios

- `docs/localStorage.md`: conceptos, claves, JSON, Set, archivos y funciones, diagramas de carga y clic, reinicio por rotación, errores, límites y distinción respecto a caché.
- `assets/burbank-big-condensed-black.otf`: una copia de la fuente aportada. Los dos archivos originales tienen el mismo SHA-256 y familia interna «Burbank Big Cd Bk».
- `assets/waves.svg`: se utiliza el trazado aportado, que coincide con el anterior, con relleno negro para unir el hero a la página clara.
- `index.html`: enlace «¡Vamos a la tienda!», envoltorios interiores para el texto de los botones y footer con una única atribución enlazada.
- `styles.css`: fuente local con dos excepciones, hero negro y luz roja limitada al título, fondos claros y texto oscuro, imágenes negras, botones con degradado y bisel, estados de interacción y movimiento reducido; footer negro a todo el ancho.
- `Estudio.md`: explicación de fuente local y construcción de botones mediante capas CSS. Seguimiento y README actualizados.

## Comprobaciones realizadas por el agente

- `npm run build`: correcto, incluida la fuente OTF de 111,69 kB. Sin dependencias nuevas.
- Chromium con API real: fuente cargada mediante `document.fonts`, familia aplicada en tarjetas y excepciones Segoe UI en descripción y footer.
- Colores calculados: página `#f4f5f7`, hero e imágenes negros; degradado radial en título; footer negro sin borde superior, blanco y peso 700.
- Enlace de tienda con el texto solicitado y botones de al menos 76 píxeles de alto en escritorio. Hover aclara el botón; preferencia de movimiento reducido elimina la transición.
- Footer con una sola frase y enlace correcto a Fortnite-API, ocupando todo el ancho.
- Nueve anchos entre 320 y 1920 píxeles CSS: sin desbordamiento horizontal ni solapamiento del título con la navegación.
- Contrastes comprobados superiores a 4,5:1: descripción, footer, título y tipo de tarjeta, resumen y texto del botón sobre la franja más oscura del degradado. Es una comprobación parcial, no una auditoría completa de accesibilidad.
- Favorito añadido, navegación sin otra petición a la API, selección conservada al recargar `#favoritos` y retirada mediante Enter; estado vacío visible. Dos consultas a la API correspondientes a entrada y recarga. Sin errores JavaScript no controlados.
- Capturas de hero, tienda, favoritos y footer inspeccionadas en escritorio y móvil. Las pruebas y capturas auxiliares permanecen fuera del repositorio.

## Pendiente

El alumno debe valorar la prueba visual y ejecutar su commit/push cuando cierre el avance. La lectura de los documentos no acredita por sí sola una práctica realizada por el alumno. La caché del bonus sigue pendiente.
