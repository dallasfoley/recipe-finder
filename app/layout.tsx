import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./ui/navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 min-h-screen`}
      >
        <NavBar authenticated={authenticated} />
        {children}
      </body>
    </html>
  );
}
