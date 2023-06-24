import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = ({ edit, setEdit, profileId }) => {
    const [profile, setProfile] = useState({});

    const getSpecificProfileData = async (profileId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/profiles/${profileId}`);
            const profileData = response.data;
            setProfile({
                ...profileData,
            });
            console.log(profileData)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedProfile = {
                profileName: profile.profileName,
                profileDescription: profile.profileDescription,
            };

            const response = await axios.put(`http://localhost:3000/api/profiles/${profileId}`, updatedProfile);

            console.log(response.data);

            toast.success('Profile updated successfully'); // Display success toast message
            setEdit(false); // Hide the form after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile'); // Display error toast message
        }
    };

    useEffect(() => {
        getSpecificProfileData(profileId);
    }, [profileId]);

    const {
        profileName,
        profileDescription,
    } = profile;

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container' style={{ marginRight: 100 }}>
                <ToastContainer />
                <div className="form-column" style={{ width: '100%', padding: '0 25px', marginTop: 15 }}>
                    <div className="form-row">
                        <label className='label'>
                            <h2>Update the profile</h2>
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Profile Name:
                        </label>
                        <input
                            type="text"
                            name="profileName"
                            value={profileName || ''}
                            onChange={(e) => setProfile({ ...profile, profileName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="label">
                            Profile Description:
                        </label>
                        <input
                            type="text"
                            name="profileDescription"
                            value={profileDescription || ''}
                            onChange={(e) => setProfile({ ...profile, profileDescription: e.target.value })}
                            required
                        />
                        <br />
                        <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit" className="submit-button" style={{ width: '200px' }}>
                                Update Profile
                            </button>
                            <button type="button" className="delete-button" onClick={() => setEdit(!edit)} style={{ marginLeft: '10px', width: '200px' }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile;