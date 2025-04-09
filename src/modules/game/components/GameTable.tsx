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
  onEdit?: (game: Game) => void;
  onDelete?: (id: string) => void;
}

const GameTable: React.FC<GameTableProps> = ({ games, onEdit, onDelete }) => {
  return (
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
        {games.map((game) => (
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
  );
};

export default GameTable;
