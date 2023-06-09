import React, { useState } from 'react';
import axios from 'axios';

function Driver() {
  const [driver, setDriver] = useState({
    DriverName: '',
    DriverPhone: '',
    DriverAge: 0,
    DriverCard: '',
    DriverCardId: '',
    DriverAddress: '',
  });


  const handleDriverSubmit = (e) => {
    e.preventDefault();
    console.log(driver);

    axios.post('http://localhost:3000/api/drivers', driver)
      .then((response) => {
        console.log(response.data);
        resetDriverFields();
      })
      .catch((error) => {
        console.error('Error adding driver:', error);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === 'DriverCard') {
      setDriver({
        ...driver,
        [e.target.name]: e.target.files[0].name, // Assuming you want to store the file name
      });
    } else {
      setDriver({
        ...driver,
        [e.target.name]: e.target.value,
      });
    }
  };

  const resetDriverFields = () => {
    setDriver({
      DriverName: '',
      DriverPhone: '',
      DriverAge: 0,
      DriverCard: '',
      DriverCardId: '',
      DriverAddress: '',
    });
  };

  return (
    <div>
      <h2>Create Driver</h2>
      <form onSubmit={handleDriverSubmit}>
        <label>
          Driver Name:
          <input
            type="text"
            name="DriverName"
            value={driver.DriverName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Driver phone:
          <input
            type="text"
            name="DriverPhone"
            value={driver.DriverPhone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Driver age:
          <input
            type="number"
            min={0}
            name="DriverAge"
            value={driver.DriverAge}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Driver card:
          <input
            type="file"
            name="DriverCard"
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Drive card-Id:
          <input
            type="text"
            name="DriverCardId"
            value={driver.DriverCardId}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Driver address:
          <input
            type="text"
            name="DriverAddress"
            value={driver.DriverAddress}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Driver</button>
      </form>
    </div>
  );
}

export default Driver;
