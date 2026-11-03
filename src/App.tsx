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
import { defaultBackground } from "./data/Consts";
import BackgroundImage from "./components/UI/BackgroundImage";

function App() {
    const { initializeExperimental } = useExperimentalState();
    const {
        initializeSettings,
        audio,
        background,
        pixelateBackground,
        backgroundPixelSize,
    } = useGeneralSettingsState();
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
        <div
            className="isolate w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
        >
            <BackgroundImage
                src={background ?? defaultBackground}
                pixelSize={pixelateBackground ? backgroundPixelSize : 1}
            />
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
