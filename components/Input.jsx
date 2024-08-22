"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import { useSearchParams } from "next/navigation";
const InputSearch = ({ placeholderText, lang }) => {
   const query = useSearchParams();
   const handlePushQuery = useHandlePushQuery();
   const searchKeyWord = query.get("search");
   const [input, setInput] = React.useState();
   const handleSearch = (value) => {
      handlePushQuery("search", value);
   };
   const handleClear = () => {
      setInput("");
   };
   return (
      <>
         <div className="w-full max-w-[500px] flex">
            <div className=" w-[70%] sm:w-[50%] border border-secondary rounded-r-3xl flex p-1">
               <div className="flex justify-center px-2 sm:p-2 cursor-pointer text-white  rounded-full bg-secondary bg-opacity-50 items-center">
                  <Search
                     className="size-3 sm:size-4"
                     onClick={() => handleSearch(input)}
                  />
               </div>
               <input
                  className="rounded-lg w-full focus:outline-none p-1 flex-1 items-center justify-center  bg-transparent text-white text-sm ml-2"
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholderText}
                  value={input}
               />
               {input && (
                  <div className="m-auto pr-2 cursor-pointer" onClick={handleClear}>
                     <X size={14} />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default InputSearch;
