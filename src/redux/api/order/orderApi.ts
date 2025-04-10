// src/redux/api/game/gameApi.ts

import axiosInstance from "@/constants/axios";
import {
  DeleteOrderResponse,
  Order,
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

export const fetchCreateOrder = async (order: OrderPayload): Promise<Order> => {
  try {
    const response = await axiosInstance.post<Order>("/api/v1/Order", order);
    return response.data;
  } catch (error) {
    console.error("Failed to add Order data:", error);
    throw error;
  }
};

export const fetchUpdateOrder = async (
  id: string,
  order: OrderPayload
): Promise<Order> => {
  try {
    const response = await axiosInstance.put<Order>(
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
    `/Order/${id}`
  );
  return response.data;
};
