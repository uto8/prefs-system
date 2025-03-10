import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import { officeReducer } from "./reducers/officeReducer";
import { saleReducer } from "./reducers/saleReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import { orderReducer } from "./reducers/orderReducer";
import { issueReducer } from "./reducers/issueReducer";
import { repairReducer } from "./reducers/repairReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { authReducer } from "./reducers/authReducer";
import { meetingReducer } from "./reducers/meetingReducer";
// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const rootReducer = {
  auth: authReducer,
  offices: officeReducer,
  sales: saleReducer,
  payments: paymentReducer,
  orders: orderReducer,
  issues: issueReducer,
  repairs: repairReducer,
  notifications: notificationReducer,
  meetings: meetingReducer
};

// Persist reducers
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Persistor for the store
export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
