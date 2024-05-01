import React, { useEffect, useState, useRef } from 'react';
import Header from "../../components/Header";
import { Box, Grid, Card, CardContent, Typography, Button, Modal, Select, MenuItem, FormControl } from "@mui/material";
import CustomLineChart from '../../components/LineChart'; 
import StringencyIndexChart from '../../components/StringencyChart';
import LineNewVaccinesPerMillionChart from '../../components/LineNewVaccinesSmootherPerMillion'; 
import { parseNewVaccinationsSmoothed } from '../../utils/parseData';
import jsonData from '../../data/file.json';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

// Style for the modal close button
const closeButtonStyle = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: (theme) => theme.palette.grey[500],
  padding: '4px', // Reduce padding to make the clickable area smaller
  minWidth: '15px', // Reduce minimum width if the button is too wide
  minHeight: '24px', // Reduce minimum height if the button is too tall
};

const Vaccines = () => {
  const theme = useTheme();
  const [selectedCountry13, setSelectedCountry13] = useState('Both');
  const [selectedCountry14, setSelectedCountry14] = useState('Both');
  const [selectedCountry15, setSelectedCountry15] = useState('Both');

  const chartRef = useRef(null); // Create a ref for the chart
  const chartRefPerMillion = useRef(null);
  const chartRef12 = useRef(null);
  
// Function to trigger download of the chart
// Adjusted downloadChart function to accept a chart reference
const downloadChart10 = (event, chartReference) => {
  event.stopPropagation(); 
  const chart = chartReference.current; 
  if (chart) {
    const imageUrl = chart.toBase64Image();
    const link = document.createElement('a');
    link.href = imageUrl; 
    link.download = 'new_vaccinations_smoothed.png'; 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  }
};

const downloadChart2 = (event, chartReference) => {
  event.stopPropagation();
  const chart = chartReference.current; 
  if (chart) {
    const imageUrl = chart.toBase64Image(); 
    const link = document.createElement('a');
    link.href = imageUrl; 
    link.download = 'new_vaccinations_smoothed_per_million.png'; 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  }
};

const downloadChart12 = (event, chartReference) => {
  event.stopPropagation(); 
  const chart = chartReference.current; 
  if (chart) {
    const imageUrl = chart.toBase64Image(); 
    const link = document.createElement('a'); 
    link.href = imageUrl; 
    link.download = 'stringency_index.png'; 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  }
};
  const [chartData, setChartData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isModalOpenPerMillion, setIsModalOpenPerMillion] = useState(false); 
  const [isModalOpen12, setIsModalOpen12] = useState(false); 

  
  useEffect(() => {
    const data = parseNewVaccinationsSmoothed(jsonData);
    setChartData(data);
    }, [jsonData]); 

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalPerMillion = () => {
    setIsModalOpenPerMillion(true);
  };

  const handleCloseModalPerMillion = () => {
    setIsModalOpenPerMillion(false);
  };

  const handleOpenModal12 = () => {
    setIsModalOpen12(true);
  };

  const handleCloseModal12 = () => {
    setIsModalOpen12(false);
  };  

  return (
    <Box m="20px">
      <Header title="Covid-19 Vaccines" subtitle="Vaccination Progress and Coverage Insights including Policy Responses"/>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
        <Card>
                  <CardContent style={{ paddingTop: '5px', paddingBottom: '0px' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">New Vaccinations Smoothed Over Time</Typography>
                    <Box display="flex" alignItems="center">
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
                      value={selectedCountry13}
                      onChange={(e) => setSelectedCountry13(e.target.value)}
                      displayEmpty
                      sx={{ 
                          fontSize: '0.7rem', // Smaller font size
                          '& .MuiSelect-select': {
                          paddingRight: '2px', // Further reduce padding-right if the arrow still seems far
                          paddingLeft: '90px',
                          }
                      }}
                    >
                      <MenuItem value="Both">Both</MenuItem>
                      <MenuItem value="Pakistan">Pakistan</MenuItem>
                      <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    </Select>
                  </FormControl>
                      </Box>
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
                            backgroundColor: theme.palette.mode === 'dark' ? 'primary' : '#ffffff', 
                            color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff', 
                          }}>
                          <ZoomInIcon />
                        </Button>
                  </Box>
                    <CustomLineChart selectedCountry13={selectedCountry13}/>
                  </CardContent>
                </Card>
                <Modal
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="zoomed-chart-title"
                  aria-describedby="zoomed-chart-description"
                >
                  <Box sx={modalStyle}>
                      <IconButton onClick={handleCloseModal} sx={closeButtonStyle}>
                        <CloseIcon />
                      </IconButton>
                      <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                        Zoomed View: New Vaccinations Smoothed Over Time
                      </Typography>
                      <Button
                        onClick={(e) => downloadChart10(e, chartRef)}
                        sx={{
                            position: 'absolute',
                            top: 25,
                            right: 55,
                            color: 'white', 
                            backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                            },
                            padding: '4px'
                          }}
                        >
                        <DownloadIcon />
                      </Button>
                      <CustomLineChart selectedCountry13={selectedCountry13} ref={chartRef} />
                  </Box>
        </Modal>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={6}>
            <Card>
            <CardContent style={{ paddingTop: '5px', paddingBottom: '0px' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Stringency Index Over Time</Typography>
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
                      value={selectedCountry14}
                      onChange={(e) => setSelectedCountry14(e.target.value)}
                      displayEmpty
                      sx={{ 
                          fontSize: '0.7rem', // Smaller font size
                          '& .MuiSelect-select': {
                          paddingRight: '2px', // Further reduce padding-right if the arrow still seems far
                          paddingLeft: '150px',
                          }
                      }}
                    >
                      <MenuItem value="Both">Both</MenuItem>
                      <MenuItem value="Pakistan">Pakistan</MenuItem>
                      <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                          onClick={handleOpenModal12}
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
              <StringencyIndexChart />
            </CardContent>
          </Card>
          <Modal
            open={isModalOpen12}
            onClose={handleCloseModal12}
            aria-labelledby="zoomed-chart-title"
            aria-describedby="zoomed-chart-description"
          >
            <Box sx={modalStyle}>
                <IconButton onClick={handleCloseModal12} sx={closeButtonStyle}>
                  <CloseIcon />
                </IconButton>
                <Typography id="zoomed-chart-title" variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                  Zoomed View: New Vaccinations Smoothed Over Time
                </Typography>
                <Button
                  onClick={(e) => downloadChart12(e, chartRef12)}
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
                <br></br>
                <br></br>
                <StringencyIndexChart selectedCountry14={selectedCountry14} ref={chartRef12} />
            </Box>
        </Modal>
        </Grid>
        
        {/* Full Width Lower Grid Item for "New Vaccinations Smoothed Per Million" Chart */}
        <Grid item xs={12}>
        <Card>
                  <CardContent style={{ paddingTop: '3px', paddingBottom: '6px' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">New Vaccinations Smoothed Per Million Over Time </Typography>
                    <FormControl size="small" sx={{
                      minWidth: 120, // Ensure dropdown does not shrink
                      '& .MuiSelect-select': {
                        paddingRight: '10px', // Adjust right padding
                        paddingLeft: '500px',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                      },
                    }}>
                    <Select
                      value={selectedCountry15}
                      onChange={(e) => setSelectedCountry15(e.target.value)}
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
                          onClick={handleOpenModalPerMillion}
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
                    <LineNewVaccinesPerMillionChart selectedCountry15={selectedCountry15}/>        
                  </CardContent>
                </Card>
                <Modal
                  open={isModalOpenPerMillion}
                  onClose={handleCloseModalPerMillion}
                  aria-labelledby="zoomed-chart-per-million-title"
                  aria-describedby="zoomed-chart-per-million-description"
                >
                  <Box sx={modalStyle}>
                    <IconButton onClick={handleCloseModalPerMillion} sx={closeButtonStyle}>
                      <CloseIcon />
                    </IconButton>
                    <Typography id="zoomed-chart-per-million-title" variant="h6">
                      Zoomed View: New Vaccinations Smoothed Per Million
                    </Typography>
                    <Button
                            onClick={(e) => downloadChart2(e, chartRefPerMillion)}
                            sx={{
                              position: 'absolute',
                              top: 25, //25
                              right: 55,
                              color: 'white', // Set the icon color to white for visibility
                              backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighter on hover for a feedback effect
                              },
                              padding: '4px' //4
                            }}
                          >
                          <DownloadIcon />
                        </Button>
                    <br></br>
                    <br></br>
                    <LineNewVaccinesPerMillionChart selectedCountry15={selectedCountry15} ref={chartRefPerMillion}/>
                  </Box>
                </Modal>
        </Grid>
      </Grid>
    </Box>
  );
  };
  
  export default Vaccines;
