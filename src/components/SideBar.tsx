/* eslint-disable @next/next/no-img-element */
"use client"
import { useSession, signOut } from "next-auth/react"
import { useCollection } from 'react-firebase-hooks/firestore';
import NewChat from "./NewChat"
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

export default function SideBar() {
  const { data: session } = useSession();

  const [ chats, loading, error ] = useCollection(
    session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "desc"))
  )

  return (
    <div className="flex flex-col p-2 h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
          </div>
        </div>
      </div>

      {session && <img src={session.user?.image!} alt={session.user?.name!} className="mx-auto hover:opacity-50 cursor-pointer w-12 h-12 rounded-full" onClick={() => signOut()} />}
    </div>
  );
}
