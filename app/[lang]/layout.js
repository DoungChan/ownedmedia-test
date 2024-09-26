import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Teccadoor",
   description:
      " A door to undiscovered technical information for Japanese developers.",
};

export default function RootLayout({ params: { lang, website }, children }) {
   return (
      <html lang="ja">
         <head>
            <link rel="icon" href="/logo1.png" />
            <meta
               property="og:image"
               content="teccadoor.kirirom-digital.com/taccadoor.jpg"
            />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="viewport" content="width=device-width" />
            <meta
               name="viewport"
               content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
         </head>

         <body className={inter.className}>
            <div className="flex flex-col min-h-screen">
               <Navbar lang={lang} website={website} />
               <main className="flex-1">{children}</main>
            </div>
         </body>
      </html>
   );
}
