# Preparación de la Autopsia

La Autopsia final será redactada por el alumno y se conservará exactamente como la entregue, salvo que solicite expresamente una modificación.

## Decisiones que se pueden recoger durante el desarrollo

Para cada posible reflexión, registrar:

1. Problema o necesidad concreta.
2. Solución elegida y motivo.
3. Alternativa real descartada.
4. Coste o limitación de la elección.

Todavía no se han seleccionado los temas de la Autopsia. La elección de API, las transformaciones de datos, la separación de módulos o la caché podrían dar lugar a reflexiones si durante su implementación aparece una decisión relevante.

## Candidatos surgidos en la primera tienda

Son apuntes técnicos para que el alumno valore, no una redacción final atribuida a él:

- **Limitar el alcance a la tienda:** permite cerrar un bloque comprensible. La alternativa era añadir presupuesto, estadísticas o mapas desde el principio; el coste es dejar esas utilidades para una posible ampliación.
- **Mantener una tarjeta por oferta:** conserva el precio conjunto de los lotes. La alternativa era dividirlos en artículos; el coste es que esta versión no ofrece una ficha detallada de cada componente del lote.
- **Separar petición, transformación y DOM:** el alumno acepta esta división al repasar el flujo. Permite localizar cambios y estudiar cada responsabilidad; frente a reunirlo todo en un archivo, requiere entender los contratos de datos y las importaciones. Es un tema posible para su reflexión, no una redacción final.
- **Crear tarjetas a partir de datos:** el alumno destaca como aprendizaje nuevo la creación de elementos con JavaScript. Permite representar una cantidad variable de ofertas; exige gestionar el reemplazo de nodos y las alternativas para datos incompletos. La alternativa sería escribir tarjetas fijas en HTML, que no seguirían por sí solas las nuevas respuestas.

## Candidatos del bloque de favoritos

Apuntes técnicos para que el alumno valore, sin redactar su reflexión final:

- **Elegir favoritos diarios:** el alumno prefiere limitar la selección a la tienda actual. Guardar fecha e identificadores simplifica la persistencia; la alternativa de conservarlos entre días necesitaría datos históricos de cada tarjeta. La selección anterior se pierde cuando se confirma otra rotación.
- **Usar la fecha de la API:** evita ligar el reinicio a la zona horaria del ordenador. Se exige una respuesta y fecha válidas antes de cambiar lo guardado; el coste es que una pestaña abierta conserva su selección hasta volver a consultar.
- **Continuar en memoria si falla el almacenamiento:** permite seguir usando las estrellas y avisa de que no se han podido guardar. La alternativa sería bloquear la función completa; el coste es que los cambios no guardados pueden perderse al recargar.

## Redacción final

Pendiente del alumno al terminar la misión.
