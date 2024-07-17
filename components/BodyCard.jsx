"use client";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import { useParams, useSearchParams } from "next/navigation";
import Summarize from "./Summarize";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
const BodyCard = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const searchParams = useSearchParams();
   const param = useParams();
   const [key, setKey] = useState("filter");
   const [openDialog, setOpenDialog] = useState(false);
   const [contentUrl, setContentUrl] = useState("");

   const query = searchParams.get(key);

   useEffect(() => {
      const keys = searchParams.keys();
      let key;
      for (const k of keys) {
         key = k;
         break; // Get the first key and exit the loop
      }
      const query = searchParams.get(key);

      if (key && query) {
         // Ensure key and query are defined before fetching
         const scraping = async () => {
            setLoading(true);
            try {
               const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/media/dev_to?${key}=${query ?? 'day'}&lan=${param.lang}`,
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
            }
         };
         scraping();
      }
   }, [searchParams]); // Consider making this dependency more specific if possible
   const handleSummary = (url) => {
      setContentUrl(url);
      setOpenDialog(true);
   };
   return (
      <>
         {" "}
         <div className="flex items-stretch flex-wrap w-full gap-2">
            {loading
               ? Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                 ))
               : data &&
                 data.map((item, index) => (
                    <div className="flex items-stretch" key={index}>
                       <Card data={item} summary={handleSummary} />
                    </div>
                 ))}
         </div>
         <Dialog
            open={openDialog}
            onOpenChange={() => setOpenDialog(!openDialog)}
         >
            <DialogContent className="min-w-[60%]">
               <DialogHeader>
                  <DialogTitle>Summarize Content</DialogTitle>
               </DialogHeader>
               <DialogDescription>
                  <div className=" w-full max-h-96 overflow-auto">
                     <Summarize contentUrl={contentUrl} />
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default BodyCard;
