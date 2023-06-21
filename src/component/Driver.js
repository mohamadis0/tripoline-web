import React, { useState } from 'react';
import axios from 'axios';

function Driver({ open, close }) {

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
    close(!open)
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
      <form onSubmit={handleDriverSubmit} className='form-container' style={{ marginRight:100}}>
        <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
          <div className="form-row" >
            <label className="label">
              Driver Name:
            </label>
            <input
              type="text"
              name="DriverName"
              value={driver.DriverName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row" >
            <label className="label">
              Driver phone:
            </label>
            <input
              type="text"
              name="DriverPhone"
              value={driver.DriverPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label className="label">
              Driver age:
            </label>
            <input
              type="number"
              min={0}
              name="DriverAge"
              value={driver.DriverAge}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-column" style={{ width: '50%', marginTop: 15 }}>
          <div className="form-row">
            <label className="label">
              Driver card:
            </label>
            <input
              type="file"
              name="DriverCard"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label className="label">
              Drive card-Id:
            </label>
            <input
              type="text"
              name="DriverCardId"
              value={driver.DriverCardId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label className="label">
              Driver address:
            </label>
            <input
              type="text"
              name="DriverAddress"
              value={driver.DriverAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <button type="submit" className="submit-button" style={{ width: '200px', marginLeft:80 }}>
            Add Driver
          </button>
          <button type="button" className="delete-button" onClick={() => close(!open)} style={{ marginLeft: 30, width: '200px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Driver;
