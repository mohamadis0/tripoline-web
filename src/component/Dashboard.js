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
import UpdateProfile from './edit/UpdateProfile';
import UpdateBus from './edit/UpdateBus';
import UpdateDriver from './edit/UpdateDriver';
import UpdateStation from './edit/UpdateStation';
import UpdateUser from './edit/UpdateUser';


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
    
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentContent, setCurrentContent] = React.useState('trip');

    const [openCreateTrip, setOpenCreateTrip] = useState(false);
    const [openCreateProfile, setOpenCreateProfile] = useState(false);
    const [openCreateBus, setOpenCreateBus] = useState(false);
    const [openCreateDriver, setOpenCreateDriver] = useState(false);
    const [openCreateStation, setOpenCreateStation] = useState(false);
    const [openCreateUser, setOpenCreateUser] = useState(false);

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
    const [editingBusId, setEditingBusId] = useState(null);
    const [editingDriverId, setEditingDriverId] = useState(null);
    const [editingStationId, setEditingStationId] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);


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
        setOpenCreateProfile(!openCreateProfile)
        setOpenCreateBus(!openCreateBus)
        setOpenCreateDriver(!openCreateDriver)
        setOpenCreateStation(!openCreateStation)
        setOpenCreateUser(!openCreateUser)

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
                    {/* &nbsp;or&nbsp;
                    <Link to={'/Signup'} style={{ color: 'white' }}>
                        Register
                    </Link> */}
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
                    {['trip', 'profile', 'bus', 'driver'].map((text, index) => (
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
                                    {index === 0 && <AddRoadIcon sx={{ color: '#004C64' }}/>}
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
                    {['station', 'user'].map((text, index) => (
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
                {currentContent === 'trip' && (
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
                    currentContent === 'bus' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllBuses setEdit={setEdit} setEditingBusId={setEditingBusId} />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={() => setOpenCreateBus(!openCreateBus)}>
                                                Create Bus
                                            </Button>
                                        </Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {edit ? (
                                            <UpdateBus
                                                edit={edit}
                                                setEdit={setEdit}
                                                busId={editingBusId}
                                            />
                                        ) : !openCreateBus && <Bus open={openCreateBus} close={setOpenCreateBus} />}                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )}
                {
                    currentContent === 'driver' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllDrivers setEdit={setEdit} setEditingDriverId={setEditingDriverId} />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={() => setOpenCreateDriver(!openCreateDriver)}>
                                                Create Driver
                                            </Button>
                                        </Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {edit ? (
                                            <UpdateDriver
                                                edit={edit}
                                                setEdit={setEdit}
                                                driverId={editingDriverId}
                                            />
                                        ) : !openCreateDriver && <Driver open={openCreateDriver} close={setOpenCreateDriver} />}                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )}
                {
                    currentContent === 'profile' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllProfiles setEdit={setEdit} setEditingProfileId={setEditingProfileId} />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={() => setOpenCreateProfile(!openCreateProfile)}>
                                                Create Profile
                                            </Button>
                                        </Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {/* {showProfile && <Profile />} */}
                                        {edit ? (
                                            <UpdateProfile
                                                edit={edit}
                                                setEdit={setEdit}
                                                profileId={editingProfileId}
                                            />
                                        ) : !openCreateProfile && <Profile open={openCreateProfile} close={setOpenCreateProfile} />}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )}
                {
                    currentContent === 'station' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllStations setEdit={setEdit} setEditingStationId={setEditingStationId} />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={() => setOpenCreateStation(!openCreateStation)}>
                                                Create Station
                                            </Button>
                                        </Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {edit ? (
                                            <UpdateStation
                                                edit={edit}
                                                setEdit={setEdit}
                                                stationId={editingStationId}
                                            />
                                        ) : !openCreateStation && <Station open={openCreateStation} close={setOpenCreateStation} />}                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )}
                {
                    currentContent === 'user' && (
                        <Typography paragraph>
                            <Grid container>
                                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <AllUsers setEdit={setEdit} setEditingUserId={setEditingUserId} />
                                        <Divider orientation="vertical" flexItem>
                                            <Button variant="text" onClick={() => setOpenCreateUser(!openCreateUser)}>
                                                Create User
                                            </Button>
                                        </Divider>
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {edit ? (
                                            <UpdateUser
                                                edit={edit}
                                                setEdit={setEdit}
                                                userId={editingUserId}
                                            />
                                        ) : !openCreateUser && <User open={openCreateUser} close={setOpenCreateUser} />}                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    )}
            </Box >
        </Box >
    );
}

export default Dashboard;
