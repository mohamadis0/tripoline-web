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
import AllTrips from './AllTrips';
import AllBuses from './AllBuses';
import AllDrivers from './AllDrivers';
import AllStations from './AllStations';
import AllProfiles from './AllProfiles';

import AddRoadIcon from '@mui/icons-material/AddRoad';
// import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AttributionIcon from '@mui/icons-material/Attribution';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Button, SvgIcon } from '@mui/material';
import Profile from './Profile';
import Station from './Station';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MuiGrid from '@mui/material/Grid';
import User from './User';
import AllUsers from './AllUsers';
import { Container } from '@mui/material';
import UpdateTripForm from './edit/UpdateTrip';


const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));


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
    // const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentContent, setCurrentContent] = React.useState('Create trip');


    const [showBus, setShowBus] = useState(false);
    // const [showTrip, setShowTrip] = useState(false);
    const [showDriver, setShowDriver] = useState(false);
    const [showStation, setShowStation] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [openCreateTrip, setOpenCreateTrip] = useState(false);



    const handleCreateBusClick = () => {
        setShowBus(true);
    };
    // const handleCreateTripClick = () => {
    //     setShowTrip(true);
    //     setEdit(false)
    // };
    const handleCreateDriverClick = () => {
        setShowDriver(true);
    };
    const handleCreateStationClick = () => {
        setShowStation(true);
    };
    const handleCreateProfileClick = () => {
        setShowProfile(true);
    };
    const handleCreateUserClick = () => {
        setShowUser(true);
    };

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

    const [edit, setEdit] = useState(false);
    const [editingTripId, setEditingTripId] = useState(null);
    const [editingProfileId, setEditingProfileId] = useState(null);


    const removeuserInfo = () => {
        localStorage.removeItem('userInformation');
        setUserInfo(null);
        nav('/');
    };

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInformation');
        // console.log(storedUserInfo)
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
        setOpenCreateTrip(!openCreateTrip)
    }, []);



    const renderUserInfo = () => {
        if (userInfo) {
            return (
                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between', width: "100%" }}>
                    <Typography variant="h6" noWrap component="div">
                        Hello {userInfo.data.user.username}
                    </Typography>
                    <Button variant="outlined" style={{ color: 'white' }} onClick={removeuserInfo}>
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
                    {['Create stations', 'Create users'].map((text, index) => (
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
                                    {index === 0 && <AddLocationAltIcon sx={{ color: '#004C64' }} />}
                                    {index === 1 && <PersonPinIcon sx={{ color: '#004C64' }} />}
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
                        <Grid container>
                            <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <AllTrips setEdit={setEdit} setEditingTripId={setEditingTripId} />
                                    <Divider orientation="vertical" flexItem>
                                        <Button variant="text" onClick={() => setOpenCreateTrip(!openCreateTrip)}>
                                            Create Trip
                                        </Button>
                                    </Divider>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {edit ? (
                                        <UpdateTripForm
                                            edit={edit}
                                            setEdit={setEdit}
                                            tripId={editingTripId}
                                        />
                                    ) : !openCreateTrip && <SingleTripForm open={openCreateTrip} close={setOpenCreateTrip} />}
                                </Box>
                            </Grid>
                        </Grid>
                    </Typography >
                )}
                {
                    currentContent === 'Create bus' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllBuses />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={handleCreateBusClick}>Create Bus</Button>
                                        </Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {showBus && <Bus />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )
                }
                {
                    currentContent === 'Create driver' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllDrivers />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={handleCreateDriverClick}>Create Driver</Button></Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {showDriver && <Driver />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )
                }
                {
                    currentContent === 'Create profile' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllProfiles />
                                        <Divider orientation="vertical" flexItem><Button variant="text" onClick={handleCreateProfileClick}>Create Profile</Button></Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {showProfile && <Profile />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )
                }
                {
                    currentContent === 'Create stations' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllStations />
                                        <Divider orientation="vertical" flexItem><Button variant="text" onClick={handleCreateStationClick}>Create Station</Button></Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {showStation && <Station />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )
                }
                {
                    currentContent === 'Create users' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllUsers />
                                        <Divider orientation="vertical" flexItem><Button variant="text" onClick={handleCreateUserClick}>Create User</Button></Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {showUser && <User />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )
                }
            </Box >
        </Box >
    );
}

export default Dashboard;
