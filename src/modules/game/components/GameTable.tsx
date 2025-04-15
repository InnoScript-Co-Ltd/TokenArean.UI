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
import type { Game } from "@/constants/config";

interface GameTableProps {
  games: Game[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onEdit?: (game: Game) => void;
  onDelete?: (id: string) => void;
}

const GameTable: React.FC<GameTableProps> = ({
  games,
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
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Server Type</TableHead>
            <TableHead>Order Index</TableHead>
            <TableHead>Created At</TableHead>
            {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {games?.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.title}</TableCell>
              <TableCell>{game.description}</TableCell>
              <TableCell>{game.serverType}</TableCell>
              <TableCell>{game.orderIndex}</TableCell>
              <TableCell>{new Date(game.createdAt).toLocaleString()}</TableCell>
              {(onEdit || onDelete) && (
                <TableCell className="flex gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(game)}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(game.id)}
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

export default GameTable;
