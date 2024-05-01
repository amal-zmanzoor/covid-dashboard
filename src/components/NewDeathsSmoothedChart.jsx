import React, { forwardRef } from 'react';
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { ParseNewDeathsSmoothed } from '../utils/parseData';

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

const NewDeathsSmoothedChart = forwardRef(({ selectedCountry5 }, ref) => {
  const theme = useTheme();
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanCases, saudiCases } = ParseNewDeathsSmoothed();
  
    let datasets = [];
    if (selectedCountry5 === 'Pakistan' || selectedCountry5 === 'Both') {
      datasets.push({
        label: 'Pakistan',
        data: pakistanCases.map(item => item.value),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 0.2,
        tension: 0.1
      });
    }
    if (selectedCountry5 === 'Saudi Arabia' || selectedCountry5 === 'Both') {
      datasets.push({
        label: 'Saudi Arabia',
        data: saudiCases.map(item => item.value),
        fill: true,
        borderColor: 'rgb(182,95,207)',
        pointRadius: 0.2,
        tension: 0.1
      });
    }
  
    setData({
      labels: pakistanCases.map(item => item.date.toLocaleDateString()),
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
        ticks: {
          font: {
            size: 11, // Font size for x-axis labels
          },
          maxRotation: 35,
          minRotation: 35,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11, // Font size for y-axis labels
          },
        },
        title: {
            display: true,
            text: 'Deaths', // Updated y-axis title
        },
      },
    },
    plugins: {
        title: {
            display: false,
            text: 'Cumulative Case Count 2020-2021',
            font: {
              size: 12,
              weight: 'bold', // This can be 'normal', 'bold', 'bolder', 'lighter', or a number.
            },
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
            position: 'bottom', // Can set this to 'top', 'bottom', 'left', or 'right'
          },
        legend: {
          display: false,
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            padding: 10,
            // Dynamically set the color based on the theme mode
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
          }
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

  return <Line data={data} options={options} ref={ref} />;
});

export default NewDeathsSmoothedChart;
