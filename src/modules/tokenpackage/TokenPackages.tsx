// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/global/Loader";

import TokenPackageTable from "./components/TokenPackageTable";
import useTokenPackage from "@/redux/hook/tokenPackage/useTokenPackage";
import { TokenPackage, TokenPackagePayload } from "@/constants/config";
import TokenPackageInputModal from "./components/TokenPackageInputModal";
import useGame from "@/redux/hook/game/useGame";
import ConfirmModal from "@/components/global/ConfirmModal";

const TokenPackages: React.FC = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentTokenPackage, setCurrentTokenPackage] =
    useState<TokenPackage | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    tokenPackages,
    status,
    error,
    totalCount,
    createTokenPackage,
    updateTokenPackage,
    deleteTokenPackage,
  } = useTokenPackage({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  const { games } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);
  const handleCreateTokenPackage = useCallback(
    async (data: FormData) => {
      await createTokenPackage(data);
      setOpen(false);
    },
    [createTokenPackage]
  );

  const handleDeleteTokenPackage = useCallback(
    (id: string) => {
      const tokenPackage = tokenPackages.find((g) => g.id === id);
      if (tokenPackage) {
        setCurrentTokenPackage(tokenPackage);
        setAlertOpen(true);
      }
    },
    [tokenPackages]
  );

  const handleEditTokenPackage = useCallback((tokenPackage: TokenPackage) => {
    setAlertOpen(false);
    setCurrentTokenPackage(tokenPackage);
    setOpen(true);
  }, []);

  const handleUpdateTokenPackage = useCallback(
    async (id: string | number, data: FormData) => {
      await updateTokenPackage(id.toString(), data);
      setOpen(false);
    },
    [updateTokenPackage]
  );
  const confirmDelete = () => {
    if (currentTokenPackage) {
      deleteTokenPackage(currentTokenPackage.id);
      setAlertOpen(false);
      setCurrentTokenPackage(null);
    }
  };

  const cancelDelete = () => {
    setAlertOpen(false);
    setCurrentTokenPackage(null);
  };
  console.log("token", tokenPackages);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="TokenPackages" />
        <button
          onClick={() => {
            setCurrentTokenPackage(null);
            setOpen(true);
          }}
          className=" px-3 sm:px-5 py-2 text-white bg-primary rounded-md shadow-md hover:opacity-70 duration-200 transition-all w-fit h-fit cursor-pointer text-sm md:text-base"
        >
          Add TokenPackage
        </button>
      </div>

      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <TokenPackageTable
          tokenPackages={tokenPackages}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onEdit={handleEditTokenPackage}
          onDelete={handleDeleteTokenPackage}
        />
      </div>
      <TokenPackageInputModal
        open={open}
        onOpenChange={setOpen}
        currentTokenPackage={currentTokenPackage}
        handleCreateTokenPackage={handleCreateTokenPackage}
        handleUpdateTokenPackage={handleUpdateTokenPackage}
        gameList={games ?? []} // 👈 default to empty array
      />
      <ConfirmModal
        open={alertOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete TokenPackage?"
        description="This will permanently remove the game. Are you sure?"
      />
    </>
  );
};

export default TokenPackages;
