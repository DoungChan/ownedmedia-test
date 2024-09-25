import BodyCard from "@/components/BodyCard";
import FloatButton from "@/components/FloatButoon";
import { ArrowUpFromLine } from "lucide-react";
import Footer from "@/components/footer/Footer";

const Website = async () => {
   return (
      <div>
         <hr className="mb-5" />

         <div className="m-auto mt-10 sm:w-[70%] max-w-6xl 2xl:max-w-7xl  ">
            <BodyCard />
         </div>
         <Footer />
         <FloatButton icon={<ArrowUpFromLine />} />
      </div>
   );
};

export default Website;
