import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
interface AuthUser {
  fullName?: string;
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
  isLoggingIn: boolean;
  checkAuth: () => void;
  signup: (data: AuthUser) => void;
  login: (data: AuthUser) => void;
  logout: () => void;
  updateProfilePic?: (data: { profilePic: string }) => void;
}
interface DataProps {
  fullName?: string;
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
  isLoggingIn: false,
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
  login: async (data: DataProps) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUserMain: res.data });
      console.log("Login successful:", res.data);
      toast.success("Logged in successfully");
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
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUserMain: null });
      toast.success(res.data.message);
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
    }
  },
  async updateProfilePic(data) {
    try {
      const res = await axiosInstance.put("auth/update-profile", data);
      set({ authUserMain: res.data });
      console.log("profile updated successfully");
      toast.success("Profile picture updated successfully");
    } catch (e: unknown) {
      console.log("Error in updating profile pic:", e);
      toast.error("Failed to update profile picture");
    }
  },
}));

// GMTA@K0dax24%
