import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/service/auth/authSlice";
import gameReducer from "@/redux/service/game/gameSlice";
import { injectStore } from "@/constants/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
});

injectStore(store.dispatch); // ← inject the dispatch here

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
