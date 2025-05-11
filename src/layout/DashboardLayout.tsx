// src/layouts/DashboardLayout.tsx
import React, { useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/AppSideBar";
import { IoIosNotifications } from "react-icons/io";
import signalRService from "@/signalR/signalR";

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const DashboardLayout: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userId = "admin1";
  const token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    let conn = null;

    const initSignalR = async () => {
      conn = await signalRService.startConnection(token);
      await conn.invoke("Register", userId);

      conn.on("ReceiveNotification", (message: string) => {
        const newNotif: Notification = {
          id: crypto.randomUUID(),
          message,
          timestamp: new Date(),
          read: false,
        };
        setNotifications((prev) => [newNotif, ...prev]);
      });
    };

    initSignalR();

    return () => {
      signalRService.stopConnection();
    };
  }, [userId, token]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setDropdownOpen((o) => !o);
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center gap-2 px-4 h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-black transition-[width,height] ease-linear ">
            <SidebarTrigger />
            <div className="flex items-center justify-between w-full pe-10 relative">
              <h1 className="font-semibold">LoRi Gaming Store</h1>

              <div className="relative">
                <IoIosNotifications
                  className="text-3xl cursor-pointer"
                  onClick={handleBellClick}
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
    </>
  );
};

export default DashboardLayout;
