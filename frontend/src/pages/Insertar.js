import React, { useState, useEffect } from "react";
import './Insertar.css';

const Insertar = () => {
    const [cb_baseDatos, cb_setBaseDatos] = useState("");
    const [baseDatos, setBaseDatos] = useState("");
    const [tipoRegistro, setTipoRegistro] = useState("");
    const [habitacion, setHabitacion] = useState("");
    const [paciente, setPaciente] = useState("");
    const [descripcion, setDescripcion] = useState("");

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

    const Insertar_dato = async () => {
        alert("insertar")
        try {
            const datos = {
                baseDatos,
                tipoRegistro,
                habitacion,
                paciente,
                descripcion
            };
            const response = await fetch("https://localhost:8080/insertar", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });
            if (!response.ok) {
                throw new Error("Error al obtener el reporte");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <div className="insertar-container">
            <h1>Ingreso de Datos</h1>
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

            <button onClick={Insertar_dato}>Insertar</button>
        </div>
    );
};

export default Insertar;