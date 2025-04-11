// src/hooks/useGame.ts
import { shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadTokenPackages,
  createTokenPackage,
  updateTokenPackage,
  deleteTokenPackage,
} from "@/redux/service/tokenPackage/tokenPackageSlice";
import { TokenPackagePayload, PaginationParams } from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useTokenPackage = ({
  currentPage = 1,
  pageSize = 10,
}: PaginationParams = {}) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const selectTokenPackage = useMemo(
    () => (state: RootState) => state.tokenPackage,
    []
  );
  const tokenPackageResponse = useAppSelector(selectTokenPackage, shallowEqual);

  const { tokenPackages, totalPages, totalCount, status, error } =
    tokenPackageResponse;

  useEffect(() => {
    const pagination = {
      currentPage,
      pageSize,
    };

    dispatch(loadTokenPackages({ pagination, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  const handleCreateTokenPackage = useCallback(
    async (payload: TokenPackagePayload) => {
      try {
        const response = await dispatch(createTokenPackage(payload)).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to create TokenPackage:", err);
      }
    },
    [dispatch]
  );

  const handleUpdateTokenPackage = useCallback(
    async (id: string, payload: TokenPackagePayload) => {
      try {
        const response = await dispatch(
          updateTokenPackage({ id, data: payload })
        ).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to update TokenPackage:", err);
      }
    },
    [dispatch]
  );

  const handleDeleteTokenPackage = useCallback(
    async (id: string) => {
      try {
        const deletedId = await dispatch(deleteTokenPackage(id)).unwrap();
        return deletedId;
      } catch (err) {
        console.error("Failed to delete TokenPackage:", err);
      }
    },
    [dispatch]
  );

  return {
    tokenPackages,
    totalCount,
    totalPages,
    searchTerm,
    status,
    error,

    setSearchTerm,
    createTokenPackage: handleCreateTokenPackage,
    updateTokenPackage: handleUpdateTokenPackage,
    handleDeleteTokenPackage,
  };
};

export default useTokenPackage;
