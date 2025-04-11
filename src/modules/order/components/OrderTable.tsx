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

  onEdit?: (order: Order) => void;
  onDelete?: (id: string) => void;
}
const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User Id</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>ServerInfo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Price</TableHead>
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
            <TableCell>{order.serverInfo}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.tokenPackageDto.unit}</TableCell>
            <TableCell>{order.tokenPackageDto.price}</TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
            <TableCell>{new Date(order.updatedAt).toLocaleString()}</TableCell>
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
  );
};

export default OrderTable;
