import React, { useState, useEffect, forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import { parsePositiveRate } from '../utils/parseData'; 
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

const PositiveTestRateChart = forwardRef(({ selectedCountry5 }, ref) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanData, saudiData } = parsePositiveRate(jsonData);

    const labels = pakistanData.map(d => d.date.toLocaleDateString());
    let datasets = [];

    if (selectedCountry5 === 'Pakistan' || selectedCountry5 === 'Both') {
      datasets.push({
        label: 'Pakistan Positive Rate',
        data: pakistanData.map(d => d.positiveRate),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.6, 
        pointRadius: 0.5,
      });
    }
    
    if (selectedCountry5 === 'Saudi Arabia' || selectedCountry5 === 'Both') {
      datasets.push({
        label: 'Saudi Arabia Positive Rate',
        data: saudiData.map(d => d.positiveRate),
        borderColor: 'rgb(182,95,207)',
        backgroundColor: 'rgba(182,95,207,0.5)',
        tension: 0.6, 
        pointRadius: 0.5,
      });
    }

    setData({
      labels,
      datasets,
    });
  }, [selectedCountry5]);

  const options = {
    scales: {
        x: {
            type: 'time',
            time: {
                parser: 'M/d/yyyy',
                unit: 'month',
                displayFormats: {
                    month: 'MMM yyyy'
                },
                tooltipFormat: 'MM/dd/yyyy',
            },
            min: '2020-01-01',
            max: '2021-12-31',
        },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Positive Rate',
        },
      },
    },
    plugins: {
        legend: {
            display: false, // Hide legend
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
        title: {
            display: false,
            text: 'Variation in Positive Test Rates',
            font: {
                size: 16,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", 
            },
            padding: {
                top: 0, // Padding top
                bottom: 15 // Padding bottom
            },
            align:'start',
            position: 'top', // Position of the title
            color: '#FFFFFF', // Updated title color
        }
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
        <Line data={data} options={options} ref={ref} />
    </div>
  );
});

export default PositiveTestRateChart;
