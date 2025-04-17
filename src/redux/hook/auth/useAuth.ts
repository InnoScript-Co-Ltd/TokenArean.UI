// src/redux/service/auth/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import type { RootState, AppDispatch } from "@/redux/store";
import { ForgetPasswordResponse, LoginResponse } from "@/constants/config";
import {
  forgotPassword,
  login,
  logout,
  setIsAuthenticated,
} from "@/redux/service/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    dispatch(setIsAuthenticated(Boolean(authToken)));
  }, [dispatch]);

  const handleLogin = useCallback(
    async (email: string, password: string): Promise<LoginResponse> => {
      const response = await dispatch(login({ email, password })).unwrap();
      console.log("handleLogin :", response);
      return response;
    },
    [dispatch]
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error: unknown) {
      console.error("Failed to logout:", error);
    }
  }, [dispatch]);

  const handleForgotPassword = useCallback(
    async (email: string): Promise<ForgetPasswordResponse> => {
      const response = await dispatch(forgotPassword({ email })).unwrap();
      return response;
    },
    [dispatch]
  );

  return {
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
  };
};

export default useAuth;
