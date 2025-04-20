import Banner from "@/components/global/Banner";
import useOrderDetail from "@/redux/hook/order/useOrderDetail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOrder from "@/redux/hook/order/userOrder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormState {
  screenShot: File | null;
  inGameUserId: number;
  serverInfo: string;
  mobileNumber: string;
  status: string;
  tokenPackageId: string;
  gameTitle: string;
}

const OrderDetail = () => {
  const { orderID } = useParams<{ orderID: string }>();
  const { orderDetail } = useOrderDetail({ id: orderID });
  const { updateOrder } = useOrder();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const nav = useNavigate();

  const [form, setForm] = useState<FormState>({
    screenShot: null,
    inGameUserId: 0,
    serverInfo: "",
    mobileNumber: "",
    status: "",
    tokenPackageId: "",
    gameTitle: "",
  });
  const [screenShotPreview, setScreenShotPreview] = useState<string>("");

  useEffect(() => {
    if (orderDetail) {
      setForm({
        screenShot: null,
        inGameUserId: orderDetail.inGameUserId,
        serverInfo: orderDetail.serverInfo,
        mobileNumber: orderDetail.mobileNumber,
        status: orderDetail.status,
        tokenPackageId: orderDetail.tokenPackageDto.id.toString(),
        gameTitle: orderDetail.gameTitle,
      });
      setScreenShotPreview(orderDetail.screenShot);
    }
  }, [orderDetail]);

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("inGameUserId", form.inGameUserId.toString());
    formData.append("mobileNumber", form.mobileNumber);
    formData.append("orderStatus", form.status);
    formData.append("serverInfo", form.serverInfo);
    formData.append("tokenPackageId", form.tokenPackageId);
    // append existing screenshot placeholder if backend requires
    formData.append("screenShot", "");
    if (form.screenShot) {
      formData.append("file_ScreenShot", form.screenShot);
    }

    try {
      if (orderDetail?.id) {
        await updateOrder(orderDetail.id.toString(), formData);

        nav("/dashboard/orders");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="Order Detail" path1="Orders" />
      </div>
      <div className="my-5 px-5 py-3 w-full grid grid-cols-5 gap-5">
        {/* Left Panel: Details & Update */}
        <div className="col-span-full lg:col-span-3 bg-[#00a9de40] p-5 rounded-lg shadow-lg flex flex-col justify-between h-full">
          <h2 className="text-2xl mb-4">Order Detail</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <h3>Account ID : </h3>
              <p>{orderDetail?.inGameUserId}</p>
            </div>
            <div className="flex items-center gap-5">
              <h3>Server / Zone ID : </h3>
              <p>{orderDetail?.serverInfo}</p>
            </div>
            <div className="flex items-center gap-5">
              <h3>Mobile Number : </h3>
              <p>{orderDetail?.mobileNumber}</p>
            </div>
            <div className="flex flex-col gap-3">
              <h3>Payment Status:</h3>
              <Select value={form.status} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full cursor-pointer bg-white">
                  <SelectValue placeholder="Change Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <h2 className="text-2xl my-4">Game Detail</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <h3>Game Name : </h3>
              <p>{orderDetail?.gameTitle}</p>
            </div>

            <div className="flex flex-col gap-3">
              <h3>Payment Status:</h3>
              <div className="bg-[#f5f5f5] p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={orderDetail?.tokenPackageDto?.packageImage}
                    alt={orderDetail?.tokenPackageDto?.tokenTitle}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="font-semibold">
                    {orderDetail?.tokenPackageDto.unit}{" "}
                    {orderDetail?.tokenPackageDto?.tokenTitle}
                  </span>
                </div>
                <span className="font-semibold">
                  {orderDetail?.tokenPackageDto.price}{" "}
                  {orderDetail?.tokenPackageDto.currency}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white py-2 px-4 rounded-md hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Panel: Screenshot with Lightbox */}
        <div className="col-span-full lg:col-span-2 flex flex-col gap-5 p-5">
          <h2 className="text-2xl">Screenshot</h2>
          <img
            src={screenShotPreview}
            alt="Order Screenshot"
            className="w-full h-auto cursor-pointer shadow-md rounded-lg"
            onClick={() => setLightboxOpen(true)}
          />
        </div>
      </div>

      {/* Lightbox Dialog */}
      {lightboxOpen && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="bg-transparent shadow-none p-0">
            <DialogHeader>
              <DialogClose className="absolute top-2 right-2 text-white text-2xl cursor-pointer">
                ×
              </DialogClose>
            </DialogHeader>
            <img
              src={screenShotPreview}
              alt="Screenshot Large"
              className="max-w-full max-h-screen object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OrderDetail;
