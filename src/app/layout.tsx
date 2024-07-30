import "@/styles/globals.css";
import { DM_Sans } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { fileRouter } from "@/app/api/uploadthing/core";

const DMSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const SpaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

import { type Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Pantry",
  description: "A Pantry App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${DMSans.variable} ${SpaceMono.className} text-primary-foreground`}
    >
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <main className="flex min-h-screen flex-col">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
