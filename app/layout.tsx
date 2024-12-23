import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskify",
  description: "Task management app built with Next.js + supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={poppins.className}>
      <body className='sticky top-0 bg-background text-foreground'>
        <Header />
        <main className='flex flex-col items-center'>{children}</main>
      </body>
    </html>
  );
}
