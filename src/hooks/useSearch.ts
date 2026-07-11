import localforage from "localforage";
import { create } from "zustand";
import { searchListSettingsKey as searchListKey } from "../data/Consts";

interface ISearchHistory {
    query: string;
    date: Date;
}
interface ISearchState {
    search: string;
    searchHistoryList: ISearchHistory[];
    initializeSearchHistoryList: () => void;
    setSearch: (newString: string) => void;
    clear: () => void;
}


export const useSearchState = create<ISearchState>((set) => ({
    search: "",
    searchHistoryList: [
        {
            query: "Needy Streamer Overload",
            date: new Date()
        },
        {
            query: "Needy Streamer Overload",
            date: new Date()
        },
    ],
    initializeSearchHistoryList: async () => {
        try {
            const searchList =
                await localforage.getItem<ISearchHistory[]>(searchListKey);

            set({
                searchHistoryList: searchList || [],
            });
        } catch (error) {
            console.error("Failed to load searchList:", error);
        }
    },
    setSearch: (newString: string) => set({ search: newString }),
    clear: () => set({ search: "" }),
}));
