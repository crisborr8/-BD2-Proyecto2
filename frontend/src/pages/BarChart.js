import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  if (!data) {
    return <div>No hay datos disponibles</div>;
  }

  // Configuración de la gráfica
  const chartData = {
    labels: data.map(item => item.dato),
    datasets: [
      {
        label: 'Valores',
        data: data.map(item => item.valor),
        backgroundColor: 'rgba(75,192,192,0.2)', // Color de fondo de las barras
        borderColor: 'rgba(75,192,192,1)', // Color del borde de las barras
        borderWidth: 1, // Ancho del borde de las barras
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true, // Comenzar el eje Y desde 0
        max: Math.max(...data.map(item => item.valor)) + 10, // Establecer el valor máximo del eje Y
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;