import React from "react";

const SkeletonCard = () => {
   return (
      <div
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="h-full w-full justify-start items-start max-w-[600px] "
      >
         <div
            className="p-2 flex justify-between items-center gap-4            
                        rounded-lg border border-transparent  
                        transition-colors border-gray-50 shadow-md h-full
                        w-full
                        cursor-pointer
                     "
         >
            <div className="flex flex-col w-full">
               <div className="flex items-center justify-center gap-2 w-fit h-fit">
                  <div className="articleCover size-12 rounded-full bg-gray-300"></div>
                  <div className="flex flex-col gap-2">
                     <div className="h-4 bg-gray-300 rounded w-[80%] "></div>
                     <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
               </div>
               <div className="flex flex-col justify-between gap-2 mt-2">
                  <div className="h-6 bg-gray-300 rounded w-[80%] "></div>
                  <div className="h-4 bg-gray-300 rounded w-[80%] mt-2 mb-1"></div>
                  <div className="flex gap-2">
                     {[...Array(3)].map((_, index) => (
                        <div
                           key={index}
                           className="text-primary text-sm py-0 px-4 rounded-full bg-gray-300 w-16 h-6"
                        ></div>
                     ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                     <div className="text-xs text-white p-2 bg-gray-300 rounded-lg w-32 h-2"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SkeletonCard;
