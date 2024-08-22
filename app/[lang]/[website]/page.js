import Navbar from "@/components/navbar/Navbar";
import Tag from "@/components/Tag";
import WebsiteButton from "@/components/WebsiteButton";
import Menubar from "@/components/Menubar";
import React from "react";
import BodyCard from "@/components/BodyCard";

const Website = async () => {
   //fetch website data
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website`, {
      method: "GET",
      headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY },
      cache: "force-cache",
   });
   const websites = await res.json();

   return (
      <div>
         <Navbar />
         <div
            className="flex flex-col items-start gap-4
                        pt-20 px-2 md:px-32
                        h-screen w-screen  overflow-x-hidden"
         >
            <div
               className=" flex justify-between 
                            w-full"
            >
               <div
                  className="flex gap-4  
                            md:w-[400px] lg:w-[600px] 
                            overflow-x-auto scrollbar-hide
                            rounded-e-full"
               >
                  {websites.website.map((item, index) => {
                     return <WebsiteButton key={index} buttonText={item} />;
                  })}
               </div>
               <WebsiteButton buttonText="all" />
            </div>
            {/* <Menubar
               className="md:hidden flex flex-col gap-4 
                 w-fit
                 bg-slate-600 text-white
                 py-1 px-5 ml-1
                 rounded-e-full
                 cursor-pointer"
               size={20}
            /> */}
            <div className="flex w-full gap-0 sm:gap-4 ">
               <div>
                  <Tag />
               </div>

               <div>
                  <BodyCard />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Website;
