"use server";
import InputSearch from "@/components/Input";
import TypingAnimation from "@/components/magicui/typing-animation";
import { getDictionary } from "./dictionaries";
import Categories from "@/components/Categories";
import BodyCard from "@/components/BodyCard";
import FloatButton from "@/components/FloatButoon";
import { ArrowUpFromLine, Languages } from "lucide-react";
import { FadeText } from "@/components/magicui/fade-text";
import Cover from "@/components/Cover";
import Navbar from "@/components/Navbar";
export default async function Home({ params: { lang } }) {
   const dict = await getDictionary(lang);
   return (
      <>
         <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden  px-24">
            <Navbar />
            <div className="w-full flex flex-col items-center relative">
               <div className="absolute">
                  <Cover />
               </div>
               <div className="flex flex-col gap-8 w-screen h-screen   items-center justify-center relative p-2">
                  <div className=" md:w-[40%] w-[70%] text-center flex flex-col gap-2">
                     <FadeText
                        className="w-[70%] md:text-5xl text-3xl font-bold text-white "
                        direction="up"
                        framerProps={{
                           show: { transition: { duration: 0.5, delay: 0.5 } },
                        }}
                        text={dict.title}
                     />

                     <FadeText
                        className="text-secondary text-opacity-50 sm:text-sm text-xs w-full !text-center mt-4 "
                        direction="up"
                        framerProps={{
                           show: { transition: { duration: 0.5, delay: 0.7 } },
                        }}
                        text={dict.des}
                     />
                  </div>
                  <InputSearch placeholderText={dict.placeholder} lang={lang} />
                  <Categories lang={lang} />
               </div>
            </div>
            <BodyCard lang={lang} />
            <FloatButton icon={<ArrowUpFromLine />} />
         </main>
      </>
   );
}
