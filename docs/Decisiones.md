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
