import { NextResponse } from "next/server";

let locales = ["en", "ja"];

function getLocale(request) {
   const preferredLocale = request.headers.get("Accept-Language");
   return locales.find((locale) => preferredLocale.includes(locale));
}

export function middleware(request) {
   const { pathname } = request.nextUrl;
   const pathnameHasLocale = locales.some(
      (locale) =>
         pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
   );

   if (pathnameHasLocale) return;

   const locale = getLocale(request);
   request.nextUrl.pathname = `/${locale}${pathname}/all`;
   // Add the query parameter
   return NextResponse.redirect(request.nextUrl);
}

export const config = {
   matcher: ["/((?!_next).*)"],
};
