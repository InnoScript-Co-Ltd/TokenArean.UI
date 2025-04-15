import axiosInstance from "@/constants/axios";
import {
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
      "/Login",
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
      "/refresh",
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
    const response = await axiosInstance.post<LogoutResponse>("/revoke_token");
    return response.data;
  } catch (error) {
    console.log("Failed to Logout:", error);
    throw error;
  }
};
