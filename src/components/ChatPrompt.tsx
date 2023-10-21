"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";

type Props = {
  chatId: string;
};

export default function ChatPrompt({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "gpt-3.5-turbo";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = prompt.trim();

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    setPrompt("");

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("The ChatBot is thinking..");

    await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    })
      .then(() => {
        toast.success("The ChatBot has responded!", {
          id: notification,
        });
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          id: notification,
        });
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <div className="flex bg-gray-700/50 text-gray-400 rounded-lg text-sm p-5 space-x-5">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
            type="text"
          />
          <button
            type="submit"
            disabled={!prompt}
            className="bg-[#11a37f] hover:opacity-50 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </div>
      </form>
    </>
  );
}
