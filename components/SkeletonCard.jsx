import React from "react";

const SkeletonCard = () => {
   return (
      <div className="w-80 h-full">
         <div className="group flex flex-col rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 border-gray-50 shadow-lg h-full">
            <div className="relative w-full h-fit p-2">
               <div className="rounded-lg bg-gray-200 w-full h-40 animate-pulse"></div>
               <span className="absolute z-10 -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="font-bold text-center leading-none text-xs mt-3 bg-gray-200 w-24 h-4 animate-pulse "></div>
               </span>
            </div>
            <div className="mt-10 px-2 flex flex-col justify-between flex-1">
               <div className="mb-3 text-xl font-semibold line-clamp-2 bg-gray-200 h-8 animate-pulse"></div>
               <div className="flex justify-between p-2 gap-4">
                  <div className="flex items-center text-xs bg-gray-200 w-20 h-4 animate-pulse"></div>
                  <div className="h-full bg-gray-200 w-full rounded-xl text-xs flex items-center justify-center animate-pulse">
                     <div className="text-white text-opacity-80 bg-gray-200 w-24 h-4"></div>
                  </div>
                  <button className="text-xs text-white p-2 bg-gray-200 rounded-lg bg-opacity-70 animate-pulse w-10 h-10"></button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SkeletonCard;
