import { shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import { loadGameDetail } from "@/redux/service/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useGameDetail = ({ id }: { id?: string }) => {
  const dispatch = useAppDispatch();

  const selectGame = useMemo(() => (state: RootState) => state.game, []);
  const gameResponse = useAppSelector(selectGame, shallowEqual);

  const { gameDetail, status, error } = gameResponse;

  useEffect(() => {
    if (id) dispatch(loadGameDetail(id));
  }, [dispatch, id]);

  return {
    gameDetail,
    status,
    error,
  };
};

export default useGameDetail;
