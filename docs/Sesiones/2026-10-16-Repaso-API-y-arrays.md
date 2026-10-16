# Repaso de API, DOM y métodos de array

## Petición y aportación del alumno

El alumno confirma que la tienda funciona correctamente y solicita consolidar los apuntes antes de hacer commit. Acepta la separación de módulos, pide esquemas y comentarios concretos y destaca como aprendizaje nuevo la creación dinámica de elementos. Indica que ya conocía `querySelector` y lo explicó en la defensa de M1.

## Trabajo realizado

- Ampliación del documento existente `Estudio.md` con endpoint, GET/JSON, responsabilidades, flujo, módulos, asincronía, creación del DOM y errores.
- Creación de `UsosMapFilterReduce.md` con callbacks, parámetros, retornos, ejemplos y aplicaciones reales en datos y vista.
- Comentarios breves junto al endpoint, al primer import y al script de módulo; explicación breve de la consulta asíncrona y de la interpretación del JSON.
- Actualización del índice, contexto, pendientes, README y registro de IA; apuntes candidatos para la Autopsia sin redactar la versión final del alumno.

## Aclaraciones principales

El navegador ejecuta la petición e interpreta el JSON. Vite sirve los archivos durante el desarrollo. `prepararTienda` normaliza y agrupa; `mostrarTienda` construye los elementos del DOM. La normalización se ejecuta dentro de `prepararTienda`, mediante `map(normalizarOferta)`.

## Alcance y cierre

No se han añadido funcionalidades ni dependencias. El alumno hará el commit y el push. La confirmación general de funcionamiento no se utiliza para atribuirle las pruebas detalladas previas del agente, y la comprensión práctica completa sigue en repaso.

Comprobaciones del agente: `node --check` en los cuatro archivos JavaScript, `npm run build` y `git diff --check` correctos. `node_modules` y `dist` siguen excluidos de Git. No se han repetido las pruebas funcionales del navegador en este bloque de comentarios y documentación.
