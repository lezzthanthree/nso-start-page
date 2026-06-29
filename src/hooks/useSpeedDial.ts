import localforage from "localforage";
import { create } from "zustand";
import { speedDialKey } from "../data/Consts";

interface ISpeedDial {
    name: string;
    icon: string;
    color: string;
    url: string;
}

interface ISpeedDialState {
    speedDial: ISpeedDial[];
    initializeSpeedDial: () => Promise<void>;
}

export const useSpeedDialState = create<ISpeedDialState>((set) => ({
    speedDial: [
        {
            name: "Facebook",
            icon: "hn-facebook-square",
            color: "#0159ff",
            url: "https://facebook.com",
        },
        {
            name: "Twitter",
            icon: "hn-twitter",
            color: "#1c96e8",
            url: "https://twitter.com",
        },
        {
            name: "Reddit",
            icon: "hn-reddit",
            color: "#f74300",
            url: "https://reddit.com",
        },
        {
            name: "YouTube",
            icon: "hn-youtube",
            color: "#f60002",
            url: "https://youtube.com",
        },
        {
            name: "GitHub",
            icon: "hn-github",
            color: "#000000",
            url: "https://github.com",
        },
    ],
    initializeSpeedDial: async () => {
        try {
            const savedSpeedDials =
                await localforage.getItem<ISpeedDial[]>(speedDialKey);

            set({
                speedDial: savedSpeedDials || [],
            });
        } catch (error) {
            console.error("Failed to load speedDial:", error);
        }
    },
}));
