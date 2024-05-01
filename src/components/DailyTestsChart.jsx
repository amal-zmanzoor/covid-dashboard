import React, { useState, useEffect, forwardRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { parseDataForTesting } from '../utils/parseData';
import { useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const DailyTestsChart = forwardRef(({ selectedCountry4 }, ref) => {
    const theme = useTheme();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const { pakistanTestingData, saudiTestingData } = parseDataForTesting();
        const labels = pakistanTestingData.map(data => data.date.toLocaleDateString());

        let datasets = [];
        if (selectedCountry4 === 'Pakistan' || selectedCountry4 === 'Both') {
            datasets.push({
                label: 'Pakistan New Tests',
                data: pakistanTestingData.map(data => data.newTests),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                yAxisID: 'y',
            },{
                label: 'Pakistan New Tests Smoothed',
                data: pakistanTestingData.map(data => data.newTestsSmoothed),
                borderColor: 'rgb(75, 192, 192)',
                type: 'line',
                tension: 0.6,
                yAxisID: 'y',
                pointRadius: 1,
            });
        }
        if (selectedCountry4 === 'Saudi Arabia' || selectedCountry4 === 'Both') {
            datasets.push({
                label: 'Saudi Arabia New Tests',
                data: saudiTestingData.map(data => data.newTests),
                backgroundColor: 'rgba(182, 95, 207, 0.5)',
                yAxisID: 'y',
            },{
                label: 'Saudi Arabia New Tests Smoothed',
                data: saudiTestingData.map(data => data.newTestsSmoothed),
                borderColor: 'rgba(182,95,207,1)',
                type: 'line',
                tension: 0.6,
                yAxisID: 'y',
                pointRadius: 1,
            });
        }

        setChartData({
            labels,
            datasets
        });
    }, [selectedCountry4]);

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
                text: 'New Smoothed Cases', // Updated y-axis title
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

    return (
        <Box sx={{ width: '100%', height: '100%'}}>
            <Bar data={chartData} options={options} ref={ref} />
        </Box>
    );
});

export default DailyTestsChart;
