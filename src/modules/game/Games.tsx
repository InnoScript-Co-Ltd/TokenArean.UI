import Banner from "@/components/global/Banner";
import GameCard from "@/components/global/GameCard";
import useGame from "@/redux/hook/game/useGame";

const Games = () => {
  const { games } = useGame();
  return (
    <>
      <Banner title="Games" />
      <div className="grid grid-cols-1 min-[428px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-5 ">
        {games.slice(0, 3).map((game, index) => (
          <div key={index} className=" col-span-1">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Games;
