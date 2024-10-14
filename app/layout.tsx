import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./ui/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Find a recipe based on ingredients or title.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 min-h-screen`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
