"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const Categories = ({ lang, data }) => {
   const router = useRouter();

   const handlecategories = (keyword) => {
      router.push(`${lang}/${keyword}`);
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="w-[80%] sm:w-[50%] flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center my-4 cursor-pointer"
      >
         {data.website.map((website, index) => (
            <button
               key={index}
               onClick={() => handlecategories(website)}
               className={`flex gap-3  py-3 px-4 rounded-xl text-white text-lg justify-center items-center bg-primary `}
            >
               {website}
               <ArrowRight size={24} />
            </button>
         ))}
         <button
            onClick={() => handlecategories('all')}
            className={`flex gap-3  py-3 px-4 rounded-xl text-white text-lg justify-center items-center bg-primary `}
         >
            See All
            <ArrowRight size={24} />
         </button>
      </motion.div>
   );
};

export default Categories;
