import useAuth from "@/redux/hook/auth/useAuth";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" state={{ message: "You need to login first!" }} />
    );
  }

  return children;
};

export default RouteGuard;
