"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fecthContent } from "@/service/action";
import { motion } from "framer-motion";
const Tag = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [limit, setLimit] = useState(10);
   const [activeTag, setActiveTag] = useState(null);
   const { website } = useParams();
   const router = useRouter();
   const fetchTag = async () => {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/media/tag?media=all&limit=${limit}&offset=0`;
      const data = await fecthContent(url);
      setData(data);
      setLoading(false);
   };

   useEffect(() => {
      fetchTag();
      setActiveTag(website);
   }, [limit]);

   const handleClickTag = (tag) => {
      setActiveTag(tag);
      router.replace(`${tag}`);
   };

   return (
      <div
         className="flex gap-4 md:py-2
                  min-w-28  

                    "
      >
         <div
            className="flex justify-start items-start gap-1
                    sm:min-w-36 min-w-20 max-w-[90%] overflow-auto
                   m-auto scrollbar-hide "
         >
            {loading ? (
               <>
                  {Array.from({ length: 5 }).map((_, index) => (
                     <button
                        key={index}
                        className="text-black text-sm py-0 px-4 bg-secondary rounded-full  w-28 h-4  animate-pulse"
                     ></button>
                  ))}
               </>
            ) : (
               <>
                  <div className="flex flex-col">
                     <button
                        className={` text-sm py-0 px-4 text-start rounded-full  ${
                           activeTag === "all"
                              ? " text-blue-500"
                              : "text-primary"
                        } `}
                        onClick={() => handleClickTag("all")}
                     >
                        All
                     </button>
                     {activeTag === "all" && (
                        <motion.div
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 0.1 }}
                           className="bg-blue-500 h-1 rounded-full duration-500"
                        ></motion.div>
                     )}
                  </div>{" "}
                  {data?.tags
                     .filter((item) => item.name !== "all")
                     .map((item, index) => (
                        <div key={index} className="flex flex-col">
                           {" "}
                           <button
                              className={` text-sm py-0 px-4 text-start rounded-full text-nowrap ${
                                 activeTag === item.name
                                    ? " text-blue-500"
                                    : "text-primary"
                              } `}
                              onClick={() => handleClickTag(item.name)}
                           >
                              {item.value_en}
                           </button>
                           {activeTag === item.name && (
                              <motion.div
                                 initial={{ width: 0 }}
                                 animate={{ width: "100%" }}
                                 transition={{ duration: 0.1 }}
                                 className="bg-blue-500 h-1 rounded-full duration-500"
                              ></motion.div>
                           )}
                        </div>
                     ))}
               </>
            )}
         </div>
      </div>
   );
};

export default Tag;
