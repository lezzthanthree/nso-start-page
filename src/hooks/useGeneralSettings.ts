import localforage from "localforage";
import { create } from "zustand";

export type SearchEngine =
    | "google"
    | "duckduckgo"
    | "bing"
    | "yahoo"
    | "ecosia"
    | "brave";

interface IGeneralSettingState {
    hour24: boolean;
    hideSearchTip: boolean;
    audio: boolean;
    searchEngine: SearchEngine;
    initializeSettings: () => Promise<void>;
    changeSettings: (type: string, state: boolean) => Promise<void>;
    changeSearchEngine: (searchEngine: SearchEngine) => Promise<void>;
}

export const useGeneralSettingsState = create<IGeneralSettingState>((set) => ({
    hour24: false,
    hideSearchTip: false,
    audio: true,
    searchEngine: "google",
    initializeSettings: async () => {
        set({
            hour24: (await localforage.getItem("hour24")) ?? false,
            hideSearchTip:
                (await localforage.getItem("hideSearchTip")) ?? false,
            audio: (await localforage.getItem("audio")) ?? true,
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
    changeSearchEngine: async (searchEngine) => {
        await localforage.setItem("searchEngine", searchEngine);
        set({ searchEngine });
    },
}));
