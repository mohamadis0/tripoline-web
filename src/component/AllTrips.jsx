import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

import BasicModal from './Modal';
import UpdateTripForm from './edit/UpdateTrip';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function formatDateTime(dateTimeString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDateTime = new Date(dateTimeString).toLocaleString('en-US', options);
  return formattedDateTime;
}


const SingleTrip = (props) => {
  const [tripData, setTripData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalState, setModalState] = useState(false);


  const getSingleTrip = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/trips');
      setTripData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTrip();
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      await axios.delete(`http://localhost:3000/api/trips/${tripId}`);
      getSingleTrip();
      toast.success('Trip deleted successfully');
      setModalState(!modalState)
    } catch (error) {
      console.log(error);
      toast.error('Error deleting trip');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tripData.length - page * rowsPerPage);



  return (
    <div className="table-responsive">
      <TableContainer component={Paper}>
        <Table className="trip-table">
          <TableHead>
            <TableRow>
              <TableCell>Trip Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Bus Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Estimated Departure</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Estimated Arrival</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tripData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : tripData
            ).map((trip, index) => (
              <TableRow key={index}>
                <TableCell>{trip?.tripName}</TableCell>
                <TableCell>{trip?.tripLocation?.stationName}</TableCell>
                <TableCell>{trip?.tripDestination?.stationName}</TableCell>
                <TableCell>
                  {trip?.associatedBuses[index]?.Busname ? trip?.associatedBuses[index]?.Busname : 'no bus'}
                </TableCell>
                <TableCell>{trip.tripStatus}</TableCell>
                <TableCell>{formatDateTime(trip?.departureTime)}</TableCell>
                <TableCell>{formatDateTime(trip?.estimatedDeparture)}</TableCell>
                <TableCell>{formatDateTime(trip?.arrivalTime)}</TableCell>
                <TableCell>{formatDateTime(trip?.estimatedArrival)}</TableCell>
                <TableCell>
                  {/* <button
                    style={{
                      width: '100px',
                      height: '40px',
                      backgroundColor: 'red',
                      color: 'white',
                      margin: '1px',
                    }}
                    onClick={() => setModalState(true)}
                  >
                    Delete
                  </button> */}
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => setModalState(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* <button
                    style={{
                      width: '100px',
                      height: '40px',
                      backgroundColor: 'green',
                      color: 'white',
                      margin: '1px',
                    }}
                    onClick={() => {
                      setEditingTripId(trip._id);
                      setEdit(true);
                    }}
                  >
                    Edit
                  </button> */}
                  <IconButton
                    aria-label="edit"
                    color="secondary"
                    onClick={() => {
                      props.setEditingTripId(trip._id);
                      props.setEdit(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <BasicModal
                  handleDeleteTrip={handleDeleteTrip}
                  setModalState={setModalState}
                  modalState={modalState}
                  tripId={trip._id}
                />
              </TableRow>

            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={10} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tripData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     


      <ToastContainer />
    </div>

  );
};

export default SingleTrip;