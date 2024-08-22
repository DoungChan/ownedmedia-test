"use client";
import React from "react";
import InputSearch from "../Input";
import Logo from "./Logo";
import Language from "./Language";
import { useParams } from "next/navigation";
const Navbar = () => {
   const { lang, website } = useParams();
   return (
      <div
         className={`flex justify-between items-center py-1 md:px-32 p-2 fixed top-0 z-30 w-full  text-white ${
            website ? "bg-primary " : "sm:px-2 "
         } duration-300 `}
      >
         <div className="flex flex-1 items-center gap-4 justify-between sm:justify-start">
            <Logo
               logoText={lang === "en" ? "Owned Media" : "オウンドメディア"}
               lang={lang}
            />
            <div className={`sm:flex-1 ${website ? "block" : "hidden"}`}>
               <InputSearch
                  placeholderText={lang === "en" ? "search" : "検索"}
               />
            </div>
         </div>

         <Language langText={lang === "en" ? "Japanese" : "英語"} />
      </div>
   );
};

export default Navbar;
