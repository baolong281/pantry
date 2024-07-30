import "@/styles/globals.css";
import { DM_Sans } from "next/font/google";
import { Space_Mono } from "next/font/google";

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
import { SideNavigationBar } from "@/_components/dashboard";

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
        <main className="flex min-h-screen flex-col">
          <header className="flex justify-between gap-12 p-4 pb-0">
            <h1 className="scroll-m-20 pb-2 font-dmSans text-4xl font-extrabold tracking-tight lg:text-4xl">
              Pantry App
            </h1>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              github
            </h3>
          </header>
          <div className="flex h-full w-full">
            <SideNavigationBar />
            <main className="flex h-screen w-full flex-1 flex-grow flex-col">
              {children}
            </main>
          </div>
        </main>
      </body>
    </html>
  );
}
