import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Loader from './Loader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal from './Modal';

const AllProfiles = (props) => {
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalState, setModalState] = useState(false);
  const [openCreateProfile, setOpenCreateProfile] = useState(false);


  useEffect(() => {
    getAllProfiles();
    setOpenCreateProfile(!openCreateProfile)
  }, []);

  const getAllProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/profiles');
      setProfileData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error retrieving profiles:', error);
      setLoading(false);
      toast.error('Error retrieving profiles');
    }
  };

  const deleteProfile = async (profileId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/profiles/${profileId}`);
      getAllProfiles();
      console.log('Profile deleted successfully');
      setLoading(false);
      toast.success('Profile deleted successfully');
      setModalState(!modalState);//
    } catch (error) {
      console.log('Error deleting profile:', error);
      setLoading(false);
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
                      {/* <button
                        onClick={() => deleteProfile(profile._id)}
                        className='delete-button'
                      >
                        Delete
                      </button> */}
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        className='delete-button'
                        // onClick={() => deleteProfile(profile._id)}
                        onClick={() => setModalState(true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        className='edit-button'
                        onClick={() => {
                          props.setEditingProfileId(profile._id);
                          props.setEdit(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <BasicModal
                    handleDeleteProfile={deleteProfile}
                    setModalState={setModalState}
                    modalState={modalState}
                    profileId={profile._id}
                  />
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
        </>
      )
      }
      <ToastContainer />
    </div >
  );
};

export default AllProfiles;
