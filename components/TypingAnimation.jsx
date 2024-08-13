"use client";

import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { cn } from "@/lib/utils";

export default function TypingAnimation({ text, duration = 20, className }) {
   const [displayedText, setDisplayedText] = useState("");
   const [i, setI] = useState(0);

   useEffect(() => {
      const typingEffect = setInterval(() => {
         if (i < text.length) {
            setDisplayedText(text.substring(0, i + 1));
            setI(i + 1);
         } else {
            clearInterval(typingEffect);
         }
      }, duration);

      return () => {
         clearInterval(typingEffect);
      };
   }, [duration, i]);

   return (
      <p
         className={cn(
            "font-display text-start text-sm  tracking-[-0.02em] drop-shadow-sm",
            className
         )}
      >
         <Markdown className="content">
            {displayedText ? displayedText : text}
         </Markdown>
      </p>
   );
}
