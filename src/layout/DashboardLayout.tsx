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
import signalRService from "@/signalR/signalR";

import { orderAdded } from "@/redux/service/order/orderSlice";
import { Order } from "@/constants/config";

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

  const token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        // 1) Start connection
        await signalRService.startConnection(token);

        // 2) Register handlers BEFORE telling the hub who you are
        signalRService.onReceive("ReceiveOrder", (raw) => {
          if (!isMounted) return;
          // raw is unknown → cast to your Order payload shape
          const payload = raw as { order: Order } | Order;
          // handle both forms:
          const order: Order =
            "order" in payload ? payload.order : (payload as Order);

          // UI bell notification
          const newNotif: Notification = {
            id: crypto.randomUUID(),
            message: `Order #${order.id} created`,
            timestamp: new Date(),
            read: false,
          };
          setNotifications((prev) => [newNotif, ...prev]);

          // Redux update
          dispatch(orderAdded(order));
        });

        signalRService.onReceive("ReceiveNotificationMessage", (raw) => {
          if (!isMounted) return;
          // raw is unknown → cast to string
          const message = raw as string;
          const newNotif: Notification = {
            id: crypto.randomUUID(),
            message,
            timestamp: new Date(),
            read: false,
          };
          setNotifications((prev) => [newNotif, ...prev]);
        });

        // 3) Now invoke Register if your hub supports it (or skip if you broadcast to all)
        // await signalRService.invokeMethod("Register", userId);
      } catch (err) {
        console.error("SignalR init failed:", err);
      }
    };

    init();
    return () => {
      isMounted = false;
      signalRService.stopConnection();
    };
  }, [dispatch, token]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = () => {
    // mark all read
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setDropdownOpen((o) => !o);
  };

  console.log(unreadCount);

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
                    {notifications.length === 0 && (
                      <li className="p-2 text-center text-gray-500">
                        No notifications
                      </li>
                    )}
                    {notifications.map((n) => (
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
