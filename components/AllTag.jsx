"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, X } from "lucide-react";
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { fecthContent } from "@/service/action";
import { debounce } from "lodash";
const AllTag = ({ className }) => {
   const router = useRouter();
   const { lang, website } = useParams();
   const [input, setInput] = useState("");
   const inputRef = useRef(null);

   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [openSheet, setOpenSheet] = useState(false);
   useEffect(() => {
      const fetchTag = async () => {
         setLoading(true);
         const url = `${
            process.env.NEXT_PUBLIC_API_URL
         }/media/tag?media=all&limit=${116}&offset=0&q=${input}`;
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
      setOpenSheet(false);
      router.replace(`${tag}`);
   };

   // Debounce the search function to prevent many requests
   const debouncedSearch = useRef(
      debounce((value) => {
         setInput(value);
      }, 300) // Adjust the delay (in milliseconds) as needed
   ).current;

   return (
      <div className={className}>
         <div>
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
               <SheetTrigger className="">
                  <div className="text-primary text-xs px-4 text-nowrap ">
                     {lang === "ja" ? "全て見る" : "See All"}
                  </div>
               </SheetTrigger>

               <SheetContent side={"top"} className="h-screen overflow-auto">
                  <SheetHeader>
                     <SheetTitle>
                        {lang === "en" ? "All tags" : "すべてのタグ"}
                     </SheetTitle>
                     <hr className="border-t border-gray-200 my-2" />
                     <SheetDescription>
                        <div className="flex flex-col gap-8">
                           <div className="sm:w-[50%] w-full m-auto border rounded-3xl flex p-1">
                              <input
                                 ref={inputRef}
                                 className="rounded-lg md:w-auto focus:outline-none p-1 flex-1 items-center justify-center text-black text-sm ml-2"
                                 type="text"
                                 onChange={handleInputChange}
                                 placeholder={lang === "en" ? "Search" : "検索"}
                              />
                              {input && (
                                 <div className="w-fit h-9 flex justify-center items-center mx-3  ">
                                    <X
                                       className="size-5 cursor-pointer text-blue-500"
                                       onClick={handleClear}
                                    />
                                 </div>
                              )}

                              <Separator
                                 orientation="vertical"
                                 className="py-1"
                              />
                              <div className="flex justify-center  sm:p-2 mx-3 cursor-pointer rounded-full text-blue-500 items-center">
                                 <Search className="w-5 h-5" />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 h-full w-full md:w-[50%] m-auto overflow-auto mb-4">
                              {loading ? (
                                 <div className="absolute md:w-1/2 w-full flex justify-center">
                                    <p className="text-black">
                                       {lang === "en"
                                          ? "loading..."
                                          : "読み込み中..."}
                                    </p>
                                 </div>
                              ) : (
                                 <>
                                    {data?.tags.length === 0 ? (
                                       <div className="absolute md:w-1/2 w-full flex justify-center">
                                          <p className="text-black">
                                             {lang === "ja"
                                                ? "タグが見つかりませんでした"
                                                : "No tags found"}
                                          </p>
                                       </div>
                                    ) : (
                                       data?.tags.map((item, index) => (
                                          <button
                                             key={index}
                                             className="text-primary text-start text-sm py-0 px-4 rounded-full line-clamp-1"
                                             onClick={() =>
                                                handleClickTag(item.name)
                                             }
                                          >
                                             #{item.value_en}
                                          </button>
                                       ))
                                    )}
                                 </>
                              )}
                           </div>
                        </div>
                     </SheetDescription>
                  </SheetHeader>
               </SheetContent>
            </Sheet>
         </div>
      </div>
   );
};

export default AllTag;
