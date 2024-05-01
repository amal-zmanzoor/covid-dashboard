// This is a shared component and will be used for multiple pages that can be clicked from the sidebar
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
//import { Subtitles } from "@mui/icons-material";

const Header = ({ title, subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        // mb was origninally = 30
        <Box mb= "15px">
            <Typography
            variant="h2"
            color = {colors.grey[100]}
            fontWeight="bold"
            sx = {{mb: "-3px"}}
            >
                {title}
            </Typography>
            <Typography variant = "h6" color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    );

};

export default Header;