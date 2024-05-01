import React, { useState, useEffect, forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { NewPeopleVaccinatedSmoothedPerHundred } from '../utils/parseData'; // Ensure this is the correct path
import jsonData from '../data/file.json'; // Adjust the path to your JSON data file
import zoomPlugin from 'chartjs-plugin-zoom';

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
  Legend,
  zoomPlugin
);

const NewPeopleVaccinatedChart = forwardRef(({ data_provided }, ref) => {
  
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanVaccinations, saudiVaccinations } = NewPeopleVaccinatedSmoothedPerHundred(jsonData);

    const labels = pakistanVaccinations.map(d => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    });

    const pakistanData = pakistanVaccinations.map(d => d.value);
    const saudiData = saudiVaccinations.map(d => d.value);

    setData({
      labels,
      datasets: [
        {
          label: 'Pakistan',
          data: pakistanData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.6, 
          pointRadius: 0.5,
        },
        {
          label: 'Saudi Arabia',
          data: saudiData,
          borderColor: 'rgb(182,95,207)',
          backgroundColor: 'rgba(182,95,207,0.5)',
          tension: 0.6, 
          pointRadius: 0.5,
        },
      ],
    });
  }, []);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'M/d/yyyy',
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
          tooltipFormat: 'MM/dd/yyyy',
        },
        min: '2020-01-01',
        max: '2021-12-31',
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  };
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={data} options={options} ref={ref}/>
    </div>
  );
});


export default NewPeopleVaccinatedChart;
