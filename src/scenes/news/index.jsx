import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import Header from "../../components/Header";
import NewsWordCloud from '../../components/NewsWordCloud';
import FrequencyBarChart from '../../components/FrequencyBarChart'; 
import LolipopChart from '../../components/LolipopChart'; 

const News = () => {
  const [selectedMonth, setSelectedMonth] = useState('january');
  const [wordCloudData, setWordCloudData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [loadData, setLoadData] = useState(false); // State to trigger data loading

  // Load data when loadData is true and selectedMonth changes
  useEffect(() => {
    if (loadData) {
        // Load word cloud data
        import(`../../data/word_freq_list_${selectedMonth}_short.json`)
          .then((data) => {
            setWordCloudData(data.default);
          })
          .catch((error) => console.error("Failed to load word cloud data", error));
  
        // Load bar chart data
        import(`../../data/top_20_freq_${selectedMonth}.json`)
          .then((data) => {
            setBarChartData(data.default);
            setLoadData(false); // Reset loadData to false after loading
          })
          .catch((error) => console.error("Failed to load bar chart data", error));
      }
  }, [selectedMonth, loadData]); // Depend on loadData and selectedMonth

  const handleGoButtonClick = () => {
    setLoadData(true); // Trigger data loading
  };

  return (
    <Box m="20px">
      <Header title="Covid-19 News Insights" subtitle="Discover trends and insights from Covid-19 news coverage" />
      <Grid container spacing={2}>
        {/* Dropdown for month selection and Go button */}
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <MenuItem value={'january'}>January</MenuItem>
              <MenuItem value={'february'}>February</MenuItem>
              <MenuItem value={'march'}>March</MenuItem>
              <MenuItem value={'april'}>April</MenuItem>
              <MenuItem value={'may'}>May</MenuItem>
              <MenuItem value={'june'}>June</MenuItem>
              <MenuItem value={'july'}>July</MenuItem>
              <MenuItem value={'august'}>August</MenuItem>
              <MenuItem value={'september'}>September</MenuItem>
              <MenuItem value={'october'}>October</MenuItem>
              <MenuItem value={'november'}>November</MenuItem>
              <MenuItem value={'December'}>December</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleGoButtonClick} 
          sx={{ 
            marginLeft: 2, 
            backgroundColor: '#673ab7', // Deep Purple
            color: 'white', // Text color
            '&:hover': {
              backgroundColor: '#5e35b1', // Slightly darker purple on hover
            },
          }}
          >
            Go
          </Button>
        </Grid>
        
        {/* Visualization Section */}
        <Grid item xs={12}>
        <Grid container spacing={2}>
        {/* Word Cloud Visualization */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ width: "100%", height: "500px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Covid-19 News Word Cloud
              </Typography>
              <NewsWordCloud data={wordCloudData} />
            </CardContent>
          </Card>
        </Grid>
        {/* Bar Chart Visualization */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ width: "100%", height: "500px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Word Frequency Lollipop Chart
              </Typography>
              <LolipopChart data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
        {/* <---------------------------------------Optional Graph - Currently removed-------------------------------------------> */}
        {/* <Grid item sm={6}>
              <Card sx={{ width: "100%", height: "350px" }}>
              <CardContent>                
                  <Typography variant="h6" component="div">
                    Covid-19 News Bubble Chart
                    <br/>
                    <br/>
                  </Typography>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'top',
                    height: '100%' // This div will take the remaining height after the title
                }}>
                {/* Ensure that your chart component takes the full width and height available */}
                {/* <NewsBubbleChart data={barChartData} /> </div>
                </CardContent>
              </Card>
            </Grid> */}

            {/* Frequency Bar Chart Visualization */}
            <Grid item sm={12}>
            <Card sx={{ width: "100%", height: "615px" }}>
              <CardContent>                  <Typography variant="h6" component="div">
                    Word Frequency Bar Chart
                  </Typography>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'top',
                    height: '100%' // This div will take the remaining height after the title
                }}>
                <FrequencyBarChart data={barChartData} />    </div>           
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default News;
