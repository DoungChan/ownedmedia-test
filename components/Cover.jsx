"use client";
import React from "react";
import { motion } from "framer-motion";
const Cover = () => {
   return (
      <motion.div
         initial={{ opacity: 0.7 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0, duration: 0.7 }}
         className={`w-screen h-screen flex justify-center items-center `}
      >
         <img
            src={process.env.NEXT_PUBLIC_COVER_IMAGE_URL}
            className="w-full h-full object-cover"
         />
      </motion.div>
   );
};

export default Cover;
