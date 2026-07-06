import { create } from "zustand";

interface IStartState {
    active: boolean;
    setActive: (state: boolean) => void;
}

export const useStartState = create<IStartState>((set) => ({
    active: false,
    setActive: (state) => {
        set({ active: state });
    },
}));
