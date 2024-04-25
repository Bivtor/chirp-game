import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header/header";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Chirp Game",
  description: "Chirp Away!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="sm:px-5 md:px-8 lg:px-12 xl:px-16 2xl:px-24 w-screen h-screen ">
      <body className="flex flex-col h-full w-full">
        <Header />
        {children}
      </body>
    </html>
  );

}

export { metadata };