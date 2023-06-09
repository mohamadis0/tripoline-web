import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllDrivers = () => {
  const [driverData, setDriverData] = useState([]);

  const getAllDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/drivers');
      setDriverData(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDriver = async (driverId) => {
    try {
      await axios.delete(`http://localhost:3000/api/drivers/${driverId}`);
      getAllDrivers();
      toast.success('Driver deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting driver');
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  return (
    <div className="table-responsive">
      <table className="bus-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>License Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {driverData.map((driver, index) => (
            <tr key={index}>
              <td><img src={driver.DriverCard} /></td>
              <td>{driver.DriverName}</td>
              <td>{driver.DriverCardId}</td>
              <td>{driver.DriverAge}</td>
              <td>
                <button
                  style={{ backgroundColor: 'red' }}
                  onClick={() => deleteDriver(driver._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AllDrivers;
