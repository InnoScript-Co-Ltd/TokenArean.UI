import axios, { AxiosResponse } from "axios";
import config from "@/constants/environment";
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
    const response: AxiosResponse<LoginResponse> =
      await axios.post<LoginResponse>(
        `${config.API_URL}/auth/login`,
        requestBody
      );
    return response.data;
  } catch (error) {
    console.log("Failed to Login:", error);
    throw error;
  }
};

export const fetchLogout = async (token: string): Promise<LogoutResponse> => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response: AxiosResponse<LogoutResponse> =
      await axios.post<LogoutResponse>(
        `${config.API_URL}v1/user/revoke_token`,
        { token },
        { headers }
      );
    return response.data;
  } catch (error) {
    console.log("Failed to Logout:", error);
    throw error;
  }
};
