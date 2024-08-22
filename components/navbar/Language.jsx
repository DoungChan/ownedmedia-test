"use client";
import React from "react";
import { useRouter, useParams, usePathname } from "next/navigation";

const Language = ({ langText }) => {
   const router = useRouter();
   const { lang } = useParams();
   const pathname = usePathname();
   const handleClick = () => {
      const newLang = lang === "en" ? "ja" : "en";
      const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
      router.replace(newPath);
   };
   return (
      <div>
         <div
            className="w-fit py-1 px-4 sm:px-10 sm:py-2 text-sm border border-secondary rounded-full cursor-pointer"
            onClick={handleClick}
         >
            {langText}
         </div>
      </div>
   );
};

export default Language;
