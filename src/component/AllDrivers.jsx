import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import Loader from './Loader';

const AllDrivers = () => {
  const [driverData, setDriverData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.log(error);
      toast.error('Error deleting driver');
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, driverData.length - page * rowsPerPage);

  return (
    <div className="table-responsive">
      {isLoading ? (
        <Loader/>
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
                      <button
                        onClick={() => deleteDriver(driver._id)}
                        className='delete-button'
                      >
                        Delete
                      </button>
                    </TableCell>
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
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllDrivers;
