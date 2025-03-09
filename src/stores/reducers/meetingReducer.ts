import { Meeting } from "@/types/Meeting";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMeetingState {
  value: Meeting[],
}
const initialState: IMeetingState = {
  value: []
}

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setMeetingValue:(state, action: PayloadAction<Meeting[]>) => {
      state.value = action.payload;
    },
    removeMeetingValue:(state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload)
    },
  }
})

export const { setMeetingValue, removeMeetingValue} = meetingSlice.actions;
export const meetingReducer = meetingSlice.reducer;
