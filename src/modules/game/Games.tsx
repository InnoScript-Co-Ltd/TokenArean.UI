// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import useGame from "@/redux/hook/game/useGame";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameTable from "./components/GameTable";

const Games = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });

  const { games, status, error } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

  if (status === "loading") return <p>Loading games…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Banner title="Games" />
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <GameTable
          games={games}
          onEdit={(game) => navigate(`/games/${game.id}/edit`)}
          onDelete={(id) => {}}
        />
      </div>
    </>
  );
};

export default Games;
