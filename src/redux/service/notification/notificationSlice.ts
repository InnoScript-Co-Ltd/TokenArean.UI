import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotification } from "@/redux/api/notification/notificationApi";
import {
  Notification,
  NotificationListResponse,
  PaginationParams,
} from "@/constants/config";

interface NotificationState {
  notifications: Notification[];
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Async thunks for your REST calls...
export const loadNotifications = createAsyncThunk<
  NotificationListResponse,
  { pagination: PaginationParams; searchTerm?: string },
  { rejectValue: string }
>(
  "notification/loadNotifications",
  async ({ pagination, searchTerm }, { rejectWithValue }) => {
    try {
      return await fetchNotification(pagination, searchTerm);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotificationData: () => initialState,
    notificationAdded(state, action: PayloadAction<Notification>) {
      state.notifications.unshift(action.payload);
      state.totalCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotifications.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadNotifications.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.notifications = payload.payLoad.items;
        // state.totalPages = payload.payLoad.paging.totalPages;
        // state.totalCount = payload.payLoad.paging.totalCount;
      })
      .addCase(loadNotifications.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to load notifications";
      });
  },
});

export const { clearNotificationData, notificationAdded } =
  notificationSlice.actions;
export default notificationSlice.reducer;
