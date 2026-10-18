import { obtenerTienda } from "./js/api.js"; // Utilizo aquí la función que exporta ese otro archivo.
import { prepararTienda, seleccionarFavoritos } from "./js/datos.js";
import {
  sincronizarFavoritos,
  alternarFavorito,
  obtenerIdsFavoritos,
  permitirFavoritos,
  obtenerAvisoFavoritos,
} from "./js/favoritos.js";
import {
  mostrarCarga,
  mostrarTienda,
  mostrarError,
  habilitarActualizacion,
  actualizarFavoritos,
  mostrarFavoritos,
  marcarVistaActiva,
  mostrarEstadoCache,
} from "./js/vista.js";

let cargando = false;
let tiendaActual = null;
let viendoFavoritos = window.location.hash === "#favoritos";

function pintarVistaActual() {
  actualizarFavoritos(obtenerIdsFavoritos(), permitirFavoritos(), obtenerAvisoFavoritos());

  if (viendoFavoritos) {
    mostrarFavoritos(seleccionarFavoritos(tiendaActual, obtenerIdsFavoritos()));
  } else {
    mostrarTienda(tiendaActual);
  }
}

async function cargarTienda(forzar = false) {
  // Los dos botones comparten esta función para evitar peticiones simultáneas.
  if (cargando) {
    return;
  }

  cargando = true;
  tiendaActual = null;
  mostrarCarga();

  try {
    const respuesta = await obtenerTienda({ forzar });
    tiendaActual = prepararTienda(respuesta.datos);
    sincronizarFavoritos(tiendaActual.fecha, tiendaActual.secciones.flatMap((seccion) => seccion.ofertas));
    pintarVistaActual();
    mostrarEstadoCache(respuesta);
  } catch (error) {
    if (error.name !== "EsperaActualizacion") {
      console.error("Error al cargar la tienda:", error);
    }
    mostrarError(error.name === "EsperaActualizacion" ? error.message : undefined);
  } finally {
    cargando = false;
    habilitarActualizacion();
  }
}

document.querySelector("#actualizar").addEventListener("click", () => cargarTienda(true));
document.querySelector("#reintentar").addEventListener("click", () => cargarTienda(true));

// Un solo listener atiende las estrellas creadas en cualquiera de las dos vistas.
document.querySelector("main").addEventListener("click", (evento) => {
  const boton = evento.target.closest(".boton-favorito");
  if (!boton || boton.disabled || cargando || !tiendaActual) {
    return;
  }

  alternarFavorito(boton.dataset.idOferta);
  actualizarFavoritos(obtenerIdsFavoritos(), permitirFavoritos(), obtenerAvisoFavoritos());

  if (viendoFavoritos) {
    mostrarFavoritos(seleccionarFavoritos(tiendaActual, obtenerIdsFavoritos()));
  }
});

window.addEventListener("hashchange", () => {
  const nuevaVista = window.location.hash === "#favoritos";
  if (nuevaVista === viendoFavoritos) {
    return;
  }

  viendoFavoritos = nuevaVista;
  marcarVistaActiva(viendoFavoritos);

  if (tiendaActual && !cargando) {
    pintarVistaActual();
    document.querySelector(viendoFavoritos ? "#titulo-favoritos" : "#contenido").focus();
  }
});

marcarVistaActiva(viendoFavoritos);
cargarTienda();
