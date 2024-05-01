import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Line } from 'react-chartjs-2';

const GraphModal = ({ open, handleClose, data }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Line data={data} />
      </Box>
    </Modal>
  );
};

export default GraphModal;
