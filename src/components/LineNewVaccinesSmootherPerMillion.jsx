import React, { useState, useEffect, forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { parseNewVaccinationsSmoothedPerMillion } from '../utils/parseData';
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

const LineNewVaccinesPerMillionChart = forwardRef(({ selectedCountry15 }, ref) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanVaccinations, saudiVaccinations } = parseNewVaccinationsSmoothedPerMillion(jsonData);

    let datasets = [];
    if (selectedCountry15 === 'Pakistan' || selectedCountry15 === 'Both') {
      datasets.push({
        label: 'Pakistan',
        data: pakistanVaccinations.map(d => d.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.6,
        pointRadius: 0.5,
      });
    }
    if (selectedCountry15 === 'Saudi Arabia' || selectedCountry15 === 'Both') {
      datasets.push({
        label: 'Saudi Arabia',
        data: saudiVaccinations.map(d => d.value),
        borderColor: 'rgb(182,95,207)',
        backgroundColor: 'rgba(182,95,207,0.5)',
        tension: 0.6,
        pointRadius: 0.5,
      });
    }

    setChartData({
      labels: pakistanVaccinations.map(d => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }),
      datasets,
    });
  }, [selectedCountry15]); // Now useEffect will re-run when selectedCountry15 changes.

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
    <div style={{ width: '100%', height: '70%' }}>
      <Line data={chartData} options={options} ref={ref} />
    </div>
  );
});

export default LineNewVaccinesPerMillionChart;
