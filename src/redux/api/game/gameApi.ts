import axiosInstance from "@/constants/axios";
import {
  DeleteGameResponse,
  GameEntryResponse,
  GameListResponse,
  PaginationParams,
} from "@/constants/config";

export const fetchGame = async (
  pagination?: PaginationParams,
  searchTerm?: string
): Promise<GameListResponse> => {
  try {
    const params = {
      searchTerm: searchTerm ?? "",
      ...(pagination || {}),
    };

    const response = await axiosInstance.get<GameListResponse>("/api/v1/Game", {
      params,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Game:", error);
    throw error;
  }
};

export const fetchCreateGame = async (
  game: FormData
): Promise<GameEntryResponse> => {
  try {
    const response = await axiosInstance.post<GameEntryResponse>(
      "/api/v1/Game",
      game
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add game data:", error);
    throw error;
  }
};

export const fetchUpdateGame = async (
  id: string,
  game: FormData
): Promise<GameEntryResponse> => {
  try {
    // console.log("api update game :", id);
    const response = await axiosInstance.put<GameEntryResponse>(
      `/api/v1/game/${id}`,
      game
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update game data:", error);
    throw error;
  }
};

export const fetchDeleteGame = async (
  id: string
): Promise<DeleteGameResponse> => {
  const response = await axiosInstance.delete<DeleteGameResponse>(
    `/api/v1/game/${id}`
  );
  return response.data;
};
