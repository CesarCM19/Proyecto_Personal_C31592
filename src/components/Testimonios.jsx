import React, { useState, useEffect, useRef } from 'react';

// Sub-componente para la tarjeta de opinión de recién casados
function TarjetaTestimonio({ testimonio, estaActivo, alActivar, alDesactivar }) {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);

  // Sincronización del estado de reproducción activa global
  useEffect(() => {
    if (!estaActivo && reproduciendo) {
      audioRef.current?.pause();
      setReproduciendo(false);
    }
  }, [estaActivo, reproduciendo]);

  const alternarReproduccion = () => {
    if (!audioRef.current) return;

    if (reproduciendo) {
      audioRef.current.pause();
      setReproduciendo(false);
      alDesactivar();
    } else {
      alActivar(testimonio.id);
      audioRef.current.play()
        .then(() => {
          setReproduciendo(true);
        })
        .catch((err) => {
          console.log('Error al reproducir audio del testimonio:', err);
        });
    }
  };

  const manejarActualizacionTiempo = () => {
    if (!audioRef.current) return;
    const actual = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    setTiempoActual(actual);
    if (total > 0) {
      setProgreso((actual / total) * 100);
    }
  };

  const alCargarMetadata = () => {
    if (audioRef.current) {
      setDuracion(audioRef.current.duration || 0);
    }
  };

  const alTerminarAudio = () => {
    setReproduciendo(false);
    setProgreso(0);
    setTiempoActual(0);
    alDesactivar();
  };

  const cambiarProgresoManual = (e) => {
    if (!audioRef.current || duracion === 0) return;
    const nuevoProgreso = parseFloat(e.target.value);
    const nuevoTiempo = (nuevoProgreso / 100) * duracion;
    audioRef.current.currentTime = nuevoTiempo;
    setProgreso(nuevoProgreso);
    setTiempoActual(nuevoTiempo);
  };

  const formatearTiempo = (segundos) => {
    if (isNaN(segundos)) return '0:00';
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`testimonio-card ${reproduciendo ? 'sonando' : ''}`}>
      <div className="testimonio-perfil">
        <img src={testimonio.avatar} alt={testimonio.nombre} className="testimonio-avatar" />
        <div className="testimonio-meta">
          <h4 className="testimonio-nombre">{testimonio.nombre}</h4>
          <span className="testimonio-rol">{testimonio.rol}</span>
        </div>
      </div>
      <blockquote className="testimonio-comentario">
        “{testimonio.comentario}”
      </blockquote>

      {/* Reproductor de Nota de Voz */}
      <div className="audio-player">
        <audio
          ref={audioRef}
          src={testimonio.audioUrl}
          onTimeUpdate={manejarActualizacionTiempo}
          onLoadedMetadata={alCargarMetadata}
          onEnded={alTerminarAudio}
          preload="metadata"
        />

        <div className="audio-controles">
          <button
            onClick={alternarReproduccion}
            className={`audio-btn ${reproduciendo ? 'reproduciendo' : ''}`}
            aria-label={reproduciendo ? 'Pausar testimonio' : 'Escuchar testimonio'}
          >
            {reproduciendo ? (
              <span className="icono-pausa">⏸</span>
            ) : (
              <span className="icono-play">▶</span>
            )}
          </button>
          
          <div className="audio-deslizador-contenedor">
            <input
              type="range"
              min="0"
              max="100"
              value={progreso}
              onChange={cambiarProgresoManual}
              className="audio-barra-progreso"
              aria-label="Progreso del audio"
            />
            <div className="audio-tiempos">
              <span>{formatearTiempo(tiempoActual)}</span>
              <span>{formatearTiempo(duracion || 60)}</span>
            </div>
          </div>
        </div>
        <div className="audio-etiqueta">Escuchar Nota de Voz de la Pareja</div>
      </div>
    </div>
  );
}

export default function Testimonios({ testimonios = [] }) {
  const [idAudioActivo, setIdAudioActivo] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    if (testimonios.length > 0) {
      setCargado(true);
    }
  }, [testimonios]);

  if (testimonios.length === 0) {
    return (
      <section className="testimonios-cargando" id="testimonios">
        <p>Cargando testimonios de novios...</p>
      </section>
    );
  }

  return (
    <section className={`testimonios-section ${cargado ? 'visible' : ''}`} id="testimonios">
      <div className="container">
        <div className="section-header">
          <span className="section-tagline">VOCES DE NUESTROS NOVIOS</span>
          <h2 className="section-title">Palabras del Corazón</h2>
          <div className="accent-bar"></div>
          <p className="section-subtitle">
            Conoce la experiencia de las parejas que confiaron en la mirada de Jose Santana para inmortalizar el día más importante de sus vidas.
          </p>
        </div>

        <div className="testimonios-grid">
          {testimonios.map((testimonio) => (
            <TarjetaTestimonio
              key={testimonio.id}
              testimonio={testimonio}
              estaActivo={idAudioActivo === testimonio.id}
              alActivar={(id) => setIdAudioActivo(id)}
              alDesactivar={() => setIdAudioActivo(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
