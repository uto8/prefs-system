import { Notification } from "@/types/Notification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotificationState {
  value: Notification[],
}
const initialState: INotificationState = {
  value: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setValue:(state, action: PayloadAction<Notification[]>) => {
      state.value = action.payload;
    },
    removeValue:(state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload)
    },
  }
})

export const { setValue, removeValue} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
