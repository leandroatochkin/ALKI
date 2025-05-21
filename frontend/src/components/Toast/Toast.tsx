// components/GlobalToast.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideToast } from '../../api/ToastSlice';
import { RootState } from '../../api/store/store';

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state: RootState) => state.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
