// src/redux/service/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  fetchLogin,
  fetchRefreshToken,
  fetchLogout,
} from "@/redux/api/auth/authApi";
import {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
} from "@/constants/config";

// Auth state shape
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  refreshStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loginStatus: "idle",
  refreshStatus: "idle",
  error: null,
  isAuthenticated: !!localStorage.getItem("authToken"),
};

// Thunk: login
export const login = createAsyncThunk<
  LoginResponse, // return type
  LoginPayload, // argument type
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await fetchLogin(payload.email, payload.password);
    console.log("createAsync :", response);
    return response;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof AxiosError) {
      errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

// Thunk: Refresh Token
export const refreshToken = createAsyncThunk<
  RefreshTokenResponse, // what it returns
  void, // no argument
  { rejectValue: string }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchRefreshToken(); // pulls refreshToken internally
    return response;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof AxiosError) {
      errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

// Thunk: logout with revoke token API call
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await fetchLogout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof AxiosError) {
        errorMessage =
          (error.response?.data as { message?: string })?.message ||
          error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.loginStatus = "idle";
      state.refreshStatus = "idle";
      state.error = null;
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loginStatus = "succeeded";
          const accessToken = action.payload.accessToken;
          const refreshToken = action.payload.refreshToken;
          state.token = accessToken;
          localStorage.setItem("authToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload || "Login failed";
      })

      // RefreshToken
      .addCase(refreshToken.pending, (state) => {
        state.refreshStatus = "loading";
        state.error = null;
      })
      .addCase(
        refreshToken.fulfilled,
        (state, action: PayloadAction<RefreshTokenResponse>) => {
          state.refreshStatus = "succeeded";
          const token = action.payload.accessToken;
          state.token = token;
          state.isAuthenticated = true;
          localStorage.setItem("authToken", token);
        }
      )
      .addCase(refreshToken.rejected, (state, action) => {
        state.refreshStatus = "failed";
        state.error = action.payload || "Login failed";
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loginStatus = "succeeded";
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearAuthState, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
