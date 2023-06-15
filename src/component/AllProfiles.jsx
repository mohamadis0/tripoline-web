import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AllProfiles = () => {
  const [profileData, setProfileData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllProfiles();
  }, []);

  const getAllProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profiles');
      setProfileData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error retrieving profiles:', error);
    }
  };

  const deleteProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:3000/api/profiles/${profileId}`);
      getAllProfiles();
      console.log('Profile deleted successfully');
    } catch (error) {
      console.log('Error deleting profile:', error);
      toast.error('Error deleting profile');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, profileData.length - page * rowsPerPage);


  return (
    <div className="table-responsive">
      <TableContainer component={Paper}>
        <Table className="profile-table">
          <TableHead>
            <TableRow>
              <TableCell>Profile Name</TableCell>
              <TableCell>Profile Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? profileData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : profileData
            ).map((profile) => (
              <TableRow key={profile._id}>
                <TableCell>{profile.profileName}</TableCell>
                <TableCell>{profile.profileDescription}</TableCell>
                <TableCell>
                  <button
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => deleteProfile(profile._id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>     
         </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={profileData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <ToastContainer />
    </div>
  );
};

export default AllProfiles;
