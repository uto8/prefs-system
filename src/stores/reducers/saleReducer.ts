import { Sale } from "@/types/Sale";
import { PayloadAction } from "@reduxjs/toolkit";

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
    setVaue:(state, action: PayloadAction<Sale>) => {

    }
  }
})

export const { setValue } = saleSlice.actions;
export const saleReducer = saleSlice.reducer;
