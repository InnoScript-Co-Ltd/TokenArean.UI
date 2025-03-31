import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  login,
  logout,
  register,
  setIsAuthenticated,
} from "@/redux/service/auth/authSlice";
import type { RootState } from "../../store"; // Adjust the import path to your store
import type { LoginResponse, RegisterResponse } from "@/redux/api/auth/authApi";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Automatically set isAuthenticated based on token presence
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    dispatch(setIsAuthenticated(Boolean(authToken)));
  }, [dispatch]);

  const handleLogin = useCallback(
    async (email: string, password: string): Promise<LoginResponse> => {
      try {
        const response = await dispatch(login({ email, password })).unwrap();
        return response;
      } catch (error: unknown) {
        let errMsg: string;
        if (typeof error === "string") {
          errMsg = error;
        } else if (error instanceof Error) {
          errMsg = error.message;
        } else {
          errMsg = "Unknown error";
        }
        console.error("Failed to login:", errMsg);
        throw new Error(errMsg);
      }
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (
      name: string,
      role: string,
      username: string,
      password: string,
      selfRegister: boolean,
      primaryPhone: string,
      email: string,
      addressType: string
    ): Promise<RegisterResponse | undefined> => {
      try {
        const response = await dispatch(
          register({
            name,
            role,
            username,
            password,
            selfRegister,
            primaryPhone,
            email,
            addressType,
          })
        ).unwrap();
        return response;
      } catch (error: unknown) {
        let errMsg: string;
        if (typeof error === "string") {
          errMsg = error;
        } else if (error instanceof Error) {
          errMsg = error.message;
        } else {
          errMsg = "Unknown error";
        }
        console.error("Failed to register:", errMsg);
        return undefined;
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await dispatch(logout(token)).unwrap();
      sessionStorage.removeItem("authToken");
      dispatch(setIsAuthenticated(false));
    } catch (error: unknown) {
      let errMsg: string;
      if (typeof error === "string") {
        errMsg = error;
      } else if (error instanceof Error) {
        errMsg = error.message;
      } else {
        errMsg = "Unknown error";
      }
      console.error("Failed to logout:", errMsg);
    }
  }, [dispatch, token]);

  return {
    token,
    isAuthenticated,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
