// src/components/CasesLineChart.js
import React from 'react';
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState, forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { parseDataCases } from '../utils/parseData';
import { Box } from '@mui/material';

// Registering the components needed for the chart
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

const CasesLineChart = forwardRef(({ selectedCountry2 }, ref) => {
  const theme = useTheme();
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pakistanCases, saudiCases } = parseDataCases();
  
    let datasets = [];
    if (selectedCountry2 === 'Pakistan' || selectedCountry2 === 'Both') {
      datasets.push({
        label: 'Pakistan',
        data: pakistanCases.map(item => item.value),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        pointRadius: 0.2,
        tension: 0.1
      });
    }
    if (selectedCountry2 === 'Saudi Arabia' || selectedCountry2 === 'Both') {
      datasets.push({
        label: 'Saudi Arabia',
        data: saudiCases.map(item => item.value),
        fill: true,
        // borderColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(182,95,207)',
        pointRadius: 0.2,
        tension: 0.1
      });
    }
  
    setData({
      labels: pakistanCases.map(item => item.date.toLocaleDateString()),
      datasets,
    });
  }, [selectedCountry2]); // Adding selectedCountry as a dependency
  
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
                maxRotation: 30,
                minRotation: 30,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                font: {
                    size: 11, // Font size for y-axis labels
                },
                stepSize: 3000,
                max: 16000,
            },
            title: {
                display: true,
                text: 'Cases Per Million', // Updated y-axis title
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

  // return <Line data={data} options={options} />;
  return (
    <Box sx={{ height: '100%', width: '100%' }}> {/* Adjust the height and width as needed */}
    <Line data={data} options={options} ref={ref} />
    </Box>
  );
});

export default CasesLineChart;
