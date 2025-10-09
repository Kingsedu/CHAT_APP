// import React from 'react'
// import React from 'react'
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UserLoadingSkeleton";

export default function ContactList() {
  const { allContacts, isUsersLoading, setSelectedUser, getAllContacts } =
    useChatStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;
  return (
    <>
      {allContacts.map((contact, idx) => (
        <div
          key={contact.id || contact._id}
          className="p-4 transition-colors rounded-lg cursor-pointer bg-cyan-500/10 hover:bg-cyan-500/20"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET*/}
            <div className={`avatar online`}>
              <div className="rounded-full size-12">
                <img
                  src={contact?.profilePic || "/avatar.png"}
                  alt={contact?.fullName}
                />
              </div>
            </div>
            <h4 className="font-medium truncate text-slate-200">
              {contact?.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
