'use client';
import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
const FloatButton = ({ children }) => {
   const router = useRouter();
   const { lang } = useParams();
   const searchParams = useSearchParams().toString();
   const handleClick = () => {
      const newLang = lang === "en" ? "ja" : "en";
      router.replace(`/${newLang}/?${searchParams}`);
    };
   return <div className={`fixed bottom-4 right-4 rounded-md duration-300 ${lang === 'en' ? 'bg-blue-500  text-white' : 'border border-blue-500 text-blue-500 '}`} onClick={handleClick}>  <div className=" p-2 flex rounded-md gap-2 items-center cursor-pointer">
   <Languages  />
</div></div>;
};

export default FloatButton;
