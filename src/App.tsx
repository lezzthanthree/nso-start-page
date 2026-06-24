import Icon from "./components/Icon";
import Taskbar from "./components/Taskbar";
import { Window } from "./components/Window";
import { useWindowState } from "./states/windowStates";

function App() {
    const { speedDialWindow, setSpeedDialWindow } = useWindowState();

    return (
        <div className="w-screen h-screen bg-[url('/img/nso_bg_1080.png')] flex flex-col items-center justify-center">
            <div className="flex flex-1 w-full p-8" id="desktop">
                <div className="flex flex-col gap-4">
                    <Icon
                        image="img/icons/tinder.png"
                        name="Speed Dial"
                        action={() => {
                            setSpeedDialWindow(true);
                        }}
                    />
                    <Icon
                        image="img/icons/search.png"
                        name="Search"
                        action={() => {}}
                    />
                    <Icon
                        image="img/icons/youtube.png"
                        name="YouTube"
                        action={() => {
                            window.open("https://youtube.com", "_self");
                        }}
                        execute
                    />
                    <Icon
                        image="img/icons/twitter.png"
                        name="Twitter"
                        action={() => {
                            window.open("https://twitter.com", "_self");
                        }}
                        execute
                    />
                </div>

                {speedDialWindow && (
                    <Window title="Test" stateHandler={setSpeedDialWindow}>
                        <div className="flex flex-row items-center justify-center flex-1 w-180">
                            Test
                        </div>
                    </Window>
                )}
            </div>
            <Taskbar />
        </div>
    );
}

export default App;
