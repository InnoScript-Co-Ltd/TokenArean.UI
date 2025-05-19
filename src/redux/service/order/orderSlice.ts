import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOrder,
  fetchCreateOrder,
  fetchUpdateOrder,
  fetchDeleteOrder,
  fetchOrderDetail,
  fetchCleanOrder,
  fetchReadOrder,
} from "@/redux/api/order/orderApi";
import {
  Order,
  OrderListResponse,
  OrderEntryResponse,
  PaginationParams,
  OrderDetailResponse,
  CleanOrderRequest,
} from "@/constants/config";

interface OrderState {
  orders: Order[];
  orderDetail: Order | null;
  total: number;
  totalPages: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderDetail: null,
  total: 0,
  totalPages: 0,
  totalCount: 0,
  status: "idle",
  error: null,
};

// Async thunks for your REST calls...
export const loadOrders = createAsyncThunk<
  OrderListResponse,
  { pagination: PaginationParams; searchTerm?: string },
  { rejectValue: string }
>(
  "order/loadOrders",
  async ({ pagination, searchTerm }, { rejectWithValue }) => {
    try {
      return await fetchOrder(pagination, searchTerm);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const createOrder = createAsyncThunk<
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

export const cleanOrder = createAsyncThunk<
  OrderEntryResponse,
  { data: CleanOrderRequest },
  { rejectValue: string }
>("order/cleanOrder", async ({ data }, { rejectWithValue }) => {
  try {
    return await fetchCleanOrder(data);
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
    return res.id;
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const loadOrderDetail = createAsyncThunk<
  OrderDetailResponse,
  string,
  { rejectValue: string }
>("order/loadOrderDetail", async (id, { rejectWithValue }) => {
  try {
    return await fetchOrderDetail(id);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

export const readOrder = createAsyncThunk<
  OrderEntryResponse,
  { id: string },
  { rejectValue: string }
>("order/readOrder", async ({ id }, { rejectWithValue }) => {
  try {
    return await fetchReadOrder(id);
  } catch (err) {
    return rejectWithValue((err as Error).message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderData: () => initialState,
    orderAdded(state, action: PayloadAction<Order>) {
      state.orders.unshift(action.payload);
      state.totalCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.orders = payload.payLoad.items;
        state.totalPages = payload.payLoad.paging.totalPages;
        state.totalCount = payload.payLoad.paging.totalCount;
      })
      .addCase(loadOrders.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to load orders";
      })

      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to create order";
      })

      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const idx = state.orders.findIndex((o) => o.id === payload.payLoad.id);
        if (idx !== -1) state.orders[idx] = payload.payLoad;
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to update order";
      })

      .addCase(readOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(readOrder.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const idx = state.orders.findIndex((o) => o.id === payload.payLoad.id);
        if (idx !== -1) state.orders[idx] = payload.payLoad;
      })
      .addCase(readOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to update order";
      })

      .addCase(cleanOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(cleanOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(cleanOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to clean order";
      })

      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, { payload: id }) => {
        state.status = "succeeded";
        state.orders = state.orders.filter((o) => o.id !== id);
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to delete order";
      })

      .addCase(loadOrderDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadOrderDetail.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.orderDetail = payload.payLoad;
      })
      .addCase(loadOrderDetail.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload ?? "Failed to load order detail";
      });
  },
});

export const { clearOrderData, orderAdded } = orderSlice.actions;
export default orderSlice.reducer;
