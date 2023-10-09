/* eslint-disable @next/next/no-img-element */
import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData;
}

export default function Message( { message }: Props) {
    const isChatgpt = message.user.name === "chatGpt";
    
  return (
    <div className={` text-white`}>
        <div className={`flex space-x-5 px-10 max-w-2xl rounded-md mx-auto py-5 ${isChatgpt && "bg-[#434654]"}`}>
            <img src={message.user.avatar} alt="Avatar" className="h-8 w-8" />
            <p className="pt-1 text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
    </div>
  )
}
