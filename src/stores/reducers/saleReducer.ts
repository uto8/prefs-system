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
    addValue:(state, action: PayloadAction<Sale>) => {
          console.log(action.payload)
          state.value.push(action.payload);
          console.log(state)
        },
  },
});

export const { setSalesValue, addValue } = salesSlice.actions;

export const saleReducer = salesSlice.reducer;
