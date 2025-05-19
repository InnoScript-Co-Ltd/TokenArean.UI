import { shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import { loadOrderDetail, readOrder } from "@/redux/service/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";
import { loadNotifications } from "@/redux/service/notification/notificationSlice";

const useOrderDetail = ({ id }: { id?: string }) => {
  const dispatch = useAppDispatch();

  const selectTokenPackage = useMemo(
    () => (state: RootState) => state.order,
    []
  );
  const orderResponse = useAppSelector(selectTokenPackage, shallowEqual);
  const { orderDetail } = orderResponse;

  useEffect(() => {
    if (id) {
      dispatch(loadOrderDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (orderDetail && !orderDetail.isRead && id) {
      dispatch(readOrder({ id }));
      dispatch(
        loadNotifications({ pagination: { currentPage: 1, pageSize: 10000 } })
      );
    }
  }, [orderDetail, dispatch, id]);

  return {
    orderDetail,
  };
};

export default useOrderDetail;
