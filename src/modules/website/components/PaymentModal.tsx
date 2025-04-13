import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdOutlineFileUpload } from "react-icons/md";
import { OrderPayload, TokenPackage } from "@/constants/config";

export interface PaymentModalProps {
  selectedPackage: TokenPackage | null;
  total: string | number | null;
  setForm: React.Dispatch<React.SetStateAction<OrderPayload>>;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  selectedPackage,
  total,
  setForm,
  onClose,
  onConfirm,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setForm((prev) => ({ ...prev, screenShot: file }));
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm & Upload Receipt</DialogTitle>
        </DialogHeader>

        {/* Confirmation */}
        <div className="border-b pb-4 mb-4">
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
            <p className="text-red-500">No package selected</p>
          )}
          <div className="mt-2 flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">{total}</span>
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
          className="mt-3 px-2 py-4 md:px-4 md:py-8 border-dashed border-2 border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto h-full max-h-60 object-contain rounded-md"
            />
          ) : (
            <>
              <MdOutlineFileUpload className="mx-auto text-4xl text-gray-500" />
              <p className="mt-2 text-gray-600">Drag & Drop Receipt Here</p>
              <p className="mt-1 text-sm text-primary font-semibold">
                Browse Image
              </p>
            </>
          )}
        </div>

        <div className="mt-6 ">
          <button
            onClick={onConfirm}
            className=" w-full cursor-pointer bg-primary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
