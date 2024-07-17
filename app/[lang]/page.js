"use server";
import InputSearch from "@/components/Input";
import TypingAnimation from "@/components/magicui/typing-animation";
import { getDictionary } from "./dictionaries";
import Categories from "@/components/Categories";
import BodyCard from "@/components/bodyCard";
import FloatButton from "@/components/FloatButoon";
import { Languages } from "lucide-react";
export default async function Home({ params: { lang } }) {
   const dict = await getDictionary(lang);

   const categories = [
      {
         title: dict.menu.day,
         key: `day`,
      },
      {
         title: dict.menu.week,
         key: `week`,
      },
      {
         title: dict.menu.month,
         key: `month`,
      },
      {
         title: dict.menu.year,
         key: `year`,
      },
      {
         title: dict.menu.trending,
         key: `trending`,
      },
      {
         title: dict.menu.meme,
         key: `meme`,
      },
      {
         title: dict.menu.coding,
         key: `coding`,
      },
      {
         title: dict.menu.top,
         key: `top`,
      },
   ];
   return (
      <>
         <main className="flex min-w-screen min-h-screen flex-col items-center justify-between px-24 py-10">
            <div className="w-full flex flex-col items-center">
               <div className="my-10">
                  <TypingAnimation
                     className="text-4xl font-bold text-black dark:text-white"
                     text={dict.title}
                  />
               </div>
               <InputSearch />
               <Categories categories={categories} />
            </div>
            <BodyCard />
            <FloatButton/>
             
         
         </main>
      </>
   );
}
