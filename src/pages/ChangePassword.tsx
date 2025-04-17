import Banner from "@/components/global/Banner";
import { ChangePasswordPayload } from "@/constants/config";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useUser from "@/redux/hook/user/useUser";
import { AxiosError } from "axios";

const ChangePassword = () => {
  const [changePassword, setChangePassword] = useState<ChangePasswordPayload>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { password } = useUser();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(
    null
  );

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordMatchError("New Password and Confirm Password must match.");
      return;
    }

    try {
      await password(changePassword);
      setSuccessMessage("Password changed successfully!");
      setError(null);
      setPasswordMatchError(null);
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);

        setError(error.response?.data?.Message || "Network Error");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        console.log("error:", error);
        setError(String(error));
      }
    }
  };

  return (
    <>
      <div className="mb-6">
        <Banner title="Change Password" />
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={handlePasswordChange}
          className="w-full max-w-md bg-white shadow-md rounded-xl p-6 md:p-8"
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                type="password"
                id="oldPassword"
                value={changePassword.oldPassword}
                onChange={(e) =>
                  setChangePassword({
                    ...changePassword,
                    oldPassword: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                value={changePassword.newPassword}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setChangePassword((prev) => ({
                    ...prev,
                    newPassword: newValue,
                  }));
                  if (
                    changePassword.confirmPassword &&
                    changePassword.confirmPassword !== newValue
                  ) {
                    setPasswordMatchError(
                      "New Password and Confirm Password must match."
                    );
                  } else {
                    setPasswordMatchError(null);
                  }
                }}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={changePassword.confirmPassword}
                onChange={(e) => {
                  const confirmValue = e.target.value;
                  setChangePassword((prev) => ({
                    ...prev,
                    confirmPassword: confirmValue,
                  }));
                  if (changePassword.newPassword !== confirmValue) {
                    setPasswordMatchError(
                      "New Password and Confirm Password must match."
                    );
                  } else {
                    setPasswordMatchError(null);
                  }
                }}
                required
              />
            </div>

            {passwordMatchError && (
              <p className="text-red-500 text-sm">{passwordMatchError}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-6">
            Change Password
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
