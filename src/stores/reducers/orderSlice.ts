import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types/Order";

export interface IOrderState {
  value: Order[],
}
const initialState: IOrderState = {
  value: []
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.value = action.payload;
    },
    // 発注の追加
    addOrder: (state, action: PayloadAction<Order>) => {
      state.value.push(action.payload);
    },
    // 発注の更新
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.value.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    // 発注の削除
    // removeOrder: (state, action: PayloadAction<string>) => {
    //   state.orders = state.orders.filter(item => item.id !== action.payload);
    // },
    // // 発注確認の追加
    // addOrderCheck: (state, action: PayloadAction<OrderCheck>) => {
    //   state.orderChecks.push(action.payload);
    // },
    // // 発注確認の更新
    // updateOrderCheck: (state, action: PayloadAction<OrderCheck>) => {
    //   const index = state.orderChecks.findIndex(item => item.id === action.payload.id);
    //   if (index !== -1) {
    //     state.orderChecks[index] = action.payload;
    //   }
    // },
    // // 発注確認の削除
    // removeOrderCheck: (state, action: PayloadAction<string>) => {
    //   state.orderChecks = state.orderChecks.filter(item => item.id !== action.payload);
    // }
  }
});

export const {
  setOrder,
  addOrder,
  updateOrder,
  // removeOrder,
  // addOrderCheck,
  // updateOrderCheck,
  // removeOrderCheck
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
