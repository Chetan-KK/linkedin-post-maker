import type { Metadata } from "next";
import { Inter as FontSans, Poppins } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Linkedin Post Maker",
  description: "quick Linkedin post maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontPoppins.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
