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
import type { Order } from "@/constants/config";

interface OrderTableProps {
  orders: Order[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onEdit?: (order: Order) => void;
  onDelete?: (id: string) => void;
}
const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log(orders);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>InGameUserId</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>TokenPackage</TableHead>
            <TableHead>ServerInfo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Operator By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.inGameUserId}</TableCell>
              <TableCell>{order.mobileNumber}</TableCell>
              <TableCell>{order.gameTitle}</TableCell>
              <TableCell>{order.tokenPackageDto.tokenTitle}</TableCell>
              <TableCell>{order.serverInfo}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.tokenPackageDto.unit}</TableCell>
              <TableCell>{order.tokenPackageDto.price}</TableCell>
              <TableCell>{order.userDto?.email}</TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(order.updatedAt).toLocaleString()}
              </TableCell>
              {(onEdit || onDelete) && (
                <TableCell className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(order)}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(order.id)}
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

export default OrderTable;
