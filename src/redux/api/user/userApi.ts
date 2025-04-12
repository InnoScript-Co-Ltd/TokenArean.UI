// src/redux/api/game/gameApi.ts

import axiosInstance from "@/constants/axios";
import {
  DeleteUserResponse,
  User,
  UserListResponse,
  UserEntryResponse,
  PaginationParams,
  UserPayload,
} from "@/constants/config";

export const fetchUser = async (
  pagination?: PaginationParams,
  searchTerm?: string
): Promise<UserListResponse> => {
  try {
    const params = {
      searchTerm: searchTerm ?? "",
      ...(pagination || {}),
    };

    const response = await axiosInstance.get<UserListResponse>("/api/v1/User", {
      params,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch User:", error);
    throw error;
  }
};

export const fetchCreateUser = async (
  User: UserPayload
): Promise<UserEntryResponse> => {
  try {
    const response = await axiosInstance.post<UserEntryResponse>(
      "/register",
      User
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add User data:", error);
    throw error;
  }
};

export const fetchUpdatUser = async (
  id: string,
  User: UserPayload
): Promise<UserEntryResponse> => {
  try {
    const response = await axiosInstance.put<UserEntryResponse>(
      `/api/v1/User/${id}`,
      User
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update User data:", error);
    throw error;
  }
};

export const fetchDeleteUser = async (
  id: string
): Promise<DeleteUserResponse> => {
  const response = await axiosInstance.delete<DeleteUserResponse>(
    `/api/v1/User/${id}`
  );
  return response.data;
};
