import React, { useState, useEffect } from "react";
import BarChart from './BarChart';
import "./Reportes.css"; // Importa el archivo de estilos CSS

const Reportes = () => {
    const [cb_baseDatos, cb_setBaseDatos] = useState("");
    const [cb_tipoReporte, cb_TipoReporte] = useState("");

    const [baseDatos, setBaseDatos] = useState("");
    const [tipoReporte, setTipoReporte] = useState("");
    const [data, setData] = useState([]);

    const obtenerDatos = async () => {
        try {
            var datos = ["MongoDB", "Cassandra", "MySql", "Redis"];
            setBaseDatos(datos)
            datos = [];
            for (var i = 1; i <= 8; i++) {
                datos.push("Reporte " + i);
            }
            setTipoReporte(datos)
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
        cb_TipoReporte(e.target.value);
    };

    const generarGrafica = async () => {
        if (cb_baseDatos !== "" && cb_tipoReporte !== "") {
            const datosGrafica = [
                { dato: 'Dato 1', valor: 10 },
                { dato: 'Dato 2', valor: 20 },
                { dato: 'Dato 3', valor: 15 },
                { dato: 'Dato 4', valor: 25 },
            ];
            console.log(data)
            setData(datosGrafica);
            console.log(data)
        }
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

            <label htmlFor="cb_tipoReporte">Tipo de Reporte:</label>
            <select id="cb_tipoReporte" value={cb_tipoReporte} onChange={handleTipoReporteChange}>
                <option value="">Seleccione un reporte</option>
                {(() => {
                const options = [];
                for (let i = 0; i < tipoReporte.length; i++) {
                    options.push(
                    <option key={i} value={tipoReporte[i]}>
                        {tipoReporte[i]}
                    </option>
                    );
                }
                return options;
                })()}
            </select>

            <button onClick={generarGrafica}>Generar Gráfica</button>

            <div className="chart-container">
                <BarChart data={data} />
            </div>
        </div>
    );
};

export default Reportes;
