import React from "react";
import Icon from ".//Icon";
import { useWindowState } from "../states/useWindowStates";
import SpeedDialWindow from "./Window/SpeedDial";

const Desktop: React.FC = () => {
    const { openWindow } = useWindowState();

    return (
        <div className="flex flex-1 w-full p-8 relative" id="desktop">
            <div
                id="icon-area"
                className="inset-8 flex absolute pointer-events-none overflow-hidden"
            >
                <div className="flex flex-col gap-4 pointer-events-auto flex-wrap">
                    <Icon
                        image="img/icons/tinder.png"
                        name="Speed Dial"
                        action={() => {
                            openWindow("speedDial");
                        }}
                    />
                    <Icon
                        image="img/icons/search.png"
                        name="Search"
                        action={() => {}}
                    />
                </div>
            </div>

            <div
                id="free-window-area"
                className="inset-0 flex absolute pointer-events-none"
            ></div>

            <div
                id="center-window-area"
                className="inset-0 flex absolute justify-center items-center pointer-events-none"
            >
                <SpeedDialWindow />
            </div>
        </div>
    );
};

export default Desktop;
