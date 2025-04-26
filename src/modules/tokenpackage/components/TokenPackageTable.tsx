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
import type { TokenPackage } from "@/constants/config";

interface TokenPackageTableProps {
  tokenPackages: TokenPackage[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onEdit?: (tokenPackage: TokenPackage) => void;
  onDelete?: (id: string) => void;
}
const TokenPackageTable: React.FC<TokenPackageTableProps> = ({
  tokenPackages,
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
            <TableHead>Game Title</TableHead>
            <TableHead>Package Title</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Created At</TableHead>
            {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokenPackages?.map((tokenPackage) => (
            <TableRow key={tokenPackage.id}>
              <TableCell>{tokenPackage.gameDto.title}</TableCell>
              <TableCell>{tokenPackage.tokenTitle}</TableCell>
              <TableCell>{tokenPackage.unit}</TableCell>
              <TableCell>{tokenPackage.price}</TableCell>
              <TableCell>{tokenPackage.currency}</TableCell>
              <TableCell>
                {new Date(tokenPackage.createdDate).toLocaleString()}
              </TableCell>
              {(onEdit || onDelete) && (
                <TableCell className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(tokenPackage)}
                    >
                      Edit
                    </Button>
                  )}
                  {/* {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(tokenPackage.id)}
                    >
                      Delete
                    </Button>
                  )} */}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
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
    </>
  );
};

export default TokenPackageTable;
