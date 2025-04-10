import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTokenPackage,
  fetchCreateTokenPackage,
  fetchUpdatTokenPackage,
  fetchDeleteTokenPackage,
} from "@/redux/api/tokenPackage/tokenPackageApi";
import {
  TokenPackage,
  TokenPackageListResponse,
  TokenPackagePayload,
  PaginationParams,
} from "@/constants/config";

interface TokenPackageState {
  tokenPackages: TokenPackage[];
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TokenPackageState = {
  tokenPackages: [],
  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Thunks
export const loadTokenPackages = createAsyncThunk<
  TokenPackageListResponse,
  { pagination: PaginationParams; searchTerm: string | undefined },
  { rejectValue: string }
>(
  "tokenPackage/loadTokenPackages",
  async ({ pagination, searchTerm }, { rejectWithValue }) => {
    try {
      return await fetchTokenPackage(pagination, searchTerm);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const createTokenPackage = createAsyncThunk<
  TokenPackage,
  TokenPackagePayload,
  { rejectValue: string }
>("tokenPackage/createTokenPackage", async (payload, { rejectWithValue }) => {
  try {
    return await fetchCreateTokenPackage(payload);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateTokenPackage = createAsyncThunk<
  TokenPackage,
  { id: string; data: TokenPackagePayload },
  { rejectValue: string }
>(
  "tokenPackage/updateTokenPackage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await fetchUpdatTokenPackage(id, data);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const deleteTokenPackage = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("tokenPackage/deleteTokenPackage", async (id, { rejectWithValue }) => {
  try {
    const res = await fetchDeleteTokenPackage(id);
    return res.id;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

// Slice
const tokenPackageSlice = createSlice({
  name: "tokenPackage",
  initialState,
  reducers: {
    clearTokenPackageData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // loadGames
      .addCase(loadTokenPackages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadTokenPackages.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.tokenPackages = payload?.payLoad?.items;
        state.totalPages = payload?.payLoad?.paging?.totalPages;
        state.totalCount = payload?.payLoad?.paging?.totalCount;
      })
      .addCase(loadTokenPackages.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to load games";
      })

      // createGame
      .addCase(createTokenPackage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createTokenPackage.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.tokenPackages.unshift(payload);
      })
      .addCase(createTokenPackage.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to create TokenPackage";
      })

      // updateGame
      .addCase(updateTokenPackage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateTokenPackage.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const idx = state.tokenPackages.findIndex((g) => g.id === payload.id);
        if (idx !== -1) state.tokenPackages[idx] = payload;
      })
      .addCase(updateTokenPackage.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to update TokenPackage";
      })

      // deleteGame
      .addCase(deleteTokenPackage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        deleteTokenPackage.fulfilled,
        (state, { payload: deletedId }) => {
          state.status = "succeeded";
          state.tokenPackages = state.tokenPackages.filter(
            (g) => g.id !== deletedId
          );
        }
      )
      .addCase(deleteTokenPackage.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to delete TokenPackage";
      });
  },
});

export const { clearTokenPackageData } = tokenPackageSlice.actions;
export default tokenPackageSlice.reducer;
