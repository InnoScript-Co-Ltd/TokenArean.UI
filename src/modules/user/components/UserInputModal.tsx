// src/components/GameInputModal.tsx
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
import type { User, UserPayload } from "@/constants/config";

interface UserInputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser?: User | null;
  handleCreateUser: (data: UserPayload) => Promise<void>;
  handleUpdateUser: (id: string, data: UserPayload) => Promise<void>;
}

const UserInputModal: FC<UserInputModalProps> = ({
  open,
  onOpenChange,
  currentUser,
  handleCreateUser,
  handleUpdateUser,
}) => {
  const [user, setUser] = useState<UserPayload>({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (currentUser) {
      setUser({
        email: currentUser.email,
        password: "",
      });
    } else {
      setUser({
        email: "",
        password: "",
      });
    }
  }, [currentUser, open]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (currentUser?.id) {
        await handleUpdateUser(currentUser.id.toString(), user);
      } else {
        await handleCreateUser(user);
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
            {currentUser ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {currentUser
              ? "Update the details of your User."
              : "Fill out the user to add a new User."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Password */}
            {!currentUser && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
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
          <Button onClick={handleSubmit}>
            {currentUser ? "Update User" : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserInputModal;
