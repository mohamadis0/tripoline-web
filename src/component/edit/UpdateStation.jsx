import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStation = ({ edit, setEdit, stationId }) => {

    const [station, setStation] = useState({});
    const [trips, setTrips] = useState([]);

    const fetchTrips = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/trips');
            const tripData = response.data;
            setTrips(tripData);
        } catch (error) {
            console.error(error);
        }
    };

    const getSpecificStationData = async (stationId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/stations/${stationId}`);
            const stationData = response.data;
            setStation({
                ...stationData,
                tripId: stationData.associatedTrip || '',
            });
            console.log(stationData)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedStation = {
                stationName: station.stationName,
                stationNumber: station.stationNumber,
                stationStatus: station.stationStatus,
                stationTime: station.stationTime,
                // timeUnit: station.timeUnit,
                associatedTrip: station.tripId,
            };

            const response = await axios.put(`http://localhost:3000/api/stations/${stationId}`, updatedStation);

            console.log(response.data);

            toast.success('station updated successfully'); // Display success toast message
            setEdit(false); // Hide the form after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update station'); // Display error toast message
        }
    };

    useEffect(() => {
        fetchTrips();
        getSpecificStationData(stationId);
    }, [stationId]);

    const {
        stationName,
        stationNumber,
        stationStatus,
        stationTime,
        timeUnit,
        tripId,
        associatedTrip,
    } = station;

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container' style={{ marginRight: 150, marginLeft: 150 }}>
                <ToastContainer />
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row">
                        <label className='label'>
                            <h2>Update the station</h2>
                        </label>
                    </div>
                        <div className="form-row" >
                            <label className="label">
                                Station Name:
                            </label>
                            <input
                                type="text"
                                name="stationName"
                                value={stationName || ''}
                                onChange={(e) => setStation({ ...station, stationName: e.target.value })}
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
                                value={stationNumber || ''}
                                onChange={(e) => setStation({ ...station, stationNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-row" >
                            <label className="label">
                                Station Status:
                            </label>
                            <select
                                name="stationStatus"
                                value={stationStatus || ''}
                                onChange={(e) => setStation({ ...station, stationStatus: e.target.value })}
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
                    <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 60 }}>
                        <div className="form-row">
                            <label className="label">
                                Station Time:
                            </label>
                            <input
                                type="text"
                                name="stationTime"
                                value={stationTime || ''}
                                onChange={(e) => setStation({ ...station, stationTime: e.target.value })}
                                required
                            />
                            <select
                                name="timeUnit"
                                value={timeUnit || ''}
                                onChange={(e) => setStation({ ...station, timeUnit: e.target.value })}
                            >
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label className="label">
                                Select Trip:
                            </label>
                            <select name="tripId" value={tripId || ""} onChange={(e) => setStation({ ...station, tripId: e.target.value })}>
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
                    <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                        <button type="submit" className="submit-button" style={{ width: '200px', marginLeft: 90 }}>
                            Update Station
                        </button>
                        <button type="button" className="delete-button" onClick={() => setEdit(!edit)} style={{ marginLeft: 30, width: '200px' }}>
                            Cancel
                        </button>
                    </div>
            </form>
        </div>
    )
}

export default UpdateStation;