// store/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payment, PaymentCheck } from "@/types/Payment";

export type PaymentState = {
  payments: Payment[];
  paymentChecks: PaymentCheck[];
}

const initialState: PaymentState = {
  payments: [],
  paymentChecks: []
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // 入金予定の追加
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload);
    },
    // 入金予定の更新
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
    },
    // 入金予定の削除
    removePayment: (state, action: PayloadAction<string>) => {
      state.payments = state.payments.filter(item => item.id !== action.payload);
    },
    // 入金確認の追加
    addPaymentCheck: (state, action: PayloadAction<PaymentCheck>) => {
      state.paymentChecks.push(action.payload);
    },
    // 入金確認の更新
    updatePaymentCheck: (state, action: PayloadAction<PaymentCheck>) => {
      const index = state.paymentChecks.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.paymentChecks[index] = action.payload;
      }
    },
    // 入金確認の削除
    removePaymentCheck: (state, action: PayloadAction<string>) => {
      state.paymentChecks = state.paymentChecks.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  addPayment,
  updatePayment,
  removePayment,
  addPaymentCheck,
  updatePaymentCheck,
  removePaymentCheck
} = paymentSlice.actions;

export const paymentReducer = paymentSlice.reducer;