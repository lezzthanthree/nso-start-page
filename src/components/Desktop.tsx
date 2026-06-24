import React from "react";
import Icon from ".//Icon";
import { Window } from ".//Window";
import { useWindowState } from "../states/windowStates";

const Desktop: React.FC = () => {
    const { speedDialWindow, setSpeedDialWindow } = useWindowState();

    return (
        <div className="flex flex-1 w-full p-8 relative" id="desktop">
            <div
                id="icon-area"
                className="inset-8 flex absolute pointer-events-none"
            >
                <div className="flex flex-col gap-4 pointer-events-auto">
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
            </div>

            <div
                id="window-area"
                className="inset-0 flex absolute justify-center items-center pointer-events-none"
            >
                {speedDialWindow && (
                    <Window title="Test" stateHandler={setSpeedDialWindow}>
                        <div className="flex flex-row items-center justify-center flex-1 w-180">
                            Test
                        </div>
                    </Window>
                )}
            </div>
        </div>
    );
};

export default Desktop;
