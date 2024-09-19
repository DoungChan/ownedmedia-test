"use client";
import React from "react";
import TypingAnimation from "./TypingAnimation";

const Summarize = ({ summary }) => {

   return (
      <div>
         <>
            <div className="flex justify-between"></div>
            <TypingAnimation text={summary.content ?? "something wrong"} />
         </>
      </div>
   );
};

export default Summarize;
