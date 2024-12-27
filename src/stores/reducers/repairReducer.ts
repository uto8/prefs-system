import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Repair, RepairCheck } from "@/types/Repair";

export type RepairState = {
  repairs: Repair[];
  repairChecks: RepairCheck[];
}

const initialState: RepairState = {
  repairs: [],
  repairChecks: []
};

const repairSlice = createSlice({
  name: 'repair',
  initialState,
  reducers: {
    // 補修予定の追加
    addRepair: (state, action: PayloadAction<Repair>) => {
      state.repairs.push(action.payload);
    },
    // 補修予定の更新
    updateRepair: (state, action: PayloadAction<Repair>) => {
      const index = state.repairs.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.repairs[index] = action.payload;
      }
    },
    // 補修予定の削除
    removeRepair: (state, action: PayloadAction<string>) => {
      state.repairs = state.repairs.filter(item => item.id !== action.payload);
    },
    // 補修確認の追加
    addRepairCheck: (state, action: PayloadAction<RepairCheck>) => {
      state.repairChecks.push(action.payload);
    },
    // 補修確認の更新
    updateRepairCheck: (state, action: PayloadAction<RepairCheck>) => {
      const index = state.repairChecks.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.repairChecks[index] = action.payload;
      }
    },
    // 補修確認の削除
    removeRepairCheck: (state, action: PayloadAction<string>) => {
      state.repairChecks = state.repairChecks.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  addRepair,
  updateRepair,
  removeRepair,
  addRepairCheck,
  updateRepairCheck,
  removeRepairCheck
} = repairSlice.actions;

export const repairReducer = repairSlice.reducer;

