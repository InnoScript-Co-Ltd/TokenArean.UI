import Header from "./components/Header";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/EmblaCarousel";
import GameCard from "@/components/global/GameCard";
import useGame from "@/redux/hook/game/useGame";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// const slides = [
//   {
//     id: 1,
//     image: "https://i.ytimg.com/vi/SxGma3zMzgo/maxresdefault.jpg",
//     alt: "Slide 1",
//   },
//   {
//     id: 2,
//     image:
//       "https://n4g.com/articles/wp-content/uploads/2023/04/Genshin-Impact-Promotional-Artwork.jpg",
//     alt: "Slide 2",
//   },
//   {
//     id: 3,
//     image:
//       "https://64.media.tumblr.com/3ef4f779b6ebb6f59b7b79d087978f79/a351990b3f013487-cc/s1280x1920/98c87999e7faf7c5aa4f17f236b2680925fe5f51.png",
//     alt: "Slide 3",
//   },
// ];

const Home = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const { games, totalCount, bannerList } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

  const handleSeeMore = () => {
    setPagination({ currentPage: 1, pageSize: pagination.pageSize + 12 });
  };
  // const slides = games.map((game) => ({
  //   id: game.id,
  //   image: game.bannerImage,
  //   alt: `Banner ${game.id}`,
  // }));
  console.log("game banner", bannerList);
  return (
    <>
      <Header />
      <main className=" container mx-auto p-5">
        {/* Carousel */}
        <EmblaCarousel slides={bannerList} options={{ loop: true }} />

        {/* Most Popular */}
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
            MOST POPULAR
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
      </main>
      <Footer />
    </>
  );
};

export default Home;
