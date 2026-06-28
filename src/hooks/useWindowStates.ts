import { create } from "zustand";

interface IWindowState {
    focusedWindow: string | null;
    setFocusedWindow: (window: string | null) => void;
    zCount: number;
    incrementZCount: () => void;
    activeWindows: string[];
    openWindow: (id: string) => void;
    closeWindow: (id: string) => void;
}

export const useWindowState = create<IWindowState>((set) => ({
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
            const newActiveWindows = s.activeWindows.filter(
                (window) => window !== id,
            );

            const focusDifferentWindow =
                s.focusedWindow === id
                    ? newActiveWindows[newActiveWindows.length - 1] || null
                    : s.focusedWindow;

            return {
                activeWindows: newActiveWindows,
                focusedWindow: focusDifferentWindow,
            };
        }),
}));
