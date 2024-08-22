"use client";
import React from "react";
import TypingAnimation from "./TypingAnimation";

const Summarize = ({ summary }) => {
   return (
      <div>
         <>
            <TypingAnimation text={summary ?? "something wrong"} />
         </>
      </div>
   );
};

export default Summarize;
