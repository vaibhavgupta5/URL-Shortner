import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function LinkTable() {
  return (
    <Table className="w-full  ">
      <TableHeader className="h-[8vh]  ">
        <TableRow className="bg-[#181E29]  text-white">
          <TableHead className="text-white">Short Link</TableHead>
          <TableHead className="text-white">Original Link</TableHead>
          <TableHead className="text-white">Method</TableHead>
          <TableHead className="text-white">QR Code</TableHead>
          <TableHead className="text-white">Satus</TableHead>
          <TableHead className="text-white">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        <TableRow className="bg-[#101520]">
          <TableCell className="font-medium text-[#C9CED6]">INV001</TableCell>
          <TableCell className="font-medium text-[#C9CED6]">Paid</TableCell>
          <TableCell className="font-medium text-[#C9CED6]">Credit Card</TableCell>
          <TableCell className="font-medium text-[#C9CED6]">$250.00</TableCell>
          <TableCell className="font-medium text-[#C9CED6]">$250.00</TableCell>

          <TableCell className="font-medium text-[#C9CED6]">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default LinkTable;
