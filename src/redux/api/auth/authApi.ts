import axios, { AxiosResponse } from "axios";
import config from "@/config/environment";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
}

export interface RegisterRequest {
  name: string;
  role: string;
  username: string;
  password: string;
  selfRegister: boolean;
  contact: {
    primaryPhone: string;
    email: string;
    addressType: string;
  };
}

export interface RegisterResponse {
  id: number;
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export const fetchLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const requestBody: LoginRequest = { email, password };
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

export const fetchRegister = async (
  name: string,
  role: string,
  username: string,
  password: string,
  selfRegister: boolean,
  primaryPhone: string,
  email: string,
  addressType: string
): Promise<RegisterResponse> => {
  try {
    const requestBody: RegisterRequest = {
      name,
      role,
      username,
      password,
      selfRegister,
      contact: { primaryPhone, email, addressType },
    };
    const response: AxiosResponse<RegisterResponse> =
      await axios.post<RegisterResponse>(
        `${config.API_URL}v1/person/create`,
        requestBody
      );
    return response.data;
  } catch (error) {
    console.log("Failed to Register:", error);
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
