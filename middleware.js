import { NextResponse } from "next/server";

let locales = ["ja", "en"];
const PUBLIC_FILE = /\.(.*)$/;
export function middleware(request) {
   const { pathname } = request.nextUrl;

   const exactLocaleMatch = locales.some((locale) => pathname === `/${locale}`);

   if (exactLocaleMatch) {
      request.nextUrl.pathname = `${pathname}/all`;
      return NextResponse.redirect(request.nextUrl);
   }

   const pathnameHasLocale = locales.some(
      (locale) =>
         pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
   );

   if (
      request.nextUrl.pathname.startsWith("/_next") ||
      request.nextUrl.pathname.includes("/api/") ||
      PUBLIC_FILE.test(request.nextUrl.pathname)
   ) {
      return;
   }
   if (pathnameHasLocale) return;

   const locale = "ja";
   request.nextUrl.pathname = `/${locale}${pathname}/all`;
   // Add the query parameter
   return NextResponse.redirect(request.nextUrl);
}

export const config = {
   matcher: ["/((?!_next).*)"],
};
