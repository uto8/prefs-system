import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repair, RepairCheck } from "@/types/Repair";

export type RepairState = {
  value: Repair[]
}

const initialState: RepairState = {
  value: []
};

const repairSlice = createSlice({
  name: 'repairs',
  initialState,
  reducers: {
    setRepair: (state, action: PayloadAction<Repair[]>) => {
      state.value = action.payload
    },
    // 補修予定の追加
    addRepair: (state, action: PayloadAction<Repair>) => {
      state.value.push(action.payload);
    },
    // 補修予定の更新
    updateRepair: (state, action: PayloadAction<Repair>) => {
      const index = state.value.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    // 補修予定の削除
    removeRepair: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(item => item.id !== action.payload);
    },
    // 補修確認の追加
    addRepairCheck: (state, action: PayloadAction<RepairCheck>) => {
      const index = state.value.findIndex(item => item.id === action.payload.repairId);
      state.value[index].repairChecks.push(action.payload);
    },
    // // 補修確認の更新
    // updateRepairCheck: (state, action: PayloadAction<RepairCheck>) => {
    //   const index = state.repairChecks.findIndex(item => item.id === action.payload.id);
    //   if (index !== -1) {
    //     state.repairChecks[index] = action.payload;
    //   }
    // },
    // 補修確認の削除
    removeRepairCheck: (state, action: PayloadAction<{ repairId: number; repairCheckId: string }>) => {
      const updated =state.value.map(repair =>
        repair.id === action.payload.repairId
          ? { ...repair, repairChecks: repair.repairChecks.filter(check => String(check.id) !== action.payload.repairCheckId) }
          : repair
      );
      state.value = updated
    }
  }
});

export const {
  setRepair,
  addRepair,
  updateRepair,
  removeRepair,
  addRepairCheck,
  // updateRepairCheck,
  removeRepairCheck
} = repairSlice.actions;

export const repairReducer = repairSlice.reducer;

