import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchLogin, fetchRegister } from "@/redux/api/auth/authApi";
import { LoginResponse, RegisterResponse } from "@/redux/api/auth/authApi";

// Define the shape of the data for registration input
export interface RegisterPayload {
  name: string;
  role: string;
  username: string;
  password: string;
  selfRegister: boolean;
  primaryPhone: string;
  email: string;
  addressType: string;
}

// Thunk for registration; using RegisterResponse as the return type
export const register = createAsyncThunk<
  RegisterResponse, // Returned data type
  RegisterPayload, // Input argument type
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const registeredData = await fetchRegister(
      payload.name,
      payload.role,
      payload.username,
      payload.password,
      payload.selfRegister,
      payload.primaryPhone,
      payload.email,
      payload.addressType
    );
    return registeredData;
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

// Define the shape of the data for login input
export interface LoginPayload {
  email: string;
  password: string;
}

// Thunk for login; using LoginResponse as the return type
export const login = createAsyncThunk<
  LoginResponse, // Returned data type
  LoginPayload, // Input argument type
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

// Thunk for logout; since no data is returned, we use void.
export const logout = createAsyncThunk<void, string, { rejectValue: string }>(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      // Optionally, you could call your API here (e.g., fetchLogout(token))
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

// Define the state shape for the auth slice
export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("authToken"),
  status: "idle",
  error: null,
  isAuthenticated: !!sessionStorage.getItem("authToken"),
};

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
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.status = "succeeded";
          console.log(action.payload);
          // Additional state updates can be performed here if needed
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.status = "succeeded";
          // Assuming LoginResponse has a token property
          const token = action.payload.token;
          state.token = token;
          state.isAuthenticated = true;
          sessionStorage.setItem("authToken", token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
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
