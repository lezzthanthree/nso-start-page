import { useEffect } from "react";
import Desktop from "./components/UI/Desktop";
import Taskbar from "./components/UI/Taskbar";
import { useExperimentalState } from "./hooks/useExperimental";
import DeveloperModeBar from "./components/UI/DeveloperModeBar";
import MobileViewNotification from "./components/UI/MobileViewNotification";
import StartMenu from "./components/Taskbar/StartMenu";
import Effects from "./components/UI/Effects";
import { useGeneralSettingsState } from "./hooks/useGeneralSettings";
import { useSpeedDialState } from "./hooks/useSpeedDial";
import { useAudioManager } from "./hooks/useAudioManager";

function App() {
    const { initializeExperimental } = useExperimentalState();
    const { initializeSettings, audio } = useGeneralSettingsState();
    const { initializeSpeedDial } = useSpeedDialState();
    const { playSound } = useAudioManager();

    useEffect(() => {
        initializeExperimental();
        initializeSettings();
        initializeSpeedDial();

        const clickSounds = () => {
            playSound("snd/click.wav");
        };
        document.addEventListener("mousedown", clickSounds);

        return () => {
            document.removeEventListener("mousedown", clickSounds);
        };
    }, [audio]);

    return (
        <div className="w-screen h-screen bg-[url('/img/nso_bg_1080.png')] flex flex-col items-center justify-center relative overflow-hidden">
            <DeveloperModeBar />
            <MobileViewNotification />
            <Desktop />
            <Taskbar />
            <StartMenu />
            <Effects />
        </div>
    );
}

export default App;
