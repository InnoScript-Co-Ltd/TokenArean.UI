import Header from "./components/Header";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/EmblaCarousel";
import GameCard from "@/components/global/GameCard";
import useGame from "@/redux/hook/game/useGame";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useLanguage } from "@/redux/hook/language/useLanguage";

const Home = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const { games, totalCount } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  const { lang } = useLanguage();

  const handleSeeMore = () => {
    setPagination({ currentPage: 1, pageSize: pagination.pageSize + 12 });
  };

  return (
    <>
      <Header />
      <main className=" my-8">
        {/* Carousel */}
        <EmblaCarousel games={games} options={{ loop: true }} />

        <div className=" container mx-auto p-5">
          {/* Most Popular */}
          <section className="mt-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
              {lang === "en" ? " MOST POPULAR" : "လူကြိုက်များသောဂိမ်းများ"}
            </h2>
            <div className="grid grid-cols-1 min-[428px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-5 ">
              {games?.map((game, index) => (
                <div key={index} className=" col-span-1">
                  <GameCard game={game} />
                </div>
              ))}
            </div>

            {totalCount == null || totalCount <= 12 ? (
              <></>
            ) : (
              <div
                onClick={handleSeeMore}
                className=" flex justify-center items-center mt-8 cursor-pointer"
              >
                See More <FaChevronDown />
              </div>
            )}
          </section>

          {/* Mobile Games */}
          {/* <section className="mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
            Mobile Games
          </h2>
          <div className="grid grid-cols-1 min-[428px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-5 ">
            {games.map((game, index) => (
              <div key={index} className=" col-span-1">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section> */}

          {/* New Release */}
          {/* <section className="mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
            New Release
          </h2>
          <div className="grid grid-cols-1 min-[428px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 mt-5 ">
            {games.map((game, index) => (
              <div key={index} className=" col-span-1">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
