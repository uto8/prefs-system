import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "next-auth";

export interface IAuthState {
  value: Session | null,
}
const initialState: IAuthState = {
  value: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setValue:(state, action: PayloadAction<Session>) => {
      state.value = action.payload;
    },
    removeValue:(state) => {
      state.value = null
    },
  }
})

export const { setValue, removeValue} = authSlice.actions;
export const authReducer = authSlice.reducer;
