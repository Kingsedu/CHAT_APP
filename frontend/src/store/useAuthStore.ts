import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
interface AuthUser {
  fullName: string;
  email: string;
  password: string;
}
// interface AuthState {
//   authUser: AuthUser | null;
//   isLoading: boolean;
//   isLoggedIn: boolean;
//   login: () => void;
// }

interface UserAuth {
  authUserMain: object | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  checkAuth: () => void;
  signup: (data: AuthUser) => void;
}
interface DataProps {
  fullName: string;
  email: string;
  password: string;
}
// export const useAuthStore = create<AuthState>((set) => ({
//   authUser: { name: "john", _id: 123 },
//   isLoading: false,
//   isLoggedIn: false,
//   login: () => {
//     console.log("we just logged in");
//     set({ isLoggedIn: true });
//   },
// }));

export const useAuthUser = create<UserAuth>((set) => ({
  authUserMain: null,
  isCheckingAuth: true,
  isSigningUp: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUserMain: res.data });
    } catch (e) {
      console.log("Error in authCheck:", e);
      set({ authUserMain: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: DataProps) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUserMain: res.data });
      toast.success("Account created successfully");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message =
          e.response?.data?.message ||
          e.response?.data?.error ||
          "something went wrong. Try again";
        toast.error(message);
      } else {
        toast.error("unexpected error occured");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
