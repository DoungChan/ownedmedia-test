"use client";
import React from "react";
import { BookOpenCheck, ExternalLink } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { formatDateFromText } from "@/utils/formatDateFromText";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
const Card = ({ summary, data }) => {
   const { lang } = useParams();
   const pushQuery = useHandlePushQuery();
   const handleClick = (modifiedUrl) => {
      summary(modifiedUrl);
   };
   console.log(data);

   const handleClickTag = (tag) => {
      pushQuery("tag", tag);
   };
   return (
      <motion.div
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="w-full h-full flex-1"
      >
         <div
            className="p-2 flex justify-between items-center gap-2
          rounded-lg border border-transparent  
          transition-colors hover:bg-slate-100  shadow-sm h-full
          cursor-pointer
          "
         >
            <div className=" flex flex-col w-[70%]">
               <div className="flex items-center justify-center gap-2 w-fit -my-4 h-fit">
                  <img
                     className="articleCover size-12 rounded-full object-cover"
                     src={data?.image}
                     alt="author profile"
                  />
                  <div className="flex flex-col gap-2">
                     <p className="font-bold text-center leading-none text-xs text-wrap line-clamp-1">
                        {data?.by_author}
                     </p>
                     <p className=" flex items-center text-xs ">
                        {data?.media}
                           
                     </p>
                  </div>
               </div>
               <div className=" flex flex-col justify-between gap-2">
                  <h2 className={`text-xl font-semibold line-clamp-2`}>
                     {lang === "en" ? data?.title_en : data?.title_ja}
                  </h2>
                  <p className="line-clamp-3 -mt-4 -mb-1">
                     {lang === "en" ? data?.summary_en : data?.summary_ja}
                  </p>
                  <div className="flex gap-2">
                     {data?.tags.slice(0, 3).map((item, index) => (
                        <button
                           key={index}
                           className={`text-primary text-sm py-0 px-4 rounded-full line-clamp-1 bg-secondary`}
                           onClick={() => handleClickTag(item)}
                        >
                           # {item}
                        </button>
                     ))}
                  </div>

                  <div className="flex gap-2 py-2">
                     <p className=" flex items-center text-xs ">
                        {data?.date
                           ? formatDateFromText(data?.date)
                           : formatDate(data?.by_author.datetime)}
                     </p>
                  </div>
               </div>
            </div>
            <div className="max-w-[30%] flex justify-end items-end ">
               <img
                  src={data?.image}
                  alt=""
                  className="object-cover min-w-20 min-h-20  md:min-w-24 md:min-h-24 size-20 rounded-xl"
               />
            </div>
         </div>
      </motion.div>
   );
};

export default Card;
