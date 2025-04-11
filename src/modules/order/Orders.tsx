// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "./components/OrderTable";
import useOrder from "@/redux/hook/order/userOrder";
import { Order, OrderPayload } from "@/constants/config";
import OrderInputModal from "./components/OrderInputModal";

const Orders = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const { orders, status, error, updateOrder } = useOrder({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  console.log("order", orders);
  const handleUpdateOrder = async (
    id: string | number,
    data: OrderPayload
  ): Promise<void> => {
    console.log("update game:", data);
    updateOrder(id.toString(), data); // ✅ Two separate arguments
    setOpen(false);
  };

  if (status === "loading") return <p>Loading orders</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Banner title="Orders" />
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <OrderTable
          orders={orders}
          onEdit={(order) => {
            setCurrentOrder(order);
            setOpen(true);
          }}
          onDelete={(id) => {
            console.log(id);
          }}
        />
      </div>
      <OrderInputModal
        open={open}
        onOpenChange={setOpen}
        currentOrder={currentOrder}
        handleUpdateOrder={handleUpdateOrder}
      />
    </>
  );
};

export default Orders;
