// src/components/GameInputModal.tsx
import React, { FC, useEffect, useState, useRef, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Order } from "@/constants/config";

interface OrderInputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentOrder?: Order | null;
  handleUpdateOrder: (id: string, data: FormData) => Promise<void>;
}

interface FormState {
  screenShot: File | null;
  inGameUserId: number;
  serverInfo: string;
  mobileNumber: string;
  orderStatus: string;
  tokenPackageId: string;
}

const OrderInputModal: FC<OrderInputModalProps> = ({
  open,
  onOpenChange,
  currentOrder,
  handleUpdateOrder,
}) => {
  const [form, setForm] = useState<FormState>({
    screenShot: null,
    inGameUserId: 0,
    serverInfo: "",
    mobileNumber: "",
    orderStatus: "",
    tokenPackageId: "",
  });
  const [screenShotPreview, setScreenShotPreview] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (currentOrder) {
      setForm({
        screenShot: null,
        inGameUserId: currentOrder.inGameUserId,
        serverInfo: currentOrder.serverInfo,
        mobileNumber: currentOrder.mobileNumber,
        orderStatus: currentOrder.status,
        tokenPackageId: currentOrder.tokenPackageDto.id,
      });
      setScreenShotPreview(currentOrder.screenShot);
    } else {
      setForm({
        screenShot: null,
        inGameUserId: 0,
        serverInfo: "",
        mobileNumber: "",
        orderStatus: "",
        tokenPackageId: "",
      });
      setScreenShotPreview("");
    }
  }, [currentOrder, open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("inGameUserId", form.inGameUserId.toString());
    formData.append("mobileNumber", form.mobileNumber);
    formData.append("orderStatus", form.orderStatus);
    formData.append("serverInfo", form.serverInfo);
    formData.append("tokenPackageId", form.tokenPackageId);
    formData.append("screenShot", "");

    if (form.screenShot) {
      formData.append("file_ScreenShot", form.screenShot);
    }

    try {
      if (currentOrder?.id) {
        await handleUpdateOrder(currentOrder.id.toString(), formData);
      }
      onOpenChange(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleFullscreen = () => {
    if (imageRef.current) {
      const img = imageRef.current;
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if ((img as any).webkitRequestFullscreen) {
        (img as any).webkitRequestFullscreen();
      } else if ((img as any).msRequestFullscreen) {
        (img as any).msRequestFullscreen();
      } else {
        console.warn("Fullscreen API is not supported.");
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} modal>
        <DialogContent className="sm:max-w-lg">
          {/* Ensure this has z-50 or lower */}
          <DialogHeader>
            <DialogTitle>
              {currentOrder ? "Edit Order" : "Add New Order"}
            </DialogTitle>
            <DialogDescription>
              {currentOrder
                ? "Update the details of your Order."
                : "Fill out the form to add a new order."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            {/* Screenshot Upload & Preview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label
                  htmlFor="screenShot_input"
                  className="cursor-pointer w-full aspect-square max-h-[120px] bg-gray-100 border border-dashed rounded flex items-center justify-center overflow-hidden"
                >
                  {screenShotPreview ? (
                    <img
                      ref={imageRef}
                      src={screenShotPreview}
                      alt="ScreenShot Preview"
                      className="w-full h-full object-cover object-center"
                      onClick={() => handleFullscreen()}
                    />
                  ) : (
                    <span className="text-gray-500 text-sm sm:text-base">
                      No Screenshot
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* InGameUserId */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="inGameUserId">InGameUserId</Label>
              <Input
                id="inGameUserId"
                name="inGameUserId"
                value={form.inGameUserId}
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Server Info */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="serverInfo">Server Info</Label>
                <Input
                  id="serverInfo"
                  name="serverInfo"
                  value={form.serverInfo}
                  readOnly
                />
              </div>

              {/* Order Status */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select
                  value={form.orderStatus}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, orderStatus: value }))
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select Order Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={form.mobileNumber}
                readOnly
              />
            </div>

            {/* Token Package */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="tokenPackageTitle">Token Package</Label>
              <Input
                id="tokenPackageTitle"
                value={currentOrder?.tokenPackageDto.tokenTitle || ""}
                readOnly
              />
            </div>

            <input
              type="hidden"
              name="tokenPackageId"
              value={form.tokenPackageId}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>
              {currentOrder ? "Update Order" : "Create Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderInputModal;
