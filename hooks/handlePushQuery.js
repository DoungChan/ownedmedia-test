import { useRouter } from "next/navigation";

export const useHandlePushQuery = () => {
   const router = useRouter();

   const handlePushQuery = (key, query) => {
      const params = new URLSearchParams();
      params.set(key, query);
      router.replace(`?${params.toString()}`);
   };

   return handlePushQuery;
};
