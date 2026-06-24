import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";

function App() {
    return (
        <div className="w-screen h-screen bg-[url('/img/nso_bg_1080.png')] flex flex-col items-center justify-center">
            <Desktop />
            <Taskbar />
        </div>
    );
}

export default App;
