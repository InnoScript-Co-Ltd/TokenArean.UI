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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TokenPackage, Game } from "@/constants/config";

interface TokenPackageInputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTokenPackage?: TokenPackage | null;
  handleCreateTokenPackage: (data: FormData) => Promise<void>;
  handleUpdateTokenPackage: (id: string, data: FormData) => Promise<void>;
  gameList: Game[]; // 👈 Add this
}

interface FormState {
  packageImage: File | null;
  tokenTitle: string;
  unit: number;
  price: number;
  currency: string;
  gameId: string;
}

const TokenPackageInputModal: FC<TokenPackageInputModalProps> = ({
  open,
  onOpenChange,
  currentTokenPackage,
  handleCreateTokenPackage,
  handleUpdateTokenPackage,
  gameList,
}) => {
  const [form, setForm] = useState<FormState>({
    packageImage: null,
    tokenTitle: "",
    unit: 0,
    price: 0,
    currency: "",
    gameId: "",
  });
  const [packageImagePreview, setPackageImagePreview] = useState<string>("");
  useEffect(() => {
    if (currentTokenPackage) {
      setForm({
        packageImage: null,
        tokenTitle: currentTokenPackage.tokenTitle,
        unit: currentTokenPackage.unit,
        price: currentTokenPackage.price,
        currency: currentTokenPackage.currency,
        gameId: currentTokenPackage.gameDto?.id.toString() || "",
      });
      setPackageImagePreview(
        `${currentTokenPackage.packageImage}?${Date.now()}`
      );
    } else {
      setForm({
        packageImage: null,
        tokenTitle: "",
        unit: 0,
        price: 0,
        currency: "",
        gameId: "",
      });
      setPackageImagePreview("");
    }
  }, [currentTokenPackage, open]);

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
      if (name === "packageImage") setPackageImagePreview(url);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("tokenTitle", form.tokenTitle);
    formData.append("unit", form.unit.toString());
    formData.append("price", form.price.toString());
    formData.append("currency", form.currency);
    formData.append("packageImage", "");
    formData.append("gameId", form.gameId);

    if (form.packageImage) {
      formData.append("file_PackageImage", form.packageImage);
    }
    // // Convert FormData to a plain object
    // const formObject: any = {};
    // formData.forEach((value, key) => {
    //   formObject[key] = value;
    // });

    // Log the object

    try {
      if (currentTokenPackage?.id) {
        await handleUpdateTokenPackage(
          currentTokenPackage.id.toString(),
          formData
        );
      } else {
        await handleCreateTokenPackage(formData);
      }
      onOpenChange(false);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };
  const isFormInvalid =
    !form.packageImage ||
    !form.price ||
    !form.unit ||
    !form.tokenTitle.trim() ||
    !form.currency ||
    !form.gameId;
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {currentTokenPackage ? "Edit TokenPackage" : "Add New TokenPackage"}
          </DialogTitle>
          <DialogDescription>
            {currentTokenPackage
              ? "Update the details of your TokenPackage."
              : "Fill out the form to add a new TokenPackage."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            {/* PackageImage Upload */}
            <div className="col-span-1">
              <label
                htmlFor="packageImage_input"
                className="cursor-pointer w-full aspect-square max-h-[120px] bg-gray-100 border border-dashed rounded flex items-center justify-center overflow-hidden"
              >
                {packageImagePreview ? (
                  <img
                    src={packageImagePreview}
                    alt="packageImage preview"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <span className="text-gray-500 text-sm sm:text-base">
                    No packageImage
                  </span>
                )}
              </label>
              <input
                type="file"
                id="packageImage_input"
                name="packageImage"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="tokenTitle">TokenPackage Title</Label>
            <Input
              id="tokenTitle"
              name="tokenTitle"
              value={form.tokenTitle}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Unit */}
            <div className="col-span-1 flex flex-col gap-3">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                name="unit"
                type="number"
                value={form.unit}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div className="col-span-1 flex flex-col gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-3">
              <Label htmlFor="gameId">Game</Label>
              <Select
                value={form.gameId}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, gameId: value }))
                }
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select game" />
                </SelectTrigger>
                <SelectContent>
                  {gameList.map((game) => (
                    <SelectItem key={game.id} value={game.id.toString()}>
                      {game.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isFormInvalid}>
            {currentTokenPackage
              ? "Update TokenPackage"
              : "Create TokenPackage"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TokenPackageInputModal;
