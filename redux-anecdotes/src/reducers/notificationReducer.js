import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return '';
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (msg, timeout = 1) => {
  return async (dispatch) => {
    dispatch(addNotification(msg));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
