import React from 'react';
import { Bubble } from 'react-chartjs-2';
import 'chart.js/auto';

const NewsBubbleChart = ({ data }) => {
    // Convert the word cloud data to a format suitable for the bubble chart
    const bubbleChartData = data.map(item => ({
        x: item.name,
        y: item.value,
        r: item.value * 5 // Multiply by a factor to make the bubble sizes more visible
    }));

    const chartData = {
        datasets: [
            {
                label: 'News Topics',
                data: bubbleChartData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: data.map(item => item.name), // Create x-axis labels from the 'name' property
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1 // Adjust step size as necessary
                }
            },
        },
        plugins: {
            legend: {
                display: false // Set to true to display the legend
            }
        }
    };

    return <Bubble data={chartData} options={options} />;
};

export default NewsBubbleChart;
