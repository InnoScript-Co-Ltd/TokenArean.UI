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
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/constants/axios";
import { notificationMarkedAsRead } from "@/redux/service/notification/notificationSlice";
import { useDispatch } from "react-redux";

interface OrderTableProps {
  orders: Order[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onDelete?: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onDelete,
}) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / pageSize);
  const dispatch = useDispatch();

  const handleViewDetail = async (orderId: string) => {
    try {
      await axiosInstance.put(`/api/v1/Order/isRead/${orderId}`);
      dispatch(
        notificationMarkedAsRead({
          id: orderId.toString(),
        })
      );
      navigate(`/dashboard/order-detail/${orderId}`);
    } catch (error) {
      console.error("Failed to update isRead:", error);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
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
            {onDelete && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => {
            const no = totalCount - (currentPage - 1) * pageSize - index;
            return (
              <TableRow
                key={order.id}
                className={order.isRead ? "opacity-40" : ""}
              >
                <TableCell>{no}</TableCell>
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
                {onDelete && (
                  <TableCell className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetail(order.id)}
                      className="border rounded-lg px-3 py-1.5 h-full w-fit"
                    >
                      View Detail
                    </button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(order.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalCount == null || totalCount == 0 ? (
        <div className=" w-full h-[450px] flex justify-center items-center">
          <h4>No Orders Yet</h4>
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

export default OrderTable;
