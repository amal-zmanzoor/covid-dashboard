import React, { useState, useEffect, forwardRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { parseTestsPerThousand } from '../utils/parseData';
import jsonData from '../data/file.json'; 
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

const TotalTestsPerThousandChart = forwardRef(({ selectedCountry6 }, ref) => {
    const [chartData, setChartData] = useState({
        labels: [], 
        datasets: [] // Data for each country
    });

    useEffect(() => {
        const { pakistanData, saudiData } = parseTestsPerThousand(jsonData);
        const labels = pakistanData.map(data => data.date.toISOString().slice(0, 10)); // Formatting date as 'YYYY-MM-DD'
        let datasets = [];

        if (selectedCountry6 === 'Pakistan' || selectedCountry6 === 'Both') {
            datasets.push({
                label: 'Pakistan Tests per Thousand',
                data: pakistanData.map(data => data.totalTestsPerThousand),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.6, 
                pointRadius: 1,
                fill: false,
            });
        }

        if (selectedCountry6 === 'Saudi Arabia' || selectedCountry6 === 'Both') {
            datasets.push({
                label: 'Saudi Arabia Tests per Thousand',
                data: saudiData.map(data => data.totalTestsPerThousand),
                borderColor: 'rgb(182,95,207)',
                backgroundColor: 'rgba(182,95,207,0.5)',
                tension: 0.6, 
                pointRadius: 1,
                fill: false,
            });
        }

        setChartData({
            labels,
            datasets
        });
    }, [selectedCountry6]);

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    tooltipFormat: 'MMM yyyy',
                },
                title: {
                    display: false, // Hide the x-axis label
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tests per Thousand'
                },
                min: 0,
                max: 1000,
                ticks: {
                    stepSize: 100, // Sets the step size of the scale to 100
                }
            }
        },
        plugins: {
            legend: {
                display: false, // Hides the legend
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
                text: 'Covid-19 Tests per Thousand Over Time',
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
            <Line data={chartData} options={options} ref={ref} />
        </div>
    );
});

export default TotalTestsPerThousandChart;







