import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, PersistOptions } from "zustand/middleware";
import { TParticipant } from "../types/participant";
import { apiClient } from "../api/apiClient"; // Import the generic API client

type ParticipantStore = {
    participants: TParticipant[];
    fetchParticipants: () => Promise<void>;
    getParticipant: (uuid: string) => TParticipant | undefined;
};

type ParticipantStorePersist = PersistOptions<ParticipantStore>;

export const useParticipantStore = create<ParticipantStore>()(
    persist(
        (set, get) => ({
            participants: [],

            // Fetch participants from the API
            fetchParticipants: async () => {
                try {
                    const participants: TParticipant[] = await apiClient("/participants/all", "GET");
                    console.log("fetxhcc", participants)
                    set({ participants });
                } catch (error) {
                    console.error("Error fetching participants:", error);
                }
            },

            // Get a participant by their UUID
            getParticipant: (uuid: string) => {
                const participants = get().participants;
                return participants.find((participant) => participant.uuid === uuid);
            },
        }),
        {
            name: "participant-store", // Key used in AsyncStorage
            getStorage: () => AsyncStorage,
        } as ParticipantStorePersist
    )
);
