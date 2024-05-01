import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FrequencyBarChart = ({ data }) => {
    return (
        <BarChart 
            width={500} 
            height={570} 
            data={data} 
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip
                formatter={(value, name, props) => (
                    <span style={{ color: '#000000' }}>Frequency of "{props.payload.name}": {value}</span>
                  )}
                contentStyle={{ 
                    padding: '6px', 
                    fontSize: '12px',
                    backgroundColor: 'rgb(300, 300, 300)' 
                }}
            />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
};

export default FrequencyBarChart;
