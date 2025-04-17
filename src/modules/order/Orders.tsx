import Banner from "@/components/global/Banner";
import { useState, useCallback } from "react";
import OrderTable from "./components/OrderTable";
import useOrder from "@/redux/hook/order/userOrder";
import { Order } from "@/constants/config";
import Loader from "@/components/global/Loader";
import ConfirmModal from "@/components/global/ConfirmModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Orders: React.FC = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);

  const { orders, status, error, totalCount, deleteOrder, setSearchTerm } =
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

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="Orders" />
      </div>
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <div className=" flex items-center gap-2 mb-5">
          <Input
            id="searchTerm"
            name="searchTerm"
            placeholder="Search orders ..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className=" max-w-[200px]"
          />
          <Button onClick={handleSearch}>Search</Button>
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
        description="This will permanently remove the game. Are you sure?"
      />
    </>
  );
};

export default Orders;
