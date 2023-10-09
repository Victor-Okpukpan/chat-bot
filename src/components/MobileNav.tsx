/* eslint-disable @next/next/no-img-element */
"use client";
import NewChat from "./NewChat";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import ChatRow from "./ChatRow";
import { db } from "../../firebase";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  return (
    <div className="p-2 md:hidden">
      <div className="flex space-x-3 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <AiOutlineMenuUnfold className="h-6 w-6 text-gray-300" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[400px] sm:w-[500px] p-10 bg-[#202123]"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col space-y-2">
                {loading && (
                  <div className="animate-pulse text-center text-white">
                    <p>Loading Chats...</p>
                  </div>
                )}
                {chats?.docs.map((chat) => (
                  <SheetClose key={chat.id} asChild>
                    <button type="button" className="w-full">
                      <ChatRow id={chat.id} />
                    </button>
                  </SheetClose>
                ))}
              </div>
              {session && (
                <img
                  src={session.user?.image!}
                  alt={session.user?.name!}
                  className="mx-auto hover:opacity-50 cursor-pointer w-12 h-12 rounded-full"
                  onClick={() => signOut()}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
        <NewChat />
      </div>
    </div>
  );
}
