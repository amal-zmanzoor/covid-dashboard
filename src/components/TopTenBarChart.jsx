import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopCountriesBarChart = () => {
  // Data with countries and cases
  const chartData = {
    labels: ["India", "France", "Germany", "Brazil", "Japan", "South Korea", "Italy", "UK", "Pakistan", "Saudi Arabia"],
    datasets: [{
      label: 'COVID-19 Cases',
      data: [44690738, 39866718, 38249060, 37085675, 33329551, 30615522, 25603510, 24658705, 1577411, 830127],
      backgroundColor: [
        // 'rgba(99, 110, 114, 0.5)', // A shade of gray for other countries
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgba(99, 110, 114, 0.5)',
        'rgb(75, 192, 192)', // Turquoise for Pakistan
        'rgb(182,95,207)'  // Pink for Saudi Arabia
      ],
      borderColor: [
        // 'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgba(99, 110, 114, 1)',
        'rgb(75, 192, 192)',
        'rgb(182,95,207)'
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                // Setting the step size to a value that allows smaller bars to be visible
                stepSize: 5000000, // For example, steps of 5,000,000
                callback: function(value, index, values) {
                    return value / 1000000 + 'M';
                }
            },
            // Adjust the max value so smaller bars are still visible
            suggestedMax: 40000000 
        }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };
  
  
  return (

    <div style={{ height: '500px', width: '100%' }}>
        <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopCountriesBarChart;
