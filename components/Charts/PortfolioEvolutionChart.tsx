import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataPoint {
  date: string;
  value: number;
}

interface PortfolioEvolutionChartProps {
  saldo: DataPoint[];
  valorCarteira: DataPoint[];
  ganhos: DataPoint[];
  perdas: DataPoint[];
}

const PortfolioEvolutionChart: React.FC<PortfolioEvolutionChartProps> = ({ saldo, valorCarteira, ganhos, perdas }) => {
  const chartData = {
    labels: valorCarteira.map(entry => entry.date), // Usando as datas de 'valorCarteira' como labels
    datasets: [
      {
        label: 'Saldo',
        data: saldo.map(entry => entry.value),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Valor da Carteira',
        data: valorCarteira.map(entry => entry.value),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Ganhos',
        data: ganhos.map(entry => entry.value),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Perdas',
        data: perdas.map(entry => entry.value),
        borderColor: '#FFCE56',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução da Carteira de Ações',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PortfolioEvolutionChart;
