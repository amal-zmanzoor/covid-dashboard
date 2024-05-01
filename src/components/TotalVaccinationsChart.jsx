import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { parseTotalVaccinations } from '../utils/parseData'; 
import jsonData from '../data/file.json'; 

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TotalVaccinationsChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanVaccinationData, saudiVaccinationData } = parseTotalVaccinations(jsonData);

    const labels = pakistanVaccinationData.map(d => d.date.toLocaleDateString());
    const pakistanVaccinations = pakistanVaccinationData.map(d => d.totalVaccinations);
    const saudiVaccinations = saudiVaccinationData.map(d => d.totalVaccinations);

    setData({
      labels,
      datasets: [
        {
          label: 'Pakistan Total Vaccinations',
          data: pakistanVaccinations,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Saudi Arabia Total Vaccinations',
          data: saudiVaccinations,
          borderColor: 'rgb(182,95,207)',
          backgroundColor: 'rgba(182,95,207,0.5)',
        },
      ],
    });
  }, []);

  const options = {
    // Options to configure chart appearance and functionality
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TotalVaccinationsChart;
