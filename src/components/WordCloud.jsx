import React from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';

const NewsWordCloud = ({ data }) => {
    const option = {
        tooltip: {},
        series: [
            {
                type: 'wordCloud',
                gridSize: 10,
                sizeRange: [12, 55], // Adjust size range for better visualization
                rotationRange: [-90, 90],
                rotationStep: 45,                
                shape: 'rectangle', // A simple rectangular shape for the cloud
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: function (value) {
                            // Bolder font for higher frequency words
                            return value > 50 ? 'bold' : 'normal';
                        },
                        color: function () {
                            return 'rgb(' + [
                              Math.round(Math.random() * 160),
                              Math.round(Math.random() * 160),
                              Math.round(Math.random() * 160)
                            ].join(',') + ')';
                          }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333',
                    },
                },
                data, // Using the `data` prop directly
            },
        ],
    };

    return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default NewsWordCloud;
