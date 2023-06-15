import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AllUsers = () => {
    const [userData, setUserData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users');
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error retrieving users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            getAllUsers();
            toast.success('User deleted successfully');
        } catch (error) {
            console.log('Error deleting user:', error);
            toast.error('Error deleting user');
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


    return (
        <div className="table-responsive">
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
                        {(rowsPerPage > 0
                            ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : userData
                        ).map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.profileId}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>
                                    <button
                                        style={{ backgroundColor: 'red', color: 'white' }}
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ToastContainer />
        </div>
    );
};

export default AllUsers;
