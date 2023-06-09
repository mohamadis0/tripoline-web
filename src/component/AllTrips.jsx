import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function formatDateTime(dateTimeString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDateTime = new Date(dateTimeString).toLocaleString('en-US', options);
  return formattedDateTime;
}

const SingleTrip = () => {
  const [tripData, setTripData] = useState(null);

  const getSingleTrip = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/trips');
      setTripData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTrip();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      await axios.delete(`http://localhost:3000/api/trips/${tripId}`);
      getSingleTrip();
      toast.success('Trip deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting trip');
    }
  };


  return (
    <div className="table-responsive">
      <table className="trip-table">
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Location</th>
            <th>Destination</th>
            <th>Bus Name</th>

            <th>Status</th>
            <th>Departure Time</th>
            <th>Estimated Departure</th>
            <th>Arrival Time</th>
            <th>Estimated Arrival</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {tripData &&
            tripData.map((trip, index) => (
              <tr key={index}>
                <td>{trip?.tripName}</td>
                <td>{trip?.tripLocation?.stationName}</td>
                <td>{trip?.tripDestination?.stationName}</td>
                <td>{trip?.associatedBuses[index]?.Busname ? trip?.associatedBuses[index]?.Busname : 'no bus'}</td>
                <td>{trip.tripStatus}</td>
                <td>{formatDateTime(trip?.departureTime)}</td>
                <td>{formatDateTime(trip?.estimatedDeparture)}</td>
                <td>{formatDateTime(trip?.arrivalTime)}</td>
                <td>{formatDateTime(trip?.estimatedArrival)}</td>
                <td>
                  <button
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleDeleteTrip(trip._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default SingleTrip;
