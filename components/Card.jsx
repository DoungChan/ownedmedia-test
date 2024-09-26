"use client";
import React from "react";
import { formatDate } from "../utils/formatDate";
import { formatDateFromText } from "@/utils/formatDateFromText";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import Markdown from "markdown-to-jsx";
const Card = ({ summary, data }) => {
   const { lang } = useParams();
   const pushQuery = useHandlePushQuery();
   const handleClick = (summarize, title, url) => {
      summary(summarize, title, url);
   };
   const handleClickTag = (tag) => {
      pushQuery("tag", tag);
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="h-full flex-1 justify-start items-start  min-w-[200px] max-w-[600px]  "
         onClick={() =>
            handleClick(
               lang === "en" ? data?.summary_en : data?.summary_ja,
               lang === "en" ? data?.title_en : data?.title_ja,
               data.base_url + data?.url
            )
         }
      >
         <div
            className="p-2 flex justify-between items-center gap-2
          rounded-lg border border-transparent  
          transition-colors hover:bg-slate-100  shadow-md h-full max-h-64  
          cursor-pointer
          "
         >
            <div className=" flex flex-col sm:w-[80%]">
               <div className="flex items-center justify-center gap-2 w-fit -my-4 h-fit">
                  <img
                     className="articleCover size-12 rounded-full object-cover"
                     src={
                        data?.media !== "dev_to"
                           ? data?.image
                           : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                     }
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
                  <Markdown className="line-clamp-3 -mt-4 -mb-1">
                     {lang === "en" ? data?.summary_en : data?.summary_ja}
                  </Markdown>
                  <div className="flex gap-2">
                     {data?.tags.slice(0, 3).map((item, index) => (
                        <button
                           key={index}
                           className={`text-primary text-sm py-0 px-4 rounded-full line-clamp-1 bg-secondary opacity-60`}
                           onClick={() => handleClickTag(item)}
                        >
                           #{item}
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
         </div>
      </motion.div>
   );
};

export default Card;
