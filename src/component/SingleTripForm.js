import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const SingleTripForm = ({ open, close }) => {

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
    };

    axios
      .post('http://localhost:3000/api/trips', data)
      .then((res) => {
        console.log(res.data);
        toast.success('Trip added successfully!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error adding trip!');
      });

    close(!open)

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
  };

  return (
    <form onSubmit={handleSubmit} className='form-container' >
      <div className="form-column" style={{ width: '50%', padding: '0 25px' }}>
        <div className="form-row">
          <label className="label">
            Trip Name:
          </label>
          <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} required />
        </div>
        <div className="form-row">
          <label className="label">
            Trip Location:
          </label>
          <select
            value={tripLocation}
            onChange={(e) => setTripLocation(e.target.value)}
            required
            className="select-input"
          >
            <option value="">Select location</option>
            {stations.map((station) => (
              <option key={station._id} value={station._id}>
                {station.stationName}, ({station.stationNumber})
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className="label">
            Trip Destination:
          </label>
          <select
            value={tripDestination}
            onChange={(e) => setTripDestination(e.target.value)}
            required
            className="select-input"
          >
            <option value="">Select Destination</option>
            {stations.map((station) => (
              <option key={station._id} value={station._id}>
                {station.stationName}, ({station.stationNumber})
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
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label className="label">
            Arrival Time:
          </label>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-column" style={{ width: '50%', padding: '0 10px' }}>
        <div className="form-row">
          <label className="label">
            Estimated Arrival Time:
          </label>
          <input
            type="datetime-local"
            value={estimatedArrival}
            onChange={(e) => setEstimatedArrival(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label className="label">
            Estimated Departure Time:
          </label>
          <input
            type="datetime-local"
            value={estimatedDeparture}
            onChange={(e) => setEstimatedDeparture(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="selectedBuses" className="label">
            Associated Buses:
          </label>
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
            className="select-input"
            classNamePrefix="select"
            required
          />
        </div>
        <div className="form-row">
          <label className="label">
            Trip Line:
          </label>
          <input type="text" value={tripLine} onChange={(e) => setTripLine(e.target.value)} required />
        </div>
      </div>
      <div className="form-row " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <label className="label">
          Status:
          <br />
          <br />
          <div className="radio-group" style={{ display: 'flex' }}>
            <label className="radio-label">
              <input
                type="radio"
                name="tripStatus"
                value="upcoming"
                checked={tripStatus === 'upcoming'}
                onChange={() => setTripStatus('upcoming')}
              />
              Upcoming
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="tripStatus"
                value="ongoing"
                checked={tripStatus === 'ongoing'}
                onChange={() => setTripStatus('ongoing')}
              />
              Ongoing
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="tripStatus"
                value="completed"
                checked={tripStatus === 'completed'}
                onChange={() => setTripStatus('completed')}
              />
              Completed
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="tripStatus"
                value="canceled"
                checked={tripStatus === 'canceled'}
                onChange={() => setTripStatus('canceled')}
              />
              Canceled
            </label>
          </div>
        </label>
      </div>
      <div className='submitdiv'>
        <button type="submit" className="submit-button" style={{ marginLeft: '70px' }}>
          Add Trip
        </button>
        <button type="button" style={{ marginLeft: '10px' }} className="delete-button" onClick={() => close(!open)}>
          Cancel
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default SingleTripForm;
