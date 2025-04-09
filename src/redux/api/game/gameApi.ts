// src/redux/api/game/gameApi.ts

import axiosInstance from "@/constants/axios";
import {
  DeleteGameResponse,
  Game,
  GameListResponse,
  GamePayload,
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

    const response = await axiosInstance.get<GameListResponse>("/api/v1/game", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch Game:", error);
    throw error;
  }
};

export const fetchCreateGame = async (game: GamePayload): Promise<Game> => {
  try {
    const response = await axiosInstance.post<Game>(
      "/api/v1/game/create",
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
  game: GamePayload
): Promise<Game> => {
  try {
    const response = await axiosInstance.put<Game>(
      `/api/v1/game/update/${id}`,
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
    `/game/delete/${id}`
  );
  return response.data;
};
