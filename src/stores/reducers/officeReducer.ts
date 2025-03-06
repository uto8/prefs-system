import { Office } from "@/types/Office";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IOfficeState {
  value: Office[],
}
const initialState: IOfficeState = {
  value: []
}

const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    setValue:(state, action: PayloadAction<Office[]>) => {
      state.value = action.payload;
    },
    addValue:(state, action: PayloadAction<Office>) => {
      state.value.push(action.payload);
    },
    removeValue:(state, action: PayloadAction<string>) => {
      state.value = state.value.filter(item => item.id !== action.payload)
    },
    editValue: (state, action: PayloadAction<Office>) => {
      const index = state.value.findIndex(item => item.id === action.payload.id);
      if(index !== -1) {
        state.value[index] = action.payload;
      }
    }
  }
})

export const { setValue, removeValue, addValue} = officeSlice.actions;
export const officeReducer = officeSlice.reducer;
