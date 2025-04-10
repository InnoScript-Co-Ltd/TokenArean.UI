// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "./components/OrderTable";
import useOrder from "@/redux/hook/order/userOrder";

const Orders = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });

  const { orders, status, error } = useOrder({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  console.log("order", orders);
  if (status === "loading") return <p>Loading orders</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Banner title="Orders" />
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <OrderTable
          orders={orders}
          onEdit={(order) => navigate(`/tokenPackages/${order.id}/edit`)}
          onDelete={(id) => {}}
        />
      </div>
    </>
  );
};

export default Orders;
