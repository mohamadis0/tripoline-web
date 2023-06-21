import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader'
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';


const BusDeletionModal = ({ busId, handleDeleteBus, modalState, setModalState }) => {
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
            Are you sure you want to delete this bus?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <Button onClick={() => setModalState(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteBus(busId)}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
};

const AllBuses = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalState, setModalState] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState('');

  const getAllBuses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/buses');
      setBusData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteBus = async (busId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/buses/${busId}`);
      await getAllBuses();
      toast.success('Bus deleted successfully');
      setModalState(false);
    } catch (error) {
      console.log(error);
      toast.error('Error deleting bus');
      setModalState(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBuses();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, busData.length - page * rowsPerPage);

  const handleDeleteBusConfirmation = (busId) => {
    setSelectedBusId(busId);
    setModalState(true);
  };

  return (
    <div className="table-responsive">
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table className="bus-table">
            <TableHead>
              <TableRow>
                <TableCell>Bus Name</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Driver Name</TableCell>
                <TableCell>Driver Card Id</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 ? busData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : busData).map(
                (bus, index) => (
                  <TableRow key={index}>
                    <TableCell>{bus.Busname}</TableCell>
                    <TableCell>{bus.numberOfSeats}</TableCell>
                    <TableCell>
                      {bus?.busDriver?.DriverName ? bus?.busDriver?.DriverName : 'no driver'}
                    </TableCell>
                    <TableCell>
                      {bus?.busDriver?.DriverCardId ? bus?.busDriver?.DriverCardId : 'no driver'}
                    </TableCell>
                    <TableCell>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteBusConfirmation(bus._id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                )
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={busData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <BusDeletionModal
        busId={selectedBusId}
        handleDeleteBus={deleteBus}
        modalState={modalState}
        setModalState={setModalState}
      />
      <ToastContainer />
    </div>
  );
};

export default AllBuses;
