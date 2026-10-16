const CLAVE_FAVORITOS = "m2-pwic:favoritos-diarios";
let almacenamientoDisponible = true;

function obtenerDia(valor) {
  const fecha = typeof valor === "string" ? new Date(valor) : new Date(NaN);
  return Number.isNaN(fecha.getTime()) ? null : fecha.toISOString().slice(0, 10);
}

function leerFavoritos() {
  try {
    const contenido = localStorage.getItem(CLAVE_FAVORITOS);
    const datos = contenido ? JSON.parse(contenido) : null;

    if (datos?.version === 1 && typeof datos.rotacion === "string" && obtenerDia(datos.rotacion) === datos.rotacion
      && Array.isArray(datos.ids) && datos.ids.every((id) => typeof id === "string" && id.trim() !== "")) {
      return datos;
    }
  } catch {
    almacenamientoDisponible = false;
  }

  return { rotacion: null, ids: [] };
}

const guardados = leerFavoritos();
let rotacionGuardada = guardados.rotacion;
let rotacionActiva = null;
let identificadores = new Set(guardados.ids);
let ofertasDisponibles = new Set();

function guardarFavoritos() {
  try {
    // localStorage guarda texto: serializamos la fecha y los identificadores.
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify({
      version: 1,
      rotacion: rotacionGuardada,
      ids: [...identificadores],
    }));
    almacenamientoDisponible = true;
  } catch {
    almacenamientoDisponible = false;
  }
}

export function sincronizarFavoritos(fecha, ofertas) {
  rotacionActiva = obtenerDia(fecha);
  ofertasDisponibles = new Set(ofertas.map((oferta) => oferta.id));

  // Una fecha desconocida no debe borrar la selección guardada.
  if (!rotacionActiva) {
    return;
  }

  if (rotacionGuardada !== rotacionActiva) {
    identificadores.clear();
    rotacionGuardada = rotacionActiva;
  }

  identificadores = new Set([...identificadores].filter((id) => ofertasDisponibles.has(id)));
  guardarFavoritos();
}

export function alternarFavorito(id) {
  if (!rotacionActiva || !ofertasDisponibles.has(id)) {
    return;
  }

  if (identificadores.has(id)) {
    identificadores.delete(id);
  } else {
    identificadores.add(id);
  }

  guardarFavoritos();
}

export function obtenerIdsFavoritos() {
  return rotacionActiva ? [...identificadores] : [];
}

export function permitirFavoritos() {
  return rotacionActiva !== null;
}

export function obtenerAvisoFavoritos() {
  if (!rotacionActiva) {
    return "No se pueden marcar favoritos hasta confirmar una fecha de rotación válida.";
  }

  return almacenamientoDisponible ? ""
    : "No se han podido guardar los favoritos en este navegador. La selección se conservará solo mientras esta página siga abierta.";
}
