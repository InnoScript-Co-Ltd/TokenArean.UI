import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ForgetPasswordPayload } from "@/constants/config";
import useAuth from "@/redux/hook/auth/useAuth";
import { AxiosError } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const [credentials, setCredentials] = useState<ForgetPasswordPayload>({
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPassword(credentials.email);

      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);

        setError(error.response?.data?.Message || "Network Error");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
      setCredentials({ email: "" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Confirm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
