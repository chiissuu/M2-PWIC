function obtenerTexto(valor, alternativa) {
  if (typeof valor === "string" && valor.trim() !== "") {
    return valor.trim();
  }

  return alternativa;
}

function obtenerLista(valor) {
  if (Array.isArray(valor)) {
    return valor.filter((elemento) => elemento !== null && typeof elemento === "object");
  }

  return [];
}

function obtenerImagen(oferta, principal) {
  const imagenes = [
    oferta.bundle?.image,
    principal?.images?.featured,
    principal?.images?.icon,
    principal?.images?.large,
    principal?.images?.smallIcon,
    principal?.images?.small,
    principal?.albumArt,
  ];

  return imagenes.find((imagen) => typeof imagen === "string" && imagen.startsWith("https://")) || "";
}

function normalizarOferta(oferta) {
  if (!oferta || typeof oferta !== "object" || !obtenerTexto(oferta.offerId, "")) {
    return null;
  }

  const articulos = [
    ...obtenerLista(oferta.brItems),
    ...obtenerLista(oferta.tracks),
    ...obtenerLista(oferta.instruments),
    ...obtenerLista(oferta.cars),
    ...obtenerLista(oferta.legoKits),
  ];
  const principal = articulos[0];
  const esLote = Boolean(oferta.bundle) || articulos.length > 1;
  const nombrePrincipal = obtenerTexto(principal?.name, obtenerTexto(principal?.title, "Oferta sin nombre"));
  const nombre = obtenerTexto(oferta.bundle?.name, esLote ? `${nombrePrincipal} y más` : nombrePrincipal);
  let tipo = obtenerTexto(principal?.type?.displayValue, "Cosmético");

  if (esLote) {
    tipo = "Lote";
  } else if (obtenerLista(oferta.tracks).length > 0) {
    tipo = "Pista de improvisación";
  }

  return {
    id: oferta.offerId,
    nombre,
    tipo,
    imagen: obtenerImagen(oferta, principal),
    precio: Number.isFinite(oferta.finalPrice) && oferta.finalPrice >= 0 ? oferta.finalPrice : null,
    precioAnterior: Number.isFinite(oferta.regularPrice) && oferta.regularPrice >= 0 ? oferta.regularPrice : null,
    seccion: obtenerTexto(oferta.layout?.name, "Más ofertas"),
  };
}

export function prepararTienda(datos) {
  const ofertas = datos.entries
    .map(normalizarOferta)
    .filter((oferta) => oferta !== null);

  // Agrupamos ofertas completas para que un lote conserve un solo precio y una tarjeta.
  const secciones = ofertas.reduce((grupos, oferta) => {
    let grupo = grupos.find((seccion) => seccion.nombre === oferta.seccion);

    if (!grupo) {
      grupo = { nombre: oferta.seccion, ofertas: [] };
      grupos.push(grupo);
    }

    grupo.ofertas.push(oferta);
    return grupos;
  }, []);

  return { fecha: datos.date, total: ofertas.length, secciones };
}
