import { Window } from "./components/Window";

function App() {
    return (
        <div className="w-screen h-screen bg-[url('/img/nso_bg_1080.png')] flex flex-col items-center justify-center">
            <div className="flex flex-1 w-full" id="desktop">
                <Window title="Test">
                    <div className="flex flex-row items-center justify-center flex-1 w-180">
                        Test
                    </div>
                </Window>
            </div>
            <div className="h-4 w-full bg-amber-600" id="taskbar"></div>
        </div>
    );
}

export default App;
