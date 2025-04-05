import React from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";

type PackageItem = {
  id: number;
  name: string;
  image: string;
  price: string;
};

const packages: PackageItem[] = [
  {
    id: 1,
    name: "100 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "100 Ks",
  },
  {
    id: 2,
    name: "200 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "200 Ks",
  },
  {
    id: 3,
    name: "300 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "300 Ks",
  },
  {
    id: 4,
    name: "400 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "400 Ks",
  },
  {
    id: 5,
    name: "500 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "500 Ks",
  },
  {
    id: 6,
    name: "600 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "600 Ks",
  },
  {
    id: 7,
    name: "700 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "700 Ks",
  },
  {
    id: 8,
    name: "800 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "800 Ks",
  },
  {
    id: 9,
    name: "900 Gem",
    image:
      "https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png",
    price: "900 Ks",
  },
];

const GameDetail: React.FC = () => {
  const { gameId } = useParams;

  const gameDetail = {
    id: gameId,
    title: "Genshin Impact",
    logo: "https://image.api.playstation.com/vulcan/ap/rnd/202408/2010/6e7d87fef87405e9925e810a1620df04c3b98c2086711336.png",
  };

  return (
    <>
      <Header />

      <main className="container mx-auto p-5">
        <div className="grid grid-cols-3  gap-y-5">
          <div className=" col-span-3 md:col-span-1 px-3 py-6 border rounded-lg shadow-sm flex flex-col gap-3">
            <div className=" w-full aspect-[2/1] overflow-hidden rounded-lg">
              <img
                src={gameDetail?.logo}
                alt="Genshin Impact"
                className="w-full h-auto object-cover rounded-md mb-4"
              />
            </div>

            <div className=" flex flex-col gap-4 p-0 sm:p-4 md:p-0 lg:p-4">
              <h1 className=" text-xl lg:text-2xl xl:text-3xl font-bold">
                {gameDetail?.title}
              </h1>

              <div className=" flex items-center flex-col sm:flex-row md:flex-col xl:flex-row gap-x-5 gap-y-3">
                <div className=" rounded-full bg-[#00a9de40] text-[#333] h-8 w-full flex justify-center items-center">
                  <div className=" flex items-center gap-1 justify-center">
                    <IoShieldCheckmarkSharp />
                    <p className=" text-xs">Official Supply & Safe</p>
                  </div>
                </div>
                <div className=" rounded-full bg-[#00a9de40] text-[#333] h-8 w-full flex justify-center items-center">
                  <div className=" flex items-center gap-1 justify-center">
                    <PiMedalFill />
                    <p className=" text-xs">100% Trusted</p>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col gap-3">
                <h2 className="text-lg font-semibold">How to Top Up</h2>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Enter Your User ID &amp; Select Server</li>
                  <li>Enter Your Email</li>
                  <li>Choose Your Desired Package</li>
                  <li>Click "Buy Now" to finalize your purchase</li>
                </ol>
              </div>
            </div>
          </div>

          <div className=" col-span-3 md:col-span-2 md:ms-5 ">
            <div className=" bg-[#00a9de40] w-full h-full shadow-lg px-3 sm:px-5 py-10 rounded-lg flex flex-col justify-between gap-5 md:gap-8 ">
              <div className=" grid grid-cols-3 gap-5">
                <div className=" col-span-3">
                  <p className=" px-3 text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#333]">
                    Enter Account Details
                  </p>
                </div>

                <div className=" col-span-3 sm:col-span-2">
                  <input
                    type="text"
                    name="InGameUserId"
                    id="InGameUserId"
                    placeholder="Enter User ID ..."
                    className="border-0 w-full h-12 rounded-md px-5 py-3 bg-[#f5f5f5]"
                  />
                </div>

                <div className=" col-span-3 sm:col-span-1">
                  <select className="border-0 w-full h-12 rounded-md px-5 py-3 bg-[#f5f5f5]">
                    <option value="">Select Server</option>
                    <option value="America">America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="TW, HK, MO">TW, HK, MO</option>
                  </select>
                </div>

                <div className=" col-span-3">
                  <input
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    placeholder="Enter User Email ..."
                    className="border-0 w-full h-12 rounded-md px-5 py-3 bg-[#f5f5f5]"
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-5">
                <div className=" flex flex-col gap-5">
                  <p className=" px-3 text-lg sm:text-xl md:text-lg lg:text-xl text-[#333]">
                    Selected Item
                  </p>

                  <div className=" bg-[#f5f5f5] rounded-lg py-3 px-5 flex items-center justify-between flex-nowrap">
                    <div className=" flex flex-row items-center gap-5">
                      <img
                        src="https://cdn1.codashop.com/S/content/common/images/denom-image/GENSHIN/60_Genshin-Impact_Crystals.png"
                        className=" aspect-square w-10 object-cover"
                        alt=""
                      />
                      <p className="font-semibold">100 Gem</p>
                    </div>
                    <p className="font-semibold">100 Gem</p>
                  </div>
                </div>

                <div className="px-3 flex flex-row items-center justify-between">
                  <p className=" text-lg sm:text-xl md:text-lg lg:text-xl text-[#333]">
                    Total
                  </p>
                  <p className=" text-lg sm:text-xl md:text-lg lg:text-xl text-[#333]">
                    100 Ks
                  </p>
                </div>

                <button className="bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 lg:mb-8">
            Select Package
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="border rounded-lg shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-16 h-16 object-cover mb-3"
                />
                <p className="font-semibold">{pkg.name}</p>
                <p className="text-sm text-gray-600 mt-2">{pkg.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GameDetail;
