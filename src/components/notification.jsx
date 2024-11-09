import { Snackbar, Alert } from '@mui/material';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(Notification);

Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
