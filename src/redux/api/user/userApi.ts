import axiosInstance from "@/constants/axios";
import {
  UserListResponse,
  UserEntryResponse,
  PaginationParams,
  UserPayload,
  ChangePasswordPayload,
  ChangePasswordResponse,
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
      "api/v1/Auth/Register",
      User
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add User data:", error);
    throw error;
  }
};
export const fetchChangePassword = async (
  ChangePassword: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
  try {
    console.log(ChangePassword);
    const response = await axiosInstance.post<ChangePasswordResponse>(
      "api/v1/User/change-password",
      ChangePassword
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to Change Password:", error);
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
): Promise<UserEntryResponse> => {
  const response = await axiosInstance.delete<UserEntryResponse>(
    `/api/v1/User/${id}`
  );
  return response.data;
};
