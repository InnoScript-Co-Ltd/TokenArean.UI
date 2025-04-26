import { shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadConfigSetting,
  createConfigSetting,
  updateConfigSetting,
  deleteConfigSetting,
} from "@/redux/service/configSetting/configSettingSlice";
import { ConfigSettingPayload, PaginationParams } from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useConfigSetting = ({
  currentPage = 1,
  pageSize = 12,
}: PaginationParams = {}) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const selectConfigSetting = useMemo(
    () => (state: RootState) => state.configSetting,
    []
  );
  const configSettingResponse = useAppSelector(
    selectConfigSetting,
    shallowEqual
  );

  const { configSettings, totalPages, totalCount, status, error } =
    configSettingResponse;

  useEffect(() => {
    const pagination = {
      currentPage,
      pageSize,
    };

    dispatch(loadConfigSetting({ pagination, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  const handleCreateConfigSetting = useCallback(
    async (payload: ConfigSettingPayload) => {
      try {
        const response = await dispatch(createConfigSetting(payload)).unwrap();

        return response;
      } catch (err) {
        console.error("Failed to create configSetting:", err);
      }
    },
    [dispatch]
  );

  const handleUpdateConfigSetting = useCallback(
    async (id: number, payload: ConfigSettingPayload) => {
      try {
        const pagination = {
          currentPage,
          pageSize,
        };

        await dispatch(updateConfigSetting({ id, data: payload })).unwrap();
        await dispatch(loadConfigSetting({ pagination, searchTerm }));
      } catch (err) {
        console.error("Failed to update configSetting:", err);
      }
    },
    [dispatch, searchTerm, currentPage, pageSize]
  );

  const handleDeleteConfigSetting = useCallback(
    async (id: number) => {
      try {
        const deletedId = await dispatch(deleteConfigSetting(id)).unwrap();
        return deletedId;
      } catch (err) {
        console.error("Failed to delete configSetting:", err);
      }
    },
    [dispatch]
  );

  return {
    configSettings,
    totalCount,
    totalPages,
    searchTerm,
    status,
    error,

    setSearchTerm,
    createConfigSetting: handleCreateConfigSetting,
    updateConfigSetting: handleUpdateConfigSetting,
    deleteConfigSetting: handleDeleteConfigSetting,
  };
};

export default useConfigSetting;
