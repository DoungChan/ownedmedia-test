"use client";
import React from "react";
import { BookOpenCheck, ExternalLink } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { formatDateFromText } from "@/utils/formatDateFromText";
import { motion } from "framer-motion";
const Card = ({ summary, data }) => {
   const handleClick = (modifiedUrl) => {
      summary(modifiedUrl);
   };

   return (
      <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-80 h-full flex-1">
         <div className="group flex flex-col rounded-lg border border-transparent  transition-colors hover:border-gray-300 hover:bg-gray-100 border-gray-50 shadow-lg h-full">
            <div className="relative w-full h-fit  p-2">
               <div className="w-full h-40 bg-primary flex justify-center items-center text-white rounded-lg mt-2">
                  <h6>Owned Media</h6>
               </div>
               <span className="absolute z-10 -bottom-8 left-1/2 transform -translate-x-1/2">
                  <img
                     className="articleCover size-14 rounded-full object-cover"
                     src={data?.by_author.profile ?? data?.image}
                     alt="author profile"
                  />
                  <p className="font-bold text-center leading-none text-xs -mt-3 text-wrap line-clamp-1">
                     {data?.by_author?.name ?? data?.by_author}
                  </p>
               </span>
            </div>
            <div className="mt-6 px-2 flex flex-col justify-between flex-1">
               <h2 className={`mb-3 text-xl font-semibold line-clamp-2`}>
                  {data?.title}
               </h2>
               <div className="flex justify-between p-2  gap-4">
                  <p className=" flex items-center text-xs ">
                     {data?.date
                        ? formatDateFromText(data?.date)
                        : formatDate(data?.by_author.datetime)}
                  </p>
                  <div className="flex gap-2">
                     <div  className="text-xs text-white p-2 bg-primary rounded-lg " >
                     <a
                        href={data.base_url + data.url}
                        target="_blank"
                        className="text-white "
                     >
                        <ExternalLink size={16} />
                     </a>
                     
                  </div>
                  <button
                     onClick={() => handleClick(data.url)}
                     className="text-xs text-white p-2 bg-primary rounded-lg "
                  >
                     <BookOpenCheck size={16} />
                  </button>
                  </div>
                  
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default Card;
