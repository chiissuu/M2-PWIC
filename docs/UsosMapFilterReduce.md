# Uso de map, filter y reduce

Guía de estudio de M2: primero se explica el funcionamiento de cada método y después su uso en la tienda. El recorrido completo está en [Estudio.md](Estudio.md).

## Antes de empezar: qué es el callback

Un callback es una función que entregamos a otra función para que la llame. Estos métodos reciben un callback y lo ejecutan para los elementos del array que recorren. Un array es una lista ordenada; sus índices empiezan en cero.

```js
const numeros = [10, 20, 30];

function duplicar(numero) {
  return numero * 2;
}

const dobles = numeros.map(duplicar); // [20, 40, 60]
```

Pasamos `duplicar` sin paréntesis: `map` se encarga de llamarla con cada número. `duplicar()` ejecutaría la función inmediatamente y entregaría su resultado, que no es lo que necesitamos aquí.

Podemos escribir el mismo callback como función flecha:

```js
const dobles = numeros.map((numero) => numero * 2);
```

Una función flecha con una expresión devuelve esa expresión de forma implícita. Si usamos un bloque con llaves, hay que escribir `return` para devolver el resultado:

```js
const dobles = numeros.map((numero) => {
  return numero * 2;
});
```

## 1. map: transformar elementos

### Sintaxis y parámetros

```js
const resultado = lista.map((elemento, indice, arrayOriginal) => {
  return elementoTransformado;
});
```

| Parámetro del callback | Significado |
| --- | --- |
| `elemento` | Valor del elemento que se está procesando. |
| `indice` | Posición de ese elemento en el array. |
| `arrayOriginal` | Array sobre el que se llamó a `map`. |

Solo declaramos los parámetros que necesitamos. En `map(duplicar)`, el método pasa esos argumentos igualmente, pero `duplicar` solo utiliza el primero.

`map` devuelve **un nuevo array con los valores devueltos por el callback**. En los arrays sin huecos que usamos aquí hay un resultado por elemento de entrada. Un `null` o un `undefined` devuelto también ocupa su posición: `map` no sirve para descartar elementos.

### Ejemplo

```js
const precios = [800, 1200, 0];
const etiquetas = precios.map((precio) => `${precio} pavos`);
// ["800 pavos", "1200 pavos", "0 pavos"]
```

El ejemplo muestra la transformación; la función real `crearPrecio` distingue además el precio cero y lo presenta como «Gratis».

### Error frecuente: olvidar el return

```js
const incorrecto = [1, 2].map((numero) => {
  numero * 2;
});
// [undefined, undefined]
```

No hemos devuelto el cálculo. La corrección es `return numero * 2` o usar una flecha sin bloque: `(numero) => numero * 2`.

## 2. filter: conservar elementos que cumplen una condición

### Sintaxis y parámetros

```js
const resultado = lista.filter((elemento, indice, arrayOriginal) => {
  return condicion;
});
```

Recibe los mismos tres argumentos de callback que `map`. El callback indica si se conserva cada elemento: un resultado verdadero lo incluye y uno falso lo excluye. Se puede devolver un booleano explícito; otros valores se interpretan según su valor de verdad en JavaScript.

`filter` devuelve **un nuevo array con los elementos seleccionados**, conservando su orden. No devuelve los booleanos y no transforma los elementos seleccionados. Si no pasa ninguno, devuelve `[]`.

### Ejemplo

```js
const precios = [800, 1200, 0];
const asequibles = precios.filter((precio) => precio <= 800);
// [800, 0]
```

Aquí `precio <= 800` devuelve `true` o `false`, pero el array final contiene los precios, no esos booleanos.

### Error frecuente: devolver el propio precio

```js
const incorrecto = [800, 0].filter((precio) => precio);
// [800]
```

El cero se interpreta como falso. Para comprobar precios válidos hay que escribir la condición que realmente necesitamos; por ejemplo, `Number.isFinite(precio) && precio >= 0`.

En nuestra aplicación no se descarta una oferta solo por tener precio desconocido: se conserva y se muestra una alternativa. Este ejemplo sirve para entender la condición, no describe un filtro actual de precios.

## 3. reduce: acumular un resultado

### Sintaxis y parámetros

```js
const resultado = lista.reduce((acumulador, elemento, indice, arrayOriginal) => {
  return siguienteAcumulador;
}, valorInicial);
```

| Parámetro | Significado |
| --- | --- |
| `acumulador` | Resultado que se está construyendo; empieza con `valorInicial` si se proporciona. |
| `elemento` | Elemento actual del array. |
| `indice` | Posición del elemento actual. |
| `arrayOriginal` | Array sobre el que se llamó a `reduce`. |
| `valorInicial` | Segundo argumento de `reduce`, fuera del callback: punto de partida del acumulador. |

El valor que devuelve el callback se usa como acumulador en la siguiente llamada. `reduce` devuelve el acumulador final, que puede ser un número, un objeto, un array u otro tipo de valor. No tiene que ser una suma.

### Ejemplo de suma paso a paso

```js
const total = [800, 1200, 0].reduce((suma, precio) => {
  return suma + precio;
}, 0);
// 2000
```

| Paso | `suma` al entrar | `precio` | Valor devuelto |
| --- | ---: | ---: | ---: |
| 1 | 0 | 800 | 800 |
| 2 | 800 | 1200 | 2000 |
| 3 | 2000 | 0 | 2000 |

`0` es el valor inicial; no es el índice. Con un array vacío y valor inicial, se devuelve ese valor inicial sin ejecutar el callback. Sin valor inicial, `reduce` usa el primer elemento como acumulador y empieza con el siguiente; si tampoco hay elementos, lanza un `TypeError`. En la tienda damos siempre un valor inicial: `[]`.

### Error frecuente: no devolver el acumulador

Aunque se haya modificado un objeto acumulador dentro del callback, hay que devolverlo para que el siguiente paso lo reciba. Por eso nuestro código termina cada iteración con `return grupos`.

## 4. Comparación y precauciones

| Método | Pregunta que resuelve | Qué devuelve |
| --- | --- | --- |
| `map` | ¿En qué convierto cada elemento? | Un nuevo array con los resultados del callback. |
| `filter` | ¿Qué elementos conservo? | Un nuevo array con los elementos que pasan la condición. |
| `reduce` | ¿Qué resultado construyo con el conjunto? | El acumulador final. |

`map` y `filter` admiten además un segundo argumento opcional, `thisArg`, para el contexto `this` de un callback definido con una función normal. No lo utilizamos en el proyecto; las funciones flecha no toman su `this` de ese argumento. En `reduce` el segundo argumento es el valor inicial, no `thisArg`.

Ninguno de estos métodos necesita modificar el array original para funcionar, pero el código del callback podría hacerlo. Además, `map` y `filter` no hacen una copia profunda automática de los objetos. Si `filter` conserva un objeto, conserva una referencia a ese mismo objeto; modificarlo después también afecta al objeto original. Nuestra normalización crea objetos de oferta nuevos y la agrupación crea arrays nuevos.

Los nombres `elemento`, `suma`, `grupos` u `oferta` los elegimos nosotros: lo que determina qué reciben es su posición entre los parámetros.

## 5. Cómo usamos map y filter en datos.js

Este es el código real de `prepararTienda`:

```js
const ofertas = datos.entries
  .map(normalizarOferta)
  .filter((oferta) => oferta !== null);
```

### Paso A: map normaliza

`normalizarOferta` recibe cada entrada original y devuelve un objeto con:

```js
{ id, nombre, tipo, imagen, precio, precioAnterior, seccion }
```

Si la entrada no permite obtener un identificador válido, devuelve `null`. Así, tres entradas podrían dar este resultado intermedio ilustrativo:

```js
[ofertaTraje, null, ofertaMusica]
```

La API contiene variantes de artículos; el objetivo de `map` es que la vista reciba siempre el mismo formato.

### Paso B: filter descarta las inválidas

La condición `oferta !== null` conserva las dos ofertas y excluye el resultado inválido:

```js
[ofertaTraje, ofertaMusica]
```

El array normalizado se construye antes de filtrar: la segunda operación trabaja con los resultados de la primera. Este `filter` tiene una responsabilidad de validación y no exige tener un buscador visible.

### Otro filter del módulo

En `obtenerLista` encontramos:

```js
valor.filter((elemento) => elemento !== null && typeof elemento === "object");
```

Se conservan los elementos que pasan esa comprobación básica antes de consultar sus propiedades. No es una validación completa de todas las posibles estructuras: `typeof` también considera objetos a los arrays.

## 6. Cómo usamos reduce para agrupar

Este es el código real:

```js
const secciones = ofertas.reduce((grupos, oferta) => {
  let grupo = grupos.find((seccion) => seccion.nombre === oferta.seccion);

  if (!grupo) {
    grupo = { nombre: oferta.seccion, ofertas: [] };
    grupos.push(grupo);
  }

  grupo.ofertas.push(oferta);
  return grupos;
}, []);
```

Aquí el acumulador se llama `grupos`, el elemento actual se llama `oferta` y el valor inicial es un array vacío. No declaramos índice ni array original porque no los necesitamos.

1. `find` devuelve la primera sección que tiene el nombre de `oferta.seccion`, o `undefined` si no existe.
2. Si falta, se crea un objeto de sección y se añade al acumulador.
3. Se añade la oferta al array `ofertas` de esa sección.
4. Se devuelve `grupos` para la siguiente iteración.

Cuando `find` encuentra un grupo, devuelve una referencia a ese objeto, no una copia. Por eso `grupo.ofertas.push(oferta)` modifica el grupo dentro del acumulador. Esto es intencional: esos grupos y sus arrays se acaban de crear para la transformación.

### Ejemplo ilustrativo paso a paso

Entrada simplificada:

```js
const ofertas = [
  { id: "a", nombre: "Traje A", seccion: "Destacados" },
  { id: "b", nombre: "Canción B", seccion: "Música" },
  { id: "c", nombre: "Pico C", seccion: "Destacados" },
];
```

| Paso | Oferta | Qué ocurre |
| --- | --- | --- |
| Inicio | Ninguna | `grupos` es `[]`. |
| 1 | Traje A | Se crea Destacados y se añade A. |
| 2 | Canción B | Se crea Música y se añade B. |
| 3 | Pico C | Se encuentra Destacados y se añade C a ese grupo. |

Resultado:

```js
[
  {
    nombre: "Destacados",
    ofertas: [ofertas[0], ofertas[2]],
  },
  {
    nombre: "Música",
    ofertas: [ofertas[1]],
  },
]
```

El orden de las secciones sigue su primera aparición y el de las ofertas de cada sección conserva el de entrada. No hemos aplicado una ordenación adicional.

`reduce` aquí no crea HTML: devuelve grupos de datos. Una oferta con varios artículos conserva una entrada y un precio conjunto.

## 7. Cómo usamos map para construir el DOM

Dentro de `crearSeccion`, en `js/vista.js`:

```js
lista.append(...seccion.ofertas.map(crearTarjeta));
```

1. `map` llama a `crearTarjeta` por cada oferta.
2. Cada llamada devuelve un nodo `li` con el contenido de la tarjeta.
3. El resultado de `map` es un array de nodos.
4. `...` expande ese array para pasar los nodos como argumentos separados a `append`.
5. `append` incorpora los nodos a la lista.

En `mostrarTienda` también se usa:

```js
enlacesSecciones.append(...tienda.secciones.map(crearEnlaceSeccion));
contenedorTienda.append(...tienda.secciones.map(crearSeccion));
```

Aquí `map` pasa también el índice a los callbacks. `crearSeccion(seccion, indice)` y `crearEnlaceSeccion(seccion, indice)` lo usan para generar destinos y enlaces coincidentes, como `seccion-0` y `#seccion-0`.

Esta parte sí construye elementos del DOM; la transformación previa de `datos.js` solo prepara datos.

## 8. Preguntas para comprobar la comprensión

- Si `normalizarOferta` devuelve `null`, ¿por qué sigue haciendo falta `filter`?
- ¿Por qué un precio desconocido no debe convertirse en cero?
- ¿Qué representa `[]` al final de nuestro `reduce`?
- ¿Por qué devolvemos `grupos` en cada iteración?
- ¿Qué devuelve `crearTarjeta` para que pueda utilizarse dentro de `map`?
- ¿Se realiza alguna petición de red al ejecutar estos métodos sobre datos ya descargados?

Son preguntas de repaso propuestas, no respuestas atribuidas al alumno ni comprobaciones ya realizadas.
