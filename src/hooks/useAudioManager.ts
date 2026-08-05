import { useCallback } from "react";
import { useGeneralSettingsState } from "./useGeneralSettings";

export const useAudioManager = () => {
    const { audio } = useGeneralSettingsState();

    const playSound = useCallback(
        (sound: string) => {
            if (!audio) return;

            new Audio(sound).play();
        },
        [audio],
    );

    return { playSound };
};
