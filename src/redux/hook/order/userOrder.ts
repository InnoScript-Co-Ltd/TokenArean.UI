// src/hooks/useGame.ts
import { shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/redux/service/order/orderSlice";
import { PaginationParams } from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useOrder = ({
  currentPage = 1,
  pageSize = 10,
}: PaginationParams = {}) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const selectTokenPackage = useMemo(
    () => (state: RootState) => state.order,
    []
  );
  const orderResponse = useAppSelector(selectTokenPackage, shallowEqual);

  const { orders, totalPages, totalCount, status, error } = orderResponse;

  useEffect(() => {
    const pagination = {
      currentPage,
      pageSize,
    };

    dispatch(loadOrders({ pagination, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  const handleCreateOrder = useCallback(
    async (payload: FormData) => {
      try {
        const response = await dispatch(createOrder(payload)).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to create Order:", err);
      }
    },
    [dispatch]
  );

  const handleUpdateOrder = useCallback(
    async (id: string, payload: FormData) => {
      try {
        const response = await dispatch(
          updateOrder({ id, data: payload })
        ).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to update Order:", err);
      }
    },
    [dispatch]
  );

  const handleDeleteOrder = useCallback(
    async (id: string) => {
      try {
        const deletedId = await dispatch(deleteOrder(id)).unwrap();
        return deletedId;
      } catch (err) {
        console.error("Failed to delete Order:", err);
      }
    },
    [dispatch]
  );

  return {
    orders,
    totalCount,
    totalPages,
    searchTerm,
    status,
    error,

    setSearchTerm,
    updateOrder: handleUpdateOrder,
    deleteOrder: handleDeleteOrder,
    handleCreateOrder,
  };
};

export default useOrder;
