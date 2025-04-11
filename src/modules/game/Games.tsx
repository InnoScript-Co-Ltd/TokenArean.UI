import Banner from "@/components/global/Banner";
import useGame from "@/redux/hook/game/useGame";
import { useState } from "react";
import GameTable from "./components/GameTable";
import GameInputModal from "./components/GameInputModal";
import { Game, GamePayload } from "@/constants/config";
// import { updateGame } from "@/redux/service/game/gameSlice";

const Games = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });

  const [open, setOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const { games, status, error, createGame, updateGame } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

  const handleCreateGame = async (data: GamePayload): Promise<void> => {
    createGame(data);
    setOpen(false);
  };

  const handleUpdateGame = async (
    id: string | number,
    data: GamePayload
  ): Promise<void> => {
    console.log("update game:", data);
    updateGame(id.toString(), data); // ✅ Two separate arguments
    setOpen(false);
  };

  if (status === "loading") return <p>Loading games…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="Games" />
        <div
          onClick={() => {
            setCurrentGame(null);
            setOpen(true);
          }}
          className=" px-3 sm:px-5 py-2 text-white bg-primary rounded-md shadow-md hover:opacity-70 duration-200 transition-all w-fit h-fit cursor-pointer text-sm md:text-base"
        >
          Add Game
        </div>
      </div>

      <div className="my-5 px-5 py-3 min-w-[300px] md:min-w-[500px] overflow-x-auto w-full">
        <GameTable
          games={games}
          onEdit={(game) => {
            setCurrentGame(game);
            setOpen(true);
          }}
          onDelete={(id) => {
            console.log(id);
          }}
        />
      </div>

      <GameInputModal
        open={open}
        onOpenChange={setOpen}
        currentGame={currentGame}
        handleCreateGame={handleCreateGame}
        handleUpdateGame={handleUpdateGame}
      />
    </>
  );
};

export default Games;
