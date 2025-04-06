import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";
import PaymentModal from "./components/PaymentModal";

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
  const { gameId } = useParams();
  const currentLang = "mm";

  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(
    null
  );
  const [formData, setFormData] = useState({
    InGameUserId: "",
    ServerInfo: "",
    MobileNumber: "",
    TokenPackageId: "",
    ScreenShot: "",
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const gameDetail = {
    id: gameId,
    Title: "Genshin Impact",
    Logo: "https://image.api.playstation.com/vulcan/ap/rnd/202408/2010/6e7d87fef87405e9925e810a1620df04c3b98c2086711336.png",
    ServerType: "zone id", // "server" | "zone id" | ""
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = () => {
    if (!selectedPackage) return;
    setFormData((prev) => ({
      ...prev,
      TokenPackageId: selectedPackage.id.toString(),
    }));
    setIsPaymentModalOpen(true);
  };

  const handleScreenshotChange = (dataUrl: string) => {
    setFormData((prev) => ({ ...prev, ScreenShot: dataUrl }));
  };

  const handleConfirmPayment = () => {
    console.log("Submitting Payment:", formData);
    setIsPaymentModalOpen(false);
  };

  const total = selectedPackage?.price || "0 Ks";

  return (
    <>
      <Header />

      <main className="container mx-auto p-5">
        <div className="grid grid-cols-3 gap-y-5">
          {/* Left Panel */}
          <div className="col-span-3 md:col-span-1 px-3 py-6 border rounded-lg shadow-sm flex flex-col gap-3">
            <div className="w-full aspect-[2/1] overflow-hidden rounded-lg">
              <img
                src={gameDetail.Logo}
                alt={gameDetail.Title}
                className="w-full h-auto object-cover rounded-md mb-4"
              />
            </div>
            <div className="flex flex-col gap-4 p-0 sm:p-4">
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold">
                {gameDetail.Title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-full bg-[#00a9de40] text-[#333] px-3 py-1 flex items-center gap-1">
                  <IoShieldCheckmarkSharp />
                  <span className="text-xs">Official Supply & Safe</span>
                </div>
                <div className="rounded-full bg-[#00a9de40] text-[#333] px-3 py-1 flex items-center gap-1">
                  <PiMedalFill />
                  <span className="text-xs">100% Trusted</span>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">
                  {currentLang === "mm" ? "ညွှန်ကြားချက်" : "How to Top Up"}
                </h2>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>Enter Your User ID & Select Server</li>
                  <li>Enter Your Mobile Number (Optional)</li>
                  <li>Choose Your Desired Package</li>
                  <li>Click "Buy Now" to finalize your purchase</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-3 md:col-span-2 md:ms-5">
            <div className="bg-[#00a9de40] p-5 rounded-lg shadow-lg flex flex-col justify-between h-full">
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3">
                  <p className="text-xl font-semibold text-[#333]">
                    {currentLang === "mm"
                      ? "အကောင့်အချက်အလက်များ ဖြည့်သွင်းပါ"
                      : "Enter Account Details"}
                  </p>
                </div>

                {/* User ID */}
                <div
                  className={`col-span-3 ${
                    gameDetail.ServerType ? "sm:col-span-2" : "sm:col-span-3"
                  }`}
                >
                  <input
                    type="text"
                    name="InGameUserId"
                    value={formData.InGameUserId}
                    onChange={handleInputChange}
                    placeholder="Enter User ID ..."
                    className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                  />
                </div>

                {/* Server Info */}
                {gameDetail.ServerType && (
                  <div className="col-span-3 sm:col-span-1">
                    {gameDetail.ServerType.toLowerCase() === "server" ? (
                      <select
                        name="ServerInfo"
                        value={formData.ServerInfo}
                        onChange={handleInputChange}
                        className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                      >
                        <option value="">Select Server</option>
                        <option value="America">America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="TW, HK, MO">TW, HK, MO</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="ServerInfo"
                        value={formData.ServerInfo}
                        onChange={handleInputChange}
                        placeholder="Enter Zone ID ..."
                        className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                      />
                    )}
                  </div>
                )}

                {/* Mobile Number */}
                <div className="col-span-3">
                  <input
                    type="text"
                    name="MobileNumber"
                    value={formData.MobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Mobile Number (Optional) ..."
                    className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                  />
                </div>
              </div>

              {/* Selected Item & Total */}
              <div className="mt-6 space-y-4">
                <p className="text-lg font-semibold text-[#333]">
                  {currentLang === "mm"
                    ? "ရွေးချယ်ထားသော ဂိမ်းItem"
                    : "Selected Game Item"}
                </p>
                <div className="bg-[#f5f5f5] p-4 rounded-lg flex items-center justify-between">
                  {selectedPackage ? (
                    <>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedPackage.image}
                          alt={selectedPackage.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="font-semibold">
                          {selectedPackage.name}
                        </span>
                      </div>
                      <span className="font-semibold">
                        {selectedPackage.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500">
                      {currentLang === "mm"
                        ? "ဂိမ်းItem မရွေးချယ်ရသေးပါ"
                        : "Select Game Item ..."}
                    </span>
                  )}
                </div>
                <div className="flex justify-between px-4">
                  <span className="text-lg font-semibold">
                    {currentLang === "mm" ? "စုစုပေါင်း" : "Total"}
                  </span>
                  <span className="text-lg font-semibold">{total}</span>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={!selectedPackage}
                  className="bg-primary text-white w-full cursor-pointer py-2 px-6 rounded-md font-semibold hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentLang === "mm" ? "ဝယ်မည်" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Package Grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-5">
            {currentLang === "mm"
              ? "ဂိမ်းItem ရွေးချယ်မည်"
              : "Select Game Item"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition ${
                  selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-16 h-16 object-cover mb-3"
                />
                <span className="font-semibold">{pkg.name}</span>
                <span className="text-gray-600 mt-1">{pkg.price}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <PaymentModal
          selectedPackage={selectedPackage}
          total={total}
          onScreenshotChange={handleScreenshotChange}
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={handleConfirmPayment}
        />
      )}

      <Footer />
    </>
  );
};

export default GameDetail;
