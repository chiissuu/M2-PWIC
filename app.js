import { obtenerTienda } from "./js/api.js"; // Utilizo aquí la función que exporta ese otro archivo.
import { prepararTienda } from "./js/datos.js";
import {
  mostrarCarga,
  mostrarTienda,
  mostrarError,
  habilitarActualizacion,
} from "./js/vista.js";

let cargando = false;

async function cargarTienda() {
  // Los dos botones comparten esta función para evitar peticiones simultáneas.
  if (cargando) {
    return;
  }

  cargando = true;
  mostrarCarga();

  try {
    const datos = await obtenerTienda();
    const tienda = prepararTienda(datos);
    mostrarTienda(tienda);
  } catch (error) {
    console.error("Error al cargar la tienda:", error);
    mostrarError();
  } finally {
    cargando = false;
    habilitarActualizacion();
  }
}

document.querySelector("#actualizar").addEventListener("click", cargarTienda);
document.querySelector("#reintentar").addEventListener("click", cargarTienda);

cargarTienda();
