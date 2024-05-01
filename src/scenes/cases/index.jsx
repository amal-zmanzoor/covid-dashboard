import React from 'react';
import { Box, Grid, Card, CardContent, Typography, FormControl, Select, MenuItem, Button, Modal } from "@mui/material";
import Header from "../../components/Header";
import CasesLineChart from '../../components/CasesLineChart';
import TotalCasesBarChart from '../../components/TotalCasesBarChart';
import { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import { getTotalCasesByCountryOnDate } from '../../utils/parseData';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import NewCasesSmoothedChart from '../../components/NewCasesSmoothedChart';
import NewCasesSmoothedPerMillionChart from '../../components/NewCasesSmoothedPerMillionChart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import DownloadIcon from '@mui/icons-material/GetApp';
import { useTheme } from "@mui/material";

// Custom styles for CardContent
const cardContentStyle = {
    paddingTop: '0px', 
    paddingBottom: '0px', 
    '&:last-child': {
      paddingBottom: '16px' //16
    }
  };

const cardContentStyleTopLeftChart = {
    paddingTop: '0px', //8
    paddingBottom: '0px', 
    '&:last-child': {
      paddingBottom: '0px' //2
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

  const downloadChart = (event, chartReference) => {
    event.stopPropagation(); // This prevents the click from triggering parent onClick events
    const chart = chartReference.current; // Use the passed ref
    if (chart) {
      const imageUrl = chart.toBase64Image(); // Get image URL
      const link = document.createElement('a'); // Create a temporary link element
      link.href = imageUrl; // Set the href to the image URL
      link.download = 'total_cases_per_million.png'; // Set the download attribute with a filename
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger click to download
      document.body.removeChild(link); // Remove link from the body
    }
  };

  const downloadChart2 = (event, chartReference) => {
    event.stopPropagation(); 
    const chart = chartReference.current; 
    if (chart) {
      const imageUrl = chart.toBase64Image(); 
      const link = document.createElement('a'); 
      link.href = imageUrl; 
      link.download = 'new_cases_smoothed_per_million.png'; 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
    }
  };
  const downloadChart3 = (event, chartReference) => {
    event.stopPropagation(); 
    const chart = chartReference.current; 
    if (chart) {
      const imageUrl = chart.toBase64Image(); 
      const link = document.createElement('a'); 
      link.href = imageUrl; 
      link.download = 'new_cases_smoothed_chart.png'; 
      document.body.appendChild(link); 
      link.click(); 
      document.body.removeChild(link); 
    }
  };

const Cases = () => {
  const theme = useTheme();
    // These 3 will allow the user to control which country's data they want to display on their dashboard
    const [selectedCountry, setSelectedCountry] = useState('Both');
    const [selectedCountry2, setSelectedCountry2] = useState('Both');
    const [selectedCountry3, setSelectedCountry3] = useState('Both');

    const [totalCasesPakistan, setTotalCasesPakistan] = useState(null);
    const [totalCasesSaudiArabia, setTotalCasesSaudiArabia] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isModalOpen2, setIsModalOpen2] = useState(false); 
    const [isModalOpen3, setIsModalOpen3] = useState(false); 
    const chartRef = useRef(null); // Reference for the chart we want to zoom into
    const chartRef2 = useRef(null); 
    const chartRef3 = useRef(null); 

    // Function to handle modal opening
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleOpenModal2 = () => {
      setIsModalOpen2(true);
    };

    const handleOpenModal3 = () => {
      setIsModalOpen3(true);
    };

    // Function to handle modal closing
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleCloseModal2 = () => {
      setIsModalOpen2(false);
    };

    const handleCloseModal3 = () => {
      setIsModalOpen3(false);
    };

    useEffect(() => {
        const casesPakistan = getTotalCasesByCountryOnDate('PAK');
        const casesSaudiArabia = getTotalCasesByCountryOnDate('SAU');
    
        setTotalCasesPakistan(casesPakistan);
        setTotalCasesSaudiArabia(casesSaudiArabia);
      }, []);

    return (
        <Box m="20px">
          <Header title="Covid-19 Cases" subtitle="Explore Detailed Case Statistics and Trends" />
          <Grid container spacing={1.5}>
            {/* Grid item for Total Cases Per Million */}
            {/* Right column */}
            <Grid item xs={12} md={6} container spacing={1.5}>
              {/* Upper half for bar chart and total cases number */}
              <Grid item xs={4}>
                {/* Total Cases Number for Pakistan */}
                <Stack spacing={2} direction="column">
                <Card sx={{ 
                            minWidth: '30%',
                            height: '97px',
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
                            bgcolor: 'rgb(182,95,207)', 
                            '& .MuiCardContent-root': { padding: '8px' },
                            boxShadow: 5, // Adjust the elevation shadow
                          }}>
                  <CardContent>
                    <div>
                        <CoronavirusOutlinedIcon fontSize='large'/>
                    </div>
                    <Typography variant="h3" sx={{ mt: '3px',  mb: '0px' }}>                  
                        {Number(totalCasesSaudiArabia).toLocaleString()}
                    </Typography>
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
              <Grid item xs={8}>
                {/* Bar Chart */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Total Cases Recorded
                    </Typography>
                    <TotalCasesBarChart />
                  </CardContent>
                </Card>
              </Grid>

              {/* Right Column, Lower half */}
              <Grid item xs={12}>
                    <Grid item xs={12}>
                    <Card style={{ height: '100%' }}> {/* Adjust width as needed */}
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      New Cases Smoothed Per Million Over Time
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ gap: '10px' }}>
                      <FormControl size="small" sx={{
                          minWidth: 120, // Ensure dropdown does not shrink
                          '& .MuiSelect-select': {
                            paddingRight: '8px', // Adjust right padding
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none', 
                          },
                        }}>
                        <Select
                          value={selectedCountry3}
                          onChange={(e) => setSelectedCountry3(e.target.value)}
                          displayEmpty
                          sx={{ 
                              fontSize: '0.7rem', // Smaller font size
                              '& .MuiSelect-select': {
                              paddingRight: '2px', // Further reduce padding-right if the arrow still seems far
                              }
                          }}
                        >
                          <MenuItem value="Both">Both</MenuItem>
                          <MenuItem value="Pakistan">Pakistan</MenuItem>
                          <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                              onClick={handleOpenModal}
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
                  </Box>
                  <NewCasesSmoothedPerMillionChart selectedCountry3={selectedCountry3} />
                </CardContent>
              </Card>

              <Modal
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="zoomed-chart-title"
                  aria-describedby="zoomed-chart-description"
                >
                <Box sx={modalStyle}>
                    <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                      Zoomed View: New Cases Smoothed Per Million Over Time
                    </Typography>
                    <Button
                        // onClick={downloadChart2(chartRef)}
                        onClick={(e) => downloadChart2(e, chartRef)}
                        sx={{
                          position: 'absolute',
                          top: 25,
                          right: 55,
                          color: 'white', // Set the icon color to white for visibility
                          backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slight background for better visibility
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                          },
                          padding: '4px'
                        }}
                      >
                      <DownloadIcon />
                    </Button>
                    <NewCasesSmoothedPerMillionChart selectedCountry3={selectedCountry3} ref={chartRef}/>
                </Box>
            </Modal>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    {/* Card for New Cases Smoothed Over Time */}
                    <Card>
                        <CardContent sx={cardContentStyleTopLeftChart}>
                        {/* <CardContent> */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            New Cases Smoothed Over Time                   
                        </Typography>
                        <FormControl size="small" sx={{
                          minWidth: 120, // Ensure dropdown does not shrink
                          '& .MuiSelect-select': {
                            paddingRight: '8px', // Adjust right padding
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none', 
                          },
                        }}>
                        <Select
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          displayEmpty
                          sx={{ 
                              fontSize: '0.7rem', // Smaller font size
                              '& .MuiSelect-select': {
                              paddingRight: '2px', // Further reduce padding-right if the arrow still seems far
                              }
                          }}
                        >
                          <MenuItem value="Both">Both</MenuItem>
                          <MenuItem value="Pakistan">Pakistan</MenuItem>
                          <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                              onClick={handleOpenModal2}
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
                        <NewCasesSmoothedChart selectedCountry={selectedCountry} />
                        </CardContent>
                    </Card>
              <Modal
                open={isModalOpen2}
                onClose={handleCloseModal2}
                aria-labelledby="zoomed-chart-title"
                aria-describedby="zoomed-chart-description"
              >
              <Box sx={modalStyle}>
                  <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                    Zoomed View: New Cases Smoothed Over Time
                  </Typography>
                  <Button
                      onClick={(e) => downloadChart3(e, chartRef2)}
                      sx={{
                        position: 'absolute',
                        top: 25,
                        right: 55,
                        color: 'white', // Set icon color to white for visibility
                        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                        },
                        padding: '4px'
                      }}
                    >
                    <DownloadIcon />
                  </Button>
                  <NewCasesSmoothedChart selectedCountry={selectedCountry} ref={chartRef2}/>
              </Box>
          </Modal>

                    <Card style={{ height: '300px' }}> {/* Adjust the width as needed 260px initially*/}
                  <CardContent sx={cardContentStyle}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Total Cases Per Million Over Time
                    </Typography>
                    <FormControl size="small" sx={{
                          minWidth: 120, // Ensure dropdown does not shrink
                          '& .MuiSelect-select': {
                            paddingRight: '8px', // Adjust right padding
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                          },
                        }}>
                        <Select
                          value={selectedCountry2}
                          onChange={(e) => setSelectedCountry2(e.target.value)}
                          displayEmpty
                          sx={{ 
                              fontSize: '0.7rem', // Smaller font size
                              '& .MuiSelect-select': {
                              paddingRight: '2px', // Further reduce padding-right if the arrow still seems far
                              }
                          }}
                        >
                          <MenuItem value="Both">Both</MenuItem>
                          <MenuItem value="Pakistan">Pakistan</MenuItem>
                          <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                              onClick={handleOpenModal3}
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
                      {/* Pass the selectedCountry state to the CasesLineChart component */}
                      <CasesLineChart selectedCountry2={selectedCountry2} />
                    </CardContent>
                  </Card>
                  <Modal
                      open={isModalOpen3}
                      onClose={handleCloseModal3}
                      aria-labelledby="zoomed-chart-title"
                      aria-describedby="zoomed-chart-description"
                    >
                    <Box sx={modalStyle}>
                        <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                          Zoomed View: Total Cases Per Million Over Time
                        </Typography>
                        <Button
                            onClick={(e) => downloadChart(e, chartRef3)}
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
                        <CasesLineChart selectedCountry2={selectedCountry2} ref={chartRef3} />
                    </Box>
                </Modal>
                </Grid>
          </Grid>
        </Box>
      );
    };

export default Cases;
