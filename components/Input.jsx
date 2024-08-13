"use client";
import React, { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebouce";
import { motion } from "framer-motion";
import { ChevronDown, Search, SquareX } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter, useSearchParams } from "next/navigation";
import { handleScrollToBodyElement } from "@/hooks/handleScrollToBodyElement";
const InputSearch = ({ placeholderText, lang }) => {
   const [open, setOpen] = useState(false);
   const [website, setWebsite] = useState([]);
   const [filterSelect, setFilterSelect] = useState([]);
   const [initailSelect, setInitailSelect] = useState("");
   const [activeFilter, setActiveFilter] = useState("");
   const [loading, setLoading] = useState(false);
   const [keyWord, setKeyword] = useState("");
   const [openTag, setOpenTag] = useState(false);
   const debouncedSearchTerm = useDebounce(keyWord, 500);
   const router = useRouter();
   const searchParams = useSearchParams();

   // handle push query from hooks
   const pushQuery = useHandlePushQuery();

   // fetch filter list website
   const fetchFilter = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website`, {
            method: "GET",
         });
         const jsonData = await res.json();
         setWebsite(jsonData);
      } catch (err) {
         console.log(err);
      }
   };

   // fetch filter tag
   const fetchFilterTag = async () => {
      const tag = searchParams.get("tag");
      setLoading(true);
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/media/tag?media=dev_to`,
            {
               method: "GET",
            }
         );
         const jsonData = await res.json();
         setInitailSelect(jsonData);
         setFilterSelect(jsonData);
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };
   // fetch filter list once it's mounted
   useEffect(() => {
      fetchFilter();
      fetchFilterTag();
   }, []);

   // push query when keyword change
   useEffect(() => {
      if (debouncedSearchTerm) {
         handleFilterTag(debouncedSearchTerm);
      }
   }, [debouncedSearchTerm]);

   //set initail keyword from query
   useEffect(() => {
      const keyword = searchParams.get("keyword");
      const tag = searchParams.get("tag");
      if (keyword) {
         setKeyword(keyword);
      } else {
         setKeyword("");
      }

      if (tag) {
         setActiveFilter(tag);
      }
   }, [searchParams]);

   // handle push query when change website filter
   const handleTag = (tag) => {
      const param = new URLSearchParams(searchParams);
      param.delete("keyword");
      param.delete("page");
      param.set("tag", tag);
      router.push(`?${param.toString()}`);
      setActiveFilter(tag);
   };

   const handleFilterTag = (keyword) => {
      if (initailSelect.length === 0) return;
      const filtered = initailSelect.filter((item) => {
         if (keyWord === "") return item;
         if (lang === "en")
            return item.value_en.toLowerCase().includes(keyword.toLowerCase());
         if (lang === "ja")
            return item.value_ja.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilterSelect(filtered);
   };

   const handleChange = (e) => {
      const value = e.target.value;
      setKeyword(value); // Update state
      handleFilterTag(value); // Call the provided function
   };

   const handleSelectedTag = (keyword) => {
      const param = new URLSearchParams(searchParams);
      param.delete("page");
      param.set("keyword", keyword);
      router.push(`?${param.toString()}`);
      handleScrollToBodyElement();
   };
   return (
      <>
         <motion.div
            className="w-full md:w-[60%] flex"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
         >
            <div
               className="flex justify-end cursor-pointer border border-secondary flex-1 rounded-l-3xl"
               onClick={() => setOpen(!open)}
            >
               <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
                  <DropdownMenuTrigger className="w-full pr-1  ">
                     <div className="flex justify-center items-center  text-secondary gap-2 ">
                        <h6 className="font-medium ">{activeFilter}</h6>
                        <ChevronDown size={16} />
                     </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 md:w-52 max-h-44 overflow-auto bg-primary border-none ">
                     {loading ? (
                        <>
                           <DropdownMenuItem className="h-4 bg-secondary animate-pulse mb-2">
                              <Skeleton />
                           </DropdownMenuItem>
                           <DropdownMenuItem className="h-4 bg-secondary animate-pulse mb-2">
                              <Skeleton />
                           </DropdownMenuItem>
                           <DropdownMenuItem className="h-4 bg-secondary animate-pulse mb-2">
                              <Skeleton />
                           </DropdownMenuItem>
                        </>
                     ) : (
                        <>
                           {website.website &&
                              website.website.map((item, index) => (
                                 <DropdownMenuItem
                                    key={index}
                                    className="cursor-pointer mb-1 flex items-start gap-1 text-white"
                                    onClick={() => handleTag(item)}
                                 >
                                    &#8226;
                                    <div>
                                       <h6>{item}</h6>
                                    </div>
                                 </DropdownMenuItem>
                              ))}
                        </>
                     )}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <div className="md:w-[80%] w-[70%]  border border-secondary rounded-r-3xl flex md:p-2 p-1">
               <div className="flex justify-center p-2 cursor-pointer text-white  rounded-full bg-secondary bg-opacity-50 items-center">
                  <Search />
               </div>
               <input
                  className="rounded-lg w-full focus:outline-none p-1 flex-1 items-center justify-center  bg-transparent text-secondary ml-2"
                  type="text"
                  placeholder={placeholderText}
                  onChange={handleChange}
                  value={keyWord}
                  onFocus={() => setOpenTag(true)}
               />
               {openTag && (
                  <div
                     className="absolute 
                  w-[47%] mt-14 max-h-40 
                  bg-primary rounded-2xl
                  p-2 
                  z-10
                  "
                  >
                     {" "}
                     <div
                        className="flex justify-end w-full text-white cursor-pointer"
                        onClick={() => setOpenTag(false)}
                     >
                        <SquareX className="right-0" />
                     </div>
                     {loading ? (
                        <div className="flex felx-wrap gap-2">
                           <Skeleton className="w-20 h-5 rounded-xl" />
                           <Skeleton className="w-20 h-5 rounded-xl" />
                           <Skeleton className="w-20 h-5 rounded-xl" />
                           <Skeleton className="w-20 h-5 rounded-xl" />
                           <Skeleton className="w-20 h-5 rounded-xl" />
                        </div>
                     ) : (
                        <div className="w-full max-h-28 overflow-auto scrollbar-hide ">
                           {filterSelect.length > 0 ? (
                              <div
                                 className=" w-fit 
                                             flex flex-wrap gap-2"
                              >
                                 {filterSelect.map((item, index) => (
                                    <h6
                                       key={index}
                                       className="bg-secondary text-white rounded-xl 
                                                   px-2 py-1 
                                                   cursor-pointer"
                                       onClick={() => {
                                          handleSelectedTag(item.name),
                                             setOpenTag(false);
                                       }}
                                    >
                                       {item.value_en}
                                    </h6>
                                 ))}
                              </div>
                           ) : (
                              <div className="bg-primary  w-fit px-2 py-1 text-secondary rounded-xl">
                                 <h6>Not Found</h6>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               )}
            </div>
         </motion.div>
      </>
   );
};

export default InputSearch;
