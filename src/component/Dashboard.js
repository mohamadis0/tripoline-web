import React, { useEffect, useState } from 'react';
import SingleTripForm from './SingleTripForm';

import { Link, json, useNavigate } from 'react-router-dom';
import Bus from './Bus';
import Driver from './Driver';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import  AllTrips  from './AllTrips';
import  AllBuses  from './AllBuses';
import  AllDrivers  from './AllDrivers';
import  AllStations  from './AllStations';
import  AllProfiles  from './AllProfiles';

import AddRoadIcon from '@mui/icons-material/AddRoad';
// import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AttributionIcon from '@mui/icons-material/Attribution';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Button, SvgIcon } from '@mui/material';
import Profile from './Profile';

const drawerWidth = 240;


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentContent, setCurrentContent] = React.useState('Create trip');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (text) => {
        setCurrentContent(text);
    };


    const nav = useNavigate();

    const [userInfo, setUserInfo] = useState(null);


    const removeuserInfo = () => {
        localStorage.removeItem('userInformation');
        setUserInfo(null);
    };

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInformation');
        // console.log(storedUserInfo)
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);



    const renderUserInfo = () => {
        if (userInfo) {
            return (
                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', width: "100%" }}>
                    <Typography variant="h6" noWrap component="div">
                        Hello {userInfo.data.user.username}
                    </Typography>

                    <Button variant="contained" color="primary" onClick={removeuserInfo}>
                        Logout
                    </Button>
                </div>
            );
        } else {
            return (
                <Typography variant="h6" noWrap component="div">

                    <Link to={'/'} style={{ color: 'white' }}>
                        Login
                    </Link>
                    &nbsp;or&nbsp;
                    <Link to={'/Signup'} style={{ color: 'white' }}>
                        Register
                    </Link>
                </Typography>
            );
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#004C64' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {renderUserInfo()}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: '#004C64' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Create trip', 'Create profile', 'Create bus', 'Create driver'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: '#004C64',
                                }}
                                onClick={() => handleClick(text)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index === 0 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                    {index === 1 && <PersonAddAltRoundedIcon sx={{ color: '#004C64' }} />}
                                    {index === 2 && <DirectionsBusIcon sx={{ color: '#004C64' }} />}
                                    {index === 3 && <AttributionIcon sx={{ color: '#004C64' }} />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[, 'Get all trips', 'Get all buses', 'Get all drivers', 'Get all stations'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: '#004C64',
                                }}
                                onClick={() => handleClick(text)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index === 0 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                    {index === 1 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                    {index === 2 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                    {index === 3 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                    {index === 4 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                    {index === 5 && <AddRoadIcon sx={{ color: '#004C64' }} />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {currentContent === 'Create trip' && (
                    <Typography paragraph>
                        <SingleTripForm />
                    </Typography>
                )}
                {currentContent === 'Create bus' && (
                    <Typography paragraph>
                        <Bus />
                    </Typography>
                )}
                {currentContent === 'Create driver' && (
                    <Typography paragraph>
                        <Driver />
                    </Typography>
                )}
                {currentContent === 'Create profile' && (
                    <Typography paragraph>
                        <Profile />
                    </Typography>
                )}
                {currentContent === 'Get all trips' && (
                    <Typography paragraph>
                        <AllTrips />
                    </Typography>
                )}
                {currentContent === 'Get all buses' && (
                    <Typography paragraph>
                        <AllBuses />
                    </Typography>
                )}
                {currentContent === 'Get all drivers' && (
                    <Typography paragraph>
                        <AllDrivers />
                    </Typography>
                )}
                {currentContent === 'Get all stations' && (
                    <Typography paragraph>
                        <AllStations />
                    </Typography>
                )}
                {currentContent === 'Get all profiles' && (
                    <Typography paragraph>
                        <AllProfiles />
                    </Typography>
                )}
            </Box>

        </Box>
    );
}

export default Dashboard;
