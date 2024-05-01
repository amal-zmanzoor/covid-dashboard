import React, { useState, useEffect, forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { parseStringencyIndex } from '../utils/parseData'; 
import jsonData from '../data/file.json'; 
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

const StringencyIndexChart = forwardRef(({ selectedCountry14 }, ref) => {
  
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

   // Tooltip description to show on hover
   const hoverDescription = "The stringency index is a composite measure based on nine response indicators including school closures, workplace closures, and travel bans, rescaled to a value from 0 to 100 (100 = strictest). This index records the strictness of government policies and may have a direct impact on the number of people getting vaccinated";
  useEffect(() => {
    const { pakistanVaccinations, saudiVaccinations } = parseStringencyIndex(jsonData);

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
    maintainAspectRatio: false,
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
        ticks: {
          font: {
            size: 12, 
          },
          maxRotation: 35,
          minRotation: 35,
        },
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
  
  // Set specific pixel values for width and height here
  const chartContainerStyle = {
  width: '450px', 
  height: '230px', 
  };

  return (
    <div style={chartContainerStyle} title={hoverDescription}>
      <Line data={data} options={options} ref={ref}/>
    </div>
  );
});


export default StringencyIndexChart;
