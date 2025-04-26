import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { ConfigSetting, ConfigSettingPayload } from "@/constants/config";

interface ConfigSettingTableProps {
  configSettings: ConfigSetting[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onEdit?: (configSetting: ConfigSetting) => void;
  onDelete?: (id: number) => void;
}

const ConfigSettingTable: React.FC<ConfigSettingTableProps> = ({
  configSettings,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Order Index</TableHead>
            {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {configSettings?.map((configSetting) => (
            <TableRow key={configSetting.id}>
              <TableCell>{configSetting.paymentName}</TableCell>
              <TableCell>{configSetting.phone}</TableCell>
              <TableCell>{configSetting.orderIndex}</TableCell>
              {(onEdit || onDelete) && (
                <TableCell className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(configSetting)}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(configSetting.id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalCount == null || totalCount == 0 ? (
        <div className=" w-full h-[450px] flex justify-center items-center">
          <h4>No Games Yet</h4>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-5 px-3 md:px-5 lg:px-10">
          <span>
            Page {currentPage} of {totalPages} — {totalCount} items
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigSettingTable;
