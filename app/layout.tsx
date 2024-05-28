import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: {
      default: siteConfig.name,
      template: `%S | ${siteConfig.name}`,
   },
   description: siteConfig.description,
   icons: [
      {
         url: "icon",
         href: "/favicon.ico",
      },
   ],
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-br">
         <body className={inter.className}>{children}</body>
      </html>
   );
}
