"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Logo = ({ lang, className }) => {
   const router = useRouter();
   return (
      <div
         className={` cursor-pointer ${className}`}
         onClick={() => router.push(`/${lang}`)}
      >
         <img src="/logo1.png" alt="logo" className="size-14 -my-2 md:hidden" />
         <img
            src="/logo.png"
            alt="logo"
            className="min-w-32 max-w-40 -my-10  hidden md:block"
         />
      </div>
   );
};

export default Logo;
