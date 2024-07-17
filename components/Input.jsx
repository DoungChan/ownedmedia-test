"use client";
import React, { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebouce";
import { useRouter, useSearchParams } from "next/navigation";
const InputSearch = () => {
   const [initailValue, setInitailValue] = useState("");
   const debouncedSearchTerm = useDebounce(initailValue, 500);
   const router = useRouter();
   const searchParams = useSearchParams();
   const onChange = (e) => {
      setInitailValue(e.target.value);
   };
   useEffect(() => {
      if (debouncedSearchTerm) {
         router.push(`?tag=${debouncedSearchTerm}`);
      }
   }, [debouncedSearchTerm]);
   useEffect(() => {
      const keys = searchParams.keys();
      for (const key of keys) {
         if (key === "tag") {
            setInitailValue(searchParams.get(key));
         } else {
            setInitailValue("");
         }
         break;
      }
   }, [searchParams]);
   return (
      <div className="w-full md:w-[70%] border border-blue-500 rounded-lg flex">
         <input
            className="rounded-lg w-full focus:outline-none p-1 flex-1 items-center justify-center"
            type="text"
            placeholder={"Search"}
            onInput={onChange}
            value={initailValue}
         />
         <div className="flex justify-center pt-1 pr-2 cursor-pointer">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="lucide lucide-search"
            >
               <circle cx="11" cy="11" r="8" />
               <path d="m21 21-4.3-4.3" />
            </svg>
         </div>
      </div>
   );
};

export default InputSearch;
