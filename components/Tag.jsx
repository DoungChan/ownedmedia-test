"use client";
import React, { use, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fecthContent } from "@/service/action";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import { X } from "lucide-react";
const Tag = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [limit, setLimit] = useState(15);
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

   //remove query
   const handleClick = () => {
      pushQuery("tag", "");
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
         <div>
            <h2 className="text-primary text-lg pl-5 font-semibold">
               {lang === "en" ? "Tags" : "タグ"}
            </h2>
            {tag && (
               <div
                  className="flex justify-between w-48  p-4 border cursor-pointer "
                  onClick={handleClick}
               >
                  <button
                     className={` text-primary text-sm py-0 px-4 text-start rounded-full line-clamp-1 `}
                  >
                     #{tag}
                  </button>
                  <X className="text-primary size-5" />
               </div>
            )}
         </div>
         <div
            className="flex flex-col justify-start items-start gap-3 md:py-4
                    sm:min-w-36 min-w-20 min-h-60 
                   pl-2"
         >
            {data?.tags.map((item, index) => (
               <button
                  key={index}
                  className={` text-primary text-sm py-0 px-4 text-start rounded-full line-clamp-1`}
                  onClick={() => handleClickTag(item.name)}
               >
                  #{lang === "en" ? item.value_en : item.value_ja}
               </button>
            ))}
            {loading &&
               Array.from({ length: 12 }).map((_, index) => (
                  <button
                     key={index}
                     className="text-black text-sm py-0 px-4 bg-secondary rounded-full  w-28 h-4  animate-pulse"
                  ></button>
               ))}
         </div>
      </div>
   );
};

export default Tag;
