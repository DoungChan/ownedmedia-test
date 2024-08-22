"use client";
import React, { useEffect, useState } from "react";
import InputSearch from "../Input";
import Logo from "./Logo";
import Language from "./Language"; // Assuming you have this component
import { useParams } from "next/navigation";
import WebsiteButton from "../WebsiteButton";
import { fecthContent } from "@/service/action";
import { AlignJustify, MenuIcon } from "lucide-react";

const Navbar = () => {
   const { lang, website } = useParams();
   const [websites, setWebsites] = useState([]);

   const res = async () => {
      const data = await fecthContent(
         `${process.env.NEXT_PUBLIC_API_URL}/website`
      );
      setWebsites(data.website);
   };

   useEffect(() => {
      res();
   }, []);

   return (
      <div className="flex flex-col md:flex-row justify-between items-start mt-2 py-2 md:px-32 p-2 w-full text-white bg-white">
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
               className="block md:hidden"
            />
         </div>

         <div className="flex flex-col justify-center items-center w-full">
            <div className={`w-full ${website ? "block" : "hidden"}`}>
               <InputSearch
                  placeholderText={lang === "en" ? "search" : "検索"}
               />
            </div>
            <div className="flex flex-wrap justify-center gap-5 py-4 w-full">
               {websites?.map((item, index) => (
                  <WebsiteButton key={index} buttonText={item} />
               ))}
            </div>
         </div>

         <Language
            langText={lang === "en" ? "Japanese" : "英語"}
            className="hidden md:block"
         />
      </div>
   );
};

export default Navbar;
