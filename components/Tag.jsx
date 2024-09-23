"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fecthContent } from "@/service/action";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";

const Tag = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [limit, setLimit] = useState(5);
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

   useEffect(() => {
      fetchTag();
      console.log(tag, "tag");
   }, [limit]);

   return (
      <div
         className="flex gap-4 md:py-2
                  min-w-28  
                  
                    "
      >
         <div
            className="flex  justify-start items-start gap-3
                    sm:min-w-36 min-w-20
                   pl-2"
         >
            {data?.tags.map((item, index) => (
               <>
                  {" "}
                  <button
                     key={index}
                     className={` text-primary text-sm py-0 px-4 text-start rounded-full line-clamp-1 ${
                        tag === item.name ? "underline duration-500" : ""
                     } `}
                     onClick={() => handleClickTag(item.name)}
                  >
                     #{item.value_en}
                  </button>
               </>
            ))}
            {loading &&
               Array.from({ length: 5 }).map((_, index) => (
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
