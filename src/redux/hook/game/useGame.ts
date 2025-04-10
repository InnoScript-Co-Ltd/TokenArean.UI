// src/hooks/useGame.ts
import { shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadGames,
  createGame,
  updateGame,
  deleteGame,
} from "@/redux/service/game/gameSlice";
import { GamePayload } from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

interface UseGameOptions {
  page?: number;
  perPage?: number;
}

const useGame = ({ page = 1, perPage = 10 }: UseGameOptions = {}) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const selectGame = useMemo(() => (state: RootState) => state.game, []);
  const gameResponse = useAppSelector(selectGame, shallowEqual);

  const { games, total, limit, status, error } = gameResponse;
  const pageCount = Math.ceil(total / limit);
  const totalRecord = total;

  useEffect(() => {
    const pagination = {
      page,
      limit: perPage,
      search,
    };
    dispatch(loadGames(pagination));
  }, [dispatch, page, perPage, search]);

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
    pageCount,
    totalRecord,
    search,
    status,
    error,

    setSearch,
    handleCreateGame,
    handleUpdateGame,
    handleDeleteGame,
  };
};

export default useGame;
