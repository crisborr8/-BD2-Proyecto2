import React, { useState, useEffect } from "react";
import './Insertar.css';
import Modal from "react-modal"; 

const Insertar = () => {
    const [cb_baseDatos, cb_setBaseDatos] = useState("");
    const [cb_habitacion, cb_setHabitacion] = useState("");
    const [cb_paciente, cb_setPaciente] = useState("");
    const [cb_pagina, cb_setPagina] = useState("");

    const [baseDatos, setBaseDatos] = useState("");
    const [tipoRegistro, setTipoRegistro] = useState("");
    const [habitacion, setHabitacion] = useState("");
    const [paciente, setPaciente] = useState("");
    const [pagina, setPagina] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen_actividad, setModalIsOpen_actividad] = useState(false);
    const [modalIsOpen_descripcion, setModalIsOpen_descripcion] = useState(false);

    const obtenerDatos = async () => {
        try {
            var datos = ["MongoDB", "Cassandra", "MySql", "Redis"];
            setBaseDatos(datos)
            setPagina(["1", "2", "3", "4", "5"])
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        obtenerDatos();
    }, []);

    const handleBaseDatosChange = (e) => {
        cb_setBaseDatos(e.target.value);
        if (e.target.value !== "" && tipoRegistro !== ""){
            getHabitacionPaciente(tipoRegistro);
        }
    };

    const handleTipoRegistroChange = (e) => {
        setTipoRegistro(e.target.value);
        if (cb_baseDatos !== "" && e.target.value !== ""){
            getHabitacionPaciente(e.target.value);
        }
    };

    const handleHabitacionChange = (e) => {
        cb_setHabitacion(e.target.value);
    };

    const handlePacienteChange = (e) => {
        cb_setPaciente(e.target.value);
    };

    const handlePaginaChange = (e) => {
        cb_setPagina(e.target.value);
        setPacientePage(e)
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
    };

    const setPacientePage = async (e) => {
        try {
            const response = await fetch('http://35.208.12.68:8069/GetPacientes/'+e.target.value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (Array.isArray(data)){
                setPaciente(data)
            } else {
                console.error(data)
                return []
            }
        } catch (error) {
            console.error(error);
            return []
        }
    }

    const getHabitacionPaciente = async (e) => {
        try {
            const response = await fetch('http://35.208.12.68:8069/GetHabitaciones/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (Array.isArray(data)){
                if (e === "logactividad"){
                    setHabitacion(data)
                } else {
                    setHabitacion(data)
                }
            } else {
                console.error(data)
                return []
            }
        } catch (error) {
            console.error(error);
            return []
        }
    }

    const Insertar_dato = async () => {
        if (cb_baseDatos !== "" && tipoRegistro !== "") {
            if (tipoRegistro === "logactividad" && (cb_habitacion === "" || cb_paciente === "" || descripcion === "")){
                setModalIsOpen_actividad(true);
            } 
            else if (tipoRegistro === "loghabitacion" && (cb_habitacion === "" || descripcion === "")){
                setModalIsOpen_descripcion(true);
            } else {
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
            }
        } else {
            setModalIsOpen(true); 
        }
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    }
    
    const closeModal_actividad = () => {
        setModalIsOpen_actividad(false); 
    }
    
    const closeModal_descripcion = () => {
        setModalIsOpen_descripcion(false);
    }

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

            {(tipoRegistro === "logactividad" && cb_baseDatos !== "") && (
                <div>
                <label htmlFor="cb_habitacion">Habitación:</label>
                <select id="cb_habitacion" value={cb_habitacion} onChange={handleHabitacionChange}>
                    <option value="">Seleccione una habitación</option>
                    {(() => {
                    const options = [];
                    for (let i = 0; i < habitacion.length; i++) {
                        options.push(
                        <option key={i} value={habitacion[i].id_habitacion}>
                            {habitacion[i].habitacion}
                        </option>
                        );
                    }
                    return options;
                    })()}
                </select>

                <label htmlFor="cb_pagina">Pagina:</label>
                <select id="cb_pagina" value={cb_pagina} onChange={handlePaginaChange}>
                    <option value="">Seleccione una pagina para obtener de la DB</option>
                    {(() => {
                    const options = [];
                    for (let i = 0; i < pagina.length; i++) {
                        options.push(
                        <option key={i} value={pagina[i]}>
                            {pagina[i]}
                        </option>
                        );
                    }
                    return options;
                    })()}
                </select>
                
                <label htmlFor="cb_paciente">Paciente:</label>
                <select id="cb_paciente" value={cb_paciente} onChange={handlePacienteChange}>
                    <option value="">Seleccione un paciente</option>
                    {(() => {
                    const options = [];
                    for (let i = 0; i < paciente.length; i++) {
                        options.push(
                        <option key={i} value={paciente[i].id_paciente}>
                            {paciente[i].id_paciente} - {paciente[i].genero} - {paciente[i].edad}
                        </option>
                        );
                    }
                    return options;
                    })()}
                </select>

                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                ></textarea>
                </div>
            )}

            {(tipoRegistro === "loghabitacion" && cb_baseDatos !== "") && (
                <div>
                <label htmlFor="cb_habitacion">Habitación:</label>
                <select id="cb_habitacion" value={cb_habitacion} onChange={handleHabitacionChange}>
                    <option value="">Seleccione una habitación</option>
                    {(() => {
                    const options = [];
                    for (let i = 0; i < habitacion.length; i++) {
                        options.push(
                        <option key={i} value={habitacion[i]}>
                            {habitacion[i]}
                        </option>
                        );
                    }
                    return options;
                    })()}
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

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{content: {height: '200px'}}}>
                <h2>Error</h2>
                <p>Por favor seleccione una base de datos y un tipo de registro.</p>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>

            <Modal isOpen={modalIsOpen_actividad} onRequestClose={closeModal_actividad} style={{content: {height: '200px'}}}>
                <h2>Error</h2>
                <p>Por favor seleccione una habitacion, un paciente e ingrese una descripcion.</p>
                <button onClick={closeModal_actividad}>Cerrar</button>
            </Modal>

            <Modal isOpen={modalIsOpen_descripcion} onRequestClose={closeModal_descripcion} style={{content: {height: '200px'}}}>
                <h2>Error</h2>
                <p>Por favor seleccione una habitacion e ingrese una descripcion.</p>
                <button onClick={closeModal_descripcion}>Cerrar</button>
            </Modal>
        </div>
    );
};

export default Insertar;