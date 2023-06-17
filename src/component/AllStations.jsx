import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Modal, Box, Typography, Button } from '@mui/material';

const StationDeletionModal = ({ stationId, handleDeleteStation, modalState, setModalState }) => {
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
            Are you sure you want to delete this station?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <Button onClick={() => setModalState(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteStation(stationId)}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
};

const AllStations = () => {
  const [stationData, setStationData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalState, setModalState] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState('');

  const getAllStations = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/stations');
      setStationData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStation = async (stationId) => {
    try {
      await axios.delete(`http://localhost:3000/api/stations/${stationId}`);
      getAllStations();
      toast.success('Station deleted successfully');
      setModalState(false)
    } catch (error) {
      console.log(error);
      toast.error('Error deleting station');
      setModalState(false)
    }
  };

  useEffect(() => {
    getAllStations();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, stationData.length - page * rowsPerPage);

  const handleDeleteStationConfirmation = (stationId) => {
    setSelectedStationId(stationId);
    setModalState(true);
  };

  return (
    <div className="table-responsive">
      <Table className="bus-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? stationData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : stationData
          ).map((station, index) => (
            <TableRow key={index}>
              <TableCell>{station.stationName}</TableCell>
              <TableCell>{station.stationNumber}</TableCell>
              <TableCell>{station.stationStatus}</TableCell>
              <TableCell>
                <button
                  style={{ backgroundColor: 'red', color: 'white' }}
                  onClick={() => handleDeleteStationConfirmation(station._id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={stationData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <StationDeletionModal
        stationId={selectedStationId}
        handleDeleteStation={deleteStation}
        modalState={modalState}
        setModalState={setModalState}
      />
      <ToastContainer />
    </div>
  );
};

export default AllStations;
