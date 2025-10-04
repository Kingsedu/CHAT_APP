import { create } from "zustand";

interface AuthUser {
  name: string;
  _id: number;
}
interface AuthState {
  authUser: AuthUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  authUser: { name: "john", _id: 123 },
  isLoading: false,
  isLoggedIn: false,
  login: () => {
    console.log("we just logged in");
    set({ isLoggedIn: true });
  },
}));
