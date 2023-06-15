import React, { useState } from 'react';
import axios from 'axios';

const Station = ({ getAllStations }) => {
    const [station, setStation] = useState({
        stationName: '',
        stationNumber: '',
        stationStatus: '',
    });

    const handleStationSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/stations', station);
            getAllStations();
            resetStationFields();
            console.log('Station created successfully');
        } catch (error) {
            console.error('Error creating station:', error);
        }
    };

    const handleChange = (e) => {
        setStation({
            ...station,
            [e.target.name]: e.target.value,
        });
    };

    const resetStationFields = () => {
        setStation({
            stationName: '',
            stationNumber: '',
            stationStatus: '',
        });
    };

    return (
        <div>
            <form onSubmit={handleStationSubmit}>
                <label>
                    Station Name:
                    <input
                        type="text"
                        name="stationName"
                        value={station.stationName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Station Number:
                    <input
                        type="text"
                        name="stationNumber"
                        value={station.stationNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Station Status:
                    <input
                        type="text"
                        name="stationStatus"
                        value={station.stationStatus}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button type="submit">Create Station</button>
                </div>
            </form>
        </div>
    );
};

export default Station;