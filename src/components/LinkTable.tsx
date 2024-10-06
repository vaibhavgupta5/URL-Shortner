'use client'
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCopy } from "react-icons/fa";

interface UrlData {
    shortUrl: string;
    originalUrl: string;
    status: string;
    createdDate: string;
  }

function LinkTable() {

    const [urls, setUrls] = useState<UrlData[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem('shortenedUrls');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUrls(parsedData.reverse()); // Reverse to show the most recent first
        }})

        function formatDate(dateString: string): string {
            const date = new Date(dateString);
          
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
          
            return `${day}/${month}/${year}`;
          }

  return (
    <Table className="w-full  ">
      <TableHeader className="h-[8vh]  ">
        <TableRow className="bg-[#181E29] border-0 hover:bg-red text-white">
          <TableHead className="text-white">Short Link</TableHead>
          <TableHead className="text-white">Original Link</TableHead>
          
          <TableHead className="text-white">Satus</TableHead>
          <TableHead className="text-white">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >

      {urls.slice(0, 4).map((url: UrlData, index: number) => (
          <TableRow key={index} className="bg-[#101520] border-0 h-[6vh] hover:bg-red">
            <TableCell className=" font-extralight flex  items-center text-[#C9CED6]">
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                {url.shortUrl} 
              </a>
              <FaCopy className="ml-2 text-[20px] bg-[#192236] p-1 rounded-full" />

            </TableCell>
            <TableCell className="font-extralight text-[#C9CED6]">
            <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                {url.originalUrl} 
              </a>
            </TableCell>
            <TableCell className="font-extralight text-[#0AFF31]">Active</TableCell>
            <TableCell className="font-extralight text-[#C9CED6]">{formatDate(url.createdDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LinkTable;
