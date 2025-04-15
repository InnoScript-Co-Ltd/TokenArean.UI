// src/pages/Games.tsx
import React, { useState, useCallback } from "react";
import Banner from "@/components/global/Banner";
import Loader from "@/components/global/Loader";
import GameTable from "./components/GameTable";
import GameInputModal from "./components/GameInputModal";
import useGame from "@/redux/hook/game/useGame";
import type { Game } from "@/constants/config";
import ConfirmModal from "@/components/global/ConfirmModal";

const Games: React.FC = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    games,
    status,
    error,
    totalCount,
    createGame,
    updateGame,
    deleteGame,
  } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  console.log("game", games);
  // Handlers
  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);

  const handleEditGame = useCallback((game: Game) => {
    setAlertOpen(false);
    setCurrentGame(game);
    setOpen(true);
  }, []);

  const handleDeleteGame = useCallback(
    (id: string) => {
      const game = games.find((g) => g.id === id);
      if (game) {
        setCurrentGame(game);
        setAlertOpen(true);
      }
    },
    [games]
  );

  const handleCreateGame = useCallback(
    async (data: FormData) => {
      await createGame(data);
      setOpen(false);
    },
    [createGame]
  );

  const handleUpdateGame = useCallback(
    async (id: string | number, data: FormData) => {
      await updateGame(id.toString(), data);
      setOpen(false);
    },
    [updateGame]
  );

  const confirmDelete = () => {
    if (currentGame) {
      deleteGame(currentGame.id);
      setAlertOpen(false);
      setCurrentGame(null);
    }
  };

  const cancelDelete = () => {
    setAlertOpen(false);
    setCurrentGame(null);
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="Games" />
        <button
          onClick={() => {
            setCurrentGame(null);
            setOpen(true);
          }}
          className="px-3 sm:px-5 py-2 text-white bg-primary rounded-md shadow-md hover:opacity-70 transition-all cursor-pointer text-sm md:text-base"
        >
          Add Game
        </button>
      </div>

      <div className="my-5 px-5 py-3 overflow-x-auto w-full">
        <GameTable
          games={games}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onEdit={handleEditGame}
          onDelete={handleDeleteGame}
        />
      </div>

      <GameInputModal
        open={open}
        onOpenChange={setOpen}
        currentGame={currentGame}
        handleCreateGame={handleCreateGame}
        handleUpdateGame={handleUpdateGame}
      />

      <ConfirmModal
        open={alertOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Game?"
        description="This will permanently remove the game. Are you sure?"
      />
    </>
  );
};

export default Games;
