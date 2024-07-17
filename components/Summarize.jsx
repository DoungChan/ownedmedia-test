'use client';
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import TypingAnimation from "./TypingAnimation";
import { Skeleton } from "./ui/skeleton";

const Summarize = ({ contentUrl }) => {
   const [data, setData] = useState("");
   const [lang, setLang] = useState("english");
   const [loading, setLoading] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
   // animation
   // const handleAnimation = () => {
   //    const end = Date.now() + 3 * 1000; // 3 seconds
   //    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

   //    const frame = () => {
   //       if (Date.now() > end) return;

   //       confetti({
   //          particleCount: 2,
   //          angle: 60,
   //          spread: 55,
   //          startVelocity: 60,
   //          origin: { x: 0, y: 0.5 },
   //          colors: colors,
   //       });
   //       confetti({
   //          particleCount: 2,
   //          angle: 120,
   //          spread: 55,
   //          startVelocity: 60,
   //          origin: { x: 1, y: 0.5 },
   //          colors: colors,
   //       });

   //       requestAnimationFrame(frame);
   //    };

   //    frame();
   // };
   useEffect(() => {
      setLoading(true);
      // handleAnimation();
      fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/media/dev_to/summary?article_url=${contentUrl.contentUrl}&lan=${lang}`,
         {
            method: "GET",

            cache: "no-store",
         }
      )
         .then(async (res) => {
            if (!res.ok) {
               throw new Error("Failed to fetch article");
            }
            setData(await res.json());
            setLoading(false);
         })
         .catch((err) => {
            setOpenDialog(true);
            setLoading(false);
         });
   }, []);

   return (
      <div>
         {/* <Markdown className="content">{data.summary}</Markdown> */}
         {loading ? (
            <>
               <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-[20px] rounded-full" />
                  <Skeleton className="w-full h-[20px] rounded-full" />
                  <Skeleton className="w-full h-[20px] rounded-full" />
                  <Skeleton className="w-full h-[20px] rounded-full" />
                  <Skeleton className="w-full h-[20px] rounded-full" />
                  <Skeleton className="w-full h-[20px] rounded-full" />
               </div>
            </>
         ) : data ? (
            <>
               <TypingAnimation text={data.summary} />
            </>
         ) : (
            <> Token Expired</>
         )}
      </div>
   );
};

export default Summarize;
