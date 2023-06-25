import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBus = ({ edit, setEdit, busId }) => {
    const [bus, setBus] = useState({});
    const [drivers, setDrivers] = useState([]);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/drivers');
            const driverData = response.data;
            setDrivers(driverData);
        } catch (error) {
            console.error(error);
        }
    };

    const getSpecificBusData = async (busId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/buses/${busId}`);
            const busData = response.data;
            setBus({
                ...busData,
            });
            console.log(busData)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedBus = {
                Busname: bus.Busname,
                numberOfSeats: bus.numberOfSeats,
                busDriver:bus.busDriver,
            };

            const response = await axios.put(`http://localhost:3000/api/buses/${busId}`, updatedBus);

            console.log(response.data);

            toast.success('Bus updated successfully'); // Display success toast message
            setEdit(false); // Hide the form after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update bus'); // Display error toast message
        }
    };

    useEffect(() => {
        fetchDrivers();
        getSpecificBusData(busId);
    }, [busId]);

    const {
        Busname,
        numberOfSeats,
        busDriver,
    } = bus;

    return (
        <div>
            <form onSubmit={handleSubmit} className=" form-container" style={{ marginRight: 120 }}>
                <ToastContainer />
                <div className="form-column" style={{ width: '100%', padding: '0 25px' }}>
                    <div className="form-row">
                        <label className='label'>
                            <h2>Update the bus</h2>
                        </label>
                    </div>
                    <div className="form-row" style={{ marginLeft: 30 }}>
                        <label htmlFor="busName" className="label">Bus Name:</label>
                        <input
                            type="text"
                            id="busName"
                            value={Busname || ''}
                            onChange={(e) => setBus({ ...bus, Busname: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row" style={{ marginLeft: 30 }}>
                        <label htmlFor="numberOfSeats" className="label">Number of Seats:</label>
                        <input
                            type="number"
                            id="numberOfSeats"
                            value={numberOfSeats || ''}
                            onChange={(e) => setBus({ ...bus, numberOfSeats: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row" style={{ marginLeft: 30 }}>
                        <label htmlFor="busDriver" className="label">Bus Driver:</label>
                        <select
                            id="busDriver"
                            value={busDriver || ''}
                            onChange={(e) => setBus({ ...bus, busDriver: e.target.value })}
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
                            Update Bus
                        </button>
                        <button type="button" className="delete-button" onClick={() => setEdit(!edit)} style={{ marginLeft: '10px', width: '100px' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateBus;