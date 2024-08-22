"use server";
export async function fecthContent(url) {
   console.log("fecthContent", url);
   
   const res = await fetch(`${url}`, {
      method: "GET",
      headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY },
      cache: "no-store",
   });
   const jsonData = await res.json();
   return jsonData;
}
