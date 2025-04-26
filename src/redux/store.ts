import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/service/auth/authSlice";
import gameReducer from "@/redux/service/game/gameSlice";
import tokenPackageReducer from "@/redux/service/tokenPackage/tokenPackageSlice";
import orderReducer from "@/redux/service/order/orderSlice";
import userReducer from "@/redux/service/user/userSlice";
import configSettingReducer from "@/redux/service/configSetting/configSettingSlice";

import { injectStore } from "@/constants/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    tokenPackage: tokenPackageReducer,
    order: orderReducer,
    user: userReducer,
    configSetting: configSettingReducer,
  },
});

injectStore(store.dispatch); // ← inject the dispatch here

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
