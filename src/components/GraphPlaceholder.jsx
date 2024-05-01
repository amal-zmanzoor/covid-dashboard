// This component was used as a placeholder for graphs that were still being designed during the development process
import { Box, Paper, Typography } from "@mui/material";

const GraphPlaceholder = ({ title }) => {
    return (
        <Paper>
            <Box p={2}>
                <Typography variant="h6">{title}</Typography>
                {/* This is where your Chart.js graph will go */}
                <Box height="300px" display="flex" justifyContent="center" alignItems="center">
                    <Typography>Placeholder for {title}</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default GraphPlaceholder;
