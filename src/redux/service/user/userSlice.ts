import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchCreateUser,
  fetchUpdatUser,
  fetchDeleteUser,
  fetchChangePassword,
} from "@/redux/api/user/userApi";
import { AxiosError } from "axios";

import {
  User,
  UserListResponse,
  UserEntryResponse,
  PaginationParams,
  UserPayload,
  ChangePasswordResponse,
  ChangePasswordPayload,
} from "@/constants/config";

interface UserState {
  Users: User[];
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  Users: [],
  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Thunks
export const loadUsers = createAsyncThunk<
  UserListResponse,
  { pagination: PaginationParams; searchTerm: string | undefined },
  { rejectValue: string }
>("User/loadUsers", async ({ pagination, searchTerm }, { rejectWithValue }) => {
  try {
    return await fetchUser(pagination, searchTerm);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const createUser = createAsyncThunk<
  UserEntryResponse,
  UserPayload,
  { rejectValue: string }
>("User/createUser", async (payload, { rejectWithValue }) => {
  try {
    return await fetchCreateUser(payload);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});
export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordPayload,
  { rejectValue: string }
>("User/change-password", async (payload, { rejectWithValue }) => {
  try {
    return await fetchChangePassword(payload);
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof AxiosError) {
      errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message;
      console.log(error);
      return rejectWithValue(error.response?.data.message);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

export const updateUser = createAsyncThunk<
  UserEntryResponse,
  { id: string; data: UserPayload },
  { rejectValue: string }
>("User/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await fetchUpdatUser(id, data);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("User/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const res = await fetchDeleteUser(id);
    return res.payLoad.id;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

// Slice
const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    clearUserData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // loadGames
      .addCase(loadUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.Users = payload?.payLoad?.items;
        state.totalPages = payload?.payLoad?.paging?.totalPages;
        state.totalCount = payload?.payLoad?.paging?.totalCount;
      })
      .addCase(loadUsers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to load games";
      })

      // createGame
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        console.log("payload.payLoad :", payload.payLoad);
        state.Users = [payload?.payLoad, ...(state.Users || [])];
        state.totalCount = state.totalCount + 1;
        // state.Users.unshift(payload);
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to create User";
      })

      // updateGame
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const idx = state.Users.findIndex((g) => g.id === payload.payLoad.id);

        if (idx !== -1) state.Users[idx] = payload.payLoad;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to update User";
      })

      // deleteGame
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload: deletedId }) => {
        state.status = "succeeded";
        state.Users = state.Users.filter((g) => g.id !== deletedId);
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to delete User";
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Forgot Password failed";
      });
  },
});

export const { clearUserData } = UserSlice.actions;
export default UserSlice.reducer;
