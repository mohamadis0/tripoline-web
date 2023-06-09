import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [adminFormData, setAdminFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
    });

    const [busManagerFormData, setBusManagerFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
    });

    const handleAdminFormSubmit = async (e) => {
        e.preventDefault();
        const adminProfileId = '647b730444323160555d2eab';
        const adminData = { ...adminFormData, profileId: adminProfileId };
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', adminData);
            console.log('Admin Form Submit Response:', response.data);
        } catch (error) {
            console.error('Admin Form Submit Error:', error);
        }
    };

    const handleBusManagerFormSubmit = async (e) => {
        e.preventDefault();
        const busManagerProfileId = '647b73d744323160555d2eaf';
        const busManagerData = { ...busManagerFormData, profileId: busManagerProfileId };
        try {
            const response = await axios.post('http://localhost:3000/api/users/register', busManagerData);
            console.log('Bus Manager Form Submit Response:', response.data);
        } catch (error) {
            console.error('Bus Manager Form Submit Error:', error);
        }
    };

    const handleAdminInputChange = (e) => {
        const { name, value } = e.target;
        setAdminFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleBusManagerInputChange = (e) => {
        const { name, value } = e.target;
        setBusManagerFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='containerForprofile'>
            <form onSubmit={handleAdminFormSubmit}>
                <h2>Create Admin</h2>
                <label htmlFor="adminUsername">Username:</label>
                <input type="text" id="adminUsername" name="username" value={adminFormData.username} onChange={handleAdminInputChange} required />

                <label htmlFor="adminEmail">Email:</label>
                <input type="email" id="adminEmail" name="email" value={adminFormData.email} onChange={handleAdminInputChange} required />

                <label htmlFor="adminPhone">Phone:</label>
                <input type="tel" id="adminPhone" name="phone" value={adminFormData.phone} onChange={handleAdminInputChange} required />

                <label htmlFor="adminPassword">Password:</label>
                <input type="password" id="adminPassword" name="password" value={adminFormData.password} onChange={handleAdminInputChange} required />

                <label htmlFor="adminPasswordConfirm">Confirm Password:</label>
                <input type="password" id="adminPasswordConfirm" name="passwordConfirm" value={adminFormData.passwordConfirm} onChange={handleAdminInputChange} required />

                <br />
                <br />
                <button type="submit">Create Admin</button>
            </form>

            <form onSubmit={handleBusManagerFormSubmit}>
                <h2>Create Bus Manager</h2>
                <label htmlFor="busManagerUsername">Username:</label>
                <input type="text" id="busManagerUsername" name="username" value={busManagerFormData.username} onChange={handleBusManagerInputChange} required />

                <label htmlFor="busManagerEmail">Email:</label>
                <input type="email" id="busManagerEmail" name="email" value={busManagerFormData.email} onChange={handleBusManagerInputChange} required />

                <label htmlFor="busManagerPhone">Phone:</label>
                <input type="tel" id="busManagerPhone" name="phone" value={busManagerFormData.phone} onChange={handleBusManagerInputChange} required />

                <label htmlFor="busManagerPassword">Password:</label>
                <input type="password" id="busManagerPassword" name="password" value={busManagerFormData.password} onChange={handleBusManagerInputChange} required />

                <label htmlFor="busManagerPasswordConfirm">Confirm Password:</label>
                <input type="password" id="busManagerPasswordConfirm" name="passwordConfirm" value={busManagerFormData.passwordConfirm} onChange={handleBusManagerInputChange} required />
                <br />
                <br />
                <button type="submit">Create Bus Manager</button>
            </form>
        </div>
    );
};

export default Profile;
