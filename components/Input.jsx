"use client";
import React, { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash"; // Import lodash debounce function
import { Separator } from "./ui/separator";

const InputSearch = ({ placeholderText, lang }) => {
   const query = useSearchParams();
   const handlePushQuery = useHandlePushQuery();
   const searchKeyWord = query.get("search") || "";

   const [input, setInput] = useState(searchKeyWord);
   const inputRef = useRef(null);

   // Debounce the search function to prevent many requests
   const debouncedSearch = useRef(
      debounce((value) => {
         handlePushQuery("search", value);
      }, 300) // Adjust the delay (in milliseconds) as needed
   ).current;

   const handleInputChange = (e) => {
      const value = e.target.value;
      setInput(value);
      debouncedSearch(value); // Use the debounced function
   };

   const handleClear = () => {
      setInput("");
      handlePushQuery("search", "");
      if (inputRef.current) {
         inputRef.current.value = "";
      }
   };

   return (
      <form
         className="w-full min-w-80 md:w-1/2 flex items-center shadow-sm rounded-full border bg-white m-auto "
         onSubmit={(e) => e.preventDefault()}
      >
         <div className="w-full rounded-r-3xl flex p-1">
            <input
               ref={inputRef}
               className="rounded-lg w-fit md:w-auto focus:outline-none p-1 flex-1 items-center justify-center text-black text-sm ml-2"
               type="text"
               onChange={handleInputChange}
               placeholder={placeholderText}
               value={input}
            />
            {input && (
               <div className="w-fit h-9 flex justify-center items-center mx-3  ">
                  <X
                     className="size-5 cursor-pointer text-blue-500"
                     onClick={handleClear}
                  />
               </div>
            )}

            <Separator orientation="vertical" className="py-1" />
            <div
               className="flex justify-center  sm:p-2 mx-3 cursor-pointer rounded-full text-blue-500 items-center"
               onClick={() =>
                  debouncedSearch(
                     inputRef.current ? inputRef.current.value : ""
                  )
               }
            >
               <Search className="w-5 h-5" />
            </div>
         </div>
      </form>
   );
};

export default InputSearch;
