import React, { useEffect, useState, forwardRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material';
import { getTotalCases } from '../utils/parseData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalCasesBarChart = forwardRef((ref) => {

  const theme = useTheme();
  const [totalCases, setTotalCases] = useState({ saudiTotalCases: 0, pakistanTotalCases: 0 });

  useEffect(() => {
    const { pakistanTotalCases, saudiTotalCases } = getTotalCases();
    setTotalCases({ pakistanTotalCases, saudiTotalCases });
  }, []);

  const data = {
    labels: ['Saudi Arabia', 'Pakistan'],
    datasets: [
      {
        label: 'cases',
        data: [totalCases.saudiTotalCases, totalCases.pakistanTotalCases],
        backgroundColor: [
            'rgb(182,95,207)',
            'rgb(75, 192, 192)'
        ],
        borderColor: [
            'rgb(182,95,207)',
            'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cases', 
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
        legend: {
            display: false, 
          },
        title: {
            display: false,
            text: 'Total Covid Cases',
            font: {
              size: 12,
              weight: 'bold', // This can be 'normal', 'bold', 'bolder', 'lighter', or a number.
            },
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
            position: 'bottom', // You can set this to 'top', 'bottom', 'left', or 'right'
          },
    }
  };

  return <Bar data={data} options={options} />;
});

export default TotalCasesBarChart;
