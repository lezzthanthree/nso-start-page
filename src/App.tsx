import { useEffect } from "react";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";
import { useExperimentalState } from "./hooks/useExperimental";
import DeveloperModeBar from "./components/DeveloperModeBar";

function App() {
    const { initializeExperimental } = useExperimentalState();

    useEffect(() => {
        initializeExperimental();
    }, []);

    return (
        <div className="w-screen h-screen bg-[url('/img/nso_bg_1080.png')] flex flex-col items-center justify-center relative overflow-hidden">
            <DeveloperModeBar />
            <div className="absolute w-full h-full bg-[#000000ee] z-9999999999999 lg:hidden flex flex-col justify-center items-center align-middle text-nso-white   text-2xl p-4">
                <p className="text-center">
                    This application doesn't fully support mobile yet.
                </p>
                <p className="text-center">
                    For best experience, set your new tab start page on desktop
                    instead.
                </p>
            </div>
            <Desktop />
            <Taskbar />
        </div>
    );
}

export default App;
