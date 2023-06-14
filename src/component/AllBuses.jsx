import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AllBuses = () => {

  const [busData, setBusData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const getAllBuses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/buses');
      setBusData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBus = async (busId) => {
    try {
      await axios.delete(`http://localhost:3000/api/buses/${busId}`);
      getAllBuses();
      toast.success('Bus deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting bus');
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

  return (
    <div className="table-responsive">
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
            {(rowsPerPage > 0
              ? busData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : busData
            ).map((bus, index) => (
              <TableRow key={index}>
                <TableCell>{bus.Busname}</TableCell>
                <TableCell>{bus.numberOfSeats}</TableCell>
                <TableCell>{bus?.busDriver?.DriverName ? bus?.busDriver?.DriverName : 'no driver'}</TableCell>
                <TableCell>{bus?.busDriver?.DriverCardId ? bus?.busDriver?.DriverCardId : 'no driver'}</TableCell>
                <TableCell>
                  <button style={{ backgroundColor: 'red' }} onClick={() => deleteBus(bus._id)}>
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
        count={busData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </div>
  );
};

export default AllBuses;
