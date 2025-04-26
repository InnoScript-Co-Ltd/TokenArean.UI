import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  ConfigSetting,
  ConfigSettingPayload,
  ConfigSettingEntryResponse,
  ConfigSettingListResponse,
  PaginationParams,
} from "@/constants/config";
import {
  fetchConfig,
  fetchCreateConfig,
  fetchDeleteConfig,
  fetchUpdateConfig,
} from "@/redux/api/configSetting/configSettingApi";

interface ConfigSettingState {
  configSettings: ConfigSetting[] | [];
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ConfigSettingState = {
  configSettings: [],

  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Thunks
export const loadConfigSetting = createAsyncThunk<
  ConfigSettingListResponse,
  { pagination: PaginationParams; searchTerm: string | undefined },
  { rejectValue: string }
>(
  "configSetting/loadConfigSetting",
  async ({ pagination, searchTerm }, { rejectWithValue }) => {
    try {
      return await fetchConfig(pagination, searchTerm);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const createConfigSetting = createAsyncThunk<
  ConfigSettingEntryResponse,
  ConfigSettingPayload,
  { rejectValue: string }
>("configSetting/createconfigSetting", async (payload, { rejectWithValue }) => {
  try {
    return await fetchCreateConfig(payload);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateConfigSetting = createAsyncThunk<
  ConfigSettingEntryResponse,
  { id: number; data: ConfigSettingPayload },
  { rejectValue: string }
>(
  "configSetting/updateconfigSetting",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // console.log("update game:", id);
      return await fetchUpdateConfig(id, data);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const deleteConfigSetting = createAsyncThunk<
  ConfigSettingEntryResponse,
  number,
  { rejectValue: string }
>("configSetting/deleteconfigSetting", async (id, { rejectWithValue }) => {
  try {
    return await fetchDeleteConfig(id);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

// Slice
const configSettingSlice = createSlice({
  name: "configSetting",
  initialState,
  reducers: {
    clearConfigSettingData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // loadGames
      .addCase(loadConfigSetting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadConfigSetting.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.configSettings = payload?.payLoad?.items;
        state.totalPages = payload?.payLoad?.paging?.totalPages;
        state.totalCount = payload?.payLoad?.paging?.totalCount;
      })
      .addCase(loadConfigSetting.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to load configSetting";
      })

      // createGame
      .addCase(createConfigSetting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createConfigSetting.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.configSettings = [
          payload?.payLoad,
          ...(state.configSettings || []),
        ];
        state.totalCount = state.totalCount + 1;
      })
      .addCase(createConfigSetting.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to create configSetting";
      })

      // updateGame
      .addCase(updateConfigSetting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateConfigSetting.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const updatedConfigSetting = payload.payLoad;
        const idx = state.configSettings.findIndex(
          (g) => g.id === payload.payLoad.id
        );
        if (idx !== -1) state.configSettings[idx] = updatedConfigSetting;
      })
      .addCase(updateConfigSetting.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to update configSetting";
      })

      // deleteGame
      .addCase(deleteConfigSetting.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteConfigSetting.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const deletedId = payload?.payLoad.id;

        state.configSettings = state.configSettings.filter(
          (g) => g.id !== deletedId
        );
        state.totalCount = state.totalCount - 1;
      })
      .addCase(deleteConfigSetting.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to delete configSetting";
      });
  },
});

export const { clearConfigSettingData } = configSettingSlice.actions;
export default configSettingSlice.reducer;
