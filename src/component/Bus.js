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
      <h2>Create Bus</h2>
      <form onSubmit={handleBusSubmit}>
        <label>
          Bus Name:
          <input type="text" value={busName} onChange={handleBusNameChange} />
        </label>
        <br />
        <label>
          Number of seats:
          <input
            type="number"
            value={numberOfSeats}
            onChange={handleNumberOfSeatsChange}
          />
        </label>
        <br />
        <label>
          Bus driver:
          <select value={busDriver} onChange={handleBusDriverChange}>
            <option value="">Select driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.DriverName} {driver.DriverCardId}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
}

export default Bus;
