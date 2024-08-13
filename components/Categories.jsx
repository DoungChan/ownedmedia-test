"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useHandlePushQuery } from "@/hooks/handlePushQuery";
import { Skeleton } from "./ui/skeleton";
import { handleScrollToBodyElement } from "@/hooks/handleScrollToBodyElement";
const Categories = ({ lang }) => {
   const [active, setActive] = useState("");
   const [filterTag, setFilterTag] = useState([]);
   const router = useRouter();
   const searchParams = useSearchParams();
   const [loading, setLoading] = useState(false);
   const pushQuery = useHandlePushQuery();
   const tag = searchParams.get("tag");
   const fetchTag = async () => {
      
      setLoading(true);
      try {
         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/media/tag?media=${tag}&limit=10`,
            {
               method: "GET",
            }
         );
         const jsonData = await res.json();
         setFilterTag(jsonData);
      } catch (err) {
         console.log(err);
      }
      setLoading(false);
   };

   useEffect(() => {
      setFilterTag([]);
      fetchTag();
   }, [tag]);
   useEffect(() => {
      const tag = searchParams.get("keyword");
      if (tag) {
         setActive(tag);
      } else {
         setActive("");
      }
   }, [searchParams]);

   const handlecategories = (keyword) => {
      const param = new URLSearchParams(searchParams);
      param.delete("page");
      param.set("keyword", keyword);
      router.push(`?${param.toString()}`);
      handleScrollToBodyElement();
      setActive(keyword);
   };

   return (
      <div className="w-[80%] sm:w-[50%] flex flex-wrap items-center gap-2 justify-center my-4 cursor-pointer">
         {loading && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5, delay: 1.2 }}
               className="flex gap-3 flex-wrap items-center justify-center"
            >
               <Skeleton className="w-20 h-5 rounded-xl" />
               <Skeleton className="w-20 h-5 rounded-xl" />
               <Skeleton className="w-20 h-5 rounded-xl" />
               <Skeleton className="w-20 h-5 rounded-xl" />
               <Skeleton className="w-20 h-5 rounded-xl" />
            </motion.div>
         )}
         {filterTag.map((category, index) => (
            <motion.button
               key={index}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
               onClick={() => handlecategories(category.name)}
               className={`flex gap-1  py-1 px-3 rounded-xl text-white text-xs ${
                  active === filterTag.name
                     ? "bg-primary "
                     : "bg-secondary bg-opacity-50"
               }`}
            >
               <Tag size={14} />
               {lang === "en" ? category.value_en : category.value_ja}
            </motion.button>
         ))}
      </div>
   );
};

export default Categories;
