import React from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

type PackageItem = {
  id: number;
  name: string;
  image: string;
  price: string;
};

const packages: PackageItem[] = [
  { id: 1, name: "100 Gem", image: "/images/gems.png", price: "100 Ks" },
  { id: 2, name: "200 Gem", image: "/images/gems.png", price: "200 Ks" },
  { id: 3, name: "300 Gem", image: "/images/gems.png", price: "300 Ks" },
  { id: 4, name: "400 Gem", image: "/images/gems.png", price: "400 Ks" },
  { id: 5, name: "500 Gem", image: "/images/gems.png", price: "500 Ks" },
  { id: 6, name: "600 Gem", image: "/images/gems.png", price: "600 Ks" },
  { id: 7, name: "700 Gem", image: "/images/gems.png", price: "700 Ks" },
  { id: 8, name: "800 Gem", image: "/images/gems.png", price: "800 Ks" },
  { id: 9, name: "900 Gem", image: "/images/gems.png", price: "900 Ks" },
];

const GameDetail: React.FC = () => {
  const { gameId } = useParams;

  return (
    <>
      <Header />

      <main className="container mx-auto p-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Game Info */}
          <div className="w-full md:w-1/2 p-4 border rounded-lg shadow-sm">
            <img
              src="/images/genshin-impact.jpg"
              alt="Genshin Impact"
              className="w-full h-auto object-cover rounded-md mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">Genshin Impact</h1>
            <h2 className="text-lg font-semibold mb-2">How to Top Up</h2>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Enter Your User ID &amp; Select Server</li>
              <li>Enter Your Email</li>
              <li>Choose Your Desired Package</li>
              <li>Click "Buy Now" to finalize your purchase</li>
            </ol>
          </div>

          {/* Right Column: Form + Selected Item */}
          <div className="w-full md:w-1/2 p-4 border rounded-lg shadow-sm flex flex-col space-y-4">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter User ID
              </label>
              <input
                type="text"
                placeholder="e.g. 123456789"
                className="border w-full rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Select Server
              </label>
              <select className="border w-full rounded-md px-3 py-2">
                <option value="">-- Select Server --</option>
                <option value="America">America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="TW, HK, MO">TW, HK, MO</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Enter User Email
              </label>
              <input
                type="email"
                placeholder="your-email@example.com"
                className="border w-full rounded-md px-3 py-2"
              />
            </div>

            {/* Selected Item */}
            <div className="border-t pt-4">
              <p className="text-sm font-semibold">Selected Item</p>
              <p className="text-xl font-bold mt-1">100 Ks</p>
            </div>

            {/* Buy Now Button */}
            <button className="bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition-colors">
              Buy Now
            </button>
          </div>
        </div>

        {/* Select Package Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Select Package</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
