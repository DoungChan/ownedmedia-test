"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const Categories = ({ categories }) => {
   const [active, setActive] = useState("");
   const router = useRouter();
   const searchParams = useSearchParams();
   const handleCategory = (category) => {
      router.push(`?filter=${category}`);
   };
   useEffect(() => {
      const keys = searchParams.keys();
      for (const key of keys) {
         if (key === "filter") {
            setActive(searchParams.get(key));
         } else {
            setActive("");
         }
         break;
      }
   }, [searchParams]);
   return (
      <div className="w-[50%] flex flex-wrap items-center gap-2 justify-center my-4 cursor-pointer">
         {categories.map((category, index) => (
            <button
               key={index}
               onClick={() => handleCategory(category.key)}
               className={`border border-blue-500 py-1 px-3 rounded-xl gap-2  text-xs ${
                  category.key === active
                     ? "bg-blue-500 text-white"
                     : "text-blue-500"
               }`}
            >
               {category.title}
            </button>
         ))}
      </div>
   );
};

export default Categories;
