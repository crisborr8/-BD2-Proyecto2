import React, { useState } from "react";
import './Insertar.css';

const Insertar = () => {
  const [baseDatos, setBaseDatos] = useState("");
  const [tipoRegistro, setTipoRegistro] = useState("");
  const [habitacion, setHabitacion] = useState("");
  const [paciente, setPaciente] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleBaseDatosChange = (e) => {
    setBaseDatos(e.target.value);
  };

  const handleTipoRegistroChange = (e) => {
    setTipoRegistro(e.target.value);
  };

  const handleHabitacionChange = (e) => {
    setHabitacion(e.target.value);
  };

  const handlePacienteChange = (e) => {
    setPaciente(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  return (
    <div className="insertar-container">
      <h1>Ingreso de Datos</h1>
      <label htmlFor="baseDatos">Base de Datos:</label>
      <select id="baseDatos" value={baseDatos} onChange={handleBaseDatosChange}>
        <option value="">Seleccione una base de datos</option>
        {/* Opciones para la base de datos */}
      </select>

      <label htmlFor="tipoRegistro">Tipo de Registro:</label>
      <select id="tipoRegistro" value={tipoRegistro} onChange={handleTipoRegistroChange}>
        <option value="">Seleccione un tipo de registro</option>
        <option value="logactividad">Log de Actividad</option>
        <option value="loghabitacion">Log de Habitación</option>
      </select>

      {tipoRegistro === "logactividad" && (
        <div>
          <label htmlFor="habitacion">Habitación:</label>
          <select id="habitacion" value={habitacion} onChange={handleHabitacionChange}>
            <option value="">Seleccione una habitación</option>
            {/* Opciones para la habitación */}
          </select>

          <label htmlFor="paciente">Paciente:</label>
          <select id="paciente" value={paciente} onChange={handlePacienteChange}>
            <option value="">Seleccione un paciente</option>
            {/* Opciones para el paciente */}
          </select>

          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
          ></textarea>
        </div>
      )}

      {tipoRegistro === "loghabitacion" && (
        <div>
          <label htmlFor="habitacion">Habitación:</label>
          <select id="habitacion" value={habitacion} onChange={handleHabitacionChange}>
            <option value="">Seleccione una habitación</option>
            {/* Opciones para la habitación */}
          </select>

          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
          ></textarea>
        </div>
      )}

      {/* Resto del contenido del formulario de ingreso de datos */}
    </div>
  );
};

export default Insertar;