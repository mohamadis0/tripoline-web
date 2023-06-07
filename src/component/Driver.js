import React, { useState } from 'react';
import { Input, FormControl, InputLabel } from '@mui/material';


function Driver() {

    const [driver, setDriver] = useState({
        DriverName: '',
        DriverPhone: '',
        DriverAge: '',
        DriverCard: '',
        DriverCardId: '',
        DriverAddress: '',
    });

    const handleDriverSubmit = (e) => {
        e.preventDefault();
        console.log(driver);
        resetDriverFields();
    };

    const handleChange = (e) => {
        setDriver({
            ...driver,
            [e.target.name]: e.target.value,
        });
    };

    const resetDriverFields = () => {
        setDriver({
            DriverName: '',
            DriverPhone: '',
            DriverAge: '',
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
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">name</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="DriverName"
                            value={driver.DriverName}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Driver phone:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">phone</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="phone"
                            name="DriverPhone"
                            value={driver.DriverPhone}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Driver age:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">age</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="number"
                            name="DriverAge"
                            value={driver.DriverAge}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Driver card:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">card</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="DriverCard"
                            value={driver.DriverCard}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Drive card-Id:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">id</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="DriverCardId"
                            value={driver.DriverCardId}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Driver address:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">address</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="DriverAddress"
                            value={driver.DriverAddress}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <button type="submit">Add Driver</button>
            </form>
        </div>
    );
};

export default Driver