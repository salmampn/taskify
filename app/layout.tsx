import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  // metadataBase: new URL("https://daily-todo-task.vercel.app/"),

  title: {
    template: "%s | Taskify",
    default: "Taskify",
  },
  authors: {
    name: "Salma Manda",
  },
  description:
    "Build dashboard with role managemanet using next.js and supabase.",
  openGraph: {
    title: "Taskify",
    description: "Build task management app with next.js and supabase ",
    // url: "https://daily-todo-task.vercel.app/",
    siteName: "Taskify",
    images: "/og.png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${poppins.className} antialiased dark:bg-[#09090B]`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <main className=''>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
