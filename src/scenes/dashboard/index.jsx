import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Header from "../../components/Header";
import Covid19 from '../../components/Covid19';

const Dashboard = () => {

    return (
        <Box m="20px">
            <Header title="Covid-19 Dashboard" subtitle="Spread of Covid Cases Across the Globe"/>
            <Typography variant="body1" sx={{ mb: 1 }}>
                Explore Covid-19 cases around the world with this interactive map.
            </Typography>
            <Covid19 />
        </Box>
    );
};

export default Dashboard;
