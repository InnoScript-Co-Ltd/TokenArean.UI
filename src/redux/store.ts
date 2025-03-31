import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/service/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState}

// Inferred type: Dispatch function for the store
export type AppDispatch = typeof store.dispatch;
