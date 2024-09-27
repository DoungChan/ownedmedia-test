"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Logo = ({ lang, className }) => {
   const router = useRouter();
   return (
      <div
         className={` cursor-pointer ${className}`}
         onClick={() => router.push(`/${lang}`)}
      >
         <Image
            src="/logo1.png"
            alt="logo"
            width={56}
            height={56}
            className="size-14 -my-2 md:hidden"
         />
         <Image
            src="/logo2.png"
            alt="logo"
            height={190}
            width={190}
            className="-my-10 hidden md:block"
         />
      </div>
   );
};

export default Logo;
