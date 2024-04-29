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
    <html lang="en" className="w-screen h-screen">
      <body className="h-full w-full">
        <div className="h-1/6 ">
          <Header />
        </div>
        <div className="h-5/6">
          {children}
        </div>
      </body>
    </html>
  );

}

export { metadata };