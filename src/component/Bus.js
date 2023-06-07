import React, { useState } from 'react';
import { Input, FormControl, InputLabel } from '@mui/material';


function Bus() {

    const [bus, setBus] = useState({
        Busname: '',
        numberOfSeats: '',
        BusDriver: '',
    });

    const handleBusSubmit = (e) => {
        e.preventDefault();
        console.log(bus);
        resetBusFields();
    };

    const handleChange = (e) => {
        setBus({
            ...bus,
            [e.target.name]: e.target.value,
        });
    };

    const resetBusFields = () => {
        setBus({
            Busname: '',
            numberOfSeats: '',
            BusDriver: '',
        });
    };

    return (
        <div>
            <h2>Create Bus</h2>
            <form onSubmit={handleBusSubmit}>
                <label>
                    Bus Name:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">name</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="Busname"
                            value={bus.Busname}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Number of seats:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">nbr seats</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="number"
                            name="numberOfSeats"
                            value={bus.numberOfSeats}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <label>
                    Bus driver:
                    <FormControl>
                        <InputLabel htmlFor="standard-basic">driver</InputLabel>
                        <Input id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="text"
                            name="BusDriver"
                            value={bus.BusDriver}
                            onChange={handleChange} />
                    </FormControl>
                </label>
                <br />
                <button type="submit">Add Bus</button>
            </form>
        </div>
    );
};

export default Bus
