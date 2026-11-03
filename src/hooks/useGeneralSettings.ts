import localforage from "localforage";
import { create } from "zustand";

export type SearchEngine =
    | "google"
    | "duckduckgo"
    | "bing"
    | "yahoo"
    | "ecosia"
    | "brave";

export type BackgroundColorDepth = "default" | "4-bit" | "8-bit";

interface IGeneralSettingState {
    hour24: boolean;
    hideSearchTip: boolean;
    desktopIconTextBackground: boolean;
    audio: boolean;
    background: string | null;
    backgroundColorDepth: BackgroundColorDepth;
    pixelateBackground: boolean;
    backgroundPixelSize: number;
    searchEngine: SearchEngine;
    initializeSettings: () => Promise<void>;
    changeSettings: (
        type: string,
        state: boolean | number | BackgroundColorDepth,
    ) => Promise<void>;
    changeBackground: (background: string | null) => Promise<void>;
    changeSearchEngine: (searchEngine: SearchEngine) => Promise<void>;
}

export const useGeneralSettingsState = create<IGeneralSettingState>((set) => ({
    hour24: false,
    hideSearchTip: false,
    desktopIconTextBackground: false,
    audio: true,
    background: null,
    backgroundColorDepth: "default",
    pixelateBackground: false,
    backgroundPixelSize: 8,
    searchEngine: "google",
    initializeSettings: async () => {
        const storedColorDepth = await localforage.getItem<string>(
            "backgroundColorDepth",
        );
        set({
            hour24: (await localforage.getItem("hour24")) ?? false,
            hideSearchTip:
                (await localforage.getItem("hideSearchTip")) ?? false,
            desktopIconTextBackground:
                (await localforage.getItem<boolean>(
                    "desktopIconTextBackground",
                )) ?? false,
            audio: (await localforage.getItem("audio")) ?? true,
            background:
                (await localforage.getItem<string>("background")) ?? null,
            backgroundColorDepth:
                storedColorDepth === "4-bit" ||
                storedColorDepth === "8-bit"
                    ? storedColorDepth
                    : "default",
            pixelateBackground:
                (await localforage.getItem<boolean>("pixelateBackground")) ??
                false,
            backgroundPixelSize:
                (await localforage.getItem<number>("backgroundPixelSize")) ??
                8,
            searchEngine:
                (await localforage.getItem<SearchEngine>("searchEngine")) ??
                "google",
        });
    },
    changeSettings: async (type, state) => {
        await localforage.setItem(type, state);
        set({
            [type]: state,
        });
    },
    changeBackground: async (background) => {
        if (background === null) {
            await localforage.removeItem("background");
        } else {
            await localforage.setItem("background", background);
        }
        set({ background });
    },
    changeSearchEngine: async (searchEngine) => {
        await localforage.setItem("searchEngine", searchEngine);
        set({ searchEngine });
    },
}));
