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
import { LoginPayload } from "@/constants/config";
import useAuth from "@/redux/hook/auth/useAuth";
import { AxiosError } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState<LoginPayload>({
    email: "",
    password: "",
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
      await login(credentials.email, credentials.password);
      // if (response?.success === false) {
      //   throw new Error("Login Failed!");
      // }
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Network Error");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Wrong Credentials");
      }
      setCredentials({ email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
