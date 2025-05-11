import axiosInstance from "@/constants/axios";
import {
  TokenPackageListResponse,
  TokenPackageEntryResponse,
  PaginationParams,
} from "@/constants/config";

export const fetchTokenPackage = async (
  pagination?: PaginationParams,
  searchTerm?: string
): Promise<TokenPackageListResponse> => {
  try {
    const params = {
      searchTerm: searchTerm ?? "",
      ...(pagination || {}),
    };

    const response = await axiosInstance.get<TokenPackageListResponse>(
      "/api/v1/TokenPackage",
      {
        params,
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TokenPackage:", error);
    throw error;
  }
};

export const fetchCreateTokenPackage = async (
  tokenPackage: FormData
): Promise<TokenPackageEntryResponse> => {
  try {
    const response = await axiosInstance.post<TokenPackageEntryResponse>(
      "/api/v1/TokenPackage",
      tokenPackage
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add TokenPackage data:", error);
    throw error;
  }
};

export const fetchUpdatTokenPackage = async (
  id: string,
  tokenPackage: FormData
): Promise<TokenPackageEntryResponse> => {
  try {
    const response = await axiosInstance.put<TokenPackageEntryResponse>(
      `/api/v1/TokenPackage/${id}`,
      tokenPackage
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update TokenPackage data:", error);
    throw error;
  }
};

export const fetchDeleteTokenPackage = async (
  id: string
): Promise<TokenPackageEntryResponse> => {
  const response = await axiosInstance.delete<TokenPackageEntryResponse>(
    `/api/v1/TokenPackage/${id}`
  );
  return response.data;
};
