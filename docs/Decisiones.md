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
