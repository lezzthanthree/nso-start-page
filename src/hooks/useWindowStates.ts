import { create } from "zustand";

interface IWindowState {
    focusedWindow: string | null;
    setFocusedWindow: (window: string | null) => void;
    zCount: number;
    incrementZCount: () => void;
    openWindow: (id: string) => void;

    speedDialWindow: boolean;
    setSpeedDialWindow: (state: boolean) => void;
    searchWindow: boolean;
    setSearchWindow: (state: boolean) => void;
}

export const useWindowState = create<IWindowState>((set) => ({
    focusedWindow: "speedDial",
    setFocusedWindow: (window) => set({ focusedWindow: window }),
    zCount: 0,
    incrementZCount: () => set((s) => ({ zCount: s.zCount + 1 })),
    openWindow: (id: string) => {
        set((state) => ({
            ...state,
            [`${id}Window`]: true,
            focusedWindow: id,
            zCount: state.zCount + 1,
        }));
    },
    speedDialWindow: true,
    setSpeedDialWindow: (state) => set({ speedDialWindow: state }),
    searchWindow: false,
    setSearchWindow: (state) => set({ searchWindow: state }),
}));
