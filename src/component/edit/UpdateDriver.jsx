import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UpdateDriver = ({ edit, setEdit, driverId }) => {

    const [driver, setDriver] = useState({});

    const getAllDrivers = async (driverId) => {
        try {
            const response = await axios.get('http://localhost:3000/api/drivers');
            const driverData = response.data;
            const specificUser = driverData.find((driver) => driver._id === driverId);
            setDriver({
                ...specificUser,
            });
            console.log(specificUser)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedDriver = {
                DriverName: driver.DriverName,
                DriverPhone: driver.DriverPhone,
                DriverAge: driver.DriverAge,
                DriverCardId: driver.DriverCardId,
                DriverAddress: driver.DriverAddress,
            };

            const response = await axios.put(`http://localhost:3000/api/drivers/${driverId}`, updatedDriver);

            console.log(response.data);

            toast.success('driver updated successfully'); // Display success toast message
            setEdit(false); // Hide the form after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update driver'); // Display error toast message
        }
    };

    useEffect(() => {
        getAllDrivers(driverId);
    }, [driverId]);

    const {
        DriverName,
        DriverPhone,
        DriverAge,
        DriverCardId,
        DriverAddress,
    } = driver;

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container' style={{ marginRight: 100, marginLeft: 50 }}>
                <ToastContainer />
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row">
                        <label className='label'>
                            <h2>Update the driver</h2>
                        </label>
                    </div>
                    <div className="form-row" >
                        <label className="label">
                            Driver Name:
                        </label>
                        <input
                            type="text"
                            name="DriverName"
                            value={DriverName || ''}
                            onChange={(e) => setDriver({ ...driver, DriverName: e.target.value })}
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
                            value={DriverPhone || ''}
                            onChange={(e) => setDriver({ ...driver, DriverPhone: e.target.value })}
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
                            value={DriverAge || ''}
                            onChange={(e) => setDriver({ ...driver, DriverAge: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="form-column" style={{ width: '50%', marginTop: 72 }}>
                    <div className="form-row">
                        <label className="label">
                            Driver card:
                        </label>
                        <input
                            type="file"
                            name="DriverCard"
                            // value={DriverCard}
                            onChange={(e) => setDriver({ ...driver,[e.target.name]: e.target.files[0].name, })}
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
                            value={DriverCardId || ''}
                            onChange={(e) => setDriver({ ...driver, DriverCardId: e.target.value })}
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
                            value={DriverAddress || ''}
                            onChange={(e) => setDriver({ ...driver, DriverAddress: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <button type="submit" className="submit-button" style={{ width: '200px', marginLeft: 80 }}>
                        Update Driver
                    </button>
                    <button type="button" className="delete-button" onClick={() => setEdit(!edit)} style={{ marginLeft: 30, width: '200px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateDriver;