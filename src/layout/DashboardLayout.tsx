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
import { Notification, Order } from "@/constants/config";
import { orderAdded } from "@/redux/service/order/orderSlice";
import useNotification from "@/redux/hook/notification/useNotification";
import {
  notificationAdded,
  notificationMarkedAsRead,
} from "@/redux/service/notification/notificationSlice";
import axiosInstance from "@/constants/axios";
import { useNavigate } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useNotification();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
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

        SignalRService.onReceive(
          "ReceiveNotificationMessage",
          (...args: unknown[]) => {
            console.log("🔔 ReceiveNotificationMessage data:", args);
            const payload = args[0] as
              | { notification: Notification }
              | Notification;
            const notification =
              "notification" in payload
                ? payload.notification
                : (payload as Notification);
            dispatch(notificationAdded(notification));
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

  const unreadCount = notifications?.length;

  const handleBellClick = () => {
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
            <div className={`relative`}>
              <div
                className={`relative p-2.5 ${
                  unreadCount > 0 ? "text-red-600 animate-bounce " : ""
                }`}
              >
                <IoIosNotifications
                  onClick={handleBellClick}
                  className={`text-3xl cursor-pointer transition-colors ${
                    unreadCount > 0 ? "text-red-600" : "text-black"
                  }`}
                />
                {unreadCount > 0 && (
                  <p className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </p>
                )}
              </div>
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
                    {notifications?.map((n, index) => (
                      <li
                        key={index}
                        className={`border-b last:border-b-0 ${
                          n?.isRead ? "bg-gray-50" : "bg-white"
                        }`}
                        onClick={async () => {
                          setDropdownOpen(false);
                        }}
                      >
                        {/* <Link
                          to={`/dashboard/order-detail/${n?.orderId}`}
                          className="text-sm text-left w-full cursor-pointer hover:text-primary inline-block p-2"
                        >
                          {n.message}
                        </Link> */}
                        <button
                          onClick={async () => {
                            try {
                              await axiosInstance.put(
                                `/api/v1/Order/isRead/${n.orderId}`
                              );
                              dispatch(
                                notificationMarkedAsRead({
                                  id: n.orderId.toString(),
                                })
                              );

                              navigate(`/dashboard/order-detail/${n.orderId}`);
                              setDropdownOpen(false);
                            } catch (error) {
                              console.error("Failed to mark as read", error);
                            }
                          }}
                          className="text-sm text-left w-full cursor-pointer hover:text-primary inline-block p-2"
                        >
                          {n.message}
                        </button>
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
