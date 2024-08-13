"use client";
import React, { useEffect, useState } from "react";
import TypingAnimation from "./TypingAnimation";
import { Skeleton } from "./ui/skeleton";
import { useParams, useSearchParams } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
const Summarize = ({ contentUrl , lang}) => {
   const [data, setData] = useState("");
   const [loading, setLoading] = useState(false);
   const [isSpeaking, setIsSpeaking] = useState(false);
   const param = useParams();
   const searchParams = useSearchParams();
   const msg = new SpeechSynthesisUtterance();
   const speechHandler = (msg) => {
      msg.text = data.summary;
      msg.onend = () => {
         setIsSpeaking(false);
      };
      window.speechSynthesis.speak(msg);
   };
   const query = new URLSearchParams(searchParams);

   const handleSpeaking = (msg) => {
      if (isSpeaking) {
         window.speechSynthesis.cancel();
      } else {
         speechHandler(msg);
      }
   };
   useEffect(() => {
      setLoading(true);
      // handleAnimation();
      fetch(
         `${
            process.env.NEXT_PUBLIC_API_URL
         }/media/summary?article_url=${contentUrl}&lan=${
            param.lang
         }&media=${query.get("tag")}`,
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
               {/* <div className="flex justify-end">
                  <div
                     className="cursor-pointer p-2 rounded-lg bg-blue-500 border border-blue-500 w-fit"
                     onClick={() => {
                        setIsSpeaking(!isSpeaking);
                        handleSpeaking(msg);
                     }}
                  >
                     {isSpeaking ? (
                        <Volume2 className="text-white" size={14} />
                     ) : (
                        <VolumeX className="text-white" size={14} />
                     )}
                  </div>
               </div> */}
            </>
         ) : (
            <> {
               lang === "en" ? "Expired Token" : "期限切れのトークン"
            }</>
         )}
      </div>
   );
};

export default Summarize;
