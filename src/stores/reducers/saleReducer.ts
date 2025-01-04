import { Sale } from "@/types/Sale";
import { createSlice } from "@reduxjs/toolkit";

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
  }
})

// export const { setValue } = saleSlice.actions;
export const saleReducer = saleSlice.reducer;
