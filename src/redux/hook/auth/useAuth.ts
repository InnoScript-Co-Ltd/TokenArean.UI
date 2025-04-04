import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  login,
  logout,
  setIsAuthenticated,
} from "@/redux/service/auth/authSlice";
import type { RootState } from "../../store"; // Adjust the import path to your store
import { LoginResponse } from "@/constants/config";

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
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
