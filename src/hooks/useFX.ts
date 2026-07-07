import { create } from "zustand";

interface IFXState {
    restarting: boolean;
    setEffect: (effect: string, state: boolean) => void;
}

export const useFXState = create<IFXState>((set) => ({
    restarting: false,
    setEffect: (effect, state) => {
        set({ [effect]: state });
    },
}));
