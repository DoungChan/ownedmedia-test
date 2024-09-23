import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { icons } from "lucide-react";
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
            <link rel="icon" href="/favicon.ico" />
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
