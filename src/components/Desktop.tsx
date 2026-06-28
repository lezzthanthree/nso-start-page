import React, { useEffect } from "react";
import IconImage from "./IconImage";
import { useWindowState } from "../hooks/useWindowStates";
import SpeedDialWindow from "./Window/SpeedDial";
import SearchWindow from "./Window/Search";
import NotepadWindow from "./Window/Notepad";

const Desktop: React.FC = () => {
    const { activeWindows, openWindow } = useWindowState();

    useEffect(() => {
        document.addEventListener(
            "mousedown",
            () => {
                new Audio("snd/click.wav").play();
            },
            true,
        );
    }, []);

    return (
        <div className="flex flex-1 w-full p-8 relative" id="desktop">
            <div
                id="icon-area"
                className="inset-8 flex absolute pointer-events-none overflow-hidden"
            >
                <div className="flex flex-col gap-4 pointer-events-auto flex-wrap">
                    <IconImage
                        image="img/icons/tinder.png"
                        name="Speed Dial"
                        action={() => {
                            openWindow("speedDial");
                        }}
                    />
                    <IconImage
                        image="img/icons/search.png"
                        name="Search"
                        action={() => {
                            openWindow("search");
                        }}
                    />
                    <IconImage
                        image="img/icons/text.png"
                        name="Notepad"
                        action={() => {
                            openWindow("notepad");
                        }}
                    />
                </div>
            </div>

            <div
                id="free-window-area"
                className="inset-0 flex absolute pointer-events-none"
            >
                {activeWindows.includes("notepad") && <NotepadWindow />}
            </div>

            <div
                id="center-window-area"
                className="inset-0 flex absolute justify-center items-center pointer-events-none"
            >
                {activeWindows.includes("speedDial") && <SpeedDialWindow />}
                {activeWindows.includes("search") && <SearchWindow />}
            </div>
        </div>
    );
};

export default Desktop;
