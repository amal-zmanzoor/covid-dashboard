import React, { useState, useEffect, forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { parseData } from '../utils/parseData'; 
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

const TotalCasesPerMillionChart = forwardRef(({ data_provided }, ref) => {
  
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanCases, saudiCases } = parseData();

    const labels = pakistanCases.map(data => data.date.toLocaleDateString());

    const pakistanData = pakistanCases.map(d => d.value);
    const saudiData = saudiCases.map(d => d.value);

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
  }, [data]);

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

export default TotalCasesPerMillionChart;

