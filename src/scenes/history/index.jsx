import React from 'react';
import Header from "../../components/Header";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import TopTenBarChart from '../../components/TopTenBarChart';

const History = () => {
  return (
    <Box m="20px">
      <Header title="Covid-19 Background" subtitle="Understanding the Origin and Spread" />
      <Grid container spacing={1.5}>
        {/* Left Side for Overview and Data Sources */}
        <Grid item xs={12} md={4}>
          {/* Overview Section */}
          <Card sx={{ mb: 1 }}>
            <CardContent>
              <Typography variant="h4" color="rgb(75, 192, 192)" sx={{ marginBottom: '5px' }}>Overview</Typography>
              <Typography sx={{ fontSize: '0.775rem' }}>
                The Covid-19 pandemic began on December 31, 2019, with WHO's notification of pneumonia cases in Wuhan, China, caused by the virus SARS-CoV-2.
                Mutations have led to varying illness severities and impacted vaccine efficacy, with WHO tracking its global spread.              
              </Typography>
            </CardContent>
          </Card>
          {/* Data Sources Section */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h4" color="rgb(75, 192, 192)" sx={{ marginBottom: '5px' }}>Data Sources</Typography>
              <Typography sx={{ fontSize: '0.775rem' }}>  
              This project utilizes the Covid-19 data repository managed by the Johns Hopkins University Center for Systems Science and Engineering (CSSE) 
              alongside data from Our World in Data to fuel its insights and visualizations All visualizations and data from Our World 
              in Data are Creative Commons BY licensed for open use and distribution, with proper attribution. Third-party data usage should adhere to the 
              original authors' licensing terms. This project's News page features a dataset of 27k headlines from Kaggle, generously provided by Zeeshan-Ul-Hassan 
              Usmani and Hussain Shahbaz Khawaja, available for open use.         
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side for the Graph and Aims */}
        <Grid item xs={12} md={8}>
          {/* Graph Section */}
          <Card sx={{ mb: 1, height: "370px" }}> {/* Can add marginBottom to create spacing between the cards */}
            <CardContent>
              <Typography variant="h4" color="rgb(75, 192, 192)" sx={{ marginBottom: '10px' }}>COVID-19 Cases: Major Countries vs Pakistan & Saudi Arabia</Typography>
              <TopTenBarChart />
            </CardContent>
          </Card>
          {/* Aims Section */}
          <Card>
            <CardContent>
              <Typography variant="h4" color="rgb(75, 192, 192)" sx={{ marginBottom: '5px' }}>Aims</Typography>
              <Typography sx={{ fontSize: '0.775rem' }}>
                This website aims to utilize the data provided by Our World in Data to produce meaningful visualizations. 
                These visualizations are designed to showcase the impact of Covid-19 on various aspects, including cases, testing, deaths, and vaccines, helping to 
                inform the public and professionals alike.              
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default History;
