import React from "react";
import { MdOutlineLogin } from "react-icons/md";

function Header() {
  return (
    <div className="flex justify-between p-4 ml-8 mr-8 items-center">
      <div className="text-3xl font-extrabold bg-gradient-to-r from-[#144EE3] to-[#EB568E] text-transparent bg-clip-text">
        Linkify
      </div>
      <div className="flex gap-3">
        <button className="bg-[#181E29] pl-6 pr-6 p-3 rounded-full flex justify-center items-center text-white border-[#353C4A] border-[1px]">
          Login
          <MdOutlineLogin className="ml-1" />
        </button>

        <button className="bg-[#144EE3] pl-6 pr-6 p-3 rounded-full flex justify-center items-center border-[#353C4A] border-[1px] shadow-sm text-white shadow-[#144EE3]">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Header;
