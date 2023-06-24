import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bus({ open, close }) {

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
      busName: busName,
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
    close(!open)
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
      <form onSubmit={handleBusSubmit} className=" form-container" style={{ marginRight:120}}>
        <div className="form-column" style={{ width: '100%', padding: '0 25px'}}>
          <div className="form-row" style={{marginLeft:30}}>
            <label htmlFor="busName" className="label">Bus Name:</label>
            <input
              type="text"
              id="busName"
              value={busName}
              onChange={handleBusNameChange}
              required
            />
          </div>
          <div className="form-row" style={{marginLeft:30}}>
            <label htmlFor="numberOfSeats" className="label">Number of Seats:</label>
            <input
              type="number"
              id="numberOfSeats"
              value={numberOfSeats}
              onChange={handleNumberOfSeatsChange}
              required
            />
          </div>
          <div className="form-row" style={{marginLeft:30}}>
            <label htmlFor="busDriver" className="label">Bus Driver:</label>
            <select
              id="busDriver"
              value={busDriver}
              onChange={handleBusDriverChange}
              className="select-input"
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
          <br />
          <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="submit-button" style={{ width: '100px' }}>
              Add Bus
            </button>
            <button type="button" className="delete-button" onClick={() => close(!open)} style={{ marginLeft: '10px', width: '100px' }}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Bus;
