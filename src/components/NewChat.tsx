"use client"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "../../firebase";

export default function NewChat() {
  const { data: session } = useSession();
  const router = useRouter()

  const createNewChat = async () => {
    const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    })

    router.push(`/chats/${doc.id}`)
  }
  return (
    <button onClick={createNewChat} className="border border-gray-700 w-full chatRow">
      <AiOutlinePlus className="w-4 h-4" />
      <p>New Chat</p>
    </button>
  );
}
