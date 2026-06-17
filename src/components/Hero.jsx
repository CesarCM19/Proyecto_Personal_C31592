import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setCargado(true);
    }, 150);
    return () => clearTimeout(temporizador);
  }, []);

  const deslizarAReserva = (e) => {
    e.preventDefault();
    const seccionReserva = document.getElementById('reserva');
    if (seccionReserva) {
      seccionReserva.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`hero ${cargado ? 'visible' : ''}`} id="inicio">
      {/* Video de fondo con temática de bodas elegante */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
        poster="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"
      >
        <source
          src="./video-boda.mp4"
          type="video/mp4"
        />
        Su navegador no soporta videos en formato HTML5.
      </video>

      {/* Capa de velo claro y romántico */}
      <div className="hero-overlay"></div>

      {/* Contenido principal */}
      <div className="hero-content">
        <span className="hero-tagline font-serif">JOSE SANTANA | FOTÓGRAFO DOCUMENTAL</span>
        <h1 className="hero-titulo">
          Historias de Amor Contadas en <span className="text-highlight">Imágenes</span>
        </h1>
        <p className="hero-descripcion">
          Fotografía de bodas artística, íntima y natural. Capturando emociones honestas, sonrisas cómplices y detalles eternos para crear un legado visual inolvidable.
        </p>
        <div className="hero-acciones">
          <a href="#reserva" onClick={deslizarAReserva} className="btn btn-primary">
            Reserva tu Fecha
          </a>
          <a href="#galeria" className="btn btn-secondary">
            Ver Portafolio
          </a>
        </div>
      </div>

      {/* Indicador visual de desplazamiento hacia abajo */}
      <div className="hero-scroll-indicator">
        <span className="scroll-arrow">↓</span>
      </div>
    </section>
  );
}
