import axiosInstance from "@/constants/axios";
import {
  ForgetPasswordPayload,
  ForgetPasswordResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
} from "@/constants/config";

export const fetchLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const requestBody: LoginPayload = { email, password };
    const response = await axiosInstance.post<LoginResponse>(
      "api/v1/auth/Login",
      requestBody
    );
    console.log("login:", response);

    return response.data;
  } catch (error) {
    console.log("Failed to Login:", error);
    throw error;
  }
};

export const fetchRefreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      throw new Error("No refresh token found");
    }

    const requestBody: RefreshTokenPayload = {
      refreshToken: storedRefreshToken,
    };

    const response = await axiosInstance.post<RefreshTokenResponse>(
      "api/v1/auth/refresh-token",
      requestBody
    );

    return response.data;
  } catch (error) {
    console.error("Failed to Refresh:", error);
    throw error;
  }
};

export const fetchLogout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axiosInstance.post<LogoutResponse>(
      "api/v1/Auth/Logout"
    );
    console.log("logout", response);
    return response.data;
  } catch (error) {
    console.log("Failed to Logout:", error);
    throw error;
  }
};

export const fetchForgetPassword = async (
  email: string
): Promise<ForgetPasswordResponse> => {
  try {
    const requestBody: ForgetPasswordPayload = { email };

    const response = await axiosInstance.post<ForgetPasswordResponse>(
      "api/v1/auth/Forgot-password",
      requestBody
    );

    return response.data;
  } catch (error) {
    console.log("Failed to fetch forgot password:", error);
    throw error;
  }
};
