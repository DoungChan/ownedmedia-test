import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Owned Media",
   description: "A plateform to catch up with the latest development news",
};

export default function RootLayout({ params: { lang, website }, children }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <div className="flex flex-col min-h-screen">
               <Navbar lang={lang} website={website} />
               <main className="flex-1">{children}</main>
            </div>
         </body>
      </html>
   );
}
