"use client";
import React from "react";
import TypingAnimation from "./TypingAnimation";
import { ExternalLink } from "lucide-react";
const Summarize = ({ summary }) => {
   const handleOpenLink = (url) => () => {
      window.open(url, "_blank");
   };
   return (
      <div>
         <>
            <div className="flex justify-between">
               <h1 className="text-lg max-w-[50%] font-semibold line-clamp-1">
                  {summary.title}
               </h1>
               <div
                  className="bg-primary p-2 rounded-lg text-white"
                  onClick={handleOpenLink(summary.url)}
               >
                  <ExternalLink className=" cursor-pointer  size-4" />
               </div>
            </div>
            <TypingAnimation text={summary.content ?? "something wrong"} />
         </>
      </div>
   );
};

export default Summarize;
