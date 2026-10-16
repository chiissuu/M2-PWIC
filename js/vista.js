const aviso = document.querySelector("#aviso");
const estado = document.querySelector("#estado");
const resultados = document.querySelector("#resultados");
const contenedorTienda = document.querySelector("#tienda");
const enlacesSecciones = document.querySelector("#enlaces-secciones");
const botonActualizar = document.querySelector("#actualizar");
const botonReintentar = document.querySelector("#reintentar");
const resumen = document.querySelector("#resumen");
const fecha = document.querySelector("#fecha");
const vistaFavoritos = document.querySelector("#favoritos");
const listaFavoritos = document.querySelector("#lista-favoritos");
const totalFavoritos = document.querySelector("#total-favoritos");
const avisoFavoritos = document.querySelector("#aviso-favoritos");
const formatoNumero = new Intl.NumberFormat("es-ES");
let seleccionFavoritos = new Set();
let estrellasHabilitadas = false;

function actualizarEstrella(boton) {
  const seleccionado = seleccionFavoritos.has(boton.dataset.idOferta);
  boton.textContent = seleccionado ? "★" : "☆";
  boton.setAttribute("aria-pressed", String(seleccionado));
  boton.setAttribute("aria-label", `${seleccionado ? "Quitar de" : "Añadir a"} favoritos: ${boton.dataset.nombreOferta}`);
  boton.title = boton.getAttribute("aria-label");
  boton.disabled = !estrellasHabilitadas;
}

export function actualizarFavoritos(identificadores, habilitados, mensaje) {
  seleccionFavoritos = new Set(identificadores);
  estrellasHabilitadas = habilitados;
  totalFavoritos.textContent = seleccionFavoritos.size;
  avisoFavoritos.textContent = mensaje;
  avisoFavoritos.hidden = mensaje === "";
  document.querySelectorAll(".boton-favorito").forEach(actualizarEstrella);
}

export function marcarVistaActiva(favoritosActivos) {
  const enlaceTienda = document.querySelector("#ver-tienda");
  const enlaceFavoritos = document.querySelector("#ver-favoritos");
  enlaceTienda.removeAttribute("aria-current");
  enlaceFavoritos.removeAttribute("aria-current");
  (favoritosActivos ? enlaceFavoritos : enlaceTienda).setAttribute("aria-current", "page");
}

export function mostrarCarga() {
  botonActualizar.disabled = true;
  botonReintentar.hidden = true;
  resultados.hidden = true;
  vistaFavoritos.hidden = true;
  avisoFavoritos.hidden = true;
  aviso.hidden = false;
  aviso.classList.remove("es-error");
  estado.setAttribute("role", "status");
  estado.textContent = "Cargando la tienda…";
  resumen.textContent = "Consultando la rotación actual.";
  fecha.textContent = "día";
  fecha.removeAttribute("datetime");
  contenedorTienda.replaceChildren();
  enlacesSecciones.replaceChildren();
  listaFavoritos.replaceChildren();
}

export function habilitarActualizacion() {
  botonActualizar.disabled = false;
}

export function mostrarError() {
  aviso.classList.add("es-error");
  estado.setAttribute("role", "alert");
  estado.textContent = "No se ha podido cargar la tienda. Comprueba tu conexión y vuelve a intentarlo.";
  resumen.textContent = "La tienda no está disponible en este momento.";
  botonReintentar.hidden = false;
}

function mostrarFecha(valor) {
  const fechaRotacion = typeof valor === "string" ? new Date(valor) : new Date(NaN);

  if (Number.isNaN(fechaRotacion.getTime())) {
    fecha.textContent = "día (fecha no disponible)";
    return;
  }

  // La API identifica cada rotación con una fecha UTC, independiente de la zona del visitante.
  fecha.textContent = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(fechaRotacion);
  fecha.dateTime = fechaRotacion.toISOString();
}

function mostrarImagenNoDisponible(contenedor) {
  const texto = document.createElement("span");
  texto.textContent = "Imagen no disponible";
  contenedor.replaceChildren(texto);
}

function crearImagen(oferta) {
  const contenedor = document.createElement("div");
  contenedor.className = "imagen-oferta";

  if (!oferta.imagen) {
    mostrarImagenNoDisponible(contenedor);
    return contenedor;
  }

  const imagen = document.createElement("img");
  imagen.alt = "";
  imagen.loading = "lazy";
  imagen.decoding = "async";
  imagen.width = 256;
  imagen.height = 256;
  imagen.addEventListener("error", () => mostrarImagenNoDisponible(contenedor), { once: true });
  imagen.src = oferta.imagen;
  contenedor.append(imagen);

  return contenedor;
}

function crearPrecio(oferta) {
  const precio = document.createElement("p");
  precio.className = "precio-oferta";

  if (oferta.precio === null) {
    precio.textContent = "Precio no disponible";
    return precio;
  }

  const actual = document.createElement("span");
  actual.textContent = oferta.precio === 0 ? "Gratis" : `${formatoNumero.format(oferta.precio)} pavos`;
  precio.append(actual);

  if (oferta.precioAnterior !== null && oferta.precioAnterior > oferta.precio) {
    const anterior = document.createElement("del");
    anterior.textContent = `${formatoNumero.format(oferta.precioAnterior)} pavos`;
    anterior.setAttribute("aria-label", `Antes: ${anterior.textContent}`);
    precio.append(anterior);
  }

  return precio;
}

function crearTarjeta(oferta) {
  const elemento = document.createElement("li");
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-oferta";

  const estrella = document.createElement("button");
  estrella.className = "boton-favorito";
  estrella.type = "button";
  estrella.dataset.idOferta = oferta.id;
  estrella.dataset.nombreOferta = oferta.nombre;
  actualizarEstrella(estrella);

  const contenido = document.createElement("div");
  contenido.className = "contenido-oferta";

  const tipo = document.createElement("p");
  tipo.className = "tipo-oferta";
  tipo.textContent = oferta.tipo;

  const nombre = document.createElement("h3");
  nombre.className = "nombre-oferta";
  nombre.textContent = oferta.nombre;

  contenido.append(tipo, nombre, crearPrecio(oferta));
  tarjeta.append(crearImagen(oferta), estrella, contenido);
  elemento.append(tarjeta);

  return elemento;
}

function crearSeccion(seccion, indice) {
  const elemento = document.createElement("section");
  elemento.className = "seccion-tienda";
  elemento.id = `seccion-${indice}`;
  elemento.setAttribute("aria-labelledby", `titulo-seccion-${indice}`);

  const cabecera = document.createElement("div");
  cabecera.className = "cabecera-seccion";

  const titulo = document.createElement("h2");
  titulo.id = `titulo-seccion-${indice}`;
  titulo.textContent = seccion.nombre;

  const cantidad = document.createElement("p");
  cantidad.className = "cantidad-ofertas";
  cantidad.textContent = `${seccion.ofertas.length} ${seccion.ofertas.length === 1 ? "oferta" : "ofertas"}`;

  const lista = document.createElement("ul");
  lista.className = "cuadricula-ofertas";
  lista.append(...seccion.ofertas.map(crearTarjeta));

  cabecera.append(titulo, cantidad);
  elemento.append(cabecera, lista);

  return elemento;
}

function crearEnlaceSeccion(seccion, indice) {
  const elemento = document.createElement("li");
  const enlace = document.createElement("a");
  enlace.href = `#seccion-${indice}`;
  enlace.textContent = seccion.nombre;
  elemento.append(enlace);

  return elemento;
}

export function mostrarTienda(tienda) {
  // Cada render reemplaza la vista anterior, también al volver desde favoritos.
  contenedorTienda.replaceChildren();
  enlacesSecciones.replaceChildren();
  listaFavoritos.replaceChildren();
  vistaFavoritos.hidden = true;
  resultados.hidden = true;
  aviso.hidden = false;
  mostrarFecha(tienda.fecha);
  resumen.textContent = `${tienda.total} ${tienda.total === 1 ? "oferta" : "ofertas"} en ${tienda.secciones.length} ${tienda.secciones.length === 1 ? "sección" : "secciones"}`;

  if (tienda.total === 0) {
    estado.textContent = "No hay ofertas disponibles en esta rotación. Puedes volver a actualizar la tienda más tarde.";
    return;
  }

  enlacesSecciones.append(...tienda.secciones.map(crearEnlaceSeccion));
  contenedorTienda.append(...tienda.secciones.map(crearSeccion));
  aviso.hidden = true;
  resultados.hidden = false;
}

export function mostrarFavoritos(tienda) {
  const botonesAnteriores = [...listaFavoritos.querySelectorAll(".boton-favorito")];
  const indiceFoco = botonesAnteriores.indexOf(document.activeElement);

  contenedorTienda.replaceChildren();
  enlacesSecciones.replaceChildren();
  listaFavoritos.replaceChildren();
  resultados.hidden = true;
  aviso.hidden = true;
  vistaFavoritos.hidden = false;
  mostrarFecha(tienda.fecha);
  resumen.textContent = `${tienda.total} ${tienda.total === 1 ? "favorito" : "favoritos"} en esta rotación`;
  document.querySelector("#sin-favoritos").hidden = tienda.total > 0;
  listaFavoritos.append(...tienda.secciones.map(crearSeccion));

  // Al quitar una tarjeta con el teclado, el foco pasa a la siguiente o al título si no quedan.
  if (indiceFoco >= 0) {
    const botones = listaFavoritos.querySelectorAll(".boton-favorito");
    const siguiente = botones[Math.min(indiceFoco, botones.length - 1)];
    (siguiente || document.querySelector("#titulo-favoritos")).focus({ preventScroll: true });
  }
}
