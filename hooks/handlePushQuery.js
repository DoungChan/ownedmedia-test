import { useRouter, useSearchParams } from "next/navigation";
import { handleScrollToBodyElement } from "./handleScrollToBodyElement";

export const useHandlePushQuery = () => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handlePushQuery = (key, query) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, query);
      router.replace(`?${params.toString()}`, undefined, { shallow: true });

      handleScrollToBodyElement();
   };

   return handlePushQuery;
};
