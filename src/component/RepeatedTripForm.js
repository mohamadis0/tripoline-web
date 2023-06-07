import React, { useState } from 'react';
import { Input, FormControl, InputLabel, Select } from '@mui/material';
// import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// const names = [
//     'weekly',
//     'monthly',

// ];

function RepeatedTripForm() {

    const [trip, setTrip] = useState({
        TripName: '',//
        TripLocation: '',///////////
        TripDestination: '',///////////
        estimatedDeparture: '',//////////
        departureTime: '',//////////
        estimatedArrival: '',/////////
        arrivalTime: '',/////////
        tripLine: '',//////////
        tripStatus: 'upcoming',/////////
        associatedBuses: '',/////////
        AvailableSeats: '',
    });

    const [repeatedTrip, setRepeatedTrip] = useState(false); //default trip repetition to false
    const [repeatDuration, setRepeatDuration] = useState('');

    const handleTripSubmit = (e) => {
        e.preventDefault();
        console.log(trip);
        resetTripFields();  // clear fields for new entry
    };

    const handleRepeatedTripSubmit = (e) => {
        e.preventDefault();
        console.log('Repeated Trip:', trip);
        console.log('Repeat Duration:', repeatDuration);
        resetTripFields();  // clear fields for new entry
        setRepeatedTrip(false);
    };

    const handleChange = (e) => {
        setTrip({
            ...trip,
            [e.target.name]: e.target.value,
        });
    };

    const resetTripFields = () => {
        setTrip({
            TripName: '',//
            TripLocation: '',///////////
            TripDestination: '',///////////
            estimatedDeparture: '',//////////
            departureTime: '',//////////
            estimatedArrival: '',/////////
            arrivalTime: '',/////////
            tripLine: '',//////////
            tripStatus: 'upcoming',/////////
            associatedBuses: '',/////////
            AvailableSeats: '',
        });
        setRepeatDuration('');
    };


    // const [personName, setPersonName] = React.useState([]);///////

    // const handleChangeee = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPersonName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    const [age, setAge] = React.useState('');

    const handleChangeee = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <h2>Add Repeated Trips</h2>
            <form onSubmit={handleRepeatedTripSubmit}>
                <label>
                    Trip Name:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">name</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="TripName"
                            value={trip.TripName}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="text"
                        name="TripName"
                        value={trip.TripName}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Trip Location:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">location</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="TripLocation"
                            value={trip.TripLocation}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="text"
                        name="TripLocation"
                        value={trip.TripLocation}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Trip Destination:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">destination</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="TripDestination"
                            value={trip.TripDestination}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="text"
                        name="TripDestination"
                        value={trip.TripDestination}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Estimated Departure Time:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic"></InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="time"
                            name="estimatedDeparture"
                            value={trip.estimatedDeparture}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="time"
                        name="estimatedDeparture"
                        value={trip.estimatedDeparture}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Departure Time:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic"></InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="time"
                            name="departureTime"
                            value={trip.departureTime}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="time"
                        name="departureTime"
                        value={trip.departureTime}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Estimated Arrival Time:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic"></InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="time"
                            name="estimatedArrival"
                            value={trip.estimatedArrival}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="time"
                        name="estimatedArrival"
                        value={trip.estimatedArrival}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Arrival Time:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic"></InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="time"
                            name="arrivalTime"
                            value={trip.arrivalTime}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="time"
                        name="arrivalTime"
                        value={trip.arrivalTime}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Trip Line:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">line</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="tripLine"
                            value={trip.tripLine}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="text"
                        name="tripLine"
                        value={trip.tripLine}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Status:
                    {/* <input
                    type="radio"
                    name="Status"
                    // value={trip.Status}
                    onChange={handleChange}
                /> */}
                    <label>
                        <input
                            type="radio"
                            name="tripStatus"
                            value="upcoming"
                            checked={trip.tripStatus === 'upcoming'}
                            onChange={handleChange}
                        // Checked="checked"
                        />{' '}
                        UpComing
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tripStatus"
                            value="ongoing"
                            checked={trip.tripStatus === 'ongoing'}
                            onChange={handleChange}
                        />{' '}
                        OnGoing
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tripStatus"
                            value="completed"
                            checked={trip.tripStatus === 'completed'}
                            onChange={handleChange}
                        />{' '}
                        Completed
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tripStatus"
                            value="canceled"
                            checked={trip.tripStatus === 'canceled'}
                            onChange={handleChange}
                        />{' '}
                        Canceled
                    </label>
                </label>
                <br />
                <label>
                    Associated Bus:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">bus</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="associatedBuses"
                            value={trip.associatedBuses}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="text"
                        name="associatedBuses"
                        value={trip.associatedBuses}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Available Seats:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">available seats</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="number"
                            name="AvailableSeats"
                            value={trip.AvailableSeats}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        type="number"
                        name="AvailableSeats"
                        value={trip.AvailableSeats}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>
                    Repeat Duration:

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">duration</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChangeee}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Weekly</MenuItem>
                            <MenuItem value={20}>Monthly</MenuItem>
                            {/* <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>

                    {/* <FormControl>
                        <InputLabel htmlFor="standard-basic"></InputLabel>
                        <Select
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            value={repeatDuration}
                            onChange={(e) => setRepeatDuration(e.target.value)}
                        >
                            <option value="">-- Select Duration --</option>
                            <option value="week">Weekly</option>
                            <option value="month">Monthly</option>
                        </Select>
                    </FormControl> */}
                </label>
                <br />
                <button type="submit">Add Repeated Trip</button>
            </form>
        </div>
    );
};


export default RepeatedTripForm
