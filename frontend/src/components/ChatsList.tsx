// import React from 'react'
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";
export default function ChatsList() {
  const {
    chats,
    isUsersLoading,
    setSelectedUser,
    // getAllChats,

    getMyChatPartners,
  } = useChatStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return (
    <>
      {chats.map((chat, idx) => (
        <div
          key={chat._id}
          className="p-4 transition-colors rounded-lg cursor-pointer bg-cyan-500/10 hover:bg-cyan-500/20"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET*/}
            <div className={`avatar online`}>
              <div className="rounded-full size-12">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
              <h4 className="font-medium truncate text-slate-200">
                {chat.fullName}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
