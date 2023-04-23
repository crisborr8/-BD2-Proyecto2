import React, { useState } from "react";
import "./Reportes.css"; // Importa el archivo de estilos CSS

const Reportes = () => {
  const [baseDatos, setBaseDatos] = useState("");
  const [tipoReporte, setTipoReporte] = useState("");

  const handleBaseDatosChange = (e) => {
    setBaseDatos(e.target.value);
  };

  const handleTipoReporteChange = (e) => {
    setTipoReporte(e.target.value);
  };

  // Función para generar la gráfica de acuerdo a los valores seleccionados en los ComboBox
  const generarGrafica = () => {
    // Lógica para generar la gráfica con los datos de baseDatos y tipoReporte
    console.log("Generando gráfica con base de datos:", baseDatos, "y tipo de reporte:", tipoReporte);
  };
 
  return (
    <div className="report-container">
      <h1>Generación de Reportes</h1>
      <label htmlFor="baseDatos">Base de Datos:</label>
      <select id="baseDatos" value={baseDatos} onChange={handleBaseDatosChange}>
        <option value="">Seleccione una base de datos</option>
        {/* Opciones para la base de datos */}
      </select>

      <label htmlFor="tipoReporte">Tipo de Reporte:</label>
      <select id="tipoReporte" value={tipoReporte} onChange={handleTipoReporteChange}>
        <option value="">Seleccione un reporte</option>
        {/* Opciones para el tipo de reporte */}
      </select>

      <button onClick={generarGrafica}>Generar Gráfica</button>

      {/* Contenedor para la gráfica */}
      <div className="chart-container">
        {/* Aquí se mostraría la gráfica generada */}
      </div>
    </div>
  );
};

export default Reportes;