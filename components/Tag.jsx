"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fecthContent } from "@/service/action";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
const Tag = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [limit, setLimit] = useState(10);
   const { lang, website } = useParams();
   const [loadMore, setLoadMore] = useState(true);
   const pushQuery = useHandlePushQuery();
   const query = useSearchParams();
   const tag = query.get("tag");
   const fetchTag = async () => {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/media/tag?media=${website}&limit=${limit}&offset=0`;
      const data = await fecthContent(url);
      setData(data);
      setLoading(false);
   };
   const handleClickTag = (tag) => {
      pushQuery("tag", tag);
   };
   // handle load more
   const handleLoadMore = () => {
      if (data?.total_count <= data?.tags.length) {
         setLoadMore(false);
      }
      setLimit(limit + 10);
   };

   useEffect(() => {
      fetchTag();
   }, [limit]);

   return (
      <div
         className="flex flex-col gap-4 md:py-2
                  min-w-28 min-h-60 
                    "
      >
         <div
            className="flex flex-col justify-start items-start gap-3 md:py-4
                    sm:min-w-36 min-w-20 min-h-60 
                   pl-2"
         >
            {data?.tags.map((item, index) => (
               <button
                  key={index}
                  className={`text-primary text-sm py-1 px-4 rounded-full text-start line-clamp-1 ${
                     item.name === tag
                        ? "bg-primary text-white"
                        : "bg-secondary "
                  }`}
                  onClick={() => handleClickTag(item.name)}
               >
                  #{lang === "en" ? item.value_en : item.value_ja}
               </button>
            ))}
            {loading &&
               Array.from({ length: 10 }).map((_, index) => (
                  <button
                     key={index}
                     className="text-black text-sm py-1 px-4 bg-secondary rounded-full  w-20 h-6  animate-pulse"
                  ></button>
               ))}
         </div>
      </div>
   );
};

export default Tag;
