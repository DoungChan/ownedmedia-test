import Navbar from "@/components/navbar/Navbar";
import Tag from "@/components/Tag";
import WebsiteButton from "@/components/WebsiteButton";
import Menubar from "@/components/Menubar";
import BodyCard from "@/components/BodyCard";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Website = async () => {
   return (
      <div>
         <hr className="mb-5" />

         <div className="m-auto mt-10 w-fit max-w-[900px]">
            <div className="flex w-full gap-12 ">
               <div>
                  <BodyCard />
               </div>
               <div className="hidden md:block">
                  <Tag />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Website;
