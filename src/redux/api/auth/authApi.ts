import axiosInstance from "@/constants/axios";
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
} from "@/constants/config";

export const fetchLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const requestBody: LoginPayload = { email, password };
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      requestBody
    );
    return response.data;
  } catch (error) {
    console.log("Failed to Login:", error);
    throw error;
  }
};

export const fetchLogout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axiosInstance.post<LogoutResponse>(
      "/v1/user/revoke_token"
    );
    return response.data;
  } catch (error) {
    console.log("Failed to Logout:", error);
    throw error;
  }
};
