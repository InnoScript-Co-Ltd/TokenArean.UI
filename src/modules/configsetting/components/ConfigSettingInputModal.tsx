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
  handleCreateConfigSetting: (data: ConfigSettingPayload) => Promise<void>;
  handleUpdateConfigSetting: (
    id: number,
    data: ConfigSettingPayload
  ) => Promise<void>;
}

const ConfigSettingInputModal: FC<ConfigSettingInputModalProps> = ({
  open,
  onOpenChange,
  currentConfigSetting,
  handleCreateConfigSetting,
  handleUpdateConfigSetting,
}) => {
  const [configSetting, setConfigSetting] = useState<ConfigSettingPayload>({
    paymentName: "",
    phone: "",
    orderIndex: 0,
  });
  useEffect(() => {
    if (currentConfigSetting) {
      setConfigSetting({
        paymentName: currentConfigSetting.paymentName,
        phone: currentConfigSetting.phone,
        orderIndex: currentConfigSetting.orderIndex,
      });
    } else {
      setConfigSetting({
        paymentName: "",
        phone: "",
        orderIndex: 0,
      });
    }
  }, [currentConfigSetting, open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setConfigSetting((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (currentConfigSetting?.id) {
        await handleUpdateConfigSetting(currentConfigSetting.id, configSetting);
      } else {
        await handleCreateConfigSetting(configSetting);
      }
      onOpenChange(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };
  const isFormInvalid =
    !configSetting?.paymentName ||
    !configSetting.phone ||
    (currentConfigSetting && !configSetting?.orderIndex);

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

        <div className="flex flex-col gap-5">
          {/* PymentName */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="paymentName">Payment Name</Label>
            <Input
              id="paymentName"
              name="paymentName"
              value={configSetting.paymentName}
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
                value={configSetting.phone}
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
                  value={configSetting.orderIndex}
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
          <Button onClick={handleSubmit} disabled={isFormInvalid}>
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
