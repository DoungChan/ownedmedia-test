"use client";
import React from "react";
import { useRouter } from "next/navigation";
const Logo = ({ logoText, lang, className }) => {
  const router = useRouter();
  return (
    <div
      className={`w-fit  p-2 cursor-pointer text-blue-500 ${className}`}
      onClick={() => router.push(`/${lang}`)}
    >
      <h1 className="text-sm sm:text-xl w-fit text-nowrap">{logoText}</h1>
    </div>
  );
};

export default Logo;
