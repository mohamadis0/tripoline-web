import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const BasicModal = ({ 
  driverId, handleDeleteDriver,
  userId, handleDeleteUser,
  profileId, handleDeleteProfile,
  tripId, handleDeleteTrip, modalState, setModalState }) => {
    
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
        style={style}
        open={modalState}
        onClose={() => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
          <Button onClick={() => setModalState(false)}>Cancel</Button>
          <Button onClick={() => handleDeleteTrip(tripId)}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
