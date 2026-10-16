const URL_TIENDA = "https://fortnite-api.com/v2/shop?language=es"; // fortnite-api.com: servidor; /v2/shop: recurso tienda; ?language=es: textos en español.

// async devuelve una promesa; fetch inicia la petición y await espera su resultado sin bloquear toda la página.
export async function obtenerTienda() {
  const respuesta = await fetch(URL_TIENDA, {
    // Una petición que no responde tampoco debe dejar la pantalla cargando indefinidamente.
    signal: AbortSignal.timeout(15000),
  });

  if (!respuesta.ok) {
    throw new Error(`La consulta de la tienda ha fallado: HTTP ${respuesta.status}.`);
  }

  const contenido = await respuesta.json(); // El navegador interpreta el JSON y obtenemos un objeto de JavaScript.

  if (!Array.isArray(contenido?.data?.entries)) {
    throw new Error("La respuesta no contiene una lista de ofertas válida.");
  }

  return contenido.data;
}
