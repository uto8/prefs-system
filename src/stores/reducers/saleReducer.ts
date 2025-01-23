import { Sale } from "@/types/Sale";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SalesState {
  value: Sale[];
}

const initialState: SalesState = {
  value: [],
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setValue:(state, action: PayloadAction<Sale[]>) => {
      state.value = action.payload;
    },
    addValue:(state, action: PayloadAction<Sale>) => {
      console.log(action.payload)
      state.value.push(action.payload);
      console.log(state)
    },
    removeValue:(state, action: PayloadAction<Sale>) => {
      state.value = state.value.filter(item => item.id !== action.payload.id)
    },
    editValue: (state, action: PayloadAction<Sale>) => {
      const index = state.value.findIndex(item => item.id === action.payload.id);
      if(index !== -1) {
        state.value[index] = action.payload;
      }
    }
  }
})

export const { setValue, removeValue, addValue} = salesSlice.actions;
export const saleReducer = salesSlice.reducer;
