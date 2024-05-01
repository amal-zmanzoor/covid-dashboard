import React from 'react';
import { Box, Grid, Card, CardContent, Typography, FormControl, Select, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import CasesLineChart from '../../components/CasesLineChart';
import TotalCasesBarChart from '../../components/TotalCasesBarChart';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { getTotalCasesByCountryOnDate } from '../../utils/parseData';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import NewCasesSmoothedChart from '../../components/NewCasesSmoothedChart';
import NewCasesSmoothedPerMillionChart from '../../components/NewCasesSmoothedPerMillionChart';

// Custom styles for CardContent
const cardContentStyle = {
    paddingTop: '0px', 
    paddingBottom: '0px', 
    '&:last-child': {
      paddingBottom: '16px'
    }
  };

const cardContentStyleTopLeftChart = {
    paddingTop: '8px', 
    paddingBottom: '0px', 
    '&:last-child': {
      paddingBottom: '2px'
    }
  };

const Cases = () => {
    // These 3 will allow the user to control which country's data they want to display on their dashboard
    const [selectedCountry, setSelectedCountry] = useState('Both');
    const [selectedCountry2, setSelectedCountry2] = useState('Both');
    const [selectedCountry3, setSelectedCountry3] = useState('Both');

    const [totalCasesPakistan, setTotalCasesPakistan] = useState(null);
    const [totalCasesSaudiArabia, setTotalCasesSaudiArabia] = useState(null);

    useEffect(() => {
        // Assuming jsonData is available in this scope and contains the data
        const casesPakistan = getTotalCasesByCountryOnDate('PAK');
        const casesSaudiArabia = getTotalCasesByCountryOnDate('SAU');
    
        setTotalCasesPakistan(casesPakistan);
        setTotalCasesSaudiArabia(casesSaudiArabia);
      }, []);

    return (
        <Box m="20px">
          <Header title="Covid-19 Cases" subtitle="Explore detailed case statistics and trends" />
          <Grid container spacing={1.5}>
        {/* Grid item for Total Cases Per Million */}
            <Grid item xs={12} md={6}>
                {/* Card for New Cases Smoothed Over Time */}
                <Card>
                    <CardContent sx={cardContentStyleTopLeftChart}>
                    {/* <CardContent> */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                        New Cases Smoothed Over Time                   
                    </Typography>
                    <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    displayEmpty
                    // sx={{ m: 0, height: '30px', width: '70px' }} // Adjust height as needed
                    sx={{ 
                        m: 0, 
                        height: '30px', 
                        fontSize: '0.7rem', // Smaller font size
                        '& .MuiSelect-select': {
                          paddingRight: '0px 24px 0px 8px' // Decrease the padding to make the overall Select smaller - top, right, bottom, left
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Optional: remove border if you want
                        },
                      }}
                    >
                    <MenuItem value="Both">Both</MenuItem>
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                    <NewCasesSmoothedChart selectedCountry={selectedCountry} />
                    </CardContent>
                </Card>
                <Card style={{ height: '260px' }}> {/* Adjust the width as needed */}
              <CardContent sx={cardContentStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Total Cases Per Million Over Time
                </Typography>
                    <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry2}
                    onChange={(e) => setSelectedCountry2(e.target.value)}
                    displayEmpty
                    // sx={{ m: 0, height: '30px', width: '70px' }} // Adjust height as needed
                    sx={{ 
                        m: 0, 
                        height: '30px', 
                        fontSize: '0.7rem', // Smaller font size
                        '& .MuiSelect-select': {
                          paddingRight: '0px 24px 0px 8px' // Decrease the padding to make the overall Select smaller - top, right, bottom, left
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Optional: remove border if you want
                        },
                      }}
                    >
                    <MenuItem value="Both">Both</MenuItem>
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                  {/* Pass the selectedCountry state to the CasesLineChart component */}
                  <CasesLineChart selectedCountry2={selectedCountry2} />
                </CardContent>
              </Card>
            </Grid>

            {/* Other grid items... */}

        {/* Right column */}

        <Grid item xs={12} md={6} container spacing={1.5}>
          {/* Upper half for bar chart and total cases number */}
          <Grid item xs={8}>
            {/* Bar Chart */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Cases Recorded
                </Typography>
                <TotalCasesBarChart />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {/* Total Cases Number for Pakistan */}
            <Stack spacing={2} direction="column">
            <Card sx={{ 
                        minWidth: '30%',
                        height: 97,
                        bgcolor: 'rgb(75, 192, 192)',
                        '& .MuiCardContent-root': { padding: '8px' },
                        boxShadow: 5, // Adjust the elevation shadow 
                      }}>
              <CardContent>
                <div>
                    <CoronavirusOutlinedIcon fontSize='large'/>
                </div>
                <Typography variant="h3" sx={{ mt: '3px',  mb: '0px' }}>
                  {Number(totalCasesPakistan).toLocaleString()}
                </Typography>
                <Typography variant="body2" gutterBottom component={"div"} sx={{ color: "#222222", mt: '0px' }}>
                  Total Cases Pakistan
                </Typography>
              </CardContent>
            </Card>
            {/* Total Cases Number for Saudi Arabia */}
            <Card sx={{ 
                        minWidth: '30%',
                        height: 97,                
                        bgcolor: 'rgb(255, 99, 132)', 
                        '& .MuiCardContent-root': { padding: '8px' },
                        // border: '2px solid',
                        // borderColor: 'rgba(0, 0, 0, 0.12)', // You can use any color value
                        boxShadow: 5, // Adjust the elevation shadow
                      }}>
              <CardContent>
                <div>
                    <CoronavirusOutlinedIcon fontSize='large'/>
                </div>
                <Typography variant="h3" sx={{ mt: '3px',  mb: '0px' }}>                  
                    {Number(totalCasesSaudiArabia).toLocaleString()}
                </Typography>
                {/* <Typography variant="body2" gutterBottom component={"div"} sx={{ color: "#222222", mt: '0px' }}> */}
                <Typography
                    component={"div"}
                    sx={{ 
                        color: "#222222",
                        mt: '0px',
                        fontSize: '0.745rem', // This sets the font size smaller than body2's default
                    }}
                >
                  Total Cases Saudi Arabia
                </Typography>
              </CardContent>
            </Card>
            </Stack>
          </Grid>

          {/* Right Column, Lower half */}
          <Grid item xs={12}>
                {/* You can adjust the grid sizing as needed */}
                <Grid item xs={12}>
                <Card style={{ height: '300px' }}> {/* Adjust the width as needed */}
                    <CardContent sx={cardContentStyleTopLeftChart}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" gutterBottom>
                        New Cases Smoothed Over Million Over Time
                      </Typography>
                      {/* Include your new graph or informational content */}
                      <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry3}
                    onChange={(e) => setSelectedCountry3(e.target.value)}
                    displayEmpty
                    // sx={{ m: 0, height: '30px', width: '70px' }} // Adjust height as needed
                    sx={{ 
                        m: 0, 
                        height: '30px', 
                        fontSize: '0.7rem', // Smaller font size
                        '& .MuiSelect-select': {
                          paddingRight: '0px 24px 0px 8px' // Decrease the padding to make the overall Select smaller - top, right, bottom, left
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // Optional: remove border if you want
                        },
                      }}
                    >
                    <MenuItem value="Both">Both</MenuItem>
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <NewCasesSmoothedPerMillionChart selectedCountry3={selectedCountry3} />
                    </CardContent>
                  </Card>
                </Grid>
                {/* If you have more content to add, you can include more Grid items here */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      );
    };

export default Cases;
