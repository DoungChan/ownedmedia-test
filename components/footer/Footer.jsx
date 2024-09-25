"use client";
import { Facebook, Twitter } from "lucide-react";
import React from "react";
import { handleOpenLink } from "@/utils/handleOpenLink";
import { useParams } from "next/navigation";
const Footer = () => {
   const { lang } = useParams();
   return (
      <footer className="bg-primary  p-2 md:px-32  pt-10 min-h-60">
         <div className="flex flex-col md:flex-row justify-between gap-10 ">
            <div className="flex flex-col gap-14 justify-between">
               <div>
                  <h1 className="text-2xl text-white">Teccadoor</h1>
                  <p className="text-white">
                     {lang === "en"
                        ? "  © 2024 - Teccadoor Powered by Kirirom Digital."
                        : " 日本人のための知られざる技術情報への扉開発者。"}
                  </p>
               </div>
               <div>
                  <p className="text-white ">
                     {lang === "en"
                        ? "  © 2024 - Teccadoor Powered by Kirirom Digital."
                        : "  © 2024 - Teccadoor 搭載 Kirirom Digital."}
                  </p>
                  <div className="flex gap-4 mt-2">
                     <Facebook
                        className="text-white cursor-pointer"
                        size={20}
                        onClick={handleOpenLink(
                           "https://www.facebook.com/kiriromdigital"
                        )}
                     />
                     <Twitter
                        className="text-white cursor-pointer"
                        size={20}
                        onClick={handleOpenLink("https://x.com/kiriromdigital")}
                     />
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap justify-start md:justify-around text-white gap-4">
               <div className="flex flex-col gap-4">
                  <h6 className="text-white">
                     <a
                        href="https://www.kirirom-digital.com/"
                        target="_blank"
                        className="text-white font-semibold hover:underline no-underline"
                     >
                        {lang === "en" ? "Company" : "ホーム"}
                     </a>
                  </h6>
                  <h6 className="text-white">
                     <a
                        href="https://www.kirirom-digital.com/about-us"
                        target="_blank"
                        className="text-white font-semibold hover:underline no-underline"
                     >
                        {lang === "en" ? "About us" : "会社情報"}
                     </a>
                  </h6>
                  <h6 className="text-white">
                     <a
                        href="https://www.kirirom-digital.com/recruitment"
                        target="_blank"
                        className="text-white font-semibold hover:underline no-underline"
                     >
                        {lang === "en" ? "Careers" : "採用情報"}
                     </a>
                  </h6>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
