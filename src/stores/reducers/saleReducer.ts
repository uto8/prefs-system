import { Sale } from "@/types/Sale";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISaleState {
  value: Sale[]
}

const initialState: ISaleState = {
  value: []
}

const saleSlice = createSlice({
  name: "sale",
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

export const { setValue, removeValue, addValue} = saleSlice.actions;
export const saleReducer = saleSlice.reducer;
