// src/pages/Games.tsx
import Banner from "@/components/global/Banner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenPackageTable from "./components/TokenPackageTable";
import useTokenPackage from "@/redux/hook/tokenPackage/useTokenPackage";

const TokenPackages = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });

  const { tokenPackages, status, error } = useTokenPackage({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  console.log("token", tokenPackages);
  if (status === "loading") return <p>Loading tokenPackages</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Banner title="TokenPackages" />
      <div className="my-5 px-5 py-3 min-w-[500px] overflow-x-auto w-full">
        <TokenPackageTable
          tokenPackages={tokenPackages}
          onEdit={(tokenPackage) =>
            navigate(`/tokenPackages/${tokenPackage.id}/edit`)
          }
          onDelete={(id) => {}}
        />
      </div>
    </>
  );
};

export default TokenPackages;
