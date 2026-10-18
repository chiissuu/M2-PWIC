# Caché de respuestas de la tienda

## Qué problema resuelve

Antes cada carga de la página consultaba la API, aunque acabáramos de recibir la misma tienda. Ahora guardamos una respuesta y la reutilizamos mientras siga vigente. Esto implementa el bonus de caché en localStorage, independientemente de los favoritos.

Una caché no sabe si el servidor ha cambiado sin consultarlo. Aceptamos conservar una copia hasta tres horas y ofrecemos actualización manual para comprobar novedades antes.

## Reglas acordadas

1. Al abrir o recargar, usar la copia si tiene menos de tres horas.
2. El día UTC de la consulta y de la tienda deben coincidir con el actual. Una copia de las 23:30 UTC caduca al cambiar el día, aunque solo hayan pasado treinta minutos.
3. «Actualizar tienda» y «Volver a intentar» pueden solicitar red antes de tres horas, pero debe haber pasado un minuto desde el último intento de consulta, también si falló.
4. No hay un temporizador consultando cada tres horas. La caducidad se comprueba al solicitar la tienda.
5. Una copia caducada se conserva hasta obtener otra válida, pero no se muestra como tienda actual.

El minuto es un control local de esta aplicación, no una protección global del proveedor. Otras personas o navegadores tienen sus propios datos. Entre pestañas se comparte la marca de consulta cuando localStorage funciona, pero no existe un bloqueo atómico de solicitudes simultáneas.

## Qué se guarda

`m2-pwic:cache-tienda` contiene un objeto serializado con `JSON.stringify`. Ejemplo abreviado:

```json
{
  "version": 1,
  "guardadaEn": 1792324800000,
  "datos": {
    "date": "2026-10-18T00:00:00Z",
    "entries": []
  }
}
```

`guardadaEn` es una marca de tiempo en milisegundos obtenida con `Date.now()`. `datos` es la respuesta de tienda (`contenido.data`), con las ofertas completas. La lista vacía del ejemplo evita copiar aquí una respuesta extensa; una tienda vacía también es una respuesta válida.

`m2-pwic:ultima-consulta` guarda la hora del último intento de red como texto. Permite conservar el minuto de espera tras recargar. `m2-pwic:favoritos-diarios` sigue guardando su fecha e identificadores con el mismo formato anterior.

Las imágenes siguen siendo direcciones URL dentro del JSON; no guardamos sus archivos binarios. La caché tampoco garantiza que la web y sus recursos se puedan abrir sin conexión.

## Archivos y funciones

| Archivo | Funciones y responsabilidad |
| --- | --- |
| `js/cache.js` | `leerCacheTienda()` lee y valida; `cacheVigente()` comprueba tres horas y día UTC; `guardarCacheTienda(datos)` conserva la copia; `segundosHastaActualizar()` y `registrarConsulta()` gestionan la espera. |
| `js/api.js` | `obtenerTienda({ forzar })` decide entre copia y red; `consultarTienda()` realiza fetch, comprueba HTTP y lee el JSON. |
| `app.js` | `cargarTienda(forzar)` coordina, prepara `respuesta.datos`, sincroniza favoritos y muestra los metadatos. |
| `js/vista.js` | `mostrarEstadoCache()` indica procedencia, fecha/hora de consulta y avisos. `mostrarError()` también admite el mensaje de espera. |
| `index.html` | Incluye `#estado-cache`, con `role="status"` para anunciar sus cambios. |
| `styles.css` | Presentación del mensaje con el color secundario de la interfaz. |

`obtenerTienda()` devuelve ahora `{ datos, desdeCache, consultadaEn, aviso }`. `prepararTienda()` sigue recibiendo el mismo formato de datos, a través de `respuesta.datos`. No necesita saber si llegaron de la API o del almacenamiento.

## Recorrido

```text
abrir / recargar → cargarTienda(false)
                         ↓
                 obtenerTienda({ forzar: false })
                         ↓
                 leerCacheTienda()
                   ↙           ↘
          copia vigente       no existe / caducada
               ↓                    ↓
          devolver datos       registrarConsulta()
                                    ↓
                               consultarTienda()
                                    ↓
                         comprobar HTTP y estructura
                                    ↓
                            guardarCacheTienda()
                   ↘           ↙
                 prepararTienda(respuesta.datos)
                         ↓
             sincronizar favoritos y pintar vista
                         ↓
                mostrarEstadoCache(respuesta)
```

Los botones llaman a `cargarTienda(true)`. Si quedan segundos de espera, no se consulta la API: se devuelve la copia vigente con un aviso o se muestra el mensaje de espera si no hay copia utilizable. Al cumplir el minuto se permite forzar una consulta incluso aunque todavía exista caché.

`fetch` utiliza `cache: "no-store"`: cuando decidimos consultar, no delegamos esa decisión en la caché HTTP del navegador. Se mantiene el límite de espera de quince segundos.

## Errores y límites

- Una copia corrupta, con versión o estructura incorrectas o fecha de guardado futura se descarta para la lectura; no se borra todo localStorage.
- Una fecha de tienda inválida no sustituye la caché anterior. La vista mantiene su tratamiento de fecha desconocida y estrellas desactivadas.
- Los fallos de red, HTTP, JSON o estructura no sobrescriben la copia ni modifican los favoritos. Si aún hay una copia vigente, una actualización fallida puede mostrarla con aviso. Si ha caducado, se muestra el error con reintento.
- Si se bloquea localStorage o falta espacio, se continúa con la respuesta y una copia en memoria, con aviso de que no se ha podido guardar. La próxima recarga podría necesitar otra petición.
- Una respuesta válida de una tienda nueva sigue reiniciando los favoritos diarios mediante la lógica existente. La caché no mezcla su clave con la selección.
- No hay sincronización entre dispositivos ni actualización instantánea de todas las pestañas abiertas.

## Cómo comprobarlo tú

1. Abre la web con Vite y entra en `Network` → `Fetch/XHR`. En una primera carga sin copia aparece `/v2/shop?language=es`.
2. En `Application` → `Local Storage`, examina `m2-pwic:cache-tienda`. Debe contener versión, hora y datos.
3. Limpia solo el registro visual de Network y recarga. Si la copia está vigente, no aparece otra petición a `/v2/shop`. Sí pueden existir solicitudes de HTML, CSS, módulos o imágenes.
4. Pulsa actualizar dentro del minuto: aparece el tiempo de espera y no se consulta la API.
5. Al pasar un minuto, pulsa actualizar y comprueba una nueva petición y una nueva hora de guardado.
6. Marca un favorito, cambia de vista y recarga. La selección debe conservarse y las vistas no deben añadir peticiones a la API.

Las tres horas y la medianoche UTC se comprobaron con el reloj simulado, sin esperar horas reales. En Chromium también se probaron las respuestas inválidas, el almacenamiento bloqueado y la cuota agotada. El alumno ha confirmado después su revisión de la funcionalidad y del README; esta confirmación no le atribuye las pruebas detalladas del agente.
