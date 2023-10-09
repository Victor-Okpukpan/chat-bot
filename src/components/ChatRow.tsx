import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { BsChatDots, BsTrash } from "react-icons/bs";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function ChatRow({ id }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <button
      onClick={() => router.push(`/chats/${id}`)}
      className={`chatRow w-full text-left ${
        pathName.includes(id) && "bg-gray-700/50"
      }`}
    >
      <BsChatDots className="w-5 h-5" />
      <p className="truncate flex-1">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <BsTrash
        onClick={deleteChat}
        className="w-5 h-5 text-gray-700 hover:text-red-700"
      />
    </button>
  );
}
