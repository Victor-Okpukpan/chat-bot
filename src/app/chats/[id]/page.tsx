import ChatPrompt from "@/components/ChatPrompt";
import ChatSection from "@/components/ChatSection";

type Props = {
  params: { id: string };
};
export default function ChatsPage({ params: { id } }: Props) {
  
  return (
    <div className="flex flex-col gap-2 h-screen overflow-hidden">
      <ChatSection chatId={id} />
      <ChatPrompt chatId={id} />
    </div>
  );
}
