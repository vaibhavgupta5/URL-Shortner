"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { FaLink } from "react-icons/fa";
import axios from "axios";

import { apiResponse } from "@/lib/apiResponse";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface ShortenedUrl {
  originalUrl: string;
  shortUrl: string;
  createdDate: string; // Add createdDate to the interface
}


const normalizeUrl = (url: any) => {
  // Check if the URL already has a protocol
  if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
  }
  return url;
};

function InputField() {
  const { toast } = useToast();

  const [originalUrl, setTextToCopy] = useState("");

  const [copyOn, setCopyOn] = useState(true);

  const shortenUrl = async (e: any) => {
    e.preventDefault();

    console.log(copyOn);
    try {
      const result = await axios.post<apiResponse>("/api/createroute", {
        originalUrl,
      });

      const sUrl =
        `${
          process.env.NEXT_PUBLIC_PAGE_URL
        }/z/${result.data.url?.toString()}` || "";

      const createdDate: string = new Date().toISOString();

      saveToLocalStorage(  normalizeUrl(originalUrl)
      , sUrl, createdDate);

      if (copyOn) {
        navigator.clipboard
          .writeText(sUrl)
          .then(() => {
            toast({
              title: "Shortened URL, Copied to Clipboard",
            });
          })
          .catch((err) => {
            toast({
              variant: "destructive",

              title: "Failed to copy",
              description: err.message
            });
          });
      }

      setTextToCopy("");
    } catch (e: any) {
      toast({
        variant: "destructive",

        title: e.message,
      });
    }
  };

  const saveToLocalStorage = (
    originalUrl: string,
    shortUrl: string,
    createdDate: string
  ): void => {
    try {
      // Retrieve existing URLs from local storage
      const existingUrls: ShortenedUrl[] = JSON.parse(
        localStorage.getItem("shortenedUrls") || "[]"
      );

      // Add the new URL object to the existing array
      existingUrls.push({ originalUrl, shortUrl, createdDate });

      // Store the updated array back in local storage
      localStorage.setItem("shortenedUrls", JSON.stringify(existingUrls));

      // Log to confirm saving
      console.log("Saved to local storage:", existingUrls);
    } catch (error:any) {
      console.error("Error saving to local storage:", error);
    }
  };

  return (
    <>
      <form className="flex bg-[#181E29] rounded-full p-1 border-[3px]  border-[#CCCCCC] w-[40%] justify-center items-center mb-8 mt-8">
        <FaLink className="text-[#C9CED6] w-[10%] flex justify-center items-center" />

        <Input
          className="bg-[#181E29] w-[60%] rounded-full border-0 focus:outline-none text-lg text-white"
          type="text"
          value={originalUrl}
          placeholder="Enter the link here"
          onChange={(e) => setTextToCopy(e.target.value)}
        />
        <button
          className="bg-[#144EE3] pl-6 pr-6 p-3 rounded-full flex justify-center items-center border-[#353C4A] border-[1px] w-[30%] shadow-sm shadow-[#144EE3] text-white"
          onClick={shortenUrl}
        >
          Shorten Now
        </button>
      </form>

      <div className="flex justify-center items-center">
        <Switch
          id="clipboard"
          className="data-[state=checked]:bg-[#181E29] data-[sta    te=unchecked]:bg-[#181E29] border-[2px] border-[#353C4A] "
          onCheckedChange={(e) => setCopyOn(e)}
          defaultChecked
        />
        <Label htmlFor="clipboard" className="text-[#C9CED6] text-[14px] ml-2">
          Auto Paste from Clipboard{" "}
        </Label>
      </div>
    </>
  );
}

export default InputField;
