// import RouteGuard from "@/components/RouteGuard";
import RouteGuard from "@/components/RouteGuard";
import ScrollToTop from "@/components/ScrollToTop";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/modules/dashboard/Dashboard";
import Games from "@/modules/game/Games";
import ConfigSettings from "@/modules/configsetting/ConfigSettings";
import TokenPackages from "@/modules/tokenpackage/TokenPackages";
import Users from "@/modules/user/Users";

import Orders from "@/modules/order/Orders";
import GameDetail from "@/modules/website/GameDetail";
import Home from "@/modules/website/Home";
import Login from "@/pages/Login";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "@/pages/ForgotPassword";
import ChangePassword from "@/pages/ChangePassword";
import OrderDetail from "@/modules/order/OrderDetail";

const Path = () => {
  return (
    <div className=" relative">
      <ScrollToTop />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RouteGuard>
              <DashboardLayout />
            </RouteGuard>
          }
        >
          {/* Dashboard Page */}
          <Route index element={<Dashboard />} />
          {/* Dashboard Page */}

          {/* ChangePassword Page */}
          <Route path="change-password" element={<ChangePassword />} />
          {/* ChangePassword Page */}

          {/* ConfigSetting Page */}
          <Route path="configSetting" element={<ConfigSettings />} />
          {/* ConfigSetting Page */}

          {/* User Page */}
          <Route path="users" element={<Users />} />
          {/* User Page */}

          {/* Game Page */}
          <Route path="games" element={<Games />} />
          {/* Game Page */}

          {/* TokenPackage Page */}
          <Route path="packages" element={<TokenPackages />} />
          {/* TokenPackage Page */}

          {/* Order Page */}
          <Route path="orders" element={<Orders />} />
          <Route path="order-detail/:orderID" element={<OrderDetail />} />
          {/* Order Page */}
        </Route>

        {/* Login Pages */}
        <Route path="/login" element={<Login />} />
        {/* Login Pages */}

        {/* Forgot Password Pages */}
        <Route path="/forget-password" element={<ForgotPassword />} />
        {/* Forgot Password Pages */}

        {/* Website Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GameDetail />} />
        {/* Website Pages */}
      </Routes>
    </div>
  );
};

export default Path;
