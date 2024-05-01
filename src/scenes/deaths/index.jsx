import React from 'react';
import { Box, Grid, Card, CardContent, Typography, FormControl, Select, MenuItem, Button, Modal } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { getTotalCasesByCountryOnDate, getTotalDeathsByCountryOnDate } from '../../utils/parseData';
import TotalDeathsPerMillionChart from '../../components/TotalDeathsPerMillionChart';
import NewDeathsSmoothedChart from '../../components/NewDeathsSmoothedChart';
import NewDeathsSmoothedPerMillionChart from '../../components/NewDeathsSmoothedPerMillion';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/GetApp';
import { useTheme } from "@mui/material";

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw', // Smaller modal width
    height: '65vh', // Smaller modal height
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden',
  };

  const downloadChart7 = (event, chartReference) => {
    event.stopPropagation(); // This prevents the click from triggering parent onClick events
    const chart = chartReference.current; // Use the passed ref
    if (chart) {
      const imageUrl = chart.toBase64Image(); // Get image URL
      const link = document.createElement('a'); // Create a temporary link element
      link.href = imageUrl; // Set the href to the image URL
      link.download = 'total_deaths_per_million.png'; // Set the download attribute with a filename
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger click to download
      document.body.removeChild(link); // Remove link from the body
    }
  };

  const downloadChart8 = (event, chartReference) => {
    event.stopPropagation(); // This prevents the click from triggering parent onClick events
    const chart = chartReference.current; // Use the passed ref
    if (chart) {
      const imageUrl = chart.toBase64Image(); // Get image URL
      const link = document.createElement('a'); // Create a temporary link element
      link.href = imageUrl; // Set the href to the image URL
      link.download = 'new_deaths_smoothed.png'; // Set the download attribute with a filename
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger click to download
      document.body.removeChild(link); // Remove link from the body
    }
  };

  const downloadChart9 = (event, chartReference) => {
    event.stopPropagation(); // This prevents the click from triggering parent onClick events
    const chart = chartReference.current; // Use the passed ref
    if (chart) {
      const imageUrl = chart.toBase64Image(); // Get image URL
      const link = document.createElement('a'); // Create a temporary link element
      link.href = imageUrl; // Set the href to the image URL
      link.download = 'new_deaths_smoothed_per_million.png'; // Set the download attribute with a filename
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger click to download
      document.body.removeChild(link); // Remove link from the body
    }
  };

const Deaths = () => {
  const theme = useTheme();
    // These 3 will allow the user to control which country's data they want to display on their dashboard
    const [selectedCountry4, setSelectedCountry4] = useState('Both');
    const [selectedCountry5, setSelectedCountry5] = useState('Both');
    const [selectedCountry6, setSelectedCountry6] = useState('Both');

    const [isModalOpen7, setIsModalOpen7] = useState(false); // Modal visibility state
    const [isModalOpen8, setIsModalOpen8] = useState(false); // State to manage modal visibility
    const [isModalOpen9, setIsModalOpen9] = useState(false); // State to manage modal visibility
    const chartRef7 = useRef(null); // Reference for the chart you want to zoom into
    const chartRef8 = useRef(null); // Reference for the chart you want to zoom into
    const chartRef9 = useRef(null); // Reference for the chart you want to zoom into

    const [totalCasesPakistan, setTotalCasesPakistan] = useState(null);
    const [totalCasesSaudiArabia, setTotalCasesSaudiArabia] = useState(null);
    const [totalDeathsPakistan, setTotalDeathsPakistan] = useState(null);
    const [totalDeathsSaudiArabia, setTotalDeathsSaudiArabia] = useState(null);

    // Function to handle modal opening
const handleOpenModal7 = () => {
  setIsModalOpen7(true);
};

const handleOpenModal8 = () => {
  setIsModalOpen8(true);
};

const handleOpenModal9 = () => {
  setIsModalOpen9(true);
};

// Function to handle modal closing
const handleCloseModal7 = () => {
  setIsModalOpen7(false);
};

// Function to handle modal closing
const handleCloseModal8 = () => {
  setIsModalOpen8(false);
};

// Function to handle modal closing
const handleCloseModal9 = () => {
  setIsModalOpen9(false);
};

    useEffect(() => {
        // Assuming jsonData is available in this scope and contains the data
        const casesPakistan = getTotalCasesByCountryOnDate('PAK');
        const casesSaudiArabia = getTotalCasesByCountryOnDate('SAU');
        const deathsPakistan = getTotalDeathsByCountryOnDate('PAK');
        const deathsSaudiArabia = getTotalDeathsByCountryOnDate('SAU');
    
        setTotalCasesPakistan(casesPakistan);
        setTotalCasesSaudiArabia(casesSaudiArabia);
        setTotalDeathsPakistan(deathsPakistan);
        setTotalDeathsSaudiArabia(deathsSaudiArabia);
      }, []);

    return (
        <Box m="20px">
          <Header title="Covid-19 Deaths" subtitle="Analyzing Death Statistics and Trends" />
          <Grid container spacing={1.5}>
        {/* Grid item for Total Cases Per Million */}

            {/* Other grid items... */}

        {/* Right column */}

        <Grid item xs={12} md={6} container spacing={0}>
          {/* Upper half for bar chart and total cases number */}
          <Grid item xs={12}>
            {/* Total Cases Number for Pakistan */}
            <Stack spacing={2} direction="column">
            <Card sx={{ 
                minWidth: '30%',
                height: 97,
                bgcolor: 'rgb(75, 192, 192)',
                '& .MuiCardContent-root': { padding: '8px' },
                boxShadow: 5,
            }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <GroupRemoveIcon fontSize='large'/>
                <Typography variant="h1" sx={{ mb: '0px', mt: '15px', mr: '16px'}}>
                    {Number(totalDeathsPakistan).toLocaleString()}
                </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography 
                    component={"div"}
                    sx={{ 
                    color: "#222222",
                    mt: '-18px', // Move the text up by adjusting the top margin negatively
                    mb: '8px',  // Move the number down by adding bottom margin
                    fontSize: '1rem',
                    }}
                >
                    Total Deaths in Pakistan
                </Typography>
                </Box>
            </CardContent>
            </Card>


            {/* Total Cases Number for Saudi Arabia */}
            <Card sx={{ 
                minWidth: '30%',
                height: 97,
                bgcolor: 'rgb(182,95,207)', 
                '& .MuiCardContent-root': { padding: '8px' },
                boxShadow: 5,
            }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <GroupRemoveIcon fontSize='large'/>
                <Typography variant="h1" sx={{ mb: '0px', mt: '15px', mr: '16px'}}>
                    {Number(totalDeathsSaudiArabia).toLocaleString()}
                </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography 
                    component={"div"}
                    sx={{ 
                    color: "#222222",
                    mt: '-18px', // Move the text up by adjusting the top margin negatively
                    mb: '8px',  // Move the number down by adding bottom margin
                    fontSize: '1rem',
                    }}
                >
                    Total Deaths in Saudi Arabia
                </Typography>
                </Box>
            </CardContent>
            </Card>
            </Stack>
            
          </Grid>

          {/* Right Column, Lower half */}
          <Grid item xs={12}>
                {/* You can adjust the grid sizing as needed */}
                <Grid item xs={12}>
                <Card style={{ height: '330px' }}> {/* Adjust the width as needed */}
                    <CardContent sx={cardContentStyleTopLeftChart}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      {/* <Typography variant="h6" gutterBottom> */}
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Total Deaths Per Million Over Time
                      </Typography>
                      {/* Include your new graph or informational content */}
                      <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry4}
                    onChange={(e) => setSelectedCountry4(e.target.value)}
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
                <Button
                  onClick={handleOpenModal7}
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: '5px',
                    minWidth: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginLeft: 'auto',
                    backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#ffffff', // Corrected line
                    color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff', // Ensure text color is visible
                  }}>
                  <ZoomInIcon />
                </Button>
                </Box>
                <TotalDeathsPerMillionChart selectedCountry4={selectedCountry4} />
                    </CardContent>
                  </Card>
                  <Modal
                    open={isModalOpen7}
                    onClose={handleCloseModal7}
                    aria-labelledby="zoomed-chart-title"
                    aria-describedby="zoomed-chart-description"
                  >
                  <Box sx={modalStyle}>
                      <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                        Zoomed View: Total Deaths Per Million Over Time
                      </Typography>
                      <Button
                          // onClick={downloadChart3(chartRef2)}
                          onClick={(e) => downloadChart7(e, chartRef7)}
                          sx={{
                            position: 'absolute',
                            top: 25,
                            right: 55,
                            color: 'white', // Set the icon color to white for visibility
                            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Optional: add a slight background for better visibility
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                            },
                            padding: '4px'
                            // Adjust the size and padding if needed for better appearance
                          }}
                        >
                        <DownloadIcon />
                      </Button>
                      <TotalDeathsPerMillionChart selectedCountry4={selectedCountry4} ref={chartRef7}/>
                  </Box>
              </Modal>
                </Grid>
                {/* If you have more content to add, you can include more Grid items here */}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                {/* Card for New Cases Smoothed Over Time */}
                <Card>
                    <CardContent sx={cardContentStyleTopLeftChart}>
                    {/* <CardContent> */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    {/* <Typography variant="h6" gutterBottom> */}
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        New Deaths Smoothed Over Time                   
                    </Typography>
                    <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry5}
                    onChange={(e) => setSelectedCountry5(e.target.value)}
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
                <Button
                  onClick={handleOpenModal8}
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: '5px',
                    minWidth: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginLeft: 'auto',
                    backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#ffffff', // Corrected line
                    color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff', // Ensure text color is visible
                  }}>
                  <ZoomInIcon />
                </Button>
                </Box>
                    <NewDeathsSmoothedChart selectedCountry5={selectedCountry5} />
                    </CardContent>
                </Card>
                <Modal
                  open={isModalOpen8}
                  onClose={handleCloseModal8}
                  aria-labelledby="zoomed-chart-title"
                  aria-describedby="zoomed-chart-description"
                >
                <Box sx={modalStyle}>
                    <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                      Zoomed View: New Deaths Smoothed Over Time
                    </Typography>
                    <Button
                        // onClick={downloadChart2(chartRef)}
                        onClick={(e) => downloadChart8(e, chartRef8)}
                        sx={{
                          position: 'absolute',
                          top: 25,
                          right: 55,
                          color: 'white', // Set the icon color to white for visibility
                          backgroundColor: 'rgba(255, 255, 255, 0.3)', // Optional: add a slight background for better visibility
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                          },
                          padding: '4px'
                          // Adjust the size and padding if needed for better appearance
                        }}
                      >
                      <DownloadIcon />
                    </Button>
                    <NewDeathsSmoothedChart selectedCountry5={selectedCountry5} ref={chartRef8}/>
                </Box>
                </Modal>
                <Card style={{ height: '300px' }}> {/* Adjust the width as needed */}
              <CardContent sx={cardContentStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    New Deaths Smoothed Per Million Over Time
                </Typography>
                    <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry6}
                    onChange={(e) => setSelectedCountry6(e.target.value)}
                    displayEmpty
                    sx={{ 
                        m: 0, 
                        height: '30px', 
                        fontSize: '0.7rem', // Smaller font size
                        '& .MuiSelect-select': {
                          paddingRight: '0px 24px 0px 8px' // Decrease the padding to make the overall Select smaller - top, right, bottom, left
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none', 
                        },
                      }}
                    >
                    <MenuItem value="Both">Both</MenuItem>
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    </Select>
                </FormControl>
                  <Button
                    onClick={handleOpenModal9}
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: '5px',
                      minWidth: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginLeft: 'auto',
                      backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#ffffff', // Corrected line
                      color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff', // Ensure text color is visible
                    }}>
                    <ZoomInIcon />
                  </Button>
                </Box>
                  {/* Pass the selectedCountry state to the CasesLineChart component */}
                  <NewDeathsSmoothedPerMillionChart selectedCountry6={selectedCountry6} />
                </CardContent>
              </Card>
              <Modal
            open={isModalOpen9}
            onClose={handleCloseModal9}
            aria-labelledby="zoomed-chart-title"
            aria-describedby="zoomed-chart-description"
          >
          <Box sx={modalStyle}>
              <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                Zoomed View: New Deaths Smoothed Per Million Over Time
              </Typography>
              <Button
                  onClick={(e) => downloadChart9(e, chartRef9)}
                  sx={{
                    position: 'absolute',
                    top: 25,
                    right: 55,
                    color: 'white', // Set the icon color to white for visibility
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    },
                    padding: '4px'
                  }}
                >
                <DownloadIcon />
              </Button>
              <NewDeathsSmoothedPerMillionChart selectedCountry6={selectedCountry6} ref={chartRef9}/>
          </Box>
      </Modal>
            </Grid>

          </Grid>
        </Box>
      );
    };

export default Deaths;
