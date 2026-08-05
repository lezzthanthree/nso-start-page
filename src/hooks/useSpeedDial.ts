import localforage from "localforage";
import { create } from "zustand";
import { speedDialKey, speedDialSettingsKey } from "../data/Consts";

interface ISpeedDial {
    id: number;
    name: string;
    icon: string;
    color: string;
    url: string;
}

interface IGap {
    horizontal: number;
    vertical: number;
}

interface ISpeedDialState {
    speedDial: ISpeedDial[];
    settings: ISpeedDialSettings | null;
    initializeSpeedDial: () => Promise<void>;
    addSpeedDial: () => Promise<void>;
    editSpeedDial: (
        id: number,
        type: "name" | "icon" | "color" | "url",
        value: string,
    ) => Promise<void>;
    deleteSpeedDial: (id: number) => Promise<void>;
    editGreetingSettings: (
        message: string,
        type: "header" | "description",
    ) => Promise<void>;
    editGapSettings: (
        gap: number,
        type: "horizontal" | "vertical",
    ) => Promise<void>;
    default: () => Promise<void>;
}

interface ISpeedDialSettings {
    gap: IGap;
    header: string;
    description: string;
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

const defaultSpeedDialSettings: ISpeedDialSettings = {
    gap: {
        horizontal: 64,
        vertical: 8,
    },
    header: "Welcome back!",
    description: "Today's {day}, {date}, {time}.",
};

export const useSpeedDialState = create<ISpeedDialState>((set, get) => ({
    speedDial: [],
    settings: null,
    initializeSpeedDial: async () => {
        try {
            const savedSpeedDials =
                await localforage.getItem<ISpeedDial[]>(speedDialKey);
            const savedSpeedDialSettings =
                await localforage.getItem<ISpeedDialSettings>(
                    speedDialSettingsKey,
                );

            if (savedSpeedDials == null) {
                await localforage.setItem(speedDialKey, defaultSpeedDial);
                set({ speedDial: defaultSpeedDial });
            } else {
                set({ speedDial: savedSpeedDials });
            }

            if (savedSpeedDialSettings == null) {
                await localforage.setItem<ISpeedDialSettings>(
                    speedDialSettingsKey,
                    defaultSpeedDialSettings,
                );
                set({ settings: defaultSpeedDialSettings });
            } else {
                set({ settings: savedSpeedDialSettings });
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
    editGreetingSettings: async (
        message: string,
        type: "header" | "description",
    ) => {
        const currentSettings = get().settings ?? defaultSpeedDialSettings;
        const updated = {
            ...currentSettings,
            [type]: message,
        };
        set({ settings: updated });

        try {
            await localforage.setItem(speedDialSettingsKey, updated);
        } catch (error) {
            console.error("Failed to edit greeting settings:", error);
        }
    },
    editGapSettings: async (gap: number, type: "horizontal" | "vertical") => {
        const currentSettings = get().settings ?? defaultSpeedDialSettings;
        const updated: ISpeedDialSettings = {
            ...currentSettings,
            gap: {
                ...currentSettings.gap,
                [type]: gap,
            },
        };
        set({ settings: updated });

        try {
            await localforage.setItem(speedDialSettingsKey, updated);
        } catch (error) {
            console.error("Failed to edit gap settings:", error);
        }
    },
    default: async () => {
        await localforage.setItem(speedDialKey, defaultSpeedDial);
        set({ speedDial: defaultSpeedDial });
    },
}));
