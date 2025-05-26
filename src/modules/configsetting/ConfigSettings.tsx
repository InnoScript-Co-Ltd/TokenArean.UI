// src/pages/Games.tsx
import React, { useState, useCallback } from "react";
import Banner from "@/components/global/Banner";
import Loader from "@/components/global/Loader";
import ConfigSettingTable from "./components/ConfigSettingTable";
import ConfigSettingInputModal from "./components/ConfigSettingInputModal";
import useConfigSetting from "@/redux/hook/configSetting/useConfigSetting";
import type { ConfigSetting, ConfigSettingPayload } from "@/constants/config";
import ConfirmModal from "@/components/global/ConfirmModal";
import ErrorComponent from "@/components/global/ErrorComponent";

const ConfigSettings: React.FC = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
  });
  const [open, setOpen] = useState(false);
  const [currentConfigSetting, setCurrentConfigSetting] =
    useState<ConfigSetting | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    configSettings,
    status,
    error,
    totalCount,
    createConfigSetting,
    updateConfigSetting,
    deleteConfigSetting,
  } = useConfigSetting({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
  });
  // console.log("game", games);
  // Handlers
  const handlePageChange = useCallback((page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }));
  }, []);

  const handleEditConfigSetting = useCallback(
    (configSetting: ConfigSetting) => {
      setAlertOpen(false);
      setCurrentConfigSetting(configSetting);
      setOpen(true);
    },
    []
  );

  const handleDeleteConfigSetting = useCallback(
    (id: number) => {
      const configSetting = configSettings.find((g) => g.id === id);
      if (configSetting) {
        setCurrentConfigSetting(configSetting);
        setAlertOpen(true);
      }
    },
    [configSettings]
  );

  const handleCreateConfigSetting = useCallback(
    async (data: FormData) => {
      await createConfigSetting(data);
      setOpen(false);

      window.location.href = "/dashboard/configSetting";
    },
    [createConfigSetting]
  );

  const handleUpdateConfigSetting = useCallback(
    async (id: number, data: FormData) => {
      await updateConfigSetting(id, data);
      setOpen(false);
    },
    [updateConfigSetting]
  );

  const confirmDelete = () => {
    if (currentConfigSetting) {
      deleteConfigSetting(currentConfigSetting.id);
      setAlertOpen(false);
      setCurrentConfigSetting(null);
    }
  };

  const cancelDelete = () => {
    setAlertOpen(false);
    setCurrentConfigSetting(null);
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <ErrorComponent error={error} />;

  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-between px-5 py-3">
        <Banner title="ConfigSettings" />
        {configSettings.length < 4 && (
          <button
            onClick={() => {
              setCurrentConfigSetting(null);
              setOpen(true);
            }}
            className="px-3 sm:px-5 py-2 text-white bg-primary rounded-md shadow-md hover:opacity-70 transition-all cursor-pointer text-sm md:text-base"
          >
            Add ConfigSetting
          </button>
        )}
      </div>

      <div className="my-5 px-5 py-3 overflow-x-auto w-full">
        <ConfigSettingTable
          configSettings={configSettings}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          onEdit={handleEditConfigSetting}
          onDelete={handleDeleteConfigSetting}
        />
      </div>

      <ConfigSettingInputModal
        open={open}
        onOpenChange={setOpen}
        currentConfigSetting={currentConfigSetting}
        handleCreateConfigSetting={handleCreateConfigSetting}
        handleUpdateConfigSetting={handleUpdateConfigSetting}
      />

      <ConfirmModal
        open={alertOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete ConfigSetting?"
        description="This will permanently remove the configSetting. Are you sure?"
      />
    </>
  );
};

export default ConfigSettings;
