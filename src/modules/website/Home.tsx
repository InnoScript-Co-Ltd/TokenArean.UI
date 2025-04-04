import Header from "./components/Header";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/EmblaCarousel";
import GameCard from "@/components/global/GameCard";

const games = Array(6)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "Genshin Impact",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQC7Snt4RQfAjRZ5sm9u5iqWbskzyyS41QA&s",
  }));

const slides = [
  {
    id: 1,
    image: "https://i.ytimg.com/vi/SxGma3zMzgo/maxresdefault.jpg",
    alt: "Slide 1",
  },
  {
    id: 2,
    image:
      "https://n4g.com/articles/wp-content/uploads/2023/04/Genshin-Impact-Promotional-Artwork.jpg",
    alt: "Slide 2",
  },
  {
    id: 3,
    image:
      "https://64.media.tumblr.com/3ef4f779b6ebb6f59b7b79d087978f79/a351990b3f013487-cc/s1280x1920/98c87999e7faf7c5aa4f17f236b2680925fe5f51.png",
    alt: "Slide 3",
  },
];

const Home = () => {
  return (
    <>
      <Header />
      <main className=" container mx-auto p-5">
        {/* Carousel */}
        <EmblaCarousel slides={slides} options={{ loop: true }} />

        {/* Most Popular */}
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
            MOST POPULAR
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-5 ">
            {games.slice(0, 3).map((game, index) => (
              <div key={index} className=" col-span-1">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Games */}
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
            Mobile Games
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-5 ">
            {games.map((game, index) => (
              <div key={index} className=" col-span-1">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>

        {/* New Release */}
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-10">
            New Release
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 mt-5 ">
            {games.map((game, index) => (
              <div key={index} className=" col-span-1">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
