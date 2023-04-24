import React, { useState } from "react";
import Reportes from "./pages/Reportes";
import InsertarDatos from "./pages/Insertar";
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState("reportes");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul>
        <li
          onClick={() => handleTabChange("reportes")}
          className={activeTab === "reportes" ? "active" : ""}
        >
          Reportes
        </li>
        <li
          onClick={() => handleTabChange("insertarDatos")}
          className={activeTab === "insertarDatos" ? "active" : ""}
        >
          Insertar Datos
        </li>
      </ul>
      {activeTab === "reportes" ? <Reportes /> : <InsertarDatos />}
    </div>
  );
};

export default App;