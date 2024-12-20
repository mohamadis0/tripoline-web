import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, Modal, Typography, Button, Box, TableRow, Paper, TablePagination } from '@mui/material';
import Loader from './Loader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import BasicModal from './Modal';


const DriverDeletionModal = ({ driverId, handleDeleteDriver, modalState, setModalState }) => {
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
            Are you sure you want to delete this driver?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <Button onClick={() => setModalState(false)}>Cancel</Button>
          <Button
            className='delete-button'
            onClick={() => handleDeleteDriver(driverId)}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
};

const AllDrivers = (props) => {
  const [driverData, setDriverData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [openCreateDriver, setOpenCreateDriver] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState('');


  const getAllDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/drivers');
      setDriverData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDriver = async (driverId) => {
    try {
      await axios.delete(`http://localhost:3000/api/drivers/${driverId}`);
      getAllDrivers();
      toast.success('Driver deleted successfully');
      // setModalState(!modalState);//
      setModalState(false);//
    } catch (error) {
      console.log(error);
      toast.error('Error deleting driver');
      setModalState(false);//
    }
  };

  useEffect(() => {
    getAllDrivers();
    setOpenCreateDriver(!openCreateDriver)
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, driverData.length - page * rowsPerPage);

  const handleDeleteDriverConfirmation = (driverId) => {
    setSelectedDriverId(driverId);
    setModalState(true);
  };

  return (
    <div className="table-responsive">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className="bus-table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>License Number</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? driverData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : driverData
                ).map((driver, index) => (
                  <TableRow key={index}>
                    <TableCell><img src={driver.DriverCard} alt="Driver Card" /></TableCell>
                    <TableCell>{driver.DriverName}</TableCell>
                    <TableCell>{driver.DriverCardId}</TableCell>
                    <TableCell>{driver.DriverAge}</TableCell>
                    <TableCell>
                      {/* <button
                        onClick={() => deleteDriver(driver._id)}
                        className='delete-button'
                      >
                        Delete
                      </button> */}
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        className='delete-button'
                        // onClick={() => setModalState(true)}
                        onClick={() => handleDeleteDriverConfirmation(driver._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        className='edit-button'
                        onClick={() => {
                          props.setEditingDriverId(driver._id);
                          props.setEdit(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    {/* <BasicModal
                    handleDeleteDriver={deleteDriver}
                    setModalState={setModalState}
                    modalState={modalState}
                    driverId={driver._id}
                  /> */}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={driverData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <DriverDeletionModal
            driverId={selectedDriverId}
            handleDeleteDriver={deleteDriver}
            modalState={modalState}
            setModalState={setModalState}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllDrivers;
