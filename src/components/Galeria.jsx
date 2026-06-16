import React, { useState, useEffect } from 'react';

export default function Galeria({ imagenes = [] }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [cargado, setCargado] = useState(false);
  
  // Estado para el Lightbox nativo
  const [imagenLightbox, setImagenLightbox] = useState(null);
  const [indiceLightbox, setIndiceLightbox] = useState(-1);

  useEffect(() => {
    if (imagenes.length > 0) {
      setCargado(true);
    }
  }, [imagenes]);

  // Filtrado de fotos por categoría activa
  const imagenesFiltradas = categoriaActiva === 'todas'
    ? imagenes
    : imagenes.filter(img => img.categoria === categoriaActiva);

  const abrirLightbox = (img, indiceFiltrado) => {
    setImagenLightbox(img);
    setIndiceLightbox(indiceFiltrado);
  };

  const cerrarLightbox = () => {
    setImagenLightbox(null);
    setIndiceLightbox(-1);
  };

  const navegarLightbox = (direccion) => {
    if (indiceLightbox === -1 || imagenesFiltradas.length === 0) return;
    
    let nuevoIndice = indiceLightbox + direccion;
    if (nuevoIndice < 0) {
      nuevoIndice = imagenesFiltradas.length - 1;
    } else if (nuevoIndice >= imagenesFiltradas.length) {
      nuevoIndice = 0;
    }
    
    setIndiceLightbox(nuevoIndice);
    setImagenLightbox(imagenesFiltradas[nuevoIndice]);
  };

  // Teclas de dirección y cierre en Lightbox
  useEffect(() => {
    if (imagenLightbox === null) return;

    const manejarTeclado = (e) => {
      if (e.key === 'Escape') {
        cerrarLightbox();
      } else if (e.key === 'ArrowRight') {
        navegarLightbox(1);
      } else if (e.key === 'ArrowLeft') {
        navegarLightbox(-1);
      }
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => {
      window.removeEventListener('keydown', manejarTeclado);
    };
  }, [imagenLightbox, indiceLightbox, imagenesFiltradas]);

  if (imagenes.length === 0) {
    return (
      <section className="galeria-cargando" id="galeria">
        <p>Cargando portafolio de bodas...</p>
      </section>
    );
  }

  const categorias = [
    { clave: 'todas', etiqueta: 'Todo el Portafolio' },
    { clave: 'ceremonias', etiqueta: 'Ceremonias' },
    { clave: 'sesiones', etiqueta: 'Sesiones de Pareja' },
    { clave: 'detalles', etiqueta: 'Detalles y Momentos' }
  ];

  return (
    <section className={`galeria-section ${cargado ? 'visible' : ''}`} id="galeria">
      <div className="container">
        <div className="section-header">
          <span className="section-tagline">GALERÍA DE RECUERDOS</span>
          <h2 className="section-title">El Arte de Recordar</h2>
          <div className="accent-bar"></div>
          <p className="section-subtitle">
            Cada boda es una historia diferente. Explora momentos detenidos en el tiempo a través de nuestra clasificación. Clickea sobre las fotos para verlas en pantalla completa.
          </p>
        </div>

        {/* Filtros */}
        <div className="filtros-contenedor">
          {categorias.map((cat) => (
            <button
              key={cat.clave}
              className={`filtro-btn ${categoriaActiva === cat.clave ? 'activo' : ''}`}
              onClick={() => {
                setCategoriaActiva(cat.clave);
                cerrarLightbox();
              }}
            >
              {cat.etiqueta}
            </button>
          ))}
        </div>

        {/* Rejilla */}
        <div className="galeria-grid">
          {imagenesFiltradas.map((img, idx) => (
            <div
              key={img.id}
              className="galeria-tarjeta"
              onClick={() => abrirLightbox(img, idx)}
            >
              <div className="galeria-imagen-envoltura">
                <img
                  src={img.url}
                  alt={img.titulo}
                  loading="lazy"
                  className="galeria-miniatura"
                />
                <div className="galeria-superposicion">
                  <span className="icono-zoom">🔍</span>
                  <h4>{img.titulo}</h4>
                  <p>{img.categoria.toUpperCase()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {imagenLightbox && (
        <div className="lightbox-overlay" onClick={cerrarLightbox}>
          <div className="lightbox-contenedor" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-cerrar"
              onClick={cerrarLightbox}
              aria-label="Cerrar visor"
            >
              &times;
            </button>

            <button
              className="lightbox-navegacion prev"
              onClick={() => navegarLightbox(-1)}
              aria-label="Fotografía anterior"
            >
              &#10094;
            </button>

            <div className="lightbox-contenido">
              <img
                src={imagenLightbox.url}
                alt={imagenLightbox.titulo}
                className="lightbox-imagen"
              />
              <div className="lightbox-informacion">
                <h3>{imagenLightbox.titulo}</h3>
                <p>{imagenLightbox.descripcion}</p>
                <div className="lightbox-contador">
                  Fotografía {indiceLightbox + 1} de {imagenesFiltradas.length}
                </div>
              </div>
            </div>

            <button
              className="lightbox-navegacion next"
              onClick={() => navegarLightbox(1)}
              aria-label="Fotografía siguiente"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
