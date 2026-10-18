import {
  leerCacheTienda,
  cacheVigente,
  guardarCacheTienda,
  segundosHastaActualizar,
  registrarConsulta,
} from "./cache.js";

const URL_TIENDA = "https://fortnite-api.com/v2/shop?language=es"; // fortnite-api.com: servidor; /v2/shop: recurso tienda; ?language=es: textos en español.

// async devuelve una promesa; fetch inicia la petición y await espera su resultado sin bloquear toda la página.
async function consultarTienda() {
  const respuesta = await fetch(URL_TIENDA, {
    cache: "no-store", // La reutilización la decide nuestra caché de localStorage.
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

function recuperarCopia(copia, aviso = "") {
  return { datos: copia.datos, desdeCache: true, consultadaEn: copia.guardadaEn, aviso };
}

export async function obtenerTienda({ forzar = false } = {}) {
  const copia = leerCacheTienda();
  const segundos = segundosHastaActualizar();

  if (forzar && segundos > 0) {
    const mensaje = `Espera ${segundos} segundos antes de volver a consultar la API.`;
    if (cacheVigente(copia)) {
      return recuperarCopia(copia, mensaje);
    }

    const error = new Error(mensaje);
    error.name = "EsperaActualizacion";
    throw error;
  }

  if (!forzar && cacheVigente(copia)) {
    return recuperarCopia(copia);
  }

  // Contamos también los intentos fallidos para evitar reintentos continuos.
  registrarConsulta();
  try {
    const datos = await consultarTienda();
    const persistida = guardarCacheTienda(datos);
    return {
      datos,
      desdeCache: false,
      consultadaEn: Date.now(),
      aviso: persistida ? "" : "No se ha podido guardar esta respuesta en el navegador. La tienda sigue disponible, pero al recargar puede necesitar otra consulta.",
    };
  } catch (error) {
    if (cacheVigente(copia)) {
      return recuperarCopia(copia, "No se ha podido actualizar. Se mantiene la copia guardada que todavía está vigente.");
    }
    throw error;
  }
}
