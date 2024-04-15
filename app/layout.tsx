import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header/header";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Chirp Game",
  description: "Chirp Game Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="px-24 pb-10">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

export { metadata, RootLayout };