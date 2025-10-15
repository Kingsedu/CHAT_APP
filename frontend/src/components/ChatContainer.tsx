import { useEffect } from "react";
import MessageInput from "./MessageInput";
import { useAuthUser } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessageLoadingSkeleton";

export default function ChatContainer() {
  const { selectedUser, getMessagesByUSerId, message, isMessagesLoading } =
    useChatStore();
  const { authUserMain } = useAuthUser();

  useEffect(() => {}, [selectedUser, getMessagesByUSerId]);
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {message.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {message.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUserMain._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUserMain?._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg?.image}
                      alt="shared"
                      className="object-cover h-48 rounded-lg"
                    />
                  )}
                  {msg?.text && <p className="mt-2">{msg?.text}</p>}
                  <p className="flex items-center gap-1 mt-1 text-xs opacity-75">
                    {new Date(msg?.createdAt).toISOString().slice(11, 16)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
}
