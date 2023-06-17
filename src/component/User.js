import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        profileId: '',
        phone: '',
    });

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/profiles');
            setProfiles(response.data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/users', user);
            resetUserFields();
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const resetUserFields = () => {
        setUser({
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            profileId: '',
            phone: '',
        });
    };

    return (
        <div>
            <form onSubmit={handleUserSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={user.passwordConfirm}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Profile:
                    <select name="profileId"
                        value={user.profileId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a profile</option>
                        {profiles.map((profile) => (
                            <option key={profile._id} value={profile._id}>
                                {profile.profileName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button type="submit">Create User</button>
                </div>
            </form>
        </div>
    );
};

export default User;
