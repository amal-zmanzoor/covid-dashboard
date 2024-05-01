import React from 'react';
import { useTheme } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';

const TotalTestsWidget = ({ country, totalTests }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{
      minWidth: 250,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
      '&:hover': {
        boxShadow: theme.shadows[10],
      },
    }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Total Tests Conducted in {country}
        </Typography>
        <Typography variant="h5" component="div">
          {totalTests.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalTestsWidget;
