import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchOrder,
  fetchCreateOrder,
  fetchUpdateOrder,
  fetchDeleteOrder,
} from "@/redux/api/order/orderApi";
import {
  Order,
  OrderListResponse,
  OrderEntryResponse,
  PaginationParams,
} from "@/constants/config";

interface OrderState {
  orders: Order[];
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Thunks
export const loadOrders = createAsyncThunk<
  OrderListResponse,
  { pagination: PaginationParams; searchTerm: string | undefined },
  { rejectValue: string }
>(
  "order/loadOrderss",
  async ({ pagination, searchTerm }, { rejectWithValue }) => {
    try {
      return await fetchOrder(pagination, searchTerm);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const createOrder = createAsyncThunk<
  Order,
  OrderEntryResponse,
  FormData,
  { rejectValue: string }
>("order/createOrder", async (payload, { rejectWithValue }) => {
  try {
    return await fetchCreateOrder(payload);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const updateOrder = createAsyncThunk<
  OrderEntryResponse,
  { id: string; data: FormData },
  { rejectValue: string }
>("order/updateOrder", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await fetchUpdateOrder(id, data);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("order/deleteOrder", async (id, { rejectWithValue }) => {
  try {
    const res = await fetchDeleteOrder(id);
    return res.payLoad.id;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // loadGames
      .addCase(loadOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.orders = payload?.payLoad?.items;
        state.totalPages = payload?.payLoad?.paging?.totalPages;
        state.totalCount = payload?.payLoad?.paging?.totalCount;
      })
      .addCase(loadOrders.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to load Orders";
      })

      // createGame
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.orders.unshift(payload);
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to create Order";
      })

      // updateGame
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const idx = state.orders.findIndex((g) => g.id === payload.payLoad.id);
        if (idx !== -1) state.orders[idx] = payload.payLoad;
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to update Order";
      })

      // deleteGame
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload: deletedId }) => {
        state.status = "succeeded";
        state.orders = state.orders.filter((g) => g.id !== deletedId);
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload || "Failed to delete Order";
      });
  },
});

export const { clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
