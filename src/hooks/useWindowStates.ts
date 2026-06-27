import { create } from "zustand";

interface IWindowState {
    focusedWindow: string | null;
    setFocusedWindow: (window: string | null) => void;
    zCount: number;
    incrementZCount: () => void;
    activeWindows: string[];
    openWindow: (id: string) => void;
    closeWindow: (id: string) => void;
    containWindow: (id: string) => boolean;
}

export const useWindowState = create<IWindowState>((set, get) => ({
    focusedWindow: "speedDial",
    setFocusedWindow: (window) => set({ focusedWindow: window }),
    zCount: 0,
    incrementZCount: () => set((s) => ({ zCount: s.zCount + 1 })),
    activeWindows: ["speedDial"],
    openWindow: (id: string) => {
        set((s) => ({
            [`${id}Window`]: true,
            focusedWindow: id,
            zCount: s.zCount + 1,
            activeWindows: s.activeWindows.includes(id)
                ? s.activeWindows
                : [...s.activeWindows, id],
        }));
    },
    closeWindow: (id) =>
        set((s) => {
            return {
                activeWindows: s.activeWindows.filter(
                    (window) => window !== id,
                ),
            };
        }),
    containWindow: (id) => get().activeWindows.includes(id),
}));
