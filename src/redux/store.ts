import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/service/auth/authSlice";
import gameReducer from "@/redux/service/game/gameSlice";
import tokenPackageReducer from "@/redux/service/tokenPackage/tokenPackageSlice";
import orderReducer from "@/redux/service/order/orderSlice";

import { injectStore } from "@/constants/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    tokenPackage: tokenPackageReducer,
    order: orderReducer,
  },
});

injectStore(store.dispatch); // ← inject the dispatch here

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
