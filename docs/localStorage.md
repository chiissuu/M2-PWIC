# localStorage: funcionamiento y uso en la tienda

Guía solicitada por el alumno para entender la persistencia de los favoritos diarios. Describe el código actual; no implementa una caché de respuestas ni favoritos conservados entre rotaciones.

## 1. Qué es y dónde guarda los datos

`localStorage` es una API del navegador para guardar pequeñas cantidades de información en el dispositivo. Trabaja con parejas de clave y valor, ambos de texto. No necesita `fetch` ni un servidor propio: escribir aquí no envía una petición a Fortnite-API.

La información puede seguir disponible al recargar, cerrar el navegador y volver a abrir la web. No tiene una caducidad automática de un día: la fecha y el reinicio de favoritos los programa nuestra aplicación.

Los datos pertenecen al origen de la página, definido por protocolo, servidor y puerto, y al navegador/perfil utilizado. Por ejemplo:

```text
http://localhost:5173 → un almacenamiento
http://localhost:5174 → otro almacenamiento
https://mi-web.example → otro almacenamiento
```

Por eso los favoritos de las pruebas locales no se trasladan automáticamente a la web publicada ni al móvil. Las dos vistas de nuestra aplicación sí comparten el mismo almacenamiento porque pertenecen al mismo origen.

El usuario puede borrar los datos y el navegador puede limitar su conservación. En navegación privada se borran al cerrar la última pestaña privada. No es una copia de seguridad ni una base de datos compartida entre usuarios.

Referencia: [localStorage en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## 2. Operaciones básicas

```js
localStorage.setItem("ejemplo", "Hola"); // Guardar o reemplazar un valor.
const texto = localStorage.getItem("ejemplo"); // Leer: devuelve texto o null.
localStorage.removeItem("ejemplo"); // Borrar solamente esa clave.
```

Estas operaciones son síncronas: no devuelven una promesa que tengamos que esperar con `await`. Conviene guardar datos pequeños y no utilizarlas para almacenar archivos grandes o escribir continuamente sin necesidad.

Existe `localStorage.clear()`, pero borra todas las claves del almacenamiento de ese origen. Nuestra aplicación no lo utiliza: solo escribe su propia clave.

Los fallos de acceso o de espacio pueden lanzar errores y se gestionan con `try/catch`. El límite habitual de localStorage es de 5 MiB por origen. Referencia: [cuotas de almacenamiento en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).

## 3. Por qué utilizamos JSON

No podemos entregar directamente un objeto a `setItem` esperando recuperarlo después como objeto. Debemos convertirlo a texto y volver a interpretarlo al leer:

```js
const seleccion = { rotacion: "2026-10-16", ids: ["oferta-a"] };

localStorage.setItem("ejemplo-favoritos", JSON.stringify(seleccion));
const recuperado = JSON.parse(localStorage.getItem("ejemplo-favoritos"));
```

`JSON.stringify` convierte un objeto o array a texto JSON. `JSON.parse` interpreta un texto JSON para obtener el valor de JavaScript. El ejemplo supone que existe un JSON válido; el código real comprueba la ausencia de valor, captura errores de lectura o interpretación y valida la estructura.

## 4. Qué guardamos en esta web

Usamos la clave `m2-pwic:favoritos-diarios`. Su valor tiene este formato ilustrativo:

```json
{
  "version": 1,
  "rotacion": "2026-10-16",
  "ids": ["oferta-a", "oferta-b"]
}
```

| Propiedad | Significado |
| --- | --- |
| `version` | Versión de nuestro formato guardado, no de la API remota. |
| `rotacion` | Día UTC de la fecha de tienda confirmada mediante la API. |
| `ids` | Identificadores de ofertas que hemos seleccionado. |

No guardamos imágenes, HTML, todos los datos de la tienda ni una cuenta de Fortnite. Cada identificador corresponde a una oferta completa: si es un lote, la estrella selecciona ese lote.

Los nombres, precios e imágenes se obtienen de la tienda cargada. Como los favoritos solo pertenecen a esa rotación, no necesitamos duplicar esos datos dentro del almacenamiento.

## 5. Qué archivos participan

| Archivo | Relación con los favoritos |
| --- | --- |
| `js/favoritos.js` | Es el único módulo que accede directamente a localStorage. Lee, valida y guarda la selección y compara fechas. |
| `app.js` | Coordina la carga, llama a la sincronización, atiende clics y elige qué vista mostrar. Mantiene `tiendaActual` en memoria. |
| `js/datos.js` | `seleccionarFavoritos` filtra las ofertas guardadas y conserva su agrupación. No lee localStorage. |
| `js/vista.js` | Crea estrellas, actualiza su estado y el contador y muestra las tarjetas seleccionadas. No escribe localStorage. |
| `index.html` | Contiene enlaces, contador y contenedores de las vistas y los avisos. |
| `styles.css` | Presenta estrellas, enlaces, estados y tarjetas. No decide qué se guarda. |
| `js/api.js` | Descarga y valida la tienda. No almacena favoritos ni mantiene una caché. |

La separación permite cambiar la presentación de una estrella sin cambiar el formato guardado o cambiar el almacenamiento sin reescribir las tarjetas.

## 6. Estado en memoria y estado guardado

En `js/favoritos.js` usamos un `Set` para representar la selección mientras se ejecuta la aplicación. Es una colección sin valores duplicados:

```js
identificadores.has(id); // ¿Está seleccionado?
identificadores.add(id); // Añadir.
identificadores.delete(id); // Quitar.
identificadores.clear(); // Vaciar este Set; no borra todo localStorage.
```

Para guardarlo se convierte en array mediante `[...identificadores]`. El Set cambia inmediatamente al pulsar una estrella y después intentamos escribir la nueva selección en localStorage.

| Estado | Duración y función |
| --- | --- |
| Set en memoria | Selección utilizada durante esta ejecución; permite responder a los clics. |
| `tiendaActual` en memoria | Datos de la tienda necesarios para construir cualquiera de las dos vistas. |
| JSON en localStorage | Copia de fecha e identificadores para recuperar la selección después de una recarga. |

La memoria y la persistencia son distintas. Si no podemos guardar, la selección en memoria puede seguir funcionando hasta recargar o cerrar la página.

## 7. Funciones de favoritos.js

| Función | Qué recibe | Qué hace o devuelve |
| --- | --- | --- |
| `obtenerDia(valor)` | Valor de fecha. | Día UTC en formato `YYYY-MM-DD`, o `null` si no se reconoce una fecha válida. |
| `leerFavoritos()` | Ningún argumento. | Objeto guardado validado o selección inicial vacía. Se ejecuta al cargar el módulo. |
| `guardarFavoritos()` | Ningún argumento. | Serializa el estado actual y lo escribe; registra si la escritura falla. |
| `sincronizarFavoritos(fecha, ofertas)` | Fecha y ofertas de una respuesta válida ya preparada. | Confirma el día, reinicia si cambia y conserva identificadores que siguen disponibles. |
| `alternarFavorito(id)` | Identificador de una oferta. | Si la fecha está confirmada y la oferta existe, la añade o quita y guarda. |
| `obtenerIdsFavoritos()` | Ningún argumento. | Array de identificadores de la selección activa, o vacío si no hay fecha válida confirmada. |
| `permitirFavoritos()` | Ningún argumento. | Booleano: si se pueden habilitar las estrellas. |
| `obtenerAvisoFavoritos()` | Ningún argumento. | Texto explicativo si falta fecha o falla el guardado; vacío si todo está correcto. |

Las tres primeras son funciones internas. Las restantes se exportan para coordinar el comportamiento desde `app.js`.

## 8. Recorrido al entrar o recargar

```text
Se carga el módulo favoritos.js
          ↓
leerFavoritos() → getItem → JSON.parse → validar formato
          ↓
La selección recuperada queda pendiente de confirmar la rotación

app.js → cargarTienda()
          ↓
obtenerTienda() → fetch de una tienda real
          ↓
prepararTienda() → ofertas normalizadas y agrupadas
          ↓
sincronizarFavoritos(fecha, ofertas)
          ↓
Comparar el día recibido con el guardado
          ↓
actualizarFavoritos() → contador, estrellas y avisos
          ↓
mostrarTienda() o mostrarFavoritos()
```

No presentamos identificadores antiguos como favoritos del día actual sin confirmar antes la fecha de la tienda.

## 9. Recorrido al pulsar una estrella

```text
Clic en botón .boton-favorito
          ↓
Listener de main en app.js obtiene data-id-oferta
          ↓
alternarFavorito(id)
          ↓
Añadir o quitar el identificador del Set
          ↓
guardarFavoritos() → JSON.stringify → setItem
          ↓
actualizarFavoritos() → estrella, contador y posible aviso
          ↓
Si estamos en favoritos: recalcular y mostrar las tarjetas seleccionadas
```

Un solo listener en `main` atiende también los botones creados después desde JavaScript: es delegación de eventos. La vista usa `aria-pressed` para indicar el estado de cada estrella y mantiene el foco al quitar una tarjeta con el teclado.

## 10. Qué ocurre al cambiar de día o fallar algo

| Situación | Comportamiento real |
| --- | --- |
| Misma fecha UTC y mismas ofertas | Se conservan los favoritos. |
| Respuesta válida con otra fecha UTC | Se vacía la selección y se guarda la nueva fecha. |
| Una oferta deja de aparecer en una respuesta válida | Se retira su identificador de la selección disponible. |
| Lista válida vacía | No quedan ofertas disponibles ni favoritos visibles. |
| Falla la red, el HTTP o la estructura de la respuesta | No se sincroniza ni se borra la selección guardada. |
| Fecha no válida | Se conserva lo guardado, se desactivan estrellas y se muestra un aviso. |
| JSON guardado corrupto o formato incorrecto | Se inicia una selección válida cuando se confirma la tienda. |
| Navegador bloquea el almacenamiento o se agota su cuota | Se permite seleccionar en memoria y se avisa de que no se ha podido guardar. |

No hay un temporizador que borre favoritos a medianoche ni consultas automáticas en segundo plano. Otra rotación se detecta al abrir o actualizar con una respuesta válida. Una pestaña que sigue abierta sin actualizar conserva la representación que tenía.

## 11. Cómo se construye la vista de favoritos

El enlace cambia el hash de la URL a `#favoritos`. El evento `hashchange` permite mostrar esa vista y utilizar el historial del navegador. No se abre otro HTML ni hace falta otra consulta para cada cambio de vista.

`seleccionarFavoritos(tiendaActual, ids)` utiliza `map` y `filter` para obtener secciones con ofertas elegidas, y `reduce` para calcular su total. No modifica la tienda completa. `mostrarFavoritos` reutiliza `crearSeccion` y `crearTarjeta` para construir el DOM.

```text
tiendaActual + identificadores seleccionados
          ↓
seleccionarFavoritos()
          ↓
secciones con ofertas seleccionadas
          ↓
mostrarFavoritos()
          ↓
crearSeccion() → crearTarjeta() → imagen, estrella y precio
```

## 12. Favoritos no es lo mismo que caché

Favoritos recuerda decisiones del usuario. Una caché de respuestas guardaría datos de la API y los reutilizaría para evitar repetir consultas mientras fueran válidos.

Actualmente abrir o actualizar la página sigue consultando la API. El JSON con identificadores no contiene suficiente información para reconstruir la tienda sin conexión. Por eso el bonus de caché de M2 sigue pendiente, aunque ya utilizamos localStorage para los favoritos.

## 13. Cómo observarlo tú en Chrome

1. Arranca la web con Vite y abre las herramientas de desarrollo.
2. Entra en `Application` → `Local Storage` y selecciona el origen de la página.
3. Busca la clave `m2-pwic:favoritos-diarios`.
4. Marca una oferta: comprueba que su identificador aparece en `ids` y sube el contador.
5. Quítala: comprueba que desaparece del array y cambia su estrella.
6. Recarga durante la misma rotación: comprueba que se recupera la selección.
7. En `Network`, cambia entre tienda y favoritos y comprueba que no aparece otra petición a `/v2/shop` por ese cambio de vista.

Ejemplo de lectura en la consola, sin modificar nada:

```js
JSON.parse(localStorage.getItem("m2-pwic:favoritos-diarios"));
```

Si alguna vez necesitas borrar solo los favoritos de esta aplicación para volver a probarlos, puedes eliminar esa clave concreta desde `Application`. No hace falta borrar todo el almacenamiento del navegador.

La caducidad y los fallos de almacenamiento se han probado por el agente con respuestas y errores simulados; la lectura de esta guía no se considera una comprobación práctica realizada por el alumno.
