import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
// interface SelectedUser {
//   selectedUser: object | null;
// }
interface ChatStore {
  allContacts: [];
  chats: [];
  message: string[];
  activeTab: string;
  selectedUser: object | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;
  setActiveTab: (tab: string) => void;
  setSelectedUser: (selectedUser: object) => void;
  getAllContacts: () => void;
  getMyChatPartners: () => void;
  toggleSound: () => void;
  getMessagesByUSerId: (userId: string) => void;
}
export const useChatStore = create<ChatStore>((set, get) => ({
  allContacts: [],
  chats: [],
  message: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",
  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    set({ isSoundEnabled: newValue });
    localStorage.setItem("isSoundEnableed", newValue.toString());
  },
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser: object) =>
    set({ selectedUser: selectedUser }),
  getAllContacts: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data.user ?? [] });
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
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message =
          e.response?.data?.message ||
          e.response?.data?.error ||
          "failed to upload chat";
        toast.error(message);
      } else {
        toast.error("unexpected error occured");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUSerId: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ message: res.data });
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
      set({ isMessagesLoading: false });
    }
  },
}));
