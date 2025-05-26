import { FC, useEffect, useState, ChangeEvent } from "react";
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
import type { ConfigSetting, ConfigSettingPayload } from "@/constants/config";

interface ConfigSettingInputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentConfigSetting?: ConfigSetting | null;
  handleCreateConfigSetting: (data: FormData) => Promise<void>;
  handleUpdateConfigSetting: (id: number, data: FormData) => Promise<void>;
}

const ConfigSettingInputModal: FC<ConfigSettingInputModalProps> = ({
  open,
  onOpenChange,
  currentConfigSetting,
  handleCreateConfigSetting,
  handleUpdateConfigSetting,
}) => {
  const [logoPreview, setLogoPreview] = useState<string>("");

  const [form, setForm] = useState<ConfigSettingPayload>({
    paymentName: "",
    logo: null,
    phone: "",
    orderIndex: 0,
  });
  useEffect(() => {
    if (currentConfigSetting) {
      setForm({
        paymentName: currentConfigSetting.paymentName,
        logo: currentConfigSetting.logo,
        phone: currentConfigSetting.phone,
        orderIndex: currentConfigSetting.orderIndex,
      });
      setLogoPreview(`${currentConfigSetting.logo}?${Date.now()}`);
    } else {
      setForm({
        paymentName: "",
        logo: "",
        phone: "",
        orderIndex: 0,
      });
      setLogoPreview("");
    }
  }, [currentConfigSetting, open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      const url = URL.createObjectURL(file);
      if (name === "logo") setLogoPreview(url);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("paymentName", form.paymentName);
    formData.append("orderIndex", form.orderIndex.toString());
    formData.append("logo", "");
    if (form.logo) {
      formData.append("file_Logo", form.logo);
    }
    formData.append("phone", form.phone);

    try {
      if (currentConfigSetting?.id) {
        await handleUpdateConfigSetting(currentConfigSetting.id, formData);
      } else {
        await handleCreateConfigSetting(formData);
      }
      onOpenChange(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };
  const isFormInvalid =
    !form?.paymentName ||
    !form.phone ||
    (currentConfigSetting && !form?.orderIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {currentConfigSetting
              ? "Edit ConfigSetting"
              : "Add New ConfigSetting"}
          </DialogTitle>
          <DialogDescription>
            {currentConfigSetting
              ? "Update the details of your ConfigSetting."
              : "Fill out the user to add a new ConfigSetting."}
          </DialogDescription>
        </DialogHeader>
        {/* Logo Upload */}
        <div className="col-span-1">
          <label
            htmlFor="logo_input"
            className="cursor-pointer w-full aspect-square max-h-[120px] bg-gray-100 border border-dashed rounded flex items-center justify-center overflow-hidden"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <span className="text-gray-500 text-sm sm:text-base">
                No logo
              </span>
            )}
          </label>
          <input
            type="file"
            id="logo_input"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
        <div className="flex flex-col gap-5">
          {/* PymentName */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="paymentName">Payment Name</Label>
            <Input
              id="paymentName"
              name="paymentName"
              value={form.paymentName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Phone */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {/* Order Index */}
            {currentConfigSetting && (
              <div className="col-span-1 flex flex-col gap-3">
                <Label htmlFor="orderIndex">Order Index</Label>
                <Input
                  id="orderIndex"
                  name="orderIndex"
                  type="number"
                  value={form.orderIndex}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isFormInvalid ?? false}>
            {currentConfigSetting
              ? "Update ConfigSetting"
              : "Create ConfigSetting"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigSettingInputModal;
