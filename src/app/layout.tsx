import SideBar from "@/components/SideBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/providers/SessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from "@/components/Login";
import ClientProvider from "@/providers/ClientProvider";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatBot by Victor",
  description: "A NextJs, Tailwind, Typescript, and Firebase openAI chatbot created by The Frontend Oracle - Victor.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs md:min-w-[20rem] overflow-y-auto hidden md:block">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="bg-[#343541] flex-1">
                <MobileNav />
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
