// import RouteGuard from "@/components/RouteGuard";
import ScrollToTop from "@/components/ScrollToTop";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/modules/dashboard/Dashboard";
import Order from "@/modules/media/Media";
import GameDetail from "@/modules/website/GameDetail";
import Home from "@/modules/website/Home";
import Login from "@/pages/Login";
import { Route, Routes } from "react-router-dom";

const Path = () => {
  return (
    <div className=" relative">
      <ScrollToTop />
      <Routes>
        <Route
          path="/dashboard"
          element={
            // <RouteGuard>
            <DashboardLayout />
            // </RouteGuard>
          }
        >
          {/* Dashboard Page */}
          <Route index element={<Dashboard />} />
          {/* Dashboard Page */}

          {/* Media Page */}
          <Route path="order" element={<Order />} />
          {/* Media Page */}
        </Route>

        {/* Login Pages */}
        <Route path="/login" element={<Login />} />
        {/* Login Pages */}

        {/* Website Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GameDetail />} />
        {/* Website Pages */}
      </Routes>
    </div>
  );
};

export default Path;
