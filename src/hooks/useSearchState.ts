import { create } from "zustand";

interface ISearchState {
    search: string;
    setSearch: (newString: string) => void;
    clear: () => void;
}

export const useSearchState = create<ISearchState>((set) => ({
    search: "",
    setSearch: (newString: string) => set({ search: newString }),
    clear: () => set({ search: "" }),
}));
