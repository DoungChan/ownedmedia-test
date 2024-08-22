"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useRouter, useParams } from "next/navigation";
const WebsiteButton = ({ buttonText }) => {
   const router = useRouter();
   const { lang, website } = useParams();
   const handleButtonClick = () => {
      router.replace(`${buttonText}`);
   };
   return (
      <div>
         <button
            className={`flex gap-3  py-1 px-2 rounded-e-full  text-sm md:px-4 md:text-lg justify-center items-center border border-primary ${
               website === buttonText
                  ? "bg-primary text-white duration-700"
                  : " text-primary"
            }`}
            onClick={handleButtonClick}
         >
            {buttonText}
            <ArrowRight size={24} />
         </button>
      </div>
   );
};

export default WebsiteButton;
