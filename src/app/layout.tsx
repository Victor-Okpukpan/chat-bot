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
  keywords: ["chatbot", "tailwind", "typescript", "firebase", "nextjs", "openai", "chatgpt", "clone"],
  authors: [{name: "The Frontend Oracle - Victor Okpukpan"}],
  openGraph: {
    title: 'ChatBot by Victor',
    description: 'A NextJs, Tailwind, Typescript, and Firebase openAI chatbot created by The Frontend Oracle - Victor.',
    url: 'https://chat-botgpt.vercel.app',
    siteName: 'chat-botgpt',
    images: [
      {
        url: 'https://links.papareact.com/89k',
        width: 800,
        height: 600,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: "/icon.svg"},new URL("/icon.svg", "https://links.papareact.com/89k")]
  }
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
