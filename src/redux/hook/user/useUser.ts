// src/hooks/useGame.ts
import { shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  loadUsers,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} from "@/redux/service/user/userSlice";
import {
  UserPayload,
  PaginationParams,
  ChangePasswordPayload,
} from "@/constants/config";
import { useAppDispatch, useAppSelector } from "../hook";
import { RootState } from "@/redux/store";

const useUser = ({ currentPage = 1, pageSize = 10 }: PaginationParams = {}) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const selectUser = useMemo(() => (state: RootState) => state.user, []);
  const UserResponse = useAppSelector(selectUser, shallowEqual);

  const { Users, totalPages, totalCount, status, error } = UserResponse;

  useEffect(() => {
    const pagination = {
      currentPage,
      pageSize,
    };

    dispatch(loadUsers({ pagination, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  const handleCreateUser = useCallback(
    async (payload: UserPayload) => {
      try {
        const response = await dispatch(createUser(payload)).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to create User:", err);
      }
    },
    [dispatch]
  );
  const handleChangePassword = useCallback(
    async (payload: ChangePasswordPayload) => {
      const response = await dispatch(changePassword(payload)).unwrap();
      return response;
    },
    [dispatch]
  );
  const handleUpdateUser = useCallback(
    async (id: string, payload: UserPayload) => {
      try {
        const response = await dispatch(
          updateUser({ id, data: payload })
        ).unwrap();
        return response;
      } catch (err) {
        console.error("Failed to update User:", err);
      }
    },
    [dispatch]
  );

  const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        const deletedId = await dispatch(deleteUser(id)).unwrap();
        return deletedId;
      } catch (err) {
        console.error("Failed to delete User:", err);
      }
    },
    [dispatch]
  );

  return {
    Users,
    totalCount,
    totalPages,
    searchTerm,
    status,
    error,

    setSearchTerm,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    password: handleChangePassword,
  };
};

export default useUser;
