# Guía de estudio

Aquí se recogerán las preguntas reales y las explicaciones trabajadas durante M2. El código conservará comentarios breves sobre motivos o conceptos relevantes.

## Conceptos presentes en la plantilla

- `type="module"` permite utilizar módulos ES y difiere la ejecución hasta que el HTML se ha analizado.
- `querySelector()` busca un elemento del DOM; `textContent` modifica su texto.
- Vite proporciona el servidor de desarrollo y genera la versión de producción.
- `package.json` declara scripts y dependencias; `package-lock.json` registra las versiones instaladas.
- `node_modules/` contiene las dependencias descargadas y `dist/` contiene el resultado de la compilación; ambas carpetas se excluyen de Git.

## Preguntas del alumno

### ¿En qué se parece Vite a Live Server y qué aporta?

Durante el desarrollo, ambos sirven la página en una dirección local y permiten ver los cambios al guardar. El contenido y el comportamiento siguen definidos por nuestros archivos HTML, CSS y JavaScript.

Vite también procesa módulos y dependencias y prepara los archivos de producción. En este proyecto utilizamos:

- `npm run dev`: arrancar el servidor de desarrollo para trabajar en la aplicación.
- `npm run build`: generar la versión optimizada en `dist/` para publicarla.
- `npm run preview`: servir localmente la compilación generada para revisarla antes de publicarla.

Estos comandos se ejecutan desde la carpeta del repositorio. Tanto CMD como PowerShell pueden ejecutar npm; en las instrucciones de esta misión utilizamos PowerShell.

Referencia: [guía oficial de Vite](https://vite.dev/guide/).

## Recorrido de la tienda

1. `app.js` llama a `cargarTienda()` y muestra la carga.
2. `obtenerTienda()` consulta la API, comprueba el estado HTTP y valida la lista recibida.
3. `prepararTienda()` convierte las entradas a un formato común y las agrupa.
4. `mostrarTienda()` crea las tarjetas y los enlaces en el DOM.
5. Si algo falla, `catch` muestra el error; `finally` permite volver a actualizar.

### Métodos de array con responsabilidades reales

- `map(normalizarOferta)` transforma cada entrada en un objeto sencillo con nombre, tipo, imagen, precio y sección.
- `filter` elimina las entradas que no permiten identificar una oferta.
- `reduce` construye una lista de secciones; `find` localiza la sección de cada oferta. Los arrays que se modifican al agrupar son nuevos, no los recibidos de la API.
- La vista vuelve a utilizar `map` para crear nodos a partir de los datos ya preparados.

### Datos incompletos y fechas

El encadenamiento opcional `?.` permite consultar propiedades que podrían faltar, y `Number.isFinite` evita tratar un texto o un precio ausente como una cantidad válida. Las ofertas sin imagen o precio se muestran con un texto alternativo.

La fecha se presenta con `Intl.DateTimeFormat` y los números con `Intl.NumberFormat`. Se conserva UTC para interpretar la fecha de la rotación de la API.

### Espera y actualización

`AbortSignal.timeout(15000)` cancela la espera si pasan 15 segundos. La variable `cargando` y el botón desactivado evitan iniciar varias consultas a la vez. `replaceChildren()` retira los nodos previos antes de pintar la nueva respuesta.

### Error de cuadrícula móvil encontrado

Una columna definida con `1fr` conservaba el tamaño mínimo del contenido de la navegación y ensanchaba toda la página. Cambiarla a `minmax(0, 1fr)` permite reducirla al ancho disponible; el desplazamiento horizontal queda dentro de la fila de enlaces.

## Explicación de la API y del flujo actual

Pregunta del alumno: cómo funciona todo lo implementado, porque todavía no ha trabajado con APIs y quiere poder modificarlo por su cuenta.

### Qué aporta cada parte

Una API ofrece una forma definida de pedir datos a otro programa. Nuestra página utiliza una dirección concreta, o endpoint: `https://fortnite-api.com/v2/shop?language=es`. Hace una petición HTTP GET para leer la tienda actual; no realiza compras ni consulta una cuenta de jugador.

La dirección se divide así:

- `fortnite-api.com`: servidor del proveedor.
- `/v2/shop`: recurso que consultamos, la tienda. `v2` forma parte de la ruta e identifica la versión de esta API.
- `?language=es`: parámetro para solicitar los textos en español.

El navegador hace una petición HTTP de tipo **GET**, que utilizamos para leer información. El servidor responde con datos en **JSON**, un formato de texto que representa objetos, listas y valores. En nuestro `fetch` no hace falta escribir `method: "GET"` porque GET es el método utilizado por defecto.

El proveedor comunitario Fortnite-API devuelve JSON: texto con una estructura de objetos, arrays y valores. `respuesta.json()` interpreta ese texto y entrega un valor de JavaScript con el que podemos trabajar. No devuelve nuestras tarjetas, nuestros estilos ni los elementos HTML de la página.

### ¿Vite procesa el JSON que llega de la API?

En esta aplicación lo interpreta el navegador mediante `respuesta.json()`, dentro de `obtenerTienda()`, en `js/api.js`. Vite sirve nuestros archivos durante el desarrollo y prepara los módulos para poder utilizarlos. El navegador ejecuta ese JavaScript, consulta por separado el servidor remoto e interpreta el JSON. Después, nuestro código decide qué propiedades conservar y cómo mostrarlas. No hemos creado un backend propio.

```text
Vite → entrega nuestros archivos HTML, CSS y JavaScript al navegador

Navegador → ejecuta fetch → consulta Fortnite-API
Fortnite-API → responde con JSON → navegador
Navegador → ejecuta respuesta.json() → objeto de JavaScript
Navegador → ejecuta prepararTienda(datos) → datos preparados
Navegador → ejecuta mostrarTienda(tienda) → elementos del DOM
```

Al publicar la compilación ocurre el mismo recorrido de datos en el navegador del visitante. No hace falta mantener el servidor de desarrollo de Vite para interpretar esa respuesta.

### ¿Por qué separar los archivos JavaScript?

Para esta misión conviene separar API, transformación y vista: cada archivo tiene una responsabilidad y la rúbrica pide módulos ES. `app.js` importa las funciones que necesita para coordinarlos. Las funciones auxiliares que solo utiliza un módulo, como `obtenerImagen` o `crearTarjeta`, permanecen dentro de él; no hay que importarlas todas en `app.js`.

La carpeta `js/` es una decisión de organización, no un requisito del lenguaje. La separación nos permite cambiar una petición sin reescribir las tarjetas o modificar una tarjeta sin tocar la consulta. No hace falta crear un archivo por cada función.

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Estructura fija: cabecera, botones y contenedores. |
| `app.js` | Coordina el funcionamiento general. |
| `js/api.js` | Solicita los datos y comprueba la respuesta. |
| `js/datos.js` | Simplifica y agrupa las ofertas. |
| `js/vista.js` | Convierte los datos preparados en elementos de la página. |
| `styles.css` | Define cómo se ven y distribuyen esos elementos. |

En el HTML, `type="module"` permite separar JavaScript en archivos que se importan entre sí. La primera importación de `app.js` es:

```js
import { obtenerTienda } from "./js/api.js";
```

Significa: «quiero utilizar aquí la función que exporta ese otro archivo». Importar permite utilizarla; no equivale a llamarla. La petición empieza cuando se ejecuta `obtenerTienda()`.

### Recorrido desde que se abre la página

```text
index.html carga app.js
          ↓
     cargarTienda()
          ↓
     mostrarCarga()
          ↓
     obtenerTienda()       → pedir y comprobar datos
          ↓
     prepararTienda()      → transformar y agrupar
          ↓
     mostrarTienda()       → construir la pantalla

Si falla algo dentro del try:
     mostrarError()

Al terminar, con éxito o error:
     habilitar de nuevo la actualización
```

1. El navegador analiza `index.html`, carga el CSS y ejecuta `app.js` como módulo mediante `type="module"`. Los módulos importados se preparan antes de ejecutar el código del módulo de entrada.
2. `app.js` registra los eventos de los dos botones. Al escribir `addEventListener("click", cargarTienda)` se entrega una función para ejecutarla cuando llegue el clic; no se la llama en ese momento.
3. La última línea, `cargarTienda()`, inicia la consulta inicial.
4. `cargando` evita iniciar otra consulta mientras la anterior sigue en marcha. `mostrarCarga()` desactiva la actualización, oculta resultados, limpia tarjetas y enlaces antiguos y muestra el aviso de carga.
5. `await obtenerTienda()` espera a los datos. La espera suspende la continuación de esta función asíncrona; el navegador puede seguir atendiendo otros trabajos.
6. `prepararTienda(datos)` transforma la respuesta y devuelve la tienda preparada.
7. `mostrarTienda(tienda)` construye las secciones, tarjetas y enlaces. Si el total es cero, muestra el mensaje de tienda vacía.
8. Un fallo dentro del `try` lleva al `catch`: se registra el detalle en consola y se presenta un error con reintento. El `finally` libera `cargando` y habilita la actualización tanto si hubo éxito como si hubo error.

Los clics en actualizar y reintentar vuelven a ejecutar el mismo recorrido. La aplicación no consulta automáticamente cada 15 segundos: ese número es el tiempo máximo de espera de una petición.

### Obtener los datos: `obtenerTienda()`

Una función `async` devuelve una promesa: un resultado que puede completarse o fallar más adelante. En esta función hay dos esperas:

| Elemento | Qué hace aquí |
| --- | --- |
| `async` | Declara una función que devuelve una promesa y permite usar `await` dentro de ella. |
| `fetch(URL_TIENDA)` | Inicia la petición HTTP y devuelve una promesa cuyo resultado es un objeto `Response`. |
| `await` | Espera a que se resuelva una promesa para continuar esta función; si se rechaza, provoca un error que puede atender el `catch`. |

La espera no detiene toda la página: JavaScript deja pendiente la continuación de la función asíncrona y el navegador puede atender otros trabajos. `async` tampoco convierte automáticamente todo el código de la función en trabajo en segundo plano; la transformación y la creación del DOM siguen ejecutando JavaScript en el navegador.

```js
const respuesta = await fetch(URL_TIENDA, {
  signal: AbortSignal.timeout(15000),
});
// Aquí se comprueba respuesta.ok.
const contenido = await respuesta.json();
```

La primera obtiene el objeto `Response`, que contiene información como el estado HTTP. La segunda espera a leer e interpretar el cuerpo JSON. Recibir la respuesta y leer su cuerpo son pasos distintos.

`fetch` puede rechazar su promesa por un problema de red, pero un HTTP 404 o 500 no provoca por sí solo ese rechazo. Por eso comprobamos `respuesta.ok` y lanzamos un `Error` si el estado HTTP no indica éxito. `throw` hace que la operación falle y el error llegue al `catch` de `app.js`.

Después se comprueba que `contenido.data.entries` sea un array. Una lista vacía es una respuesta válida; una lista ausente o con un tipo distinto es un error de estructura. La función devuelve `contenido.data`, por lo que `datos.entries` ya es accesible desde el módulo de transformación.

### Transformar los datos: `prepararTienda()`

Las ofertas pueden contener cosméticos en `brItems`, música en `tracks`, instrumentos, vehículos o kits LEGO. Los nombres y las imágenes no siempre están en las mismas propiedades. Normalizar significa convertir esas variantes al mismo formato para que la vista no tenga que conocerlas todas.

La normalización ocurre **dentro de `prepararTienda()`**, cuando llama a `.map(normalizarOferta)`. Esta función prepara y agrupa objetos; no introduce elementos en el HTML. Después, `mostrarTienda()` recibe el resultado y crea los elementos del DOM. El CSS se aplica a esos elementos según sus clases y las demás reglas de la hoja de estilos.

Ejemplo inventado de una oferta ya normalizada:

```js
{
  id: "oferta-ejemplo",
  nombre: "Traje de ejemplo",
  tipo: "Atuendo",
  imagen: "", // Si falta, se mostrará una alternativa de texto.
  precio: 800,
  precioAnterior: 1200,
  seccion: "Destacados"
}
```

| Función de `datos.js` | Qué hace |
| --- | --- |
| `obtenerTexto(valor, alternativa)` | Devuelve un texto sin espacios en los extremos o un texto alternativo si falta. |
| `obtenerLista(valor)` | Devuelve una lista de elementos que pasan la comprobación de objeto, o un array vacío si no había lista. |
| `obtenerImagen(oferta, principal)` | Busca la primera URL HTTPS disponible en las posibles propiedades de imagen. |
| `normalizarOferta(oferta)` | Devuelve el formato común de una oferta o `null` si no tiene identificador válido. |
| `prepararTienda(datos)` | Normaliza, descarta entradas inválidas, agrupa y devuelve fecha, total y secciones. |

Los artículos de una oferta se reúnen con `...`, el operador de expansión. Por ejemplo, `[...[a, b], ...[c]]` forma `[a, b, c]`. Se toma el primer artículo como principal para ciertos textos e imágenes; si existe información del lote se le da prioridad. No se muestra todavía un desglose de todos los artículos incluidos.

La unidad de la tarjeta es la oferta completa. Un lote con tres artículos conserva una tarjeta y su precio conjunto; crear tres tarjetas con ese mismo precio induciría a error.

El encadenamiento de arrays se lee de izquierda a derecha:

```js
const ofertas = datos.entries
  .map(normalizarOferta)
  .filter((oferta) => oferta !== null);
```

- `map` llama a `normalizarOferta` por cada entrada y construye un nuevo array con los resultados. No filtra: también conserva los resultados `null`.
- `filter` construye otro array con los resultados que cumplen la condición; aquí elimina los `null`. Este filtrado de entradas inválidas ya existe aunque todavía no haya un buscador para el usuario.
- `reduce` recorre las ofertas acumulando secciones. Comienza con `[]`; para cada oferta, `find` busca su sección, se crea si no existe y se añade la oferta al grupo. El acumulador se devuelve para la siguiente iteración.

Con tres ofertas de las secciones `Destacados`, `Música` y `Destacados`, se obtienen dos grupos: el primero contiene dos ofertas y el segundo una. Los arrays que se rellenan con `push` se crean durante esta transformación; no se modifica la respuesta original.

El resultado final tiene esta estructura:

```js
{
  fecha: datos.date,
  total: ofertas.length,
  secciones: [
    { nombre: "Destacados", ofertas: [/* ofertas normalizadas */] },
    { nombre: "Música", ofertas: [/* ofertas normalizadas */] }
  ]
}
```

El detalle de parámetros, retornos, ejemplos y usos reales de los tres métodos está en [UsosMapFilterReduce.md](UsosMapFilterReduce.md).

### Crear la pantalla: `mostrarTienda()` y sus ayudantes

El DOM es la representación de los elementos de la página que JavaScript puede consultar y modificar. `querySelector` localiza contenedores ya presentes; `createElement` crea nuevos elementos, `textContent` introduce texto y `append` coloca hijos dentro de otro elemento. Crear un nodo no lo muestra por sí solo: debe incorporarse al documento.

El alumno indica que ya conocía `querySelector` y lo explicó en la defensa de M1. La creación dinámica de elementos es el concepto nuevo que quiere destacar en este bloque.

En lugar de escribir una tarjeta fija por cada oferta dentro de `index.html`, creamos tantas como ofertas lleguen. Ejemplo reducido basado en `crearTarjeta()`:

```js
const nombre = document.createElement("h3"); // Crea un elemento h3.
nombre.className = "nombre-oferta"; // Le asigna una clase para los estilos.
nombre.textContent = oferta.nombre; // Introduce el nombre como texto.
contenido.append(nombre); // Lo incorpora al contenedor de contenido.
```

Si el nombre fuera «Traje de ejemplo», el resultado tendría esta forma en el DOM:

```html
<h3 class="nombre-oferta">Traje de ejemplo</h3>
```

`createElement()` es un método. `className` y `textContent` son propiedades a las que asignamos valores. `className` no crea un estilo: asigna una clase que puede coincidir con reglas de `styles.css`. La parte fija sigue escrita en HTML; JavaScript construye la parte que depende de la respuesta.

El árbol de funciones que construye la tienda es:

```text
mostrarTienda()
  └─ crearSeccion()
       └─ crearTarjeta()
            ├─ crearImagen()
            └─ crearPrecio()
```

Se llama a `crearSeccion` por cada sección y a `crearTarjeta` por cada oferta. Además de este árbol, `mostrarTienda` llama a `mostrarFecha` y crea los enlaces mediante `crearEnlaceSeccion`.

| Función de `vista.js` | Qué hace |
| --- | --- |
| `mostrarCarga()` | Prepara la pantalla y limpia la representación anterior. |
| `habilitarActualizacion()` | Vuelve a activar el botón de actualización. |
| `mostrarError()` | Muestra el aviso de error y el botón de reintento. |
| `mostrarFecha(valor)` | Formatea la fecha de rotación o muestra una alternativa si no es válida. |
| `mostrarImagenNoDisponible(contenedor)` | Sustituye el contenido de la imagen por un mensaje. |
| `crearImagen(oferta)` | Crea la imagen, configura su carga diferida y atiende fallos de descarga. |
| `crearPrecio(oferta)` | Distingue precio desconocido, gratis y precio normal; añade el anterior tachado si es mayor. |
| `crearTarjeta(oferta)` | Combina imagen, tipo, nombre y precio y devuelve un elemento de lista. |
| `crearSeccion(seccion, indice)` | Crea el título y la lista de tarjetas de una sección. |
| `crearEnlaceSeccion(seccion, indice)` | Crea un enlace a la sección dentro de la misma página. |
| `mostrarTienda(tienda)` | Actualiza fecha y resumen y monta los enlaces y las secciones, o muestra el vacío. |

En `lista.append(...seccion.ofertas.map(crearTarjeta))`, primero `map` obtiene un array de nodos y después `...` los pasa a `append` como argumentos separados. Lo mismo ocurre al crear las secciones.

Los nombres externos se asignan con `textContent`, para presentarlos como texto. Las clases que añade JavaScript, como `tarjeta-oferta`, reciben sus estilos desde `styles.css`.

Las imágenes se descargan desde sus URLs cuando el navegador las necesita; `loading="lazy"` permite diferir las que están lejos de la zona visible. Los enlaces de sección solo desplazan la página y no vuelven a consultar la API.

### Gestión de errores y datos incompletos

Los `if` sirven para decidir qué hacer con una condición concreta. En la API, una respuesta HTTP incorrecta o una estructura inválida provoca un `throw new Error(...)`. El `try/catch` de `app.js` recoge el fallo y pide a la vista mostrar el error. El `finally` restablece los controles al terminar.

No todos los datos incompletos deben impedir ver toda la tienda. Los casos recuperables reciben una alternativa, y el fallo de descarga de una imagen se atiende mediante su evento `error`.

| Situación | Respuesta de la aplicación |
| --- | --- |
| Petición pendiente | Muestra carga y evita consultas simultáneas. |
| Error de red, HTTP, JSON o estructura | Muestra error y permite reintentar. |
| Espera superior a 15 segundos | Cancela la petición y muestra el error. |
| Lista de ofertas válida pero vacía | Informa de que no hay ofertas. |
| Entrada sin identificador válido | Se descarta durante la transformación. |
| Imagen ausente o fallida | Muestra un texto alternativo en esa tarjeta. |
| Precio desconocido | Muestra «Precio no disponible». |
| Precio cero | Muestra «Gratis». |
| Fecha no válida | Indica que la fecha no está disponible. |

Estas comprobaciones cubren los casos revisados; no garantizan que el proveedor nunca pueda cambiar su estructura o presentar una variante nueva.

### Sintaxis que conviene reconocer

- `export` permite importar una función desde otro módulo. Las funciones ayudantes sin `export` quedan internas al suyo.
- `oferta.layout?.name` obtiene el nombre si existe `layout`; si es `null` o `undefined`, devuelve `undefined` en lugar de fallar por ese acceso.
- `condicion ? valorA : valorB` elige entre dos valores. Es una forma breve de una decisión `if/else`.
- `(oferta) => oferta !== null` es una función que recibe una oferta y devuelve si pasa esa condición.
- `null` representa aquí un dato que no podemos utilizar: un precio desconocido no es cero. Cero sí es válido y se presenta como gratis.
- `const` impide reasignar una variable; no congela el contenido de un array u objeto.

### Dónde cambiar cada cosa

| Cambio deseado | Lugar principal |
| --- | --- |
| Cabecera, textos fijos y controles | `index.html`. |
| Colores, tamaño de tarjetas y distribución | `styles.css`. |
| Dirección consultada o idioma solicitado | `js/api.js`; revisar también el formato recibido si se cambia de endpoint. |
| Propiedades conservadas, agrupación u orden | `js/datos.js`. |
| Contenido de una tarjeta y formato de precios | `js/vista.js`. |
| Cuándo consultar y cómo responder a controles | `app.js`. |

Para presentar otra propiedad de la API, primero se comprueba su nombre en la respuesta real, después se incorpora al formato de `normalizarOferta` y por último se muestra en la vista. No basta con añadir el texto a CSS.

Un futuro buscador debería reutilizar los datos ya descargados. Actualmente `tienda` es local a `cargarTienda`; habría que conservar la tienda completa para poder obtener resultados filtrados sin perderla. También habría que adaptar el renderizado para reemplazar las listas al buscar, porque `mostrarTienda` añade nodos y actualmente depende de que `mostrarCarga` haya limpiado antes. Llamar a `cargarTienda` en cada tecla repetiría consultas innecesarias.

No hay todavía caché de aplicación ni persistencia en `localStorage`. Al volver a abrir o actualizar se ejecuta otra consulta, aunque el navegador pueda tener sus propias cachés HTTP. Se consulta la tienda de la rotación actual, no todo el catálogo histórico de Fortnite.

### Cómo observarlo por cuenta propia

1. Arrancar `npm run dev` y abrir la página.
2. Abrir las herramientas de desarrollo del navegador y su pestaña de red (`Network`); seleccionar `Fetch/XHR` y pulsar «Actualizar tienda».
3. Abrir la petición `shop?language=es`: comprobar GET, estado HTTP y las pestañas de vista previa/respuesta. Buscar `data.entries` y reconocer precio, sección y artículos.
4. En la pestaña de código (`Sources`), poner un punto de interrupción después de `await obtenerTienda()` para inspeccionar `datos`; avanzar sobre `prepararTienda(datos)` e inspeccionar `tienda`.
5. En elementos (`Elements`), localizar una tarjeta: existe en el DOM aunque no estuviera escrita en el HTML inicial.

El alumno ha leído la explicación, confirma que la aplicación funciona correctamente y pide consolidar estos apuntes antes de hacer commit. Se ha corregido la distinción entre preparar datos y crear el DOM. El repaso continúa por puntos; esto no sustituye una comprobación práctica de que puede modificar todo el código por su cuenta.
