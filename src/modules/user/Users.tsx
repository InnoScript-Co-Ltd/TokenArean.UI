// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/global/Loader";

import UserTable from "./components/UserTable";
import useUser from "@/redux/hook/user/useUser";
import { User, UserPayload } from "@/constants/config";
import UserInputModal from "./components/UserInputModal";
import useGame from "@/redux/hook/game/useGame";
import ConfirmModal from "@/components/global/ConfirmModal";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    Users,
    status,
    error,
    totalCount,
    createUser,
    updateUser,
    deleteUser,
  } = useUser({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);
  const handleCreateUser = useCallback(
    async (data: UserPayload) => {
      await createUser(data);
      setOpen(false);
    },
    [createUser]
  );

  const handleDeleteUser = useCallback(
    (id: string) => {
      const User = Users.find((g) => g.id === id);
      if (User) {
        setCurrentUser(User);
        setAlertOpen(true);
      }
    },
    [Users]
  );

  const handleEditUser = useCallback((User: User) => {
    setAlertOpen(false);
    setCurrentUser(User);
    setOpen(true);
  }, []);

  const handleUpdateUser = useCallback(
    async (id: string | number, data: UserPayload) => {
      await updateUser(id.toString(), data);
      setOpen(false);
    },
    [updateUser]
  );
  const confirmDelete = () => {
    if (currentUser) {
      deleteUser(currentUser.id);
      setAlertOpen(false);
      setCurrentUser(null);
    }
  };

  const cancelDelete = () => {
    setAlertOpen(false);
    setCurrentUser(null);
  };
  console.log("user", Users);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      <Banner title="Users" />
      <button
        onClick={() => {
          setCurrentUser(null);
          setOpen(true);
        }}
        className=" px-3 sm:px-5 py-2 text-white bg-primary rounded-md shadow-md hover:opacity-70 duration-200 transition-all w-fit h-fit cursor-pointer text-sm md:text-base"
      >
        Add User
      </button>

      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <UserTable
          Users={Users}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
      <UserInputModal
        open={open}
        onOpenChange={setOpen}
        currentUser={currentUser}
        handleCreateUser={handleCreateUser}
        handleUpdateUser={handleUpdateUser}
      />
      <ConfirmModal
        open={alertOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete User?"
        description="This will permanently remove the game. Are you sure?"
      />
    </>
  );
};

export default Users;
