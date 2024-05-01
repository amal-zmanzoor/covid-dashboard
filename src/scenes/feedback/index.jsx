import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { GlobalStyles } from '@mui/material';

<GlobalStyles
  styles={{
    '.MuiFormLabel-asterisk.Mui-error': {
      color: 'white', 
    },
  }}
/>

const Feedback = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userEmail, setUserEmail] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        return email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError('');
        if (!validateEmail(userEmail)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        if (!feedbackType || !description) {
            alert('Please fill in all fields.');
            return;
        }

        // Format data for CSV
        const feedbackData = { userEmail, feedbackType, description };
        const csvContent = `data:text/csv;charset=utf-8,${Object.keys(feedbackData).join(',')}\n${Object.values(feedbackData).join(',')}`;

        // Create a link and download the CSV file
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "feedback.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "feedback.csv".
        
        // Reset form fields after submission
        setUserEmail('');
        setFeedbackType('');
        setDescription('');
    };

    return (
        <Box m="20px">
            <Header title="Covid-19 Dashboard Feedback Form" subtitle="Help Us Enhance Your Experience" />
            <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>
                We would love to hear from you!
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <TextField
                    label="Email Address"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    sx={{
                        '& label.Mui-focused': {
                            color: theme.palette.mode === 'light' ? '#333' : 'white',  // Darker color for light mode
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: theme.palette.mode === 'light' ? '#444' : 'white',  // Darker border in light mode
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.mode === 'light' ? '#555' : 'white',  // Darker on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.mode === 'light' ? '#666' : 'white',  // Even darker on focus
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: theme.palette.mode === 'light' ? '#222' : 'white',  // Ensuring visibility
                        },
                        '& .MuiInputBase-input': {
                            color: theme.palette.mode === 'light' ? '#000' : 'white',  // Black text in light mode
                        }
                    }}
                />
                <FormControl 
                fullWidth 
                margin="normal" 
                sx={{
                    '& label.Mui-focused': {
                        color: theme.palette.mode === 'light' ? '#333' : 'white',  // Darker color for light mode
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.mode === 'light' ? '#444' : 'white',  // Darker border in light mode
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.mode === 'light' ? '#555' : 'white',  // Darker on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.mode === 'light' ? '#666' : 'white',  // Even darker on focus
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: theme.palette.mode === 'light' ? '#222' : 'white',  // Ensuring visibility
                    },
                    '& .MuiInputBase-input': {
                        color: theme.palette.mode === 'light' ? '#000' : 'white',  // Black text in light mode
                    }
                }}
                >

            <InputLabel>Feedback Type</InputLabel>
            <Select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                label="Feedback Type"
            >
                <MenuItem value="General Feedback">General Feedback</MenuItem>
                <MenuItem value="Feature Request">Feature Request</MenuItem>
                <MenuItem value="Bug Report">Bug Report</MenuItem>
                <MenuItem value="Complaint">Complaint</MenuItem>
            </Select>
            {!feedbackType && (
                <FormHelperText sx={{ color: 'desiredColorForHelperText' }}>
                    {!feedbackType && 'Please select a feedback type.'}
                </FormHelperText>
            )}
            </FormControl>


                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined" 
                        sx={{
                            '& label.Mui-focused': {
                                color: theme.palette.mode === 'light' ? '#333' : 'white',  // Darker color for light mode
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: theme.palette.mode === 'light' ? '#444' : 'white',  // Darker border in light mode
                                },
                                '&:hover fieldset': {
                                    borderColor: theme.palette.mode === 'light' ? '#555' : 'white',  // Darker on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.mode === 'light' ? '#666' : 'white',  // Even darker on focus
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: theme.palette.mode === 'light' ? '#222' : 'white',  // Ensuring visibility
                            },
                            '& .MuiInputBase-input': {
                                color: theme.palette.mode === 'light' ? '#000' : 'white',  // Black text in light mode
                            }
                        }}
                        />
                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ 
                        mt: 2, 
                        backgroundColor: colors.greenAccent[400],
                        ':hover': {
                            backgroundColor: colors.greenAccent[500],
                        },
                        color: 'black',
                    }}
                >
                    Submit
                </Button>
            </form>
            <br/>
            <br/>
            <br/>
        </Box>
    );
};

export default Feedback;
