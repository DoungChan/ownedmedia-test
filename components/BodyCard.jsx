"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import Summarize from "./Summarize";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import { PAGINATION_ITEMS_PER_PAGE } from "@/config/ui";
import { useParams, useSearchParams } from "next/navigation";
import { fecthContent } from "@/service/action";
const BodyCard = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const { lang } = useParams();
   const [openDialog, setOpenDialog] = useState(false);
   const [contentUrl, setContentUrl] = useState({
      title: "",
      url: "",
      content: "",
   });
   const { website } = useParams();
   const [limit, setLimit] = useState(PAGINATION_ITEMS_PER_PAGE);
   const [loadMore, setLoadMore] = useState(true);
   const query = useSearchParams();
   const searchKeyWord = query.get("search");
   const tag = query.get("tag");
   // fetch data
   const res = async () => {
      setLoading(true);

      const url = `${
         process.env.NEXT_PUBLIC_API_URL
      }/media?media=all&limit=${limit}&offset=0&tag=${website}${
         searchKeyWord ? `&q=${searchKeyWord}` : ""
      }`;
      const data = await fecthContent(url);
      setData(data);
      setLoading(false);

      if (data?.total_count <= data?.medias.length) {
         setLoadMore(false);
      }
   };

   // fetch data on first load
   useEffect(() => {
      res();
   }, [limit, searchKeyWord, tag]);

   // handle summary
   const handleSummary = (summarize, title, url) => {
      setContentUrl({
         title: title,
         url: url,
         content: summarize,
      });

      setOpenDialog(true);
   };

   return (
      <div className="mt-48 px-2">
         {data?.total_count > 0 && (
            <div>
               <h5 className="text-gray-500 text-xs font-semibold">
                  Total articals: {data?.total_count}
               </h5>
            </div>
         )}

         <div
            id="body-content"
            className=" grid grid-cols-1 lg:grid-cols-2  gap-4 py-4 mt-4  min-h-[calc(100vh-25rem)]"
         >
            {data &&
               data.medias.map((item, index) => (
                  <div key={index} className="flex items-stretch">
                     <Card data={item} summary={handleSummary} />
                  </div>
               ))}
            {loading &&
               Array.from({ length: 6 }).map((_, index) => (
                  <div className="flex items-stretch flex-wrap" key={index}>
                     <SkeletonCard />
                  </div>
               ))}
            {data?.medias.length === 0 && (
               <div className=" flex justify-center col-span-2 ">
                  <h6 className="text-primary ">
                     {lang === "en"
                        ? "No content found"
                        : "コンテンツが見つかりません"}
                  </h6>
               </div>
            )}
         </div>
         {data?.total_count > 20 && (
            <>
               {" "}
               {loadMore ? (
                  <div
                     className={`flex items-center justify-center w-full py-4 ${
                        loading || !data ? "hidden" : ""
                     }`}
                     onClick={() => setLimit(limit + 10)}
                  >
                     {/* <Pagination totalItems={data?.total_items ?? data?.total_content} /> */}
                     <h6
                        className="px-6 py-2 cursor-pointer
            bg-primary hover:bg-transparent border border-primary duration-300
            rounded-full 
            text-white hover:text-primary "
                     >
                        {lang === "en" ? "Load more" : "もっと読む"}
                     </h6>
                  </div>
               ) : (
                  <div className="flex items-center justify-center py-4">
                     <h6 className="text-primary ">
                        {lang === "en"
                           ? "No more content"
                           : "コンテンツがもうありません"}
                     </h6>
                  </div>
               )}
            </>
         )}

         <Dialog
            open={openDialog}
            onOpenChange={() => setOpenDialog(!openDialog)}
         >
            <DialogContent className="sm:min-w-[60%] min-w-[90%]">
               <DialogHeader>
                  <DialogTitle>
                     <div className="w-[90%] ">
                        <h1 className="text-primary text-start text-xl font-semibold">
                           {contentUrl ? contentUrl.title : "Summary"}
                        </h1>
                     </div>
                  </DialogTitle>
               </DialogHeader>
               <DialogDescription>
                  <div className=" w-full max-h-[500px] sm:max-h-96 overflow-auto">
                     <Summarize summary={contentUrl} lang={lang} />
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default BodyCard;
