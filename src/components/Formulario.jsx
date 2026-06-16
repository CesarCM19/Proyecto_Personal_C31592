import React, { useState } from 'react';

export default function Formulario() {
  const hoy = new Date().toISOString().split('T')[0];

  // Estado para los valores del formulario de reserva de bodas
  const [valores, setValores] = useState({
    nombre: '',
    correo: '',
    tipoCobertura: '',
    locacion: '',
    fecha: '',
    detalles: '',
    acuerdo: false
  });

  // Estado para los mensajes de error
  const [errores, setErrores] = useState({});
  // Estado para rastrear campos interactuados
  const [tocados, setTocados] = useState({});
  // Estado de éxito
  const [enviado, setEnviado] = useState(false);

  // Validador manual de campos individuales
  const validarCampo = (nombre, valor) => {
    let error = '';

    switch (nombre) {
      case 'nombre':
        if (!valor.trim()) {
          error = 'El nombre completo es obligatorio.';
        } else if (valor.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
          error = 'El nombre solo puede contener letras y espacios.';
        }
        break;

      case 'correo':
        if (!valor) {
          error = 'El correo electrónico es obligatorio.';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)) {
          error = 'El formato de correo no es válido (ejemplo@dominio.com).';
        }
        break;

      case 'tipoCobertura':
        if (!valor) {
          error = 'Debe seleccionar un tipo de cobertura para su boda.';
        }
        break;

      case 'locacion':
        if (!valor.trim()) {
          error = 'Especifique la locación planeada para la boda o sesión.';
        }
        break;

      case 'fecha':
        if (!valor) {
          error = 'Debe seleccionar la fecha planeada del evento.';
        } else if (valor < hoy) {
          error = 'La fecha seleccionada no puede ser una fecha pasada.';
        }
        break;

      case 'acuerdo':
        if (!valor) {
          error = 'Debe aceptar los términos de la cobertura y políticas de privacidad.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    const valorFinal = type === 'checkbox' ? checked : value;

    setValores((prev) => ({
      ...prev,
      [name]: valorFinal
    }));

    if (tocados[name]) {
      const errorStr = validarCampo(name, valorFinal);
      setErrores((prev) => ({
        ...prev,
        [name]: errorStr
      }));
    }
  };

  const manejarBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const valorFinal = type === 'checkbox' ? checked : value;

    setTocados((prev) => ({
      ...prev,
      [name]: true
    }));

    const errorStr = validarCampo(name, valorFinal);
    setErrores((prev) => ({
      ...prev,
      [name]: errorStr
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de proceder
    const nuevosErrores = {};
    const nuevosTocados = {};

    Object.keys(valores).forEach((clave) => {
      nuevosTocados[clave] = true;
      const errorStr = validarCampo(clave, valores[clave]);
      if (errorStr) {
        nuevosErrores[clave] = errorStr;
      }
    });

    setTocados(nuevosTocados);
    setErrores(nuevosErrores);

    const tieneErrores = Object.values(nuevosErrores).some((err) => err !== '');
    if (!tieneErrores) {
      setEnviado(true);

      // Reiniciar formulario después de 5 segundos
      setTimeout(() => {
        setValores({
          nombre: '',
          correo: '',
          tipoCobertura: '',
          locacion: '',
          fecha: '',
          detalles: '',
          acuerdo: false
        });
        setErrores({});
        setTocados({});
        setEnviado(false);
      }, 5000);
    }
  };

  return (
    <section className="formulario-section" id="reserva">
      <div className="container form-container">
        <div className="form-info">
          <span className="section-tagline">CUENTANOS TU HISTORIA</span>
          <h2 className="section-title text-left">Reserva tu Fecha</h2>
          <div className="accent-bar text-left"></div>
          <p className="form-info-texto">
            Cada historia de amor merece ser documentada con el mayor cuidado y profesionalismo. Completa el formulario de reserva con la información de tu boda para verificar la disponibilidad de agenda de Jose Santana y enviarte una cotización personalizada.
          </p>

          <div className="informacion-contacto-lista">
            <div className="info-item">
              <span className="info-icono">📍</span>
              <div>
                <strong>Estudio Jose Santana</strong>
                <p>Alajuela, Costa Rica</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icono">✉️</span>
              <div>
                <strong>Correo Electrónico</strong>
                <p>correo@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icono">📞</span>
              <div>
                <strong>Contacto de Agenda</strong>
                <p>+506 0000 0000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-wrapper">
          {enviado ? (
            <div className="mensaje-exito">
              <div className="exito-icono">✓</div>
              <h3>¡Solicitud Recibida!</h3>
              <p>
                ¡Felicidades, <strong>{valores.nombre}</strong>! Hemos registrado la reserva para tu evento en <strong>{valores.locacion}</strong> para el día <strong>{valores.fecha}</strong>.
              </p>
              <p className="exito-espera">Jose Santana o su equipo te responderán con una propuesta personalizada de cobertura en las próximas 24 horas...</p>
            </div>
          ) : (
            <form onSubmit={manejarEnvio} noValidate className="formulario-registro">
              {/* Nombre */}
              <div className={`control-grupo ${errores.nombre ? 'tiene-error' : ''}`}>
                <label htmlFor="nombre">Nombre Completo de la Pareja *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={valores.nombre}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="Ej. Sofía & Alejandro"
                  className="input-control"
                  required
                />
                {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
              </div>

              {/* Correo */}
              <div className={`control-grupo ${errores.correo ? 'tiene-error' : ''}`}>
                <label htmlFor="correo">Correo de Contacto *</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={valores.correo}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="Ej. pareja@correo.com"
                  className="input-control"
                  required
                />
                {errores.correo && <span className="mensaje-error">{errores.correo}</span>}
              </div>

              {/* Tipo de Cobertura */}
              <div className={`control-grupo ${errores.tipoCobertura ? 'tiene-error' : ''}`}>
                <label htmlFor="tipoCobertura">Tipo de Cobertura Requerida *</label>
                <select
                  id="tipoCobertura"
                  name="tipoCobertura"
                  value={valores.tipoCobertura}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  className="input-control select-control"
                  required
                >
                  <option value="">-- Elige una cobertura --</option>
                  <option value="completa">Boda Completa (Preparativos + Ceremonia + Fiesta)</option>
                  <option value="preboda">Sesión de Compromiso (Pre-boda / Post-boda)</option>
                  <option value="elopement">Elopement / Boda Íntima (Menos de 30 invitados)</option>
                </select>
                {errores.tipoCobertura && <span className="mensaje-error">{errores.tipoCobertura}</span>}
              </div>

              {/* Locación */}
              <div className={`control-grupo ${errores.locacion ? 'tiene-error' : ''}`}>
                <label htmlFor="locacion">Locación Planeada (Ciudad / Recinto) *</label>
                <input
                  type="text"
                  id="locacion"
                  name="locacion"
                  value={valores.locacion}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="Ej. Hacienda Las Flores"
                  className="input-control"
                  required
                />
                {errores.locacion && <span className="mensaje-error">{errores.locacion}</span>}
              </div>

              {/* Fecha */}
              <div className={`control-grupo ${errores.fecha ? 'tiene-error' : ''}`}>
                <label htmlFor="fecha">Fecha del Enlace *</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  min={hoy}
                  value={valores.fecha}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  className="input-control"
                  required
                />
                {errores.fecha && <span className="mensaje-error">{errores.fecha}</span>}
              </div>

              {/* Detalles adicionales */}
              <div className="control-grupo">
                <label htmlFor="detalles">Detalles de su Historia o Ideas Especiales</label>
                <textarea
                  id="detalles"
                  name="detalles"
                  rows="3"
                  value={valores.detalles}
                  onChange={manejarCambio}
                  placeholder="Compártenos tu estilo de boda, cantidad aproximada de invitados o cualquier momento que desees capturar especialmente..."
                  className="input-control textarea-control"
                />
              </div>

              {/* Checkbox de acuerdo */}
              <div className={`control-grupo checkbox-grupo ${errores.acuerdo ? 'tiene-error' : ''}`}>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="acuerdo"
                    name="acuerdo"
                    checked={valores.acuerdo}
                    onChange={manejarCambio}
                    onBlur={manejarBlur}
                    className="checkbox-control"
                    required
                  />
                  <label htmlFor="acuerdo" className="checkbox-label">
                    Acepto la política de contacto
                  </label>
                </div>
                {errores.acuerdo && <span className="mensaje-error block-error">{errores.acuerdo}</span>}
              </div>

              {/* Botón */}
              <button type="submit" className="btn btn-primary btn-block">
                Reservar Fecha de Bodas
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
