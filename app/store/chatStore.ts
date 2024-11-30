import { create } from "zustand";
import { fetchMessages, fetchOlderMessages, sendMessage } from "@/app/api/chatApi"; // Assume `fetchOlderMessages` is added
import { TMessage } from "../types/message";

interface ChatState {
    messages: TMessage[];
    loading: boolean;
    hasMore: boolean;
    fetchMessages: () => Promise<void>;
    fetchOlderMessages: () => Promise<void>;
    sendMessage: (text: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    loading: false,
    hasMore: true, // To track if older messages are available

    // Fetch the latest messages (initial load)
    fetchMessages: async () => {
        if (get().loading) return;

        set({ loading: true });

        try {
            const data = await fetchMessages(); // Fetch the latest messages
            set({ messages: data, hasMore: data.length > 0 }); // Reset messages
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            set({ loading: false });
        }
    },

    // Fetch older messages (pagination)
    fetchOlderMessages: async () => {
        if (get().loading || !get().hasMore) return; // Prevent multiple calls or fetch when no more data

        set({ loading: true });

        try {
            const messages = get().messages;
            const lastMessage = messages[messages.length - 1]; // Get the last message in the list
            const data = await fetchOlderMessages(lastMessage.uuid); // Fetch older messages using the last message's UUID

            if (data.length > 0) {
                set((state) => ({
                    messages: [...state.messages, ...data], // Append older messages
                }));
            } else {
                set({ hasMore: false }); // No more messages available
            }
        } catch (error) {
            console.error("Error fetching older messages:", error);
        } finally {
            set({ loading: false });
        }
    },

    // Send a new message
    sendMessage: async (text) => {
        try {
            const newMessage = await sendMessage(text);
            set((state) => ({ messages: [newMessage, ...state.messages] })); // Add new message at the top
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },
}));
