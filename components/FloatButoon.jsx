"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const FloatButton = ({ icon }) => {
   const [active, setActive] = useState(false);
   const handleScrollUp = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };
   //ativate bg when scroll
   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 100) {
            setActive(true);
         } else {
            setActive(false);
         }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);
   return (
      <>
         {" "}
         {active && (
            <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.1 }}
               className="fixed bottom-4 right-4 rounded-md duration-300 bg-primary text-white"
               onClick={handleScrollUp}
            >
               {" "}
               <div className=" p-2 flex rounded-md gap-2 items-center cursor-pointer">
                  {icon}
               </div>
            </motion.div>
         )}
      </>
   );
};

export default FloatButton;
