"use server";
export async function fecthContent(url) {
   try {
      const res = await fetch(`${url}`, {
         method: "GET", 
         headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY },
         cache: "no-store",
      });

      if (!res.ok) {
         throw new Error(
            `HTTP error! status: ${res.status} - ${res.statusText}`
         );
      }

      const jsonData = await res.json();
      return jsonData;
   } catch (error) {
      console.error("Error fetching content:", error);
      throw error;
   }
}
