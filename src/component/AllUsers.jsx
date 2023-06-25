import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Modal, Box, Typography, Button } from '@mui/material';
import Loader from './Loader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UserDeletionModal = ({ userId, handleDeleteUser, modalState, setModalState }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this user?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <Button onClick={() => setModalState(false)}>Cancel</Button>
          <Button
            className='delete-button'
            onClick={() => handleDeleteUser(userId)}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
};


const AllUsers = (props) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loader state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalState, setModalState] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');


  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUserData(response.data);
      setIsLoading(false); // Update loader state
      console.log(response.data);
    } catch (error) {
      console.log('Error retrieving users:', error);
    }
  };

  useEffect(() => {
    getAllUsers();
    setOpenCreateUser(!openCreateUser)
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      getAllUsers();
      toast.success('User deleted successfully'); // Display success notification
      // setModalState(!modalState);//
      setModalState(false);
    } catch (error) {
      console.log('Error deleting user:', error);
      toast.error('Error deleting user'); // Display error notification
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userData.length - page * rowsPerPage);

  const handleDeleteUserConfirmation = (userId) => {
    setSelectedUserId(userId);
    setModalState(true);
  };

  return (
    <div className="table-responsive">
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table className="user-table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Profile ID</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : userData).map(
                (user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user?.profileId?.profileName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>
                      {/* <button
                        onClick={() => deleteUser(user._id)}
                        className='delete-button'
                      >
                        Delete
                      </button> */}
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        className='delete-button'
                        // onClick={() => setModalState(true)}
                        onClick={() => handleDeleteUserConfirmation(user._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        className='edit-button'
                        onClick={() => {
                          props.setEditingUserId(user._id);
                          props.setEdit(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    {/* <BasicModal
                      handleDeleteUser={deleteUser}
                      setModalState={setModalState}
                      modalState={modalState}
                      userId={user._id}
                    />                   */}
                  </TableRow>
                )
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!isLoading && ( // Render pagination and ToastContainer if isLoading is false
        <>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <UserDeletionModal
            userId={selectedUserId}
            handleDeleteUser={deleteUser}
            modalState={modalState}
            setModalState={setModalState}
          />
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default AllUsers;
