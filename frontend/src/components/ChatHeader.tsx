// import React from 'react'

import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);
  return (
    <div className="flex items-center justify-between border-b bg-slate-800/50 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.fullName}
            />
          </div>
        </div>
        {/* another dic */}
        <div>
          <h3 className="font-medium text-slate-200">
            {selectedUser?.fullName}
          </h3>
          <p className="text-sm text-slate-400">Online</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 transition-colors cursor-pointer text-slate-400 hover:text-slate-200" />
      </button>
    </div>
  );
}
