import React from "react";

const SkeletonCard = () => {
   return (
      <div
         initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3 }}
         className="w-[400px] md:w-[600px] h-full flex-1"
      >
         <div
            className="p-2 flex justify-between items-center gap-4            
                        rounded-lg border border-transparent  
                        transition-colors hover:bg-slate-100 border-gray-50 shadow-sm h-full
                        cursor-pointer
                     "
         >
            <div className="flex flex-col">
               <div className="flex items-center justify-center gap-2 w-fit h-fit">
                  <div className="articleCover size-12 rounded-full bg-gray-300"></div>
                  <div className="flex flex-col gap-2">
                     <div className="h-4 bg-gray-300 rounded w-56 md:w-96"></div>
                     <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
               </div>
               <div className="flex flex-col justify-between gap-2 mt-2">
                  <div className="h-6 bg-gray-300 rounded w-48 md:w-96"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mt-2 mb-1"></div>
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
            <div>
               <div className="object-cover min-w-24 min-h-24 size-24 rounded-xl bg-gray-300"></div>
            </div>
         </div>
      </div>
   );
};

export default SkeletonCard;
