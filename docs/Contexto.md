# Contexto del proyecto

## Identificación

- Asignatura: Web Development I, the Client · U-tad.
- Unidad: U2 · JavaScript avanzado y herramientas del frontend.
- Misión: M2 · Async Odyssey.
- Repositorio: <https://github.com/chiissuu/M2-PWIC>.
- Carpeta: `M2-PWIC`, dentro de la carpeta global `PWIC`, junto a `aim-trainer`.
- Estado: plantilla inicial; temática y API pendientes de elección.

## Objetivo y rúbrica

Crear una aplicación con Vite que consuma una API pública real, transforme los datos y los muestre en el DOM.

| Apartado | Requisitos compartidos por el alumno | Puntos |
| --- | --- | ---: |
| Asincronía | `fetch`, `async/await`, `try/catch`, `response.ok` y estados de carga y error visibles. | 20 |
| Transformación de datos | Métodos de array como `map`, `filter` y `reduce` con una utilidad real. | 15 |
| Módulos y estructura | Separar API, lógica y renderizado mediante módulos ES. | 15 |
| Robustez | Manejar respuestas vacías, errores de red y datos inesperados. | 10 |
| Originalidad | Temática y presentación propias. | 10 |
| Checks automáticos | README, declaración de IA, limpieza, commits, tecnología y estructura. | 30 |

Bonus: caché en `localStorage` para evitar peticiones repetidas. Los detalles de los checks automáticos y la fecha límite todavía no se han facilitado.

## Base actual

- `index.html` contiene la estructura semántica y carga `app.js` como módulo.
- `styles.css` contiene una presentación provisional.
- `app.js` escribe un mensaje de preparación en el DOM.
- `assets/` está reservado para recursos locales. `.gitkeep` permite conservar la carpeta en Git mientras está vacía.
- `package.json` define `dev`, `build` y `preview`, con Vite como única dependencia directa.
- `docs/` conserva contexto, tareas, decisiones, estudio, uso de IA, reflexiones y sesiones.

Todavía no hay una API seleccionada ni separación funcional en módulos de API, datos y vista. Esos módulos se crearán cuando tengan una responsabilidad concreta.

## Método de trabajo

Desarrollar bloques pequeños, comprobarlos y explicar los conceptos desconocidos antes de cerrar cada avance. El alumno gestiona los commits y los pushes. Registrar únicamente pruebas realizadas y conservar literalmente su redacción final de la Autopsia.

La misión M3 permitirá reconstruir o reinventar esta aplicación con React 19. En M2 se trabajará con JavaScript y DOM.
