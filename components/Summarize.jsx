"use client";
import React from "react";
import { ExternalLink } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { handleOpenLink } from "@/utils/handleOpenLink";
const Summarize = ({ summary }) => {

   return (
      <div className="flex flex-col gap-4">
         <Markdown>{summary.content ?? "something wrong"}</Markdown>
         <div className="w-full flex justify-center">
            <div
               className=" bg-primary p-2 px-10 rounded-full text-white border border-primary duration-300 cursor-pointer hover:bg-transparent hover:text-primary"
               onClick={handleOpenLink(summary.url)}
            >
               <ExternalLink className="size-5" />
            </div>
         </div>
      </div>
   );
};

export default Summarize;
