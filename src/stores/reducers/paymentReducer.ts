// store/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payment, PaymentCheck } from "@/types/Payment";

export interface IPaymentState {
  value: Payment[],
}
const initialState: IPaymentState = {
  value: []
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<Payment[]>) => {
      state.value = action.payload;
    },
    // 入金予定の追加
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.value.push(action.payload);
    },
    // 入金予定の更新
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.value.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    // 入金予定の削除
    removePayment: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    // 入金確認の追加
    addPaymentCheck: (state, action: PayloadAction<PaymentCheck>) => {
      const index = state.value.findIndex(item => item.id === action.payload.paymentId);
      state.value[index].paymentChecks.push(action.payload);
    },
    // // 入金確認の更新
    // updatePaymentCheck: (state, action: PayloadAction<PaymentCheck>) => {
    //   const index = state.paymentChecks.findIndex(item => item.id === action.payload.id);
    //   if (index !== -1) {
    //     state.paymentChecks[index] = action.payload;
    //   }
    // },
    // 入金確認の削除
    removePaymentCheck: (state, action: PayloadAction<{ paymentId: number; paymentCheckId: string }>) => {
      const updated =state.value.map(payment =>
        payment.id === action.payload.paymentId
          ? { ...payment, paymentChecks: payment.paymentChecks.filter(check => String(check.id) !== action.payload.paymentCheckId) }
          : payment
      );
      state.value = updated
    }
  }
});

export const {
  setPayment,
  addPayment,
  updatePayment,
  removePayment,
  removePaymentCheck,
  addPaymentCheck
} = paymentSlice.actions;

export const paymentReducer = paymentSlice.reducer;
