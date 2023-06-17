import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

import BasicModal from './Modal';
import UpdateTripForm from './edit/UpdateTrip';
import Loader from './Loader';
import SingleTripForm from './SingleTripForm';

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

const SingleTrip = () => {
  const [tripData, setTripData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalState, setModalState] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openCreateTrip, setOpenCreateTrip] = useState(false);

  const getSingleTrip = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/trips');
      setTripData(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTrip();
    setOpenCreateTrip(!openCreateTrip)
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      setLoading(true); // Set loading state to true
      await axios.delete(`http://localhost:3000/api/trips/${tripId}`);
      getSingleTrip();
      toast.success('Trip deleted successfully');
      setModalState(!modalState);
      setLoading(false);
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
  const [edit, setEdit] = useState(false);

  return (
    <div className="table-responsive">
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table className="trip-table">
            <TableHead>
              <TableRow>
                <TableCell className="form-label">Trip Name</TableCell>
                <TableCell className="form-label">Location</TableCell>
                <TableCell className="form-label">Destination</TableCell>
                <TableCell className="form-label">Bus Name</TableCell>
                <TableCell className="form-label">Status</TableCell>
                <TableCell className="form-label">Departure Time</TableCell>
                <TableCell className="form-label">Estimated Departure</TableCell>
                <TableCell className="form-label">Arrival Time</TableCell>
                <TableCell className="form-label">Estimated Arrival</TableCell>
                <TableCell className="form-label">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? tripData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tripData
              ).map((trip, index) => (
                <TableRow key={index}>
                  <TableCell className="form-input">{trip?.tripName}</TableCell>
                  <TableCell className="form-input">{trip?.tripLocation?.stationName}</TableCell>
                  <TableCell className="form-input">{trip?.tripDestination?.stationName}</TableCell>
                  <TableCell className="form-input">
                    {trip?.associatedBuses[index]?.Busname ? trip?.associatedBuses[index]?.Busname : 'no bus'}
                  </TableCell>
                  <TableCell className="form-input">{trip.tripStatus}</TableCell>
                  <TableCell className="form-input">{formatDateTime(trip?.departureTime)}</TableCell>
                  <TableCell className="form-input">{formatDateTime(trip?.estimatedDeparture)}</TableCell>
                  <TableCell className="form-input">{formatDateTime(trip?.arrivalTime)}</TableCell>
                  <TableCell className="form-input">{formatDateTime(trip?.estimatedArrival)}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => setModalState(true)}
                      className='delete-button'
                    >
                      Delete
                    </button>
                    <button
                      className='edit-button'
                      onClick={() => {
                        setEditingTripId(trip._id);
                        setEdit(true);
                      }}
                    >
                      Edit
                    </button>

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
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tripData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <button
        style={{ backgroundColor: 'green', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}
        onClick={() => setOpenCreateTrip(!openCreateTrip)}
      >
        Add Trip
      </button>
      {edit && (
        <UpdateTripForm
          edit={edit}
          setEdit={setEdit}
          tripId={editingTripId}
        />
      )}
      {
        !openCreateTrip && (
          <SingleTripForm
            open={openCreateTrip}
            close={setOpenCreateTrip}
          />
        )
      }
      <ToastContainer />
    </div>
  );
};

export default SingleTrip;
