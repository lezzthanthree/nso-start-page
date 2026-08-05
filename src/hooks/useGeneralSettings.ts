import localforage from "localforage";
import { create } from "zustand";

interface IGeneralSettingState {
    hour24: boolean;
    hideSearchTip: boolean;
    audio: boolean;
    initializeSettings: () => Promise<void>;
    changeSettings: (type: string, state: boolean) => Promise<void>;
}

export const useGeneralSettingsState = create<IGeneralSettingState>((set) => ({
    hour24: false,
    hideSearchTip: false,
    audio: true,
    initializeSettings: async () => {
        set({
            hour24: (await localforage.getItem("hour24")) ?? false,
            hideSearchTip:
                (await localforage.getItem("hideSearchTip")) ?? false,
            audio: (await localforage.getItem("audio")) ?? true,
        });
    },
    changeSettings: async (type, state) => {
        await localforage.setItem(type, state);
        set({
            [type]: state,
        });
    },
}));
