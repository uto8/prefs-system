import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue } from "@/types/Issue";


export interface IIssueState {
  value: Issue | null,
}
const initialState: IIssueState = {
  value: null
}

const issueSlice = createSlice({
  name: 'issueDetail',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Issue>) => {
      state.value = action.payload
    },
    updateMemoValue: (state, action: PayloadAction<{id: number, memo: string}>) => {
      if (state.value && state.value.id === action.payload.id) {
        state.value.memo = action.payload.memo;
      }
    },
    updateDateTimeValue: (state, action: PayloadAction<{id: number, datetime: string}>) => {
      if (state.value && state.value.id === action.payload.id) {
        state.value.datetime = action.payload.datetime;
      }
    },
    updateEstimateDateValue: (state, action: PayloadAction<{id: number, date: string}>) => {
      if (state.value && state.value.id === action.payload.id) {
        state.value.estimateSubmissionDate = action.payload.date;
      }
    },
    updateStatusValue: (state, action: PayloadAction<{id: number, status: string}>) => {
      if (state.value && state.value.id === action.payload.id) {
        state.value.status = action.payload.status;
      }
    }
  }
});

export const {
  setValue,
  updateMemoValue,
  updateEstimateDateValue,
  updateStatusValue,
} = issueSlice.actions;

export const issueDetailReducer = issueSlice.reducer;

