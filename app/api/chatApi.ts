// api/chatAPI.ts
import { apiClient } from "./apiClient";
import { TMessage } from "../types/message";

// Fetch all messages
export const fetchMessages = async (): Promise<TMessage[]> => {
    return await apiClient("/messages/all", "GET");
};

// Fetch latest messages
export const fetchLatestMessages = async (): Promise<TMessage[]> => {
    return await apiClient("/messages/latest", "GET");
};

// Fetch older messages by reference UUID
export const fetchOlderMessages = async (refMessageUuid: string): Promise<TMessage[]> => {
    return await apiClient(`/messages/older/${refMessageUuid}`, "GET");
};

// Send a new message
export const sendMessage = async (text: string): Promise<TMessage> => {
    return await apiClient("/messages/new", "POST", { text });
};
