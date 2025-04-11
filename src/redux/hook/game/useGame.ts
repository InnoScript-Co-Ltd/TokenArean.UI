// src/hooks/useGame.ts
import { shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadGames,
  createGame,
  updateGame,
  deleteGame,
} from "@/redux/service/game/gameSlice";
import { GamePayload, PaginationParams } from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useGame = ({ currentPage = 1, pageSize = 10 }: PaginationParams = {}) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const selectGame = useMemo(() => (state: RootState) => state.game, []);
  const gameResponse = useAppSelector(selectGame, shallowEqual);

  const { games, totalPages, totalCount, status, error } = gameResponse;

  useEffect(() => {
    const pagination = {
      currentPage,
      pageSize,
    };

    dispatch(loadGames({ pagination, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  const handleCreateGame = useCallback(
    async (payload: GamePayload) => {
      try {
        const response = await dispatch(createGame(payload)).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to create game:", err);
      }
    },
    [dispatch]
  );

  const handleUpdateGame = useCallback(
    async (id: string, payload: GamePayload) => {
      try {
        const response = await dispatch(
          updateGame({ id, data: payload })
        ).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to update game:", err);
      }
    },
    [dispatch]
  );

  const handleDeleteGame = useCallback(
    async (id: string) => {
      try {
        const deletedId = await dispatch(deleteGame(id)).unwrap();
        return deletedId;
      } catch (err) {
        console.error("Failed to delete game:", err);
      }
    },
    [dispatch]
  );

  return {
    games,
    totalCount,
    totalPages,
    searchTerm,
    status,
    error,

    setSearchTerm,
    createGame: handleCreateGame,
    handleUpdateGame,
    handleDeleteGame,
  };
};

export default useGame;
