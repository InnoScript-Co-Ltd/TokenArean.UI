import { shallowEqual } from "react-redux";
import { useEffect, useMemo } from "react";
import { loadOrderDetail } from "@/redux/service/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useOrderDetail = ({ id }: { id?: string }) => {
  const dispatch = useAppDispatch();
  const selectTokenPackage = useMemo(
    () => (state: RootState) => state.order,
    []
  );
  const orderResponse = useAppSelector(selectTokenPackage, shallowEqual);

  const { orderDetail } = orderResponse;

  useEffect(() => {
    if (id) dispatch(loadOrderDetail(id));
  }, [dispatch, id]);

  return {
    orderDetail,
  };
};

export default useOrderDetail;
