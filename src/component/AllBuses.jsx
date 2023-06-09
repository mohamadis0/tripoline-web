import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBuses = () => {
  const [busData, setBusData] = useState([]);

  const getAllBuses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/buses');
      setBusData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBus = async (busId) => {
    try {
      await axios.delete(`http://localhost:3000/api/buses/${busId}`);
      getAllBuses();
      toast.success('Bus deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting bus');
    }
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  return (
    <div className="table-responsive">
      <table className="bus-table">
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Capacity</th>
            <th>Driver Name</th>
            <th>Driver Card Id</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {busData.map((bus, index) => (
            <tr key={index}>
              <td>{bus.Busname}</td>
              <td>{bus.numberOfSeats}</td>
              <td>{bus?.busDriver?.DriverName?bus?.busDriver?.DriverName:'no driver'}</td>
              <td>{bus?.busDriver?.DriverCardId?bus?.busDriver?.DriverCardId:'no driver'}</td>
              <td>
                <button
                  style={{ backgroundColor: 'red' }}
                  onClick={() => deleteBus(bus._id)}
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

export default AllBuses;
