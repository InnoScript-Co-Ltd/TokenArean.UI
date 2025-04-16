import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";
import PaymentModal from "./components/PaymentModal";
import useGameDetail from "@/redux/hook/game/useGameDetail";
import { OrderPayload, TokenPackage } from "@/constants/config";
import useOrder from "@/redux/hook/order/userOrder";
import { useLanguage } from "@/redux/hook/language/useLanguage";

const GameDetail: React.FC = () => {
  const { gameId } = useParams();
  const { gameDetail } = useGameDetail({ id: gameId });
  const { handleCreateOrder, error } = useOrder();
  const { lang } = useLanguage();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(
    null
  );
  const [formData, setFormData] = useState<OrderPayload>({
    inGameUserId: "",
    serverInfo: "",
    mobileNumber: "",
    tokenPackageId: "",
    screenShot: null,
  });

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
      tokenPackageId: selectedPackage.id.toString(),
    }));

    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    const payload = new FormData();

    payload.append("inGameUserId", String(formData.inGameUserId));
    payload.append("serverInfo", String(formData.serverInfo));
    payload.append("mobileNumber", String(formData.mobileNumber));
    payload.append("tokenPackageId", String(formData.tokenPackageId));
    payload.append("screenShot", "");
    if (formData.screenShot) {
      payload.append("file_ScreenShot", formData.screenShot);
    }
    console.log(payload);

    await handleCreateOrder(payload);

    setFormData({
      inGameUserId: "",
      serverInfo: "",
      mobileNumber: "",
      tokenPackageId: "",
      screenShot: null,
    });
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
                src={gameDetail?.logo}
                alt={gameDetail?.title}
                className="w-full h-auto object-cover rounded-md mb-4"
              />
            </div>
            <div className="flex flex-col gap-4 p-0 sm:p-4">
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold">
                {gameDetail?.title}
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
                  {lang === "mm" ? "ညွှန်ကြားချက်" : "How to Top Up"}
                </h2>
                <ol className="list-decimal list-inside text-sm space-y-1 mt-3">
                  <li>
                    {lang === "mm"
                      ? "အသုံးပြုသူ ID နှင့် Server ကိုထည့်ပါ"
                      : "Enter Your User ID & Select Server"}
                  </li>
                  <li>
                    {lang === "mm"
                      ? "အသုံးပြုသူ ဖုန်းနံပတ်ထည့်ပါ"
                      : "Enter Your Mobile Number (Optional)"}
                  </li>
                  <li>
                    {lang === "mm"
                      ? "ဝယ်ယူလိုသော Package ကိုရွေးချယ်ပါ"
                      : "Choose Your Desired Package"}
                  </li>
                  <li>
                    {lang === "mm"
                      ? '"ဝယ်ယူမည်" ကိုနှိပ်ပါက ဝယ်ယူခြင်းအောင်မြင်ပါပြီ'
                      : 'Click "Buy Now" to finalize your purchase'}
                  </li>
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
                    {lang === "mm"
                      ? "အကောင့်အချက်အလက်များ ဖြည့်သွင်းပါ"
                      : "Enter Account Details"}
                  </p>
                </div>

                {/* User ID */}
                <div
                  className={`col-span-3 ${
                    gameDetail?.serverType ? "sm:col-span-2" : "sm:col-span-3"
                  }`}
                >
                  <input
                    type="text"
                    name="inGameUserId"
                    value={formData?.inGameUserId}
                    onChange={handleInputChange}
                    placeholder={
                      lang === "mm"
                        ? "အသုံးပြုသူ IDထည့်ပါ ..."
                        : "Enter User ID ..."
                    }
                    required
                    className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                  />
                </div>

                {/* Server Info */}
                {gameDetail?.serverType && (
                  <div className="col-span-3 sm:col-span-1">
                    {gameDetail?.serverType.toLowerCase() === "server" ? (
                      <select
                        name="serverInfo"
                        value={formData?.serverInfo}
                        onChange={handleInputChange}
                        className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                      >
                        <option value="">
                          {lang === "mm"
                            ? "Server ရွေးချယ်ပါ"
                            : "Select Server"}
                        </option>
                        <option value="America">America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="TW, HK, MO">TW, HK, MO</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="serverInfo"
                        value={formData?.serverInfo}
                        onChange={handleInputChange}
                        placeholder={
                          lang === "mm"
                            ? "Zone IDထည့်ပါ ..."
                            : "Enter Zone ID ..."
                        }
                        className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                      />
                    )}
                  </div>
                )}

                {/* Mobile Number */}
                <div className="col-span-3">
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData?.mobileNumber}
                    onChange={handleInputChange}
                    placeholder={
                      lang === "mm"
                        ? "အသုံးပြုသူ ဖုန်းနံပတ်ထည့်ပါ ..."
                        : "Enter Mobile Number (Optional) ..."
                    }
                    className="w-full h-12 px-5 rounded-md bg-[#f5f5f5] border-0"
                  />
                </div>
              </div>

              {error ? (
                <p className=" text-sm text-red-500 ">
                  {lang === "mm"
                    ? "အသုံးပြုသူအိုင်ဒီနှင် ့ဖုန်းနံပတ်အားပြန်လည်စစ်ဆေးပေးပါ"
                    : "Check User ID and Mobile Number again"}
                </p>
              ) : (
                <></>
              )}

              {/* Selected Item & Total */}
              <div className="mt-6 space-y-4">
                <p className="text-lg font-semibold text-[#333]">
                  {lang === "mm"
                    ? "ရွေးချယ်ထားသော ဂိမ်းPackage"
                    : "Selected Game Package"}
                </p>
                <div className="bg-[#f5f5f5] p-4 rounded-lg flex items-center justify-between">
                  {selectedPackage ? (
                    <>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedPackage?.packageImage}
                          alt={selectedPackage?.tokenTitle}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="font-semibold">
                          {selectedPackage?.tokenTitle}
                        </span>
                      </div>
                      <span className="font-semibold">
                        {selectedPackage.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500">
                      {lang === "mm"
                        ? "ဂိမ်းPackage မရွေးချယ်ရသေးပါ"
                        : "Select Game Item ..."}
                    </span>
                  )}
                </div>
                <div className="flex justify-between px-4">
                  <span className="text-lg font-semibold">
                    {lang === "mm" ? "စုစုပေါင်း" : "Total"}
                  </span>
                  <span className="text-lg font-semibold">{total}</span>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={!selectedPackage || !formData?.inGameUserId}
                  className="bg-primary text-white w-full cursor-pointer py-2 px-6 rounded-md font-semibold hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {lang === "mm" ? "ဝယ်ယူမည်" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Package Grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-5">
            {lang === "mm" ? "ဂိမ်းItem ရွေးချယ်မည်" : "Select Game Item"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {gameDetail?.tokenPackageDto?.map((pkg) => (
              <div
                key={pkg?.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition ${
                  selectedPackage?.id === pkg?.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={pkg?.packageImage}
                  alt={pkg?.tokenTitle}
                  className="w-16 h-16 object-cover mb-3"
                />
                <span className="font-semibold">{pkg?.tokenTitle}</span>
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
          setForm={setFormData}
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={handleConfirmPayment}
        />
      )}

      <Footer />
    </>
  );
};

export default GameDetail;
