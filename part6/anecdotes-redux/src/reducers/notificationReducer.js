import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return initialState
    }
  }
})

export const setNotification = (message, timeout=5) => {
  return async dispatch => {
    const timeoutInMiliSeconds = timeout * 1000
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeoutInMiliSeconds)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer