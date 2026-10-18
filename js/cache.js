const CLAVE_CACHE = "m2-pwic:cache-tienda";
const CLAVE_CONSULTA = "m2-pwic:ultima-consulta";
const DURACION_CACHE = 3 * 60 * 60 * 1000;
const INTERVALO_MANUAL = 60 * 1000;
let copiaEnMemoria = null;
let ultimaConsultaEnMemoria = 0;

function obtenerDiaUTC(valor) {
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha.toISOString().slice(0, 10);
}

function esCopiaValida(copia) {
  return copia?.version === 1
    && Number.isFinite(copia.guardadaEn)
    && copia.guardadaEn > 0
    && copia.guardadaEn <= Date.now()
    && Array.isArray(copia.datos?.entries)
    && typeof copia.datos.date === "string"
    && obtenerDiaUTC(copia.datos.date) !== null;
}

export function leerCacheTienda() {
  try {
    const copia = JSON.parse(localStorage.getItem(CLAVE_CACHE));
    if (esCopiaValida(copia) && (!copiaEnMemoria || copia.guardadaEn > copiaEnMemoria.guardadaEn)) {
      copiaEnMemoria = copia;
    }
  } catch {
    // Una copia corrupta o un navegador que bloquea el acceso no impiden consultar la API.
  }

  return esCopiaValida(copiaEnMemoria) ? copiaEnMemoria : null;
}

export function cacheVigente(copia) {
  const ahora = Date.now();
  const hoy = obtenerDiaUTC(ahora);
  return esCopiaValida(copia)
    && ahora - copia.guardadaEn < DURACION_CACHE
    && obtenerDiaUTC(copia.guardadaEn) === hoy
    && obtenerDiaUTC(copia.datos.date) === hoy;
}

export function guardarCacheTienda(datos) {
  const copia = { version: 1, guardadaEn: Date.now(), datos };
  if (!esCopiaValida(copia)) {
    return false;
  }

  copiaEnMemoria = copia;
  try {
    localStorage.setItem(CLAVE_CACHE, JSON.stringify(copia));
    return true;
  } catch {
    // Si se agota la cuota, reutilizamos los datos solo mientras siga abierta esta página.
    return false;
  }
}

export function segundosHastaActualizar() {
  let ultimaConsulta = ultimaConsultaEnMemoria;
  try {
    const guardada = Number(localStorage.getItem(CLAVE_CONSULTA));
    if (Number.isFinite(guardada) && guardada > 0 && guardada <= Date.now()) {
      ultimaConsulta = Math.max(ultimaConsulta, guardada);
    }
  } catch {
    // Conservamos el límite en memoria si no podemos leer el almacenamiento.
  }

  return Math.max(0, Math.ceil((INTERVALO_MANUAL - (Date.now() - ultimaConsulta)) / 1000));
}

export function registrarConsulta() {
  ultimaConsultaEnMemoria = Date.now();
  try {
    localStorage.setItem(CLAVE_CONSULTA, String(ultimaConsultaEnMemoria));
  } catch {
    // El fallo de almacenamiento no debe cancelar una consulta de red.
  }
}
