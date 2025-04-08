// src/redux/service/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchLogin, fetchLogout } from "@/redux/api/auth/authApi";
import { LoginResponse } from "@/constants/config";

// Login payload shape
export interface LoginPayload {
  email: string;
  password: string;
}

// Auth state shape
export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  token: sessionStorage.getItem("authToken"),
  status: "idle",
  error: null,
  isAuthenticated: !!sessionStorage.getItem("authToken"),
};

// Thunk: login
export const login = createAsyncThunk<
  LoginResponse, // return type
  LoginPayload, // argument type
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await fetchLogin(payload.email, payload.password);
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
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
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
      state.status = "idle";
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
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.status = "succeeded";
          const token = action.payload.data.access_token;
          state.token = token;
          state.isAuthenticated = true;
          sessionStorage.setItem("authToken", token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearAuthState, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
