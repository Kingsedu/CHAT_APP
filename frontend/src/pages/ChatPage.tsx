// import React from 'react'
import { useAuthUser } from "../store/useAuthStore";
export default function ChatPage() {
  const { logout } = useAuthUser();
  return (
    <div className="z-10">
      ChatPage
      <button className="btn" onClick={logout}>
        logout
      </button>
    </div>
  );
}
