import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastPayload = {
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
};

type ToastState = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
};

const initialState: ToastState = {
  open: false,
  message: '',
  severity: 'info',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer
