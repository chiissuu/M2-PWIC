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
