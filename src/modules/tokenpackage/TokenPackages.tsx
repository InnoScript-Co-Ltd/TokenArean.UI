// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenPackageTable from "./components/TokenPackageTable";
import useTokenPackage from "@/redux/hook/tokenPackage/useTokenPackage";
import { TokenPackage, TokenPackagePayload } from "@/constants/config";
import TokenPackageInputModal from "./components/TokenPackageInputModal";
import useGame from "@/redux/hook/game/useGame";

const TokenPackages = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentTokenPackage, setCurrentTokenPackage] =
    useState<TokenPackage | null>(null);

  const {
    tokenPackages,
    status,
    error,
    createTokenPackage,
    updateTokenPackage,
  } = useTokenPackage({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  const { games } = useGame({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });

  const handleCreateTokenPackage = async (
    data: TokenPackagePayload
  ): Promise<void> => {
    createTokenPackage(data);
    setOpen(false);
  };

  const handleUpdateTokenPackage = async (
    id: string | number,
    data: TokenPackagePayload
  ): Promise<void> => {
    console.log("update tokenPackage:", data);
    updateTokenPackage(id.toString(), data); // ✅ Two separate arguments
    setOpen(false);
  };
  console.log("token", tokenPackages);
  console.log("game :", games);

  if (status === "loading") return <p>Loading tokenPackages</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <>
      <Banner title="TokenPackages" />
      <div
        onClick={() => {
          setCurrentTokenPackage(null);
          setOpen(true);
        }}
        className=" px-3 sm:px-5 py-2 text-white bg-primary rounded-md shadow-md hover:opacity-70 duration-200 transition-all w-fit h-fit cursor-pointer text-sm md:text-base"
      >
        Add TokenPackage
      </div>

      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <TokenPackageTable
          tokenPackages={tokenPackages}
          onEdit={(tokenPackage) => {
            setCurrentTokenPackage(tokenPackage);
            setOpen(true);
          }}
          onDelete={(id) => {
            console.log(id);
          }}
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
    </>
  );
};

export default TokenPackages;
