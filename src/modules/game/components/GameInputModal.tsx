// src/components/GameInputModal.tsx
import React, { FC, useEffect, useState, ChangeEvent } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Game, GamePayload } from "@/constants/config";

interface GameInputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentGame?: Game | null;
  handleCreateGame: (data: FormData) => Promise<void>;
  handleUpdateGame: (id: string, data: FormData) => Promise<void>;
}

const GameInputModal: FC<GameInputModalProps> = ({
  open,
  onOpenChange,
  currentGame,
  handleCreateGame,
  handleUpdateGame,
}) => {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [form, setForm] = useState<GamePayload>({
    logo: null,
    bannerImage: null,
    title: "",
    description: "",
    orderIndex: 0,
    serverType: "",
    isDisable: false,
  });

  useEffect(() => {
    if (currentGame) {
      setForm({
        logo: null,
        bannerImage: null,
        title: currentGame.title,
        description: currentGame.description,
        orderIndex: currentGame.orderIndex,
        serverType: "",
        isDisable: currentGame.isDisable,
      });
      setLogoPreview(currentGame.logo);
      setBannerPreview(currentGame.bannerImage);
    } else {
      setForm({
        logo: null,
        bannerImage: null,
        title: "",
        description: "",
        orderIndex: 0,
        serverType: "",
        isDisable: false,
      });
      setLogoPreview("");
      setBannerPreview("");
    }
  }, [currentGame, open]);

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
      else if (name === "bannerImage") setBannerPreview(url);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("orderIndex", form.orderIndex.toString());
    formData.append("serverType", form.serverType);
    formData.append("isDisable", String(form.isDisable));

    // These fields might be required for backend compatibility
    formData.append("logo", ""); // You might set this to existing logo URL if needed
    formData.append("bannerImage", ""); // Same as above

    if (form.logo) {
      formData.append("file_Logo", form.logo);
    }
    if (form.bannerImage) {
      formData.append("file_BannerImage", form.bannerImage);
    }

    try {
      if (currentGame?.id) {
        await handleUpdateGame(currentGame.id.toString(), formData);
      } else {
        await handleCreateGame(formData);
      }
      onOpenChange(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {currentGame ? "Edit Game" : "Add New Game"}
          </DialogTitle>
          <DialogDescription>
            {currentGame
              ? "Update the details of your game."
              : "Fill out the form to add a new game."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
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

            {/* Banner Upload */}
            <div className="col-span-3 md:col-span-2">
              <label
                htmlFor="banner_input"
                className="cursor-pointer w-full h-full max-h-[120px] bg-gray-100 border border-dashed rounded flex items-center justify-center overflow-hidden pl-5"
              >
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm sm:text-base">
                    No banner image
                  </span>
                )}
              </label>
              <input
                type="file"
                id="banner_input"
                name="bannerImage"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Order Index */}
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

            {/* Server Type */}
            <div className="col-span-1 flex flex-col gap-3">
              <Label htmlFor="serverType">Server Type</Label>
              <Select
                value={form.serverType}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, serverType: value }))
                }
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select server type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NON">None</SelectItem>
                  <SelectItem value="SERVER">Server</SelectItem>
                  <SelectItem value="ZONEID">Zone ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Disabled Switch */}
          <div className="flex items-center gap-2 pt-2">
            <Switch
              id="isDisable"
              checked={form.isDisable}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, isDisable: checked }))
              }
            />
            <Label htmlFor="isDisable">Disabled</Label>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            {currentGame ? "Update Game" : "Create Game"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameInputModal;
