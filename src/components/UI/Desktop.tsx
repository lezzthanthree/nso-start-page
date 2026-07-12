import React from "react";
import IconImage from "./IconImage";
import { useWindowState } from "../../hooks/useWindowStates";
import SpeedDialWindow from "../Window/SpeedDial";
import SearchWindow from "../Window/Search";
import NotepadWindow from "../Window/Notepad";
import SettingsWindow from "../Window/Settings";
import DeveloperWindow from "../Window/Developer";
import CreditsWindow from "../Window/Credits";

const Desktop: React.FC = () => {
    const { activeWindows, openWindow } = useWindowState();
    return (
        <div className="flex flex-1 w-full relative p-8" id="desktop">
            <div
                id="icon-area"
                className="flex absolute pointer-events-none overflow-hidden"
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

            <div id="free-window-area" className="pointer-events-none">
                {activeWindows.includes("speedDial") && <SpeedDialWindow />}
                {activeWindows.includes("search") && <SearchWindow />}
                {activeWindows.includes("notepad") && <NotepadWindow />}
                {activeWindows.includes("settings") && <SettingsWindow />}
                {activeWindows.includes("credits") && <CreditsWindow />}
                {activeWindows.includes("developer") && <DeveloperWindow />}
            </div>

            <div
                id="center-window-area"
                className="inset-0 flex absolute justify-center items-center pointer-events-none"
            ></div>
        </div>
    );
};

export default Desktop;
