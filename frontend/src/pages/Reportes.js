import React, { useState, useEffect } from "react";
import BarChart from './BarChart';
import "./Reportes.css"; 
import Modal from "react-modal"; 


const Reportes = () => {
    const [cb_baseDatos, cb_setBaseDatos] = useState("");
    const [cb_tipoReporte, cb_TipoReporte] = useState("");

    const [baseDatos, setBaseDatos] = useState("");
    const [tipoReporte, setTipoReporte] = useState("");
    const [tiempoDeEspera, setTiempoDeEspera] = useState("0");
    const [data, setData] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false); 

    const obtenerDatos = async () => {
        try {
            var datos = ["MongoDB", "Cassandra", "MySql"];
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
        setTiempoDeEspera(0)
        if (cb_baseDatos !== '' && cb_tipoReporte !== '') {
          try {
            const tiempoInicio = performance.now(); 
            const body = JSON.stringify({
                base: cb_baseDatos.toLowerCase(),
                reporte: parseInt(cb_tipoReporte.replace("Reporte ", ""))
            })
            const response = await fetch(process.env.REACT_APP_API_URL + '/reporte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            });
            console.log(body)
            
            const tiempoFinal = performance.now(); // Registrar el tiempo de finalización
            setTiempoDeEspera(tiempoFinal - tiempoInicio); // Calcular el tiempo de espera

            
            const data = await response.json();
            if (Array.isArray(data)){
                console.log(data)
                setData(data);
            } else {
                console.error(data)
                alert("Error inesperado en DB")
            }
          } catch (error) {
            setData([]);
            console.error(error);
          }
        } else {
          setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    }

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

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{content: {height: '200px'}}}>
                <h2>Error</h2>
                <p>Por favor seleccione una base de datos y un tipo de reporte.</p>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>

            <br></br>
            <br></br>
            <h3>Tiempo de consulta: {tiempoDeEspera} ms</h3>
            <br></br>
            <div className="chart-container">
                <BarChart data={data} />
            </div>
        </div>
    );
};

export default Reportes;
