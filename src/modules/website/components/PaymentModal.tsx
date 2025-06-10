import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdOutlineFileUpload } from "react-icons/md";
import { ConfigSetting, OrderPayload, TokenPackage } from "@/constants/config";
import { useLanguage } from "@/redux/hook/language/useLanguage";

export interface PaymentModalProps {
  selectedPackage: TokenPackage | null;
  total: string | number | null;
  configSetting: ConfigSetting[] | null | undefined;
  setForm: React.Dispatch<React.SetStateAction<OrderPayload>>;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean; // new prop
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  selectedPackage,
  total,
  configSetting,
  setForm,
  onClose,
  onConfirm,
  isSubmitting,
}) => {
  const { lang } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setForm((prev) => ({ ...prev, screenShot: file }));
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className=" w-full">
        <DialogHeader>
          <DialogTitle>
            {lang === "mm"
              ? "အတည်ပြုပြီး ScreenShot အားပေးပို့ပါ"
              : "Confirm & Upload ScreenShot"}
          </DialogTitle>
        </DialogHeader>

        {/* Confirmation */}
        <div className="border-b pb-4 w-full">
          {selectedPackage ? (
            <div className="flex items-center gap-4">
              <img
                src={selectedPackage?.packageImage}
                alt={selectedPackage?.tokenTitle}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{selectedPackage?.tokenTitle}</p>
                <p className="text-gray-600">{selectedPackage?.price}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-500">
              {lang === "mm"
                ? "ဂိမ်းPackage မရွေးချယ်ရသေးပါ"
                : "No package selected"}
            </p>
          )}
          <div className="mt-2 flex justify-between">
            <span className="font-semibold">
              {lang === "mm" ? "စုစုပေါင်း : " : "Total : "}
            </span>
            <span className="font-semibold">{total}</span>
          </div>
        </div>

        <div className=" mb-2 flex flex-col gap-3 max-w-[500px] overflow-auto w-full">
          <span className="font-semibold">
            {lang === "mm" ? "ငွေပေးချေရန် အကောင့်များ" : "Payment Methods"}
          </span>
          <div className=" w-full overflow-x-auto">
            <div className=" flex items-center gap-5">
              {configSetting?.map((setting) => {
                return (
                  <>
                    <div className=" p-4 rounded-lg border flex flex-col gap-2 min-w-[200px] min-h-[130px]">
                      {setting?.logo ? (
                        <>
                          <img
                            src={setting?.logo}
                            className="h-20 w-full object-cover rounded-md"
                            alt=""
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <p className=" text-sm font-bold">
                        {setting?.paymentName}
                      </p>
                      <p
                        className=" cursor-pointer text-xs"
                        title="Click to copy"
                        onClick={() =>
                          navigator.clipboard.writeText(setting?.phone)
                        }
                      >
                        {setting?.phone}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          id="receipt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          onClick={() => document.getElementById("receipt")?.click()}
          className=" w-full mt-3 px-2 py-4 md:px-4 border-dashed border-2 border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition max-h-[200px]"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto h-full max-h-[200px] object-contain rounded-md"
            />
          ) : (
            <>
              <MdOutlineFileUpload className="mx-auto text-4xl text-gray-500" />
              <p className="mt-2 text-gray-600">
                {lang === "mm"
                  ? "ScreenShot ထည့်ပါ"
                  : "Drag & Drop ScreenShot Here"}
              </p>
              <p className="mt-1 text-sm text-primary font-semibold">
                {lang === "mm" ? "ပုံရှာရန်" : "Browse Image"}
              </p>
            </>
          )}
        </div>

        <div className="mt-6  w-full">
          <button
            onClick={onConfirm}
            disabled={!previewUrl || isSubmitting}
            className={`w-full font-semibold py-2 px-4 rounded-md transition ${
              !previewUrl || isSubmitting
                ? "cursor-not-allowed bg-gray-300 text-gray-500"
                : "cursor-pointer bg-primary text-white hover:opacity-90"
            }`}
          >
            {isSubmitting
              ? lang === "mm"
                ? "ဝယ်ယူနေသည်..."
                : "Processing..."
              : lang === "mm"
              ? "ဝယ်ယူမည်"
              : "Confirm"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
