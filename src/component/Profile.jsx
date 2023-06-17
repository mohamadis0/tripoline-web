import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    profileName: '',
    profileDescription: '',
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/profiles', profile);
      resetProfileFields();
      console.log('Profile created successfully');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const resetProfileFields = () => {
    setProfile({
      profileName: '',
      profileDescription: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleProfileSubmit}>
        <label>
          Profile Name:
          <input
            type="text"
            name="profileName"
            value={profile.profileName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Profile Description:
          <input
            type="text"
            name="profileDescription"
            value={profile.profileDescription}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit">Create Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
