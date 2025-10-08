// import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import { useAuthUser } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";
export default function App() {
  // const { authUser, isLoading, login, isLoggedIn } = useAuthStore();
  const { checkAuth, isCheckingAuth, authUserMain } = useAuthUser();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUserMain);
  /* console.log(authUser, "auth user object");
  console.log(isLoading, "is loading");
  console.log(login, "login");
  console.log(isLoggedIn, "is logged in always"); */

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-slate-900">
      {/* Decorators - grid and glow shapes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route
          path="/"
          element={authUserMain ? <ChatPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUserMain ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUserMain ? <SignUp /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
