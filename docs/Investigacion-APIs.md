# Investigación de APIs · 2026-10-16

Esta nota conserva la investigación de Spotify y Fortnite previa a la elección. Finalmente, el alumno decide comenzar únicamente con la tienda de Fortnite organizada. El primer bloque utiliza la consulta pública de `fortnite-api.com/v2/shop?language=es`; presupuesto, estadísticas y mapas quedan como propuestas descartadas para este bloque. El funcionamiento y las comprobaciones actuales se recogen en [[Contexto]] y [[Sesiones/2026-10-16-Tienda-organizada]].

## Criterio actual de acceso

Se prioriza que la funcionalidad principal pueda probarse gratis, sin cuenta, claves ni autorización individual del visitante. Es un criterio práctico del proyecto; el enunciado compartido exige una API pública real y no detalla cómo se ejecuta la evaluación. Con este criterio, Spotify queda fuera de la propuesta actual y las estadísticas personales autenticadas de Fortnite no forman parte de la primera versión planteada.

## Spotify Web API

El alumno confirma que tiene Premium. El propietario de una aplicación nueva en Development Mode necesita una suscripción activa. El modo permite hasta cinco usuarios autenticados, añadidos previamente a una lista de acceso; esto condiciona que otra persona pruebe la entrega con su cuenta.

Datos y operaciones documentados:

- Buscar canciones, artistas y álbumes; consultar títulos, imágenes, fechas y otros metadatos.
- Consultar biblioteca, canciones guardadas y listas del usuario.
- Leer el contenido de listas propias o en las que colabora el usuario. Las listas ajenas tienen restricciones en Development Mode.
- Consultar los top de canciones y artistas calculados por Spotify para aproximadamente cuatro semanas, seis meses o un año. El ranking se basa en afinidad y no proporciona un recuento exacto de reproducciones.
- Consultar escuchas recientes con su fecha, hasta 50 elementos por petición. Este endpoint no garantiza recuperar todo el historial de la cuenta.
- Crear listas y modificar su contenido con los permisos correspondientes.

Para una aplicación de navegador, Spotify recomienda OAuth con Authorization Code y PKCE: permite autorizar al usuario sin incluir un Client Secret. Requiere registrar la aplicación, configurar la redirección y manejar permisos y caducidad del token. En local, Spotify admite `127.0.0.1` como redirección y rechaza `localhost`.

No basar una aplicación nueva en Audio Features, Audio Analysis o Recommendations: su acceso se restringió y las referencias correspondientes aparecen obsoletas. Tampoco asumir disponibilidad de popularidad, seguidores o contenido de cualquier lista pública. La política limita los análisis y las métricas de escucha derivadas; evitar plantear un Wrapped propio como funcionalidad garantizada.

Una idea a valorar es organizar y revisar canciones de listas propias mediante filtros, selección y acciones explícitas del usuario. Falta delimitar una utilidad concreta y comprobar las peticiones con una aplicación registrada.

Fuentes primarias:

- [Visión general](https://developer.spotify.com/documentation/web-api).
- [Development Mode y usuarios permitidos](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).
- [Cambios de Development Mode](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide).
- [Cambios de julio de 2026](https://developer.spotify.com/documentation/web-api/references/changes/july-2026): actualizaron el máximo de aplicaciones por desarrollador a 25; no conservar el antiguo límite de una aplicación.
- [Top del usuario](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks).
- [Escuchas recientes](https://developer.spotify.com/documentation/web-api/reference/get-recently-played).
- [Contenido de listas](https://developer.spotify.com/documentation/web-api/reference/get-playlists-items).
- [PKCE](https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow) y [redirecciones](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri).
- [Restricciones de acceso a funciones antiguas](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api) y [política de uso](https://developer.spotify.com/policy).

## Fortnite-API · fortnite-api.com

Servicio comunitario, no oficial de Epic. Documenta cosméticos, tienda, estadísticas de Battle Royale, noticias, modos de juego, mapa y puntos de interés, banners, códigos de creador y claves AES.

Las estadísticas se consultan por nombre o account ID y requieren una API key. Los parámetros permiten elegir temporada actual o acumulado (`season` / `lifetime`) y tipo de cuenta. La documentación indica que los datos de tríos son siempre `null`.

No se han encontrado endpoints documentados para clasificaciones de torneos, puntos por ronda o resultados detallados de partidas competitivas. No confundir estadísticas generales con datos de un torneo concreto.

Comprobaciones HTTP sin credenciales realizadas por el agente:

| Petición | Resultado |
| --- | --- |
| `/v2/shop?language=es` | HTTP 200; devuelve fecha y entradas de la tienda. |
| `/v1/map?language=es` | HTTP 200; devuelve imágenes y puntos de interés. |
| `/v2/stats/br/v2?name=Ninja` | HTTP 401; falta la API key. |

Estas respuestas incluyeron `Access-Control-Allow-Origin: *`. No se han probado en una interfaz de navegador ni se ha accedido a estadísticas con una clave válida.

Ideas posibles: comparador de estadísticas generales, explorador de cosméticos o una herramienta de seguimiento de tienda. Para una clave privada compartida por una web pública habría que valorar un servidor intermediario; incluirla en una variable `VITE_` la expondría en el navegador.

Fuentes: [servicio y funcionalidades](https://fortnite-api.com/), [estadísticas](https://dash.fortnite-api.com/endpoints/stats), [tienda](https://dash.fortnite-api.com/endpoints/shop), [mapa](https://dash.fortnite-api.com/endpoints/map) y [variables de Vite](https://vite.dev/guide/env-and-mode).

## Alternativa para torneos · api-fortnite.com

Es otro proveedor, también no oficial. Su documentación incluye eventos, clasificaciones, ventanas de torneo, reglas de puntuación, participación y requisitos de elegibilidad. Todas las peticiones requieren una API key; algunas operaciones sobre jugadores requieren además un token del usuario.

La web sitúa las clasificaciones completas y posiciones de jugadores en el plan Pro, anunciado a 8,49 euros al mes en la fecha de consulta. No se ha contratado ningún servicio ni probado estos endpoints autenticados. Antes de elegirlo, comprobar con credenciales válidas los datos, las condiciones del plan y el acceso desde navegador.

Fuentes: [documentación](https://www.api-fortnite.com/docs) y [planes publicados](https://www.api-fortnite.com/#pricing).

## Otra opción de análisis de Fortnite

La API oficial de Epic ofrece métricas agregadas de islas, como jugadores, partidas, tiempo de juego y retención. No requiere autenticación, pero estos datos no son clasificaciones ni estadísticas individuales de torneos. Puede ser una alternativa si interesa analizar mapas y modos de juego.

Fuente: [Fortnite Data API de Epic](https://dev.epicgames.com/documentation/fortnite/using-fortnite-data-api-in-fortnite).

## Propuestas consideradas antes de elegir

El alumno plantea ahora una web de Fortnite con portada, tienda y estadísticas, y pide consejo sobre si su alcance es suficiente. Elegir entre un explorador de tienda con planificación de presupuesto o una herramienta de actividad de mapas; la temática concreta sigue pendiente de confirmación.

## Ampliación · Recursos sin credenciales y alcance propuesto

El agente ha vuelto a comprobar sin credenciales:

- `/v2/shop?language=es`: HTTP 200. Las ofertas incluyen identificador, precio normal y final, fechas y cosméticos de Battle Royale asociados cuando existen. Una oferta puede ser un lote; su precio no debe sumarse una vez por cada cosmético del lote.
- `/v2/cosmetics/br/search/all?name=Peely&matchMethod=contains`: HTTP 200, con una lista de cosméticos. Esta prueba utiliza el idioma inglés predeterminado.
- `https://api.fortnite.com/ecosystem/v1/islands?limit=1`: HTTP 200, con metadatos de islas y paginación. La respuesta contiene 100 elementos; no asumir que `limit` es un parámetro admitido. El enlace de paginación devuelto utiliza `size`.

Las tres respuestas incluyeron `Access-Control-Allow-Origin: *`. Son comprobaciones HTTP del agente, no pruebas de una interfaz de navegador. Las series de métricas de Epic están documentadas, pero todavía no se ha realizado una petición de métricas de una isla concreta.

### Candidata: tienda con planificación de presupuesto

Primera versión propuesta, todavía no aprobada:

1. Portada breve y tienda actual con imágenes, nombres y precios.
2. Búsqueda y filtros por tipo o precio, y ordenación de resultados.
3. Selección de ofertas para una lista de compra simulada y un presupuesto introducido por el usuario.
4. Resumen del coste seleccionado y del presupuesto restante; no realiza compras reales ni consulta el saldo de una cuenta.
5. Estados de carga, error con reintento y ausencia de resultados.
6. Después del funcionamiento principal, caché de las respuestas con caducidad para el bonus. Guardar favoritos por sí solo no equivale a cachear las peticiones.

`map` normalizaría las ofertas; `filter` aplicaría búsqueda y filtros; `reduce` calcularía el coste de la selección. Se mantiene la separación de API, lógica y renderizado. M3 permitiría trasladar la interfaz a componentes de React reutilizando la lógica.

### Alternativa si interesa más el análisis

Un panel de mapas favoritos o de entrenamiento con las métricas agregadas públicas de Epic encajaría mejor con un interés estadístico. Añade consultas y tratamiento de periodos; conviene elegirlo como funcionalidad principal en lugar de mezclar todas las secciones desde el inicio. Ninguna de las dos propuestas garantiza estadísticas personales o resultados de torneos sin autenticación.
