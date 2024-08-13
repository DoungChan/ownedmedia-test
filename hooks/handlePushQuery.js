import { useRouter, useSearchParams } from "next/navigation";

export const useHandlePushQuery = () => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handlePushQuery = (key, query) => {
      const params = new URLSearchParams(searchParams);
      params.set(key, query);
      router.replace(`?${params.toString()}`, { shallow: true });

   };

   return handlePushQuery;
};
