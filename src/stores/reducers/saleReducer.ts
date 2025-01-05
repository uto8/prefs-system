import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sale {
  id: number;
  clientName: string;
  clientAddress: string;
  status: string;
  salesPerson: string;
}

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
    setSalesValue: (state, action: PayloadAction<Sale[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setSalesValue } = salesSlice.actions;

export default salesSlice.reducer;

