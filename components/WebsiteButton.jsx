"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
const WebsiteButton = ({ buttonText }) => {
  const router = useRouter();
  const { lang, website } = useParams();
  const pathname = usePathname();

  const handleButtonClick = () => {
    router.replace(`${buttonText}`);
  };

  return (
    <div>
      <button
        className={`flex gap-3  py-1 px-2 capitalize text-black `}
        onClick={handleButtonClick}
      >
        {buttonText.replace("_", " ")}
      </button>
      <div
        className={`${
          website === buttonText
            ? "bg-blue-500 h-0.5 w-full"
            : "bg-white text-black"
        }`}
      ></div>
    </div>
  );
};

export default WebsiteButton;
