// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "./components/OrderTable";
import useOrder from "@/redux/hook/order/userOrder";
import { Order, OrderPayload } from "@/constants/config";
import OrderInputModal from "./components/OrderInputModal";
import Loader from "@/components/global/Loader";
import ConfirmModal from "@/components/global/ConfirmModal";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);

  const { orders, status, error, totalCount, updateOrder, deleteOrder } =
    useOrder({
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

  const handleEditOrder = useCallback((order: Order) => {
    setAlertOpen(false);
    setCurrentOrder(order);
    setOpen(true);
  }, []);

  const handleUpdateOrder = useCallback(
    async (id: string | number, data: FormData) => {
      await updateOrder(id.toString(), data);
      setOpen(false);
    },
    [updateOrder]
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

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Banner title="Orders" />
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <OrderTable
          orders={orders}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
      </div>
      <OrderInputModal
        open={open}
        onOpenChange={setOpen}
        currentOrder={currentOrder}
        handleUpdateOrder={handleUpdateOrder}
      />
      <ConfirmModal
        open={alertOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Order?"
        description="This will permanently remove the game. Are you sure?"
      />
    </>
  );
};

export default Orders;
