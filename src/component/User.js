import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [profileId, setProfileId] = useState('');
    const [phone, setPhone] = useState('');
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
        const user = {
            username,
            email,
            password,
            passwordConfirm,
            profileId,
            phone,
        };

        try {
            await axios.post('http://localhost:3000/api/users/register', user);
            resetUserFields();
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const resetUserFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setProfileId('');
        setPhone('');
    };

    return (
        <div>
            <form onSubmit={handleUserSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Profile:
                    <select
                        value={profileId}
                        onChange={(e) => setProfileId(e.target.value)}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
