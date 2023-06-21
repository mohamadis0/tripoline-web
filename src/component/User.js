import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ open, close }) => {
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
        close(!open)
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
            <form onSubmit={handleUserSubmit} className='form-container' style={{ marginRight:50}}>
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row" >
                        <label className="label">
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row"  >
                        <label className="label">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row">
                        <label className="label">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Profile:
                        </label>
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
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Phone:
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center' , marginTop: 20 }}>
                    <button type="submit" className="submit-button" style={{ width: '200px', marginLeft: 110  }}>
                        Add User
                    </button>
                    <button type="button" className="delete-button" onClick={() => close(!open)} style={{ marginLeft: '10px', width: '200px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default User;
