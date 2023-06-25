import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Profile = ({ open, close }) => {

  const [profile, setProfile] = useState({
    profileName: '',
    profileDescription: '',
  });



  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/profiles', profile);
      resetProfileFields();
      toast.success('Profile created successfully');
      console.log('Profile created successfully');
    } catch (error) {
      toast.error('Error creating profile');
      console.error('Error creating profile:', error);
    }
    close(!open)
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
      <form onSubmit={handleProfileSubmit} className='form-container' style={{ marginRight:100}}>
        <div className="form-column" style={{ width: '100%', padding: '0 25px' ,marginTop:15}}>
          <div className="form-row">
            <label className="label">
              Profile Name:
            </label>
            <input
              type="text"
              name="profileName"
              value={profile.profileName}
              onChange={handleChange}
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
              value={profile.profileDescription}
              onChange={handleChange}
              required
            />
            <br />
            <div className="submitdiv" style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="submit-button" style={{ width: '200px' }}>
                Add Profile
              </button>
              <button type="button" className="delete-button" onClick={() => close(!open)} style={{ marginLeft: '10px', width: '200px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Profile;
