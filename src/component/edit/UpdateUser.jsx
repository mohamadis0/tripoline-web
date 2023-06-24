import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = ({ edit, setEdit, userId }) => {

    const [user, setUser] = useState({});
    const [profiles, setProfiles] = useState([]);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/profiles');
            const profileData = response.data;
            setProfiles(profileData);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllUsers = async (userId) => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            const userData = response.data;
            const specificUser = userData.find((user) => user._id === userId);
            setUser({
                ...specificUser,
                profileId: specificUser.profileId?._id || '',
            });
            console.log(specificUser)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedUser = {
                username: user.username,
                password: user.password,
                passwordConfirm: user.passwordConfirm,
                profileId: user.profileId,
                email: user.email,
                phone: user.phone,
            };

            const response = await axios.put(`http://localhost:3000/api/users/${userId}`, updatedUser);

            console.log(response.data);

            toast.success('User updated successfully'); // Display success toast message
            setEdit(false); // Hide the form after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update user'); // Display error toast message
        }
    };

    useEffect(() => {
        fetchProfiles();
        getAllUsers(userId);
    }, [userId]);

    const {
        username,
        password,
        passwordConfirm,
        profileId,
        email,
        phone,
    } = user;

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container' style={{ marginRight: 50 }}>
                <ToastContainer />
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row">
                        <label className='label'>
                            <h2>Update the user</h2>
                        </label>
                    </div>
                    <div className="form-row" >
                        <label className="label">
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username || ''}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row"  >
                        <label className="label">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email || ''}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password || ''}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="form-column" style={{ width: '50%', padding: '0 25px', marginTop: 72 }}>
                    <div className="form-row">
                        <label className="label">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            value={passwordConfirm || ''}
                            onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Profile:
                        </label>
                        <select
                            value={profileId || ''}
                            onChange={(e) => setUser({ ...user, profileId: e.target.value })}
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
                            value={phone || ''}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <button type="submit" className="submit-button" style={{ width: '200px', marginLeft: 110 }}>
                        Update User
                    </button>
                    <button type="button" className="delete-button" onClick={() => setEdit(!edit)} style={{ marginLeft: '10px', width: '200px' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser;