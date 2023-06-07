import React, { useState } from 'react';
import { Input, FormControl, InputLabel } from '@mui/material';


function SingleTripForm() {

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

    const handleTripSubmit = (e) => {
        e.preventDefault();
        console.log(trip);
        resetTripFields();  // clear fields for new entry
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
    };

    return (
        <div>
            <h2>Add Single Trip</h2>
            <form onSubmit={handleTripSubmit}>
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
                        <InputLabel htmlFor="standard-basic">Bus</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="associatedBuses"
                            value={trip.associatedBuses}
                            onChange={handleChange} />
                    </FormControl>
                    {/* <input
                        id="standard-basic" label="Standard" variant="standard"
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
                <button type="submit">Add Trip</button>
            </form>
        </div>
    );
};

export default SingleTripForm
