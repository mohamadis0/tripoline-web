import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllStations = () => {
  const [stationData, setStationData] = useState([]);

  const getAllStations = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/stations');
      setStationData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStation = async (stationId) => {
    try {
      await axios.delete(`http://localhost:3000/api/stations/${stationId}`);
      getAllStations();
      toast.success('Station deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting station');
    }
  };

  useEffect(() => {
    getAllStations();
  }, []);

  return (
    <div className="table-responsive">
      <table className="bus-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stationData.map((station, index) => (
            <tr key={index}>
              <td>{station.stationName}</td>
              <td>{station.stationNumber}</td>
              <td>{station.stationStatus}</td>
              <td>
                <button
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={() => deleteStation(station._id)}
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

export default AllStations;
