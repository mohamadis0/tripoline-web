import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const SingleTripForm = () => {
    const [tripName, setTripName] = useState('');
    const [tripLocation, setTripLocation] = useState('');
    const [tripDestination, setTripDestination] = useState('');
    const [estimatedDeparture, setEstimatedDeparture] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [estimatedArrival, setEstimatedArrival] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [tripLine, setTripLine] = useState('');
    const [tripStatus, setTripStatus] = useState('upcoming');
    const [buses, setBuses] = useState([]);
    const [associatedBuses, setAssociatedBuses] = useState([]);
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState([]);

    const getBuses = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/buses');
            setBuses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getStations = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/stations');
            setStations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStations();
        getBuses();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            tripName,
            tripLocation,
            tripDestination,
            estimatedDeparture,
            departureTime,
            estimatedArrival,
            arrivalTime,
            tripLine,
            tripStatus,
            associatedBuses: associatedBuses.map((bus) => bus.value),
            stations: selectedStations.map((station) => station.value),
        };

        axios
            .post('http://localhost:3000/api/trips', data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setTripName('');
        setTripLocation('');
        setTripDestination('');
        setEstimatedDeparture('');
        setDepartureTime('');
        setEstimatedArrival('');
        setArrivalTime('');
        setTripLine('');
        setTripStatus('upcoming');
        setAssociatedBuses([]);
        setSelectedStations([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>
                    Trip Name:
                    <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Trip Location:
                    <select value={tripLocation} onChange={(e) => setTripLocation(e.target.value)} required>
                        <option value="">Select location</option>
                        {stations.map((station) => (
                            <option key={station._id} value={station._id}>
                                {station.stationName}, ({station.stationNumber})
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="form-row">
                <label>
                    Trip Destination:
                    <select value={tripDestination} onChange={(e) => setTripDestination(e.target.value)} required>
                        <option value="">Select Destination</option>
                        {stations.map((station) => (
                            <option key={station._id} value={station._id}>
                                {station.stationName}, ({station.stationNumber})
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="form-row">
                <label>
                    Departure Time:
                    <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Arrival Time:
                    <input type="datetime-local" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Estimated Arrival Time:
                    <input type="datetime-local" value={estimatedArrival} onChange={(e) => setEstimatedArrival(e.target.value)} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Estimated Departure Time:
                    <input type="datetime-local" value={estimatedDeparture} onChange={(e) => setEstimatedDeparture(e.target.value)} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Trip Line:
                    <input type="text" value={tripLine} onChange={(e) => setTripLine(e.target.value)} required />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Status:
                    <div>
                        <label>
                            <input type="radio" name="tripStatus" value="upcoming" checked={tripStatus === 'upcoming'} onChange={() => setTripStatus('upcoming')} />
                            Upcoming
                        </label>
                        <label>
                            <input type="radio" name="tripStatus" value="ongoing" checked={tripStatus === 'ongoing'} onChange={() => setTripStatus('ongoing')} />
                            Ongoing
                        </label>
                        <label>
                            <input type="radio" name="tripStatus" value="completed" checked={tripStatus === 'completed'} onChange={() => setTripStatus('completed')} />
                            Completed
                        </label>
                        <label>
                            <input type="radio" name="tripStatus" value="canceled" checked={tripStatus === 'canceled'} onChange={() => setTripStatus('canceled')} />
                            Canceled
                        </label>
                    </div>
                </label>
            </div>
            <div className="form-row">
                <label htmlFor="selectedBuses" className="form-label">
                    Associated Buses:
                    <Select
                        id="selectedBuses"
                        value={associatedBuses}
                        isMulti
                        name="selectedBuses"
                        options={buses.map((bus) => ({
                            value: bus._id,
                            label: `${bus.Busname} (${bus.numberOfSeats} seats)`,
                        }))}
                        onChange={(selectedOptions) => setAssociatedBuses(selectedOptions)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        required
                    />
                </label>
            </div>
            <div className="form-row">
                <label htmlFor="selectedStations" className="form-label">
                    Stations:
                    <Select
                        id="selectedStations"
                        value={selectedStations}
                        isMulti
                        name="selectedStations"
                        options={stations.map((station) => ({
                            value: station._id,
                            label: `${station.stationName} (${station.stationNumber})`,
                        }))}
                        onChange={(selectedOptions) => setSelectedStations(selectedOptions)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        required
                    />
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button type="submit">Add Trip</button>
            </div>
        </form>
    );
};

export default SingleTripForm;
