import { shallowEqual } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { PaginationParams } from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";
import { loadNotifications } from "@/redux/service/notification/notificationSlice";

const useNotification = ({
  currentPage = 1,
  pageSize = 10,
}: PaginationParams = {}) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const selectTokenPackage = useMemo(
    () => (state: RootState) => state.notification,
    []
  );
  const notificationResponse = useAppSelector(selectTokenPackage, shallowEqual);

  const { notifications, totalPages, totalCount, status, error } =
    notificationResponse;

  useEffect(() => {
    const pagination = {
      currentPage,
      pageSize,
    };

    dispatch(loadNotifications({ pagination, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  return {
    notifications,
    totalCount,
    totalPages,
    searchTerm,
    status,
    error,

    setSearchTerm,
  };
};

export default useNotification;
