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
import type { User } from "@/constants/config";

interface UserTableProps {
  Users: User[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onEdit?: (User: User) => void;
  onDelete?: (id: string) => void;
}
const UserTable: React.FC<UserTableProps> = ({
  Users,
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
            <TableHead>Email</TableHead>
            <TableHead>Email Confirmed</TableHead>

            {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Users?.map((User) => (
            <TableRow key={User.id}>
              <TableCell>{User.email}</TableCell>
              <TableCell>{User.emailConfirmed ? "True" : "False"}</TableCell>

              {(onEdit || onDelete) && (
                <TableCell className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(User)}
                    >
                      Edit
                    </Button>
                  )}
                  {/* {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(User.id)}
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

export default UserTable;
