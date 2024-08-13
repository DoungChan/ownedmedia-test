"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const Navbar = () => {
   const router = useRouter();
   const { lang } = useParams();
   const searchParams = useSearchParams().toString();
   const [bgActive, setBgActive] = useState(false);
   const handleClick = () => {
      const newLang = lang === "en" ? "ja" : "en";
      router.replace(`/${newLang}/?${searchParams}`);
   };
   //ativate bg when scroll
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 100) {
            setBgActive(true);
         } else {
            setBgActive(false);
         }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);
   return (
      <div
         className={`flex justify-between items-center py-1 sm:px-10 p-2 fixed top-0 z-30 w-full  text-white ${
            bgActive ? "bg-primary" : ""
         } duration-300 `}
      >
         <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fi p-2"
         >
            <h1 className="text-xl sm:text-3xl">Owned Media</h1>
         </motion.div>
         <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-fit py-1 px-4 sm:px-10 sm:py-2 border border-secondary rounded-full cursor-pointer"
            onClick={handleClick}
         >
            {lang === "en" ? "English" : "Japanese"}
         </motion.div>
      </div>
   );
};

export default Navbar;
