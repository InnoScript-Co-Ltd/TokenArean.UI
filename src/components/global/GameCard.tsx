import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

type Game = {
  id: number;
  title: string;
  image: string;
};

type GameCardProps = {
  game: Game;
};

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`/game/${game.id}`}>
      <div className="rounded-xl overflow-hidden group/game-card shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="w-full aspect-[9/8] overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            className="w-full object-cover group-hover/game-card:scale-110 transition-all duration-300"
          />
        </div>
        <div className="w-full py-5 flex justify-center gap-3 group-hover/game-card:gap-5 transition-all duration-300 bg-[#00A9DE]">
          <p className="text-center font-semibold text-white">{game.title}</p>
          <FaArrowRightLong className=" text-white text-2xl font-bold" />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
