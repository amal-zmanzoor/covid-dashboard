import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
// For hyperlinks
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // Whether sidebar will be collapsed or not
    const [isCollapsed, setIsCollapsed] = useState(false);
    // Represents which page we are currently on from the sidebar
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                // Use of 'important' to overwrite library
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                },
            }}
        >
            
        <ProSidebar 
            collapsed={isCollapsed}
            width={isCollapsed ? "80px" : "250px" }
        >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box 
              // Keeping only icons when 'collapsing' the sidebar
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // Left margin
                ml="15px"
                // Top margin
                mt="-10px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            // Box mb was equal to 25 originally but was reduced to avoid user scrolling down to see all sidebar options
            <Box mb="10px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <AccountCircleIcon
                    style={{
                    fontSize: '70px', // Set the size as needed
                    color: '#BDBDBD', // This sets the icon color to grey
                    cursor: "pointer"
                    }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin User
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  VP Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Background"
              to="/history"
              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Cases"
              to="/cases"
              icon={<CoronavirusOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Testing"
              to="/testing"
              icon={<BiotechOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Deaths"
              to="/deaths"
              icon={<GroupRemoveIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Vaccines"
              to="/vaccines"
              icon={<VaccinesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="News"
              to="/news"
              icon={<FeedOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Feedback"
              to="/feedback"
              icon={<FeedbackOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
            </Typography>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    );
        };

export default Sidebar;

