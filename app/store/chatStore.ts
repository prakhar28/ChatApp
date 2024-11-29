import { create } from "zustand";
import { fetchMessages, sendMessage } from "@/app/api/chatApi";
import { TMessage } from "../types/message";

interface ChatState {
    messages: TMessage[];
    fetchMessages: () => Promise<void>;
    sendMessage: (text: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    fetchMessages: async () => {
        const data = await fetchMessages();
        console.log("data", data)
        set({ messages: data });
    },
    sendMessage: async (text) => {
        const newMessage = await sendMessage(text);
        set((state) => ({ messages: [newMessage, ...state.messages] }));
    },
}));
