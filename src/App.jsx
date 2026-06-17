import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Galeria from './components/Galeria';
import Testimonios from './components/Testimonios';
import Formulario from './components/Formulario';

export default function App() {
  const [datos, setDatos] = useState({ galeria: [], testimonios: [] });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para cargar los datos dinámicos al montar el componente
  useEffect(() => {
    fetch('./datos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los datos del portafolio.');
        }
        return respuesta.json();
      })
      .then((data) => {
        setDatos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error fetching datos.json:', err);
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // Efecto para añadir una clase al header cuando se hace scroll hacia abajo
  useEffect(() => {
    const manejarScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  if (cargando) {
    return (
      <div className="pantalla-carga">
        <div className="cargador"></div>
        <p>Preparando carretes y cámaras...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pantalla-error">
        <div className="error-icono">⚠️</div>
        <h3>Falla de Conexión</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reintentar Carga
        </button>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Navegación / Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <a href="#inicio" className="logo" onClick={cerrarMenu}>
            Jose Santana
          </a>

          {/* Botón de Menú Móvil (Hamburguesa) */}
          <button
            className={`menu-movil-toggle ${menuAbierto ? 'abierto' : ''}`}
            onClick={alternarMenu}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuAbierto}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Enlaces de Navegación */}
          <nav className={`nav-menu ${menuAbierto ? 'menu-activo' : ''}`}>
            <a href="#inicio" className="nav-enlace" onClick={cerrarMenu}>
              Inicio
            </a>
            <a href="#galeria" className="nav-enlace" onClick={cerrarMenu}>
              Portafolio
            </a>
            <a href="#testimonios" className="nav-enlace" onClick={cerrarMenu}>
              Testimonios
            </a>
            <a href="#reserva" className="nav-enlace nav-btn" onClick={cerrarMenu}>
              Reserva tu Fecha
            </a>
          </nav>
        </div>
      </header>

      {/* Secciones de la Aplicación */}
      <main>
        {/* Sección Hero */}
        <Hero />

        {/* Sección Galería con Lightbox */}
        <Galeria imagenes={datos.galeria} />

        {/* Sección Testimonios con Notas de Voz */}
        <Testimonios testimonios={datos.testimonios} />

        {/* Sección Formulario de Reserva */}
        <Formulario />
      </main>

      {/* Pie de Página / Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-info">
            <h3 className="footer-logo">Jose Santana</h3>
            <p className="footer-tagline font-serif">
              Fotografía documental y artística de bodas. Documentando recuerdos invaluables para toda la vida.
            </p>
          </div>
          <div className="footer-enlaces">
            <h4>Secciones</h4>
            <a href="#inicio">Inicio</a>
            <a href="#galeria">Portafolio</a>
            <a href="#testimonios">Testimonios</a>
            <a href="#reserva">Reservas</a>
          </div>
          <div className="footer-legal">
            <p>
              &copy; {new Date().getFullYear()} Jose Santana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
