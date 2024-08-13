"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import { useSearchParams } from "next/navigation";
import Summarize from "./Summarize";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import Pagination from "./PaginationCustome";
import { PAGINATION_ITEMS_PER_PAGE } from "@/config/ui";
import { handleScrollToBodyElement } from "@/hooks/handleScrollToBodyElement";
const BodyCard = ({ lang }) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const searchParams = useSearchParams();
   const [openDialog, setOpenDialog] = useState(false);
   const [contentUrl, setContentUrl] = useState("");

   useEffect(() => {
      const tag = searchParams.get("tag");
      const keyword = searchParams.get("keyword");
      const page = searchParams.get("page");
      if (keyword) {
         // Ensure keysord and query are defined before fetching
         const scraping = async () => {
            setLoading(true);
            try {
               const res = await fetch(
                  `${
                     process.env.NEXT_PUBLIC_API_URL
                  }/media?limit=${PAGINATION_ITEMS_PER_PAGE}&page=${page ?? 1}
                  &lan=${lang}&media=${tag}&tag=${keyword}`,
                  {
                     method: "GET",
                  }
               );
               const jsonData = await res.json();
               setData(jsonData);
            } catch (err) {
               console.log(err);
            } finally {
               setLoading(false);
               handleScrollToBodyElement();
            }
         };
         scraping();
      }
   }, [searchParams]);
   const handleSummary = (url) => {
      setContentUrl(url);
      setOpenDialog(true);
   };

   return (
      <>
         {" "}
         <div
            id="body-content"
            className="flex items-stretch flex-wrap justify-center w-full gap-2 max-w-screen-2xl pt-12"
         >
            {loading
               ? Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={index} />
                 ))
               : data &&
                 data.content.map((item, index) => (
                    <div className="flex" key={index}>
                       <Card data={item} summary={handleSummary} />
                    </div>
                 ))}
         </div>
         <div className="my-10">
            <Pagination totalItems={data?.total_items ?? data?.total_content} />
         </div>
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
                     <Summarize contentUrl={contentUrl} lang={lang} />
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default BodyCard;
