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

  onEdit?: (tokenPackage: TokenPackage) => void;
  onDelete?: (id: string) => void;
}
const TokenPackageTable: React.FC<TokenPackageTableProps> = ({
  tokenPackages,
  onEdit,
  onDelete,
}) => {
  return (
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
        {tokenPackages.map((tokenPackage) => (
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
                {onDelete && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(tokenPackage.id)}
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

export default TokenPackageTable;
