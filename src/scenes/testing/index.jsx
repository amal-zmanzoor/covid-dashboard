import React from 'react';
import { Box, Grid, FormControl, MenuItem, Button, Modal, Select } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DailyTestsChart from '../../components/DailyTestsChart';
import TotalTestsPerThousandGraph from '../../components/TotalTestsPerThousandGraph';
import Header from "../../components/Header";
import { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import BiotechIcon from '@mui/icons-material/Biotech';
import { getTotalTestsByCountryOnDate } from '../../utils/parseData';
import PositiveTestRateChart from '../../components/PositiveTestRateChart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/GetApp'; 
import { useTheme } from "@mui/material";


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
  const downloadChart4 = (event, chartReference) => {
    event.stopPropagation(); // This prevents the click from triggering parent onClick events
    const chart = chartReference.current; // Use the passed ref
    if (chart) {
      const imageUrl = chart.toBase64Image(); // Get image URL
      const link = document.createElement('a'); // Create a temporary link element
      link.href = imageUrl; // Set the href to the image URL
      link.download = 'daily_tests_undertaken.png'; // Set the download attribute with a filename
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger click to download
      document.body.removeChild(link); // Remove link from the body
    }
  };

  const downloadChart5 = (event, chartReference) => {
    event.stopPropagation(); 
    const chart = chartReference.current;
    if (chart) {
      const imageUrl = chart.toBase64Image(); 
      const link = document.createElement('a'); 
      link.href = imageUrl; 
      link.download = 'variation_in_positive_test_rates.png'; 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link);
    }
  };
  const downloadChart6 = (event, chartReference) => {
    event.stopPropagation(); 
    const chart = chartReference.current; 
    if (chart) {
      const imageUrl = chart.toBase64Image(); 
      const link = document.createElement('a'); 
      link.href = imageUrl;
      link.download = 'total_tests_per_thousand.png'; 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
    }
  };

const Testing = () => {
  const theme = useTheme();

    const [totalTestsPakistan, setTotalTestsPakistan] = useState(null);
    const [totalTestsSaudiArabia, setTotalTestsSaudiArabia] = useState(null);

    const [selectedCountry4, setSelectedCountry4] = useState('Both');
    const [selectedCountry5, setSelectedCountry5] = useState('Both');
    const [selectedCountry6, setSelectedCountry6] = useState('Both');

    const [isModalOpen4, setIsModalOpen4] = useState(false); 
    const [isModalOpen5, setIsModalOpen5] = useState(false); 
    const [isModalOpen6, setIsModalOpen6] = useState(false); 

    const chartRef4 = useRef(null); 
    const chartRef5 = useRef(null); 
    const chartRef6 = useRef(null);

    // Function to handle modal opening
    const handleOpenModal4 = () => {
      setIsModalOpen4(true);
    };

    const handleOpenModal5 = () => {
      setIsModalOpen5(true);
    };

    const handleOpenModal6 = () => {
      setIsModalOpen6(true);
    };

    // Function to handle modal closing
    const handleCloseModal4 = () => {
      setIsModalOpen4(false);
    };

    const handleCloseModal5 = () => {
      setIsModalOpen5(false);
    };

    const handleCloseModal6 = () => {
      setIsModalOpen6(false);
    };

    useEffect(() => {
        const testsPakistan = getTotalTestsByCountryOnDate('PAK');
        const testsSaudiArabia = getTotalTestsByCountryOnDate('SAU');
    
        setTotalTestsPakistan(testsPakistan);
        setTotalTestsSaudiArabia(testsSaudiArabia);
      }, []);
  return (
    <Box m="20px">
            <Header title="Covid-19 Testing" subtitle="Tracking Testing Trends and Efforts" />
            <Grid container spacing={2}>

        <Grid item xs={12} md={6} container spacing={1}>
          <Grid item xs={12}>
            {/* Total Test Number for Pakistan */}
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
                <BiotechIcon fontSize='large'/>
                <Typography variant="h1" sx={{ mb: '0px', mt: '15px', mr: '16px'}}>
                    {Number(totalTestsPakistan).toLocaleString()}
                </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography 
                    component={"div"}
                    sx={{ 
                    color: "#222222",
                    mt: '-14px', // Move the text up by adjusting the top margin negatively
                    mb: '8px',  // Move the number down by adding bottom margin
                    fontSize: '0.8rem',
                    }}
                >
                    Total Tests Conducted in Pakistan
                </Typography>
                </Box>
            </CardContent>
            </Card>

            {/* Total Tests Number for Saudi Arabia */}
            <Card sx={{ 
                minWidth: '30%',
                height: 97,
                bgcolor: 'rgb(182,95,207)', 
                '& .MuiCardContent-root': { padding: '8px' },
                boxShadow: 5,
            }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <BiotechIcon fontSize='large'/>
                <Typography variant="h1" sx={{ mb: '0px', mt: '15px', mr: '16px'}}>
                    {Number(totalTestsSaudiArabia).toLocaleString()}
                </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography 
                    component={"div"}
                    sx={{ 
                    color: "#222222",
                    mt: '-14px', // Move the text up by adjusting the top margin negatively
                    mb: '8px',  // Move the number down by adding bottom margin
                    fontSize: '0.8rem',
                    }}
                >
                    Total Tests Conducted in Saudi Arabia
                </Typography>
                </Box>
            </CardContent>
            </Card>
            </Stack>
            
          </Grid>

          {/* Right Column, Lower half */}
          <Grid item xs={12}>
                <Grid item xs={12}>
                <Card style={{ height: '330px' }}> 
                    <CardContent sx={cardContentStyleTopLeftChart}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Daily Covid-19 Tests Undertaken Over Time
                      </Typography>
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
                          onClick={handleOpenModal4}
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: '5px',
                            minWidth: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginLeft: 'auto',
                            backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#ffffff',
                            color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff', 
                          }}>
                          <ZoomInIcon />
                        </Button>
                </Box>
                <DailyTestsChart selectedCountry4={selectedCountry4} />
                    </CardContent>
                  </Card>
                  <Modal
                        open={isModalOpen4}
                        onClose={handleCloseModal4}
                        aria-labelledby="zoomed-chart-title"
                        aria-describedby="zoomed-chart-description"
                    >
                    <Box sx={modalStyle}>
                        <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                            Zoomed View: Daily Covid-19 Tests Undertaken Over Time
                        </Typography>
                        <Button
                            onClick={(e) => downloadChart4(e, chartRef4)}
                            sx={{
                                position: 'absolute',
                                top: 25,
                                right: 55,
                                color: 'white', // Set icon color to white for visibility
                                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                                '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                                },
                                padding: '4px'
                            }}
                            >
                            <DownloadIcon />
                        </Button>
                        <DailyTestsChart selectedCountry4={selectedCountry4} ref={chartRef4}/>
                    </Box>
                </Modal>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                {/* Card for New Cases Smoothed Over Time */}
                <Card>
                    <CardContent sx={cardContentStyleTopLeftChart}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Variation in Positive Test Rates Over Time                   
                     </Typography>
                    <FormControl size="small" sx={{ width: 'fit-content', marginRight: '25px' }}>
                        {/* Increase marginRight to move drop down menu to the left */}
                    <Select
                    value={selectedCountry5}
                    onChange={(e) => setSelectedCountry5(e.target.value)}
                    displayEmpty
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
                          onClick={handleOpenModal5}
                          variant="contained"
                          color="primary"
                          sx={{
                            padding: '5px',
                            minWidth: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginLeft: 'auto',
                            backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#ffffff',
                            color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff', 
                          }}>
                          <ZoomInIcon />
                        </Button>
                </Box>
                    <PositiveTestRateChart selectedCountry5={selectedCountry5} />
                    </CardContent>
                </Card>
                <Modal
                        open={isModalOpen5}
                        onClose={handleCloseModal5}
                        aria-labelledby="zoomed-chart-title"
                        aria-describedby="zoomed-chart-description"
                    >
                    <Box sx={modalStyle}>
                        <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                            Zoomed View: Variation in Positive Test Rates Over Time 
                        </Typography>
                        <Button
                            onClick={(e) => downloadChart5(e, chartRef5)}
                            sx={{
                                position: 'absolute',
                                top: 25,
                                right: 55,
                                color: 'white', // Set the icon color to white for visibility
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                                },
                                padding: '4px'
                            }}
                            >
                            <DownloadIcon />
                        </Button>
                        <PositiveTestRateChart selectedCountry5={selectedCountry5} ref={chartRef5}/>
                    </Box>
                </Modal>


                <Card style={{ height: '300px' }}> 
                    <CardContent sx={cardContentStyle}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Total Tests Smoothed Per Thousand Over Time
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
                          onClick={handleOpenModal6}
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
                        <TotalTestsPerThousandGraph selectedCountry6={selectedCountry6}/>
                        </CardContent>
              </Card>
              <Modal
                    open={isModalOpen6}
                    onClose={handleCloseModal6}
                    aria-labelledby="zoomed-chart-title"
                    aria-describedby="zoomed-chart-description"
                >
                <Box sx={modalStyle}>
                    <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                        Zoomed View: Total Tests Smoothed Per Thousand Over Time
                    </Typography>
                    <Button
                        onClick={(e) => downloadChart6(e, chartRef6)}
                        sx={{
                            position: 'absolute',
                            top: 25,
                            right: 55,
                            color: 'white', // Set the icon color to white for visibility
                            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                            '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                            },
                            padding: '4px'
                        }}
                        >
                        <DownloadIcon />
                    </Button>
                    <TotalTestsPerThousandGraph selectedCountry6={selectedCountry6} ref={chartRef6}/>
                </Box>
            </Modal>
            </Grid>
            </Grid>
    </Box>
  );
};

export default Testing;
