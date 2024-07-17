"use client";
import React, { useState } from "react";
import { BookOpenCheck } from "lucide-react";
import Image from "next/image";
const Card = ({ summary, data }) => {
   const modifiedUrl = data?.content_url.replace(/^\/+/, "");
   const handleClick = (modifiedUrl) => {
      summary(modifiedUrl);
   };

   return (
      <div className="max-w-80 h-full">
         <div className="group flex flex-col rounded-lg border border-transparent  transition-colors hover:border-gray-300 hover:bg-gray-100 border-gray-50 shadow-lg h-full">
            <div className="relative w-full h-fit  p-2">
               <Image
                  className="rounded-lg object-contain w-auto h-auto"
                  priority
                  width={300}
                  height={150}
                  src={
                     "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8lvvnvil0m75nw7yi6iz.jpg"
                  }
                  alt="Article Cover"
               />
               <span className="absolute z-10 -bottom-6 left-1/2 transform -translate-x-1/2">
                  <img
                     className="articleCover size-14 rounded-full"
                     src={data?.author.profile}
                     alt="author profile"
                  />
                  <p className="font-bold text-center leading-none text-xs -mt-3">
                     {data?.author.name}
                  </p>
               </span>
            </div>
            <div className="mt-6 px-2 flex flex-col justify-between flex-1">
               <h2 className={`mb-3 text-xl font-semibold line-clamp-2`}>
                  {data?.title}
               </h2>
               <div className="flex justify-between p-2  gap-4">
                  <p className=" flex items-center text-xs ">
                     {new Date(data?.author.datetime).toLocaleDateString()}
                  </p>
                  <div className="h-full bg-blue-500 bg-opacity-70 w-full rounded-xl text-xs flex items-center justify-center">
                     <a
                        href={`https://dev.to/${modifiedUrl}`}
                        className="text-white text-opacity-80"
                     >
                        official website
                     </a>
                  </div>
                  <button
                     onClick={() => handleClick(modifiedUrl)}
                     className="text-xs text-white p-2 bg-blue-500 rounded-lg bg-opacity-70"
                  >
                     <BookOpenCheck size={16} />
                  </button>
               </div>
            </div>
         </div>
           
      </div>
   );
};

export default Card;
