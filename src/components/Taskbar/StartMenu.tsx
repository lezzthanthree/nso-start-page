import React, { useRef, useState } from "react";
import { useStartState } from "../../hooks/useStart";
import StartMenuOption from "./StartMenuOption";
import { useWindowState } from "../../hooks/useWindowStates";

const StartMenu: React.FC = () => {
    const { active } = useStartState();
    const ref = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(250);
    const { openWindow } = useWindowState();

    const handleImageLoad = () => {
        if (ref.current) {
            const elementHeight = ref.current.offsetHeight;
            setHeight(elementHeight);
        }
    };

    return (
        <div
            id="start-menu"
            className="absolute left-0 transition-all flex flex-row"
            style={{ bottom: active ? "50px" : `-${height}px` }}
            ref={ref}
        >
            <img src="img/sidebar_start_menu.png" onLoad={handleImageLoad} />
            <div id="start-menu-options" className="flex flex-col justify-end">
                <StartMenuOption
                    name="Get the game!"
                    action={() => {
                        window.open(
                            "https://whysoserious.jp/needy/en/",
                            "_blank",
                        );
                    }}
                />
                <StartMenuOption name="Soon..." disabled />
                <StartMenuOption name="Soon..." disabled />
                <StartMenuOption name="Credits" />
                <StartMenuOption
                    name="System Settings"
                    action={() => {
                        openWindow("settings");
                    }}
                />
                <StartMenuOption
                    name="Restart"
                    action={() => {
                        location.reload();
                    }}
                />
            </div>
        </div>
    );
};

export default StartMenu;
