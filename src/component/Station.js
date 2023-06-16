import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Station = () => {
    const [stationName, setStationName] = useState('');
    const [stationNumber, setStationNumber] = useState('');
    const [stationStatus, setStationStatus] = useState('');
    const [tripId, setTripId] = useState(''); 
    const [stationTime, setStationTime] = useState('');
    const [timeUnit, setTimeUnit] = useState('minutes');
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/trips');
            setTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const handleStationSubmit = async (e) => {
        e.preventDefault();
        try {
            const time = `${stationTime} ${timeUnit}`;
            const stationData = {
                stationName,
                stationNumber,
                stationStatus,
                associatedTrip: tripId,
                stationTime: time,
            };
            await axios.post('http://localhost:3000/api/stations', stationData);

            resetStationFields();
            console.log('Station created successfully');
        } catch (error) {
            console.error('Error creating station:', error);
        }
    };

    const resetStationFields = () => {
        setStationName('');
        setStationNumber('');
        setStationStatus('');
        setTripId('');
        setStationTime('');
        setTimeUnit('minutes');
    };

    const handleStationNameChange = (e) => {
        setStationName(e.target.value);
    };

    const handleStationNumberChange = (e) => {
        setStationNumber(e.target.value);
    };

    const handleStationStatusChange = (e) => {
        setStationStatus(e.target.value);
    };

    const handleStationTimeChange = (e) => {
        setStationTime(e.target.value);
    };

    const handleTimeUnitChange = (e) => {
        setTimeUnit(e.target.value);
    };

    const handleTripIdChange = (e) => {
        setTripId(e.target.value)
    };

    return (
        <div>
            <form onSubmit={handleStationSubmit}>
                <label>
                    Station Name:
                    <input
                        type="text"
                        name="stationName"
                        value={stationName}
                        onChange={handleStationNameChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Station Number:
                    <input
                        type="text"
                        name="stationNumber"
                        value={stationNumber}
                        onChange={handleStationNumberChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Station Status:
                    <select
                        name="stationStatus"
                        value={stationStatus}
                        onChange={handleStationStatusChange}
                        required
                    >
                        <option value="">-----</option>
                        <option value="passed">Passed</option>
                        <option value="arrived">Arrived</option>
                        <option value="waiting">Waiting</option>
                    </select>
                </label>
                <br />
                <label>
                    Station Time:
                    <input
                        type="text"
                        name="stationTime"
                        value={stationTime}
                        onChange={handleStationTimeChange}
                        required
                    />
                    <select
                        name="timeUnit"
                        value={timeUnit}
                        onChange={handleTimeUnitChange}
                    >
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
                </label>
                <br />
                <label>
                    Select Trip:
                    <select name="tripId" value={tripId || ""} onChange={handleTripIdChange}>
                        <option value="">Select a Trip</option>
                        {trips.map((trip) => (
                            <option key={trip._id} value={trip._id}>
                                {trip.tripName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button type="submit">Create Station</button>
                </div>
            </form>
        </div>
    );
};

export default Station;
