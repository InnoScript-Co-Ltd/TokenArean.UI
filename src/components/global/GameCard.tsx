import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Game } from "@/constants/config";

type GameCardProps = {
  game: Game;
};

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`}>
      <div className="rounded-xl overflow-hidden group/game-card shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="w-full aspect-[9/8] overflow-hidden">
          <img
            src={game.logo}
            alt={game.title}
            className="w-full object-cover group-hover/game-card:scale-110 transition-all duration-300"
          />
        </div>
        <div className="w-full py-4 flex justify-center items-center gap-3 group-hover/game-card:gap-4 transition-all duration-300 bg-primary">
          <p className="text-center font-semibold text-white">{game.title}</p>
          <FaArrowRightLong className=" text-white text-xl font-bold" />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
