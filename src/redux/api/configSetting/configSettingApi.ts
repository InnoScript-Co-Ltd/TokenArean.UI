import axiosInstance from "@/constants/axios";
import {
  ConfigSettingPayload,
  ConfigSettingEntryResponse,
  ConfigSettingListResponse,
  PaginationParams,
} from "@/constants/config";

export const fetchConfig = async (
  pagination?: PaginationParams,
  searchTerm?: string
): Promise<ConfigSettingListResponse> => {
  try {
    const params = {
      searchTerm: searchTerm ?? "",
      ...(pagination || {}),
    };

    const response = await axiosInstance.get<ConfigSettingListResponse>(
      "/api/v1/ConfigSetting",
      {
        params,
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch ConfigSetting:", error);
    throw error;
  }
};

export const fetchCreateConfig = async (
  configSetting: ConfigSettingPayload
): Promise<ConfigSettingEntryResponse> => {
  try {
    const response = await axiosInstance.post<ConfigSettingEntryResponse>(
      "/api/v1/ConfigSetting",
      configSetting
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add game data:", error);
    throw error;
  }
};

export const fetchUpdateConfig = async (
  id: number,
  configSetting: ConfigSettingPayload
): Promise<ConfigSettingEntryResponse> => {
  try {
    const response = await axiosInstance.put<ConfigSettingEntryResponse>(
      `/api/v1/ConfigSetting/${id}`,
      configSetting
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update game data:", error);
    throw error;
  }
};

export const fetchDeleteConfig = async (
  id: number
): Promise<ConfigSettingEntryResponse> => {
  const response = await axiosInstance.delete<ConfigSettingEntryResponse>(
    `/api/v1/ConfigSetting/${id}`
  );
  return response.data;
};
