// src/layouts/DashboardLayout.tsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/AppSideBar";
import { IoIosNotifications } from "react-icons/io";
import SignalRService from "@/signalR/signalR";
import { Order } from "@/constants/config";
import { orderAdded } from "@/redux/service/order/orderSlice";

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        // 1️⃣ connect (builds & starts internally)
        await SignalRService.startConnection();

        // 2️⃣ Listen for new orders → update Redux
        SignalRService.onReceive("ReceiveOrder", (...args: unknown[]) => {
          console.log("📦 ReceiveOrder data:", args);
          const payload = args[0] as { order: Order } | Order;
          const order = "order" in payload ? payload.order : (payload as Order);
          dispatch(orderAdded(order));
        });

        // 3️⃣ Listen for notification messages → update bell UI
        SignalRService.onReceive(
          "ReceiveNotificationMessage",
          (...args: unknown[]) => {
            console.log("🔔 ReceiveNotificationMessage data:", args);
            const msg = args[0] as string;
            const newNotif: Notification = {
              id: crypto.randomUUID(),
              message: msg,
              timestamp: new Date(),
              read: false,
            };
            setNotifications((prev) => [newNotif, ...prev]);
          }
        );
      } catch (err) {
        console.error("❌ Error setting up SignalR:", err);
      }
    };

    setupSignalR();

    return () => {
      SignalRService.stopConnection();
    };
  }, [dispatch]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const handleBellClick = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setDropdownOpen((o) => !o);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 px-4 h-16 border-b">
          <SidebarTrigger />
          <div className="flex items-center justify-between w-full pe-10 relative">
            <h1 className="font-semibold">LoRi Gaming Store</h1>
            <div className="relative">
              <IoIosNotifications
                onClick={handleBellClick}
                className={`text-3xl cursor-pointer transition-colors ${
                  unreadCount > 0 ? "text-red-600 animate-ping" : "text-black"
                }`}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg z-10">
                  <div className="p-2 font-semibold border-b">
                    Notifications
                  </div>
                  <ul className="max-h-64 overflow-y-auto">
                    {notifications?.length === 0 && (
                      <li className="p-2 text-center text-gray-500">
                        No notifications
                      </li>
                    )}
                    {notifications?.map((n) => (
                      <li
                        key={n.id}
                        className={`p-2 border-b last:border-b-0 ${
                          n.read ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <div className="text-sm">{n.message}</div>
                        <div className="text-xs text-gray-400">
                          {n.timestamp.toLocaleTimeString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
