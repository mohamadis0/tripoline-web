import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Station = ({ open, close }) => {
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
            toast.success('Station created successfully');
            console.log('Station created successfully');
        } catch (error) {
            toast.error('Error creating station');
            console.error('Error creating station:', error);
        }
        close(!open)
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
            <ToastContainer />
            <form onSubmit={handleStationSubmit} className='form-container' style={{ marginRight: 150, marginLeft: 150 }}>
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row" >
                        <label className="label">
                            Station Name:
                        </label>
                        <input
                            type="text"
                            name="stationName"
                            value={stationName}
                            onChange={handleStationNameChange}
                            required
                        />
                    </div>
                    <div className="form-row" >
                        <label className="label">
                            Station Number:
                        </label>
                        <input
                            type="text"
                            name="stationNumber"
                            value={stationNumber}
                            onChange={handleStationNumberChange}
                            required
                        />
                    </div>
                    <div className="form-row" >
                        <label className="label">
                            Station Status:
                        </label>
                        <select
                            name="stationStatus"
                            value={stationStatus}
                            onChange={handleStationStatusChange}
                            required
                            className="select-input"
                        >
                            <option value="">-----</option>
                            <option value="passed">Passed</option>
                            <option value="arrived">Arrived</option>
                            <option value="waiting">Waiting</option>
                        </select>
                    </div>
                </div>
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row">
                        <label className="label">
                            Station Time:
                        </label>
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
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Select Trip:
                        </label>
                        <select name="tripId" value={tripId || ""} onChange={handleTripIdChange}>
                            <option value="">Select a Trip</option>
                            {trips.map((trip) => (
                                <option key={trip._id} value={trip._id}>
                                    {trip.tripName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <button type="submit" className="submit-button" style={{ width: '200px', marginLeft: 120 }}>
                        Add Station
                    </button>
                    <button type="button" className="delete-button" onClick={() => close(!open)} style={{ marginLeft: 30, width: '200px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Station;
