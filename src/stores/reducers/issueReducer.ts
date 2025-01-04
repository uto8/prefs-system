// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Issue,issueConfirmed,issueSale } from "@/types/Issue";

// export type IssueState = {
//   issues: Issue[];
//   issueConfirmed: issueConfirmed[];
//   issueSale: issueSale[];
// }

// const initialState: IssueState = {
//   issues: [],
//   issueConfirmed: [],
//   issueSale: [],
// };

// const issueSlice = createSlice({
//   name: 'issu',
//   initialState,
//   reducers: {
//     // 発行の追加
//     addIssue: (state, action: PayloadAction<Issue>) => {
//       state.issues.push(action.payload);
//     },
//     // 発行の更新
//     updateIssue: (state, action: PayloadAction<Issue>) => {
//       const index = state.issues.findIndex(item => item.id === action.payload.id);
//       if (index !== -1) {
//         state.issues[index] = action.payload;
//       }
//     },
//     // 発行の削除
//     removeIssue: (state, action: PayloadAction<string>) => {
//       state.issues = state.issues.filter(item => item.id !== action.payload);
//     },
//     // 発行の状態を更新
//     updateIssueStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
//       const index = state.issues.findIndex(item => item.id === action.payload.id);
//       if (index !== -1) {
//         state.issues[index].status = action.payload.status;
//       }
//     },
//     // 発行の追加
//     addIssueConfirmed: (state, action: PayloadAction<Issu>) => {
//         state.issueConfirmeds.push(action.payload);
//       },
//       // 発行の更新
//       updateIssueConfirmed: (state, action: PayloadAction<Issu>) => {
//         const index = state.issues.findIndex(item => item.id === action.payload.id);
//         if (index !== -1) {
//           state.issueConfirmeds[index] = action.payload;
//         }
//       },
//       // 発行の削除
//       removeIssueConfirmed: (state, action: PayloadAction<string>) => {
//         state.issueConfirmeds = state.issues.filter(item => item.id !== action.payload);
//       },
//       // 発行の状態を更新
//       updateIssueConfirmedStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
//         const index = state.issues.findIndex(item => item.id === action.payload.id);
//         if (index !== -1) {
//           state.issueConfirmeds[index].status = action.payload.status;
//         }
//       },
//       // 発行の追加
//     addIssueSale: (state, action: PayloadAction<Issu>) => {
//         state.issueSales.push(action.payload);
//       },
//       // 発行の更新
//       updateIssueSale: (state, action: PayloadAction<Issu>) => {
//         const index = state.issues.findIndex(item => item.id === action.payload.id);
//         if (index !== -1) {
//           state.issueSales[index] = action.payload;
//         }
//       },
//       // 発行の削除
//       removeIssueSale: (state, action: PayloadAction<string>) => {
//         state.issueSales = state.issues.filter(item => item.id !== action.payload);
//       },
//       // 発行の状態を更新
//       updateIssueSaleStatus: (state, action: PayloadAction<{ id: string, status: string }>) => {
//         const index = state.issues.findIndex(item => item.id === action.payload.id);
//         if (index !== -1) {
//           state.issueSales[index].status = action.payload.status;
//         }
//       }
//   }
// });

// export const {
//   addIssue,
//   updateIssue,
//   removeIssue,
//   updateIssueStatus,
//   addIssueConfirmed,
//   updateIssueConfirmed,
//   removeIssueConfirmed,
//   updateIssueConfirmedStatus,
//   addIssueSale,
//   updateIssueSale,
//   removeIssueSale,
//   updateIssueSaleStatus,
// } = issueSlice.actions;

// export const issueReducer = issueSlice.reducer;
