"use client";
import React from "react";
import InputSearch from "../Input";
import Logo from "./Logo";
import Language from "./Language"; // Assuming you have this component
import { useParams } from "next/navigation";
import Tag from "../Tag";

const Navbar = () => {
   const { lang, website } = useParams();

   return (
      <nav className="fixed bg-white top-0 w-screen z-20 shadow-sm">
         <div className="flex flex-col md:flex-row justify-between items-start lg:px-20 sm:px-4 p-2 w-full text-white">
            <Logo
               logoText={lang === "en" ? "Owned Media" : "オウンドメディア"}
               lang={lang}
               className={`hidden md:block`}
            />

            <div className="md:hidden flex justify-between w-full my-2 ">
               <Logo
                  logoText={lang === "en" ? "Owned Media" : "オウンドメディア"}
                  lang={lang}
               />

               <Language
                  langText={lang === "en" ? "Japanese" : "英語"}
                  className="flex md:hidden"
               />
            </div>

            <div className="flex flex-col justify-center items-center w-full">
               <div className={`w-full ${website ? "block" : "hidden"}`}>
                  <InputSearch
                     placeholderText={lang === "en" ? "search" : "検索"}
                  />
               </div>
               {/* <div className="hidden sm:flex flex-wrap justify-center gap-5 py-4 w-full ">
                  <Tag />
               </div> */}
            </div>

            <Language
               langText={lang === "en" ? "Japanese" : "英語"}
               className="hidden md:block"
            />
         </div>
         <div className="flex flex-wrap justify-center gap-5 py-4 w-full md:-mt-6 ">
            <Tag />
         </div>
      </nav>
   );
};

export default Navbar;
