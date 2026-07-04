import localforage from "localforage";
import { create } from "zustand";
import { speedDialKey } from "../data/Consts";

interface ISpeedDial {
    id: number;
    name: string;
    icon: string;
    color: string;
    url: string;
}

interface ISpeedDialState {
    speedDial: ISpeedDial[];
    initializeSpeedDial: () => Promise<void>;
    addSpeedDial: () => Promise<void>;
    editSpeedDial: (
        id: number,
        type: "name" | "icon" | "color" | "url",
        value: string,
    ) => Promise<void>;
    deleteSpeedDial: (id: number) => Promise<void>;
}

const defaultSpeedDial: ISpeedDial[] = [
    {
        id: 0,
        name: "Facebook",
        icon: "hn-facebook-square",
        color: "#0159ff",
        url: "https://facebook.com",
    },
    {
        id: 1,
        name: "Twitter",
        icon: "hn-twitter",
        color: "#1c96e8",
        url: "https://twitter.com",
    },
    {
        id: 2,
        name: "Reddit",
        icon: "hn-reddit",
        color: "#f74300",
        url: "https://reddit.com",
    },
    {
        id: 3,
        name: "YouTube",
        icon: "hn-youtube",
        color: "#f60002",
        url: "https://youtube.com",
    },
    {
        id: 4,
        name: "GitHub",
        icon: "hn-github",
        color: "#000000",
        url: "https://github.com",
    },
];

export const useSpeedDialState = create<ISpeedDialState>((set, get) => ({
    speedDial: [],
    initializeSpeedDial: async () => {
        try {
            const savedSpeedDials =
                await localforage.getItem<ISpeedDial[]>(speedDialKey);

            if (savedSpeedDials == null) {
                await localforage.setItem(speedDialKey, defaultSpeedDial);
                set({ speedDial: defaultSpeedDial });
            } else {
                set({ speedDial: savedSpeedDials });
            }
        } catch (error) {
            console.error("Failed to load speedDial:", error);
        }
    },
    addSpeedDial: async () => {
        try {
            const current =
                (await localforage.getItem<ISpeedDial[]>(speedDialKey)) ?? [];
            const nextId = current.length
                ? Math.max(...current.map((s) => s.id)) + 1
                : 0;
            const newSpeedDial: ISpeedDial = {
                id: nextId,
                name: "New Link",
                icon: "hn-link",
                color: "#000000",
                url: "https://",
            };
            const updated = [...current, newSpeedDial];
            await localforage.setItem(speedDialKey, updated);
            set({ speedDial: updated });
        } catch (error) {
            console.error("Failed to add speedDial:", error);
        }
    },
    editSpeedDial: async (
        id: number,
        type: "name" | "icon" | "color" | "url",
        value: string,
    ) => {
        const current = get().speedDial;
        const updated = current.map((s) =>
            s.id === id ? { ...s, [type]: value } : s,
        );
        set({ speedDial: updated });

        try {
            await localforage.setItem(speedDialKey, updated);
        } catch (error) {
            console.error("Failed to edit speedDial:", error);
        }
    },
    deleteSpeedDial: async (id: number) => {
        try {
            const current =
                (await localforage.getItem<ISpeedDial[]>(speedDialKey)) ?? [];
            const updated = current.filter((s) => s.id !== id);
            await localforage.setItem(speedDialKey, updated);
            set({ speedDial: updated });
        } catch (error) {
            console.error("Failed to delete speedDial:", error);
        }
    },
}));
