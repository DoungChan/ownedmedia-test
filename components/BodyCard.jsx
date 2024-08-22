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
const BodyCard = ({ search }) => {
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

      const url = `${process.env.NEXT_PUBLIC_API_URL}/media?media=${
         search ? "all" : website
      }&limit=${limit}&offset=0&sort_order=asc${tag ? `&tag=${tag}` : ""}${
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
      console.log(contentUrl, "contentUrl");
      
      setOpenDialog(true);
   };

   return (
      <>
         <div
            id="body-content"
            className="flex items-stretch flex-col justify-center w-full gap-2 max-w-screen-md py-4"
         >
            {data &&
               data.medias.map((item, index) => (
                  <div key={index}>
                     <Card data={item} summary={handleSummary} />
                  </div>
               ))}
            {loading &&
               Array.from({ length: PAGINATION_ITEMS_PER_PAGE }).map(
                  (_, index) => (
                     <div className="flex" key={index}>
                        <SkeletonCard />
                     </div>
                  )
               )}
            {data?.medias.length === 0 && (
               <div className="flex items-center justify-center w-full h-96 m-auto">
                  <h6 className="text-primary ">
                     {lang === "en"
                        ? "No content found"
                        : "コンテンツが見つかりません"}
                  </h6>
               </div>
            )}
         </div>
         {loadMore && (
            <div
               className={`flex items-center justify-center w-full py-4 ${
                  loading || !data ? "hidden" : ""
               }`}
               onClick={() => setLimit(limit + PAGINATION_ITEMS_PER_PAGE)}
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
         )}

         <Dialog
            open={openDialog}
            onOpenChange={() => setOpenDialog(!openDialog)}
         >
            <DialogContent className="sm:min-w-[60%] min-w-[90%]">
               <DialogHeader>
                  <DialogTitle>
                     {lang === "en" ? "Summary" : "まとめ"}
                  </DialogTitle>
               </DialogHeader>
               <DialogDescription>
                  <div className=" w-full max-h-[500px] sm:max-h-96 overflow-auto">
                     <Summarize summary={contentUrl} lang={lang} />
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default BodyCard;
