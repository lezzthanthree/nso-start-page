import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";

function App() {
    return (
        <div className="w-screen h-screen bg-[url('/img/nso_bg_1080.png')] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute w-full h-full bg-[#000000ee] z-9999999999999 lg:hidden flex flex-col justify-center items-center align-middle text-nso-white font-nso-dinkie-9px text-2xl p-4">
                <p className="text-center">This application doesn't fully support mobile yet.</p>
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
