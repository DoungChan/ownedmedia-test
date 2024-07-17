"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Markdown from "markdown-to-jsx";
import Summarize from "@/components/Summarize";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import FloatButton from "@/components/FloatButoon";

import "katex/dist/katex.min.css";
const Blog = () => {
   const searchParams = useSearchParams();
   const [data, setData] = useState(null);
   const [error, setError] = useState("");
   const query = searchParams.get("query");
   const [detail, setDetail] = useState(true);
   useEffect(() => {
      fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/media/dev_to/detail?article_url=${query}`,
         {
            method: "GET",
         }
      )
         .then(async (res) => {
            if (!res.ok) {
               throw new Error("Failed to fetch article");
            }
            setData(await res.json());
         })
         .catch((err) => {
            console.log(err);
            setError("Failed to load the article. Please try again later.");
         });
   }, [query]);

   if (error) return <p>{error}</p>;
   if (!data) return <p>Loading...</p>;
   return (
      <>
         {" "}
         <div className="blogContainer flex flex-col justify-center items-center m-auto gap-6 mt-10">
            <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>
            <p className="author">
               By {data.autor.name} on{" "}
               {new Date(data.datetime).toLocaleDateString()}
            </p>
            <a
               href={`https://dev.to/${query}`}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-500"
            >
               Read on Dev.to
            </a>

            {data.cover_url && (
               <img
                  className="articleCover"
                  src={data.cover_url}
                  alt="Article Cover"
               />
            )}

            <hr className="w-full border-1 border-gray-300" />
            <div className="sm:w-[50%] w-[70%]  flex flex-col justify-center items-center">
               <Markdown className=" w-full">{data.content}</Markdown>
            </div>

            <div className="tags">
               {data.tags.map((tag, index) => (
                  <a
                     key={index}
                     className="tagLink"
                     href={`https://dev.to${tag.url}`}
                  >
                     {tag.name}
                  </a>
               ))}
            </div>
         </div>
         <FloatButton>
            <div
               className=" p-2 flex  gap-2 items-center cursor-pointer"
               onClick={() => setDetail(!detail)}
            >
               <p className="text-white">Summarize</p>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit-2"
               >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
               </svg>
            </div>
         </FloatButton>
         <Dialog
            open={!detail}
            onOpenChange={() => setDetail(!detail)}
            style={{ width: "80%" }}
         >
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>Summarize Content</DialogTitle>
               </DialogHeader>
               <DialogDescription>
                  <div className=" w-full max-h-96 overflow-auto">
                     <Summarize contentUrl={query} />
                  </div>
               </DialogDescription>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default Blog;
