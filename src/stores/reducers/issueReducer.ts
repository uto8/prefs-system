import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue, IssueConfirmed, IssueSale } from "@/types/Issue";

export type IssueState = {
  issues: Issue[];
  issueConfirmed: IssueConfirmed[];
  issueSale: IssueSale[];
}

const initialState: IssueState = {
  issues: [],
  issueConfirmed: [],
  issueSale: [],
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    // 発行の追加
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    // 発行の更新
    updateIssue: (state, action: PayloadAction<Issue>) => {
      const index = state.issues.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.issues[index] = action.payload;
      }
    },
    // 発行の削除
    removeIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(item => item.id !== action.payload);
    },
    // 発行の状態を更新
    updateIssueStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
      const index = state.issues.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.issues[index].status = action.payload.status;
      }
    },
    // 発行確認の追加
    addIssueConfirmed: (state, action: PayloadAction<IssueConfirmed>) => {
      state.issueConfirmed.push(action.payload);
    },
    // 発行確認の更新
    updateIssueConfirmed: (state, action: PayloadAction<IssueConfirmed>) => {
      const index = state.issueConfirmed.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.issueConfirmed[index] = action.payload;
      }
    },
    // 発行確認の削除
    removeIssueConfirmed: (state, action: PayloadAction<string>) => {
      state.issueConfirmed = state.issueConfirmed.filter(item => item.id !== action.payload);
    },
    // 発行確認の状態を更新
    updateIssueConfirmedStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
      const index = state.issueConfirmed.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.issueConfirmed[index].status = action.payload.status;
      }
    },
    // 発行販売の追加
    addIssueSale: (state, action: PayloadAction<IssueSale>) => {
      state.issueSale.push(action.payload);
    },
    // 発行販売の更新
    updateIssueSale: (state, action: PayloadAction<IssueSale>) => {
      const index = state.issueSale.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.issueSale[index] = action.payload;
      }
    },
    // 発行販売の削除
    removeIssueSale: (state, action: PayloadAction<string>) => {
      state.issueSale = state.issueSale.filter(item => item.id !== action.payload);
    },
    // 発行販売の状態を更新
    updateIssueSaleStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
      const index = state.issueSale.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.issueSale[index].status = action.payload.status;
      }
    }
  }
});

export const {
  addIssue,
  updateIssue,
  removeIssue,
  updateIssueStatus,
  addIssueConfirmed,
  updateIssueConfirmed,
  removeIssueConfirmed,
  updateIssueConfirmedStatus,
  addIssueSale,
  updateIssueSale,
  removeIssueSale,
  updateIssueSaleStatus,
} = issueSlice.actions;

export const issueReducer = issueSlice.reducer;

