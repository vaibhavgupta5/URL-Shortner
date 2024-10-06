"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13
import React, { useEffect, useState } from "react";

function Redirectz() {
  const params = useParams<{ shortenurl: string }>();
  const shortId = params?.shortenurl;
  const router = useRouter(); // Move useRouter here

  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    const redirect = async () => {
      // Check if shortenurl exists
      if (shortId) {
        try {
          const result = await axios.post("/api/checkroute", { shortId });
          setIsFound(true)
          console.log(result.data.url.originalUrl);
          // Make sure the response is valid
          if (result.data && result.data.url.originalUrl) {
            router.push(result.data.url.originalUrl);
          } else {
            console.error("No URL found in the response");
            setIsFound(false)

          }
        } catch (error: any) {
          console.error("Error while checking router:", error);
          setIsFound(false)

          // You might want to handle the error further
        }
      } else {
        console.warn("Shorten URL is missing");
      }
    };

    redirect();
  }, [shortId, router]); // Add shortenurl and router as dependencies


  const homedir = () => {
    router.push('/');
  }; 
  


  return <div className="flex h-screen items-center justify-center text-8xl font-bold text-white flex-col">{isFound ? 'Redirecting...' : "Page not Found"
  }
  
  
  <button
        className="bg-[#144EE3] pl-6 m-8 p-4 rounded-full flex justify-center items-center border-[#353C4A] text-[14px] font-normal border-[1px] w-[30%] shadow-sm shadow-[#144EE3] text-white "
        onClick={() => homedir()}
      >Back to Home</button>

  </div>;
}



export default Redirectz;
