// src/redux/api/game/gameApi.ts

import axiosInstance from "@/constants/axios";
import {
  DeleteOrderResponse,
  Order,
  OrderEntryResponse,
  OrderListResponse,
  OrderPayload,
  PaginationParams,
} from "@/constants/config";

export const fetchOrder = async (
  pagination?: PaginationParams,
  searchTerm?: string
): Promise<OrderListResponse> => {
  try {
    const params = {
      searchTerm: searchTerm ?? "",
      ...(pagination || {}),
    };

    const response = await axiosInstance.get<OrderListResponse>(
      "/api/v1/Order",
      {
        params,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Order:", error);
    throw error;
  }
};

export const fetchCreateOrder = async (
  order: FormData
): Promise<OrderEntryResponse> => {
  try {
    const response = await axiosInstance.post<OrderEntryResponse>(
      "/api/v1/Order",
      order
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add Order data:", error);
    throw error;
  }
};

export const fetchUpdateOrder = async (
  id: string,
  order: FormData
): Promise<OrderEntryResponse> => {
  try {
    const response = await axiosInstance.put<OrderEntryResponse>(
      `/api/v1/Order/${id}`,
      order
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update Order data:", error);
    throw error;
  }
};

export const fetchDeleteOrder = async (
  id: string
): Promise<DeleteOrderResponse> => {
  const response = await axiosInstance.delete<DeleteOrderResponse>(
    `/api/v1/Order/${id}`
  );
  return response.data;
};
