import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bus() {
  const [busName, setBusName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [busDriver, setBusDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/drivers');
      setDrivers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBusSubmit = async (e) => {
    e.preventDefault();

    const busData = {
      Busname: busName,
      numberOfSeats: numberOfSeats,
      busDriver: busDriver,
    };

    try {
      const res = await axios.post('http://localhost:3000/api/buses', busData);
      console.log(res.data);
      resetBusFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBusNameChange = (e) => {
    setBusName(e.target.value);
  };

  const handleNumberOfSeatsChange = (e) => {
    setNumberOfSeats(e.target.value);
  };

  const handleBusDriverChange = (e) => {
    setBusDriver(e.target.value);
  };

  const resetBusFields = () => {
    setBusName('');
    setNumberOfSeats('');
    setBusDriver('');
  };

  return (
    <div>
      <form onSubmit={handleBusSubmit} className="bus-form">
        <div className="form-group">
          <label htmlFor="busName">Bus Name:</label>
          <input
            type="text"
            id="busName"
            value={busName}
            onChange={handleBusNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfSeats">Number of Seats:</label>
          <input
            type="number"
            id="numberOfSeats"
            value={numberOfSeats}
            onChange={handleNumberOfSeatsChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="busDriver">Bus Driver:</label>
          <select
            id="busDriver"
            value={busDriver}
            onChange={handleBusDriverChange}
            required
          >
            <option value="">Select driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.DriverName} {driver.DriverCardId}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Add Bus</button>
        </div>
      </form>
    </div>
  );
}

export default Bus;
