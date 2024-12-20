import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTripForm = ({ edit, setEdit, tripId }) => {
    const [stations, setStations] = useState([]);
    const [singleTrip, setSingleTrip] = useState({});
    const [buses, setBuses] = useState([]);

    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/stations');
            const stationData = response.data;
            setStations(stationData);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBuses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/buses');
            const busData = response.data;
            setBuses(busData);
        } catch (error) {
            console.error(error);
        }
    };

    const getSpecificTripData = async (tripId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/trips/${tripId}`);
            const tripData = response.data;
            setSingleTrip({
                ...tripData,
                associatedBuses: tripData.associatedBuses.map(bus => bus._id),
                tripLocation: tripData.tripLocation?._id || '',
                tripDestination: tripData.tripDestination?._id || '',
            });
            console.log(tripData)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedTrip = {
                tripName: singleTrip.tripName,
                tripLocation: singleTrip.tripLocation,
                tripDestination: singleTrip.tripDestination,
                departureTime: singleTrip.departureTime,
                arrivalTime: singleTrip.arrivalTime,
                estimatedArrival: singleTrip.estimatedArrival,
                estimatedDeparture: singleTrip.estimatedDeparture,
                tripLine: singleTrip.tripLine,
                tripStatus: singleTrip.tripStatus,
                associatedBuses: singleTrip.associatedBuses.map((busId) => ({ _id: busId })),
            };

            const response = await axios.put(`http://localhost:3000/api/trips/${tripId}`, updatedTrip);

            console.log(response.data);

            toast.success('Trip updated successfully'); // Display success toast message
            setEdit(false); // Hide the form after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update trip'); // Display error toast message
        }
    };

    useEffect(() => {
        fetchStations();
        fetchBuses();
        getSpecificTripData(tripId);
    }, [tripId]);

    const {
        tripName,
        tripLocation,
        tripDestination,
        estimatedDeparture,
        departureTime,
        estimatedArrival,
        arrivalTime,
        tripLine,
        tripStatus,
        associatedBuses,
    } = singleTrip;

    return (
        <form onSubmit={handleSubmit} className="form-container" style={{ left: 1100, top: 100 }}>
            <ToastContainer />
            <div className="form-column" style={{ width: '50%', padding: '0 25px' }}>
                <div className="form-row">
                    <label className='label'>
                        <h2>Update the trip</h2>
                    </label>
                </div>
                <div className="form-row">
                    <label className="label">
                        Trip Name:
                    </label>
                    <input
                        type="text"
                        value={tripName || ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, tripName: e.target.value })}
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="label">
                        Trip Location:
                    </label>
                    <select
                        value={tripLocation || ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, tripLocation: e.target.value })}
                        required
                    >
                        <option value="">Select location</option>
                        {stations.map((station) => (
                            <option key={station._id} value={station._id}>
                                {station.stationName} ({station.stationNumber})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <label className="label">
                        Trip Destination:
                    </label>
                    <select
                        value={tripDestination || ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, tripDestination: e.target.value })}
                        required
                    >
                        <option value="">Select Destination</option>
                        {stations.map((station) => (
                            <option key={station._id} value={station._id}>
                                {station.stationName} ({station.stationNumber})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <label className="label">
                        Departure Time:
                    </label>
                    <input
                        type="datetime-local"
                        value={departureTime ? new Date(departureTime).toISOString().substr(0, 16) : ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, departureTime: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className="form-column" style={{ width: '50%', padding: '0 25px' }}>
                <div className="form-row">
                    <label className="label">
                        Arrival Time:
                    </label>
                    <input
                        type="datetime-local"
                        value={arrivalTime ? new Date(arrivalTime).toISOString().substr(0, 16) : ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, arrivalTime: e.target.value })}
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="label">
                        Estimated Arrival Time:
                    </label>
                    <input
                        type="datetime-local"
                        value={estimatedArrival ? new Date(estimatedArrival).toISOString().substr(0, 16) : ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, estimatedArrival: e.target.value })}
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="label">
                        Estimated Departure Time:
                    </label>
                    <input
                        type="datetime-local"
                        value={estimatedDeparture ? new Date(estimatedDeparture).toISOString().substr(0, 16) : ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, estimatedDeparture: e.target.value })}
                        required
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="selectedBuses" className="form-label">
                        Associated Buses:
                    </label>
                    <Select
                        id="selectedBuses"
                        value={associatedBuses?.map((busId) => ({
                            value: busId,
                            label: buses.find((bus) => bus._id === busId)?.Busname || '',
                        }))}
                        isMulti
                        name="selectedBuses"
                        options={buses.map((bus) => ({
                            value: bus._id,
                            label: `${bus.Busname} (${bus.numberOfSeats} seats)`,
                        }))}
                        onChange={(selectedOptions) => setSingleTrip({ ...singleTrip, associatedBuses: selectedOptions.map((option) => option.value) })}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        required
                    />
                </div>
                <div className="form-row">
                    <label className="label">
                        Trip Line:
                    </label>
                    <input
                        type="text"
                        value={tripLine || ''}
                        onChange={(e) => setSingleTrip({ ...singleTrip, tripLine: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className="form-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <label className="label">
                    Status:
                    <br />
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="tripStatus"
                                value="upcoming"
                                checked={tripStatus === 'upcoming'}
                                onChange={() => setSingleTrip({ ...singleTrip, tripStatus: 'upcoming' })}
                            />
                            Upcoming
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="tripStatus"
                                value="ongoing"
                                checked={tripStatus === 'ongoing'}
                                onChange={() => setSingleTrip({ ...singleTrip, tripStatus: 'ongoing' })}
                            />
                            Ongoing
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="tripStatus"
                                value="completed"
                                checked={tripStatus === 'completed'}
                                onChange={() => setSingleTrip({ ...singleTrip, tripStatus: 'completed' })}
                            />
                            Completed
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="tripStatus"
                                value="canceled"
                                checked={tripStatus === 'canceled'}
                                onChange={() => setSingleTrip({ ...singleTrip, tripStatus: 'canceled' })}
                            />
                            Canceled
                        </label>
                    </div>
                </label>
            </div>
            <div className='submitdiv' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button type="submit" className="submit-button" style={{ marginLeft: '70px' }}>
                    Update Trip
                </button>
                <button onClick={() => setEdit(!edit)} type="button" style={{ backgroundColor: 'red', marginLeft: '10px' }}>
                    cancel
                </button>
            </div>
        </form>
    );
}

export default UpdateTripForm;
