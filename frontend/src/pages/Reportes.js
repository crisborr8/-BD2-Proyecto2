import React, { useState, useEffect } from "react";
import BarChart from './BarChart';
import "./Reportes.css"; // Importa el archivo de estilos CSS

const Reportes = () => {
    const [cb_baseDatos, cb_setBaseDatos] = useState("");
    const [baseDatos, setBaseDatos] = useState("");
    const [tipoReporte, setTipoReporte] = useState("");
    const [datoReporte, setDatoReporte] = useState(null);

    const obtenerDatos = async () => {
        try {
            var datos = ["MongoDB", "Cassandra", "MySql", "Redis"];
            setBaseDatos(datos)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        obtenerDatos();
    }, []);

    const handleBaseDatosChange = (e) => {
        cb_setBaseDatos(e.target.value);
    };

    const handleTipoReporteChange = (e) => {
        setTipoReporte(e.target.value);
    };

    const generarGrafica = async () => {

    };

    return (
        <div className="report-container">
            <h1>Generación de Reportes</h1>
            <label htmlFor="cb_baseDatos">Base de Datos:</label>
            <select id="cb_baseDatos" value={cb_baseDatos} onChange={handleBaseDatosChange}>
                <option value="">Seleccione una base de datos</option>
                {(() => {
                const options = [];
                for (let i = 0; i < baseDatos.length; i++) {
                    options.push(
                    <option key={i} value={baseDatos[i]}>
                        {baseDatos[i]}
                    </option>
                    );
                }
                return options;
                })()}
            </select>

            <label htmlFor="tipoReporte">Tipo de Reporte:</label>
            <select id="tipoReporte" value={tipoReporte} onChange={handleTipoReporteChange}>
                <option value="">Seleccione un reporte</option>
                {/* Opciones para el tipo de reporte */}
            </select>

            <button onClick={generarGrafica}>Generar Gráfica</button>

            {/* Contenedor para la gráfica */}
            <div className="chart-container">
            <BarChart data={datoReporte} />
            </div>
        </div>
    );
};

export default Reportes;
