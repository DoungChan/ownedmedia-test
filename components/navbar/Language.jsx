"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LanguagesIcon} from "lucide-react";
import { fecthContent } from "@/service/action";
import { debounce } from "lodash";
const Language = ({ className }) => {
   const router = useRouter();
   const { lang, website } = useParams();
   const pathname = usePathname();
   const [input, setInput] = useState("");
   const inputRef = useRef(null);

   const handleClick = (newLang) => () => {
      const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
      router.replace(newPath);
   };
   useEffect(() => {
      const fetchTag = async () => {
         setLoading(true);
         const url = `${
            process.env.NEXT_PUBLIC_API_URL
         }/media/tag?media=${website}&limit=${116}&offset=0&q=${input}`;
         const data = await fecthContent(url);
         setData(data);
         setLoading(false);
      };
      fetchTag();
   }, [website, input]);

   const handleInputChange = (e) => {
      const value = e.target.value;
      debouncedSearch(value);
   };
   const handleClear = () => {
      setInput("");
      if (inputRef.current) {
         inputRef.current.value = "";
      }
   };
   const handleClickTag = (tag) => {
      router.push(`/${lang}/${website}?tag=${tag}`);
      setOpenSheet(false);
   };

   // Debounce the search function to prevent many requests
   const debouncedSearch = useRef(
      debounce((value) => {
         setInput(value);
      }, 300) // Adjust the delay (in milliseconds) as needed
   ).current;

   return (
      <div className={className}>
         <div className="flex gap-2">
            <div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="icon">
                        <LanguagesIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-black bg-transparent" />
                        <span className="sr-only">Toggle language</span>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={handleClick("en")}>
                        English
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleClick("ja")}>
                        Japanese
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </div>
   );
};

export default Language;
