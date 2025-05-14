import Banner from "@/components/global/Banner";
import { useState, useCallback, useEffect } from "react";
import OrderTable from "./components/OrderTable";
import useOrder from "@/redux/hook/order/userOrder";
import { Order, CleanOrderRequest } from "@/constants/config";
import Loader from "@/components/global/Loader";
import ConfirmModal from "@/components/global/ConfirmModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/global/ErrorComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SignalRService from "../../signalR/signalR";

const Orders: React.FC = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [type, setType] = useState<"WEEKLY" | "MONTHLY">("WEEKLY");
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);

  const {
    orders,
    status,
    error,
    totalCount,
    deleteOrder,
    setSearchTerm,
    cleanOrder,
  } = useOrder({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

  const handleDeleteOrder = useCallback(
    (id: string) => {
      const order = orders.find((g) => g.id === id);
      if (order) {
        setCurrentOrder(order);
        setAlertOpen(true);
      }
    },
    [orders]
  );

  const confirmDelete = () => {
    if (currentOrder) {
      deleteOrder(currentOrder.id);
      setAlertOpen(false);
      setCurrentOrder(null);
    }
  };

  const cancelDelete = () => {
    setAlertOpen(false);
    setCurrentOrder(null);
  };

  const handleSearch = () => {
    setSearchTerm(localSearch);
  };

  useEffect(() => {
    const msg = localStorage.getItem("cleanOrderMessage");
    if (msg) {
      setMessage({ type: "success", text: msg });
      localStorage.removeItem("cleanOrderMessage");
    }
    if (type === "WEEKLY") {
      setCount(3);
    } else {
      setCount(1);
    }
  }, [type]);

  const handleCleanOrder = async () => {
    setLoading(true);
    setMessage(null); // clear previous messages
    const payload: CleanOrderRequest = { type, count };
    const response = await cleanOrder(payload);
    localStorage.setItem(
      "cleanOrderMessage",
      response?.message || "Orders deleted successfully"
    );
    window.location.reload();

    setLoading(false);
  };
  useEffect(() => {
    const setupSignalR = async () => {
      try {
        await SignalRService.startConnection();

        SignalRService.onReceive("ReceiveOrder", (...args: unknown[]) => {
          console.log("📦 ReceiveOrder data:", args);
          // Optionally: you can parse it if it's a known object type
          // const order = args[0] as Order;
          // setOrders((prev) => [...prev, order]);
        });

        SignalRService.onReceive(
          "ReceiveNotificationMessage",
          (...args: unknown[]) => {
            console.log("🔔 ReceiveNotificationMessage data:", args);
            // const notification = args[0] as Notification;
            // showToast(notification.message);
          }
        );
      } catch (err) {
        console.error("❌ Error setting up SignalR:", err);
      }
    };

    setupSignalR();

    // Optional cleanup on unmount
    return () => {
      SignalRService.stopConnection();
    };
  }, []);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <ErrorComponent error={error} />;

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="Orders" />
      </div>
      {message && (
        <div
          className={`text-sm font-medium px-4 py-2 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <div className="flex items-center gap-2 mb-5">
          <Input
            id="searchTerm"
            name="searchTerm"
            placeholder="Search orders ..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="max-w-[200px]"
          />
          <Button onClick={handleSearch}>Search</Button>
          {/* Type Selector */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Type</label>
            <Select
              value={type}
              onValueChange={(value: "WEEKLY" | "MONTHLY") => setType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Count Selector */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Count</label>
            <Select
              value={String(count)}
              onValueChange={(value) => setCount(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Count" />
              </SelectTrigger>
              <SelectContent>
                {type === "WEEKLY" && <SelectItem value="3">3</SelectItem>}
                {type === "MONTHLY" && (
                  <>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          {/* Clean Orders Button */}
          <Button onClick={handleCleanOrder} disabled={loading}>
            {loading ? "Cleaning..." : "Clean Orders"}
          </Button>
        </div>

        <OrderTable
          orders={orders}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onDelete={handleDeleteOrder}
        />
      </div>

      <ConfirmModal
        open={alertOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Order?"
        description="This will permanently remove the order. Are you sure?"
      />
    </>
  );
};

export default Orders;
