import React, { useEffect } from "react";
import { Window } from "../Window";
import { useWindowState } from "../../hooks/useWindowStates";
import { useClock } from "../../hooks/useClock";
import Icon8Bit from "../Icon8Bit";
import { useSpeedDialState } from "../../hooks/useSpeedDial";

const SpeedDialWindow: React.FC = () => {
    const { activeWindows, openWindow } = useWindowState();
    const { speedDial, initializeSpeedDial } = useSpeedDialState();
    const { complete } = useClock();

    useEffect(() => {
        const event = (events: KeyboardEvent) => {
            const key = events.key;
            if (!key.match(/^[\w\s\p{P}]$/u)) return;
            if (
                activeWindows.includes("search") ||
                activeWindows.includes("notepad") ||
                activeWindows.includes("settings")
            )
                return;
            openWindow("search");
        };
        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [activeWindows]);

    useEffect(() => {
        initializeSpeedDial();
    }, []);

    return (
        <Window title="Speed Dial" id="speedDial">
            <div className="flex w-200 p-4 text-nso-purple flex-col gap-4">
                <div id="intro">
                    <p className="font-nso-pressstart-2p text-4xl">
                        Welcome back!
                    </p>
                    <p className="font-nso-dinkie-9px text-2xl">
                        Today is {complete}.
                    </p>
                </div>
                <div id="apps" className="flex flex-col gap-1">
                    <p className="font-nso-dinkie-9px text-xl">
                        What do you want to do today?
                    </p>
                    <div className="flex flex-row justify-evenly flex-wrap gap-x-16">
                        {speedDial.map((item) => (
                            <Icon8Bit
                                execute
                                icon={item.icon}
                                color={item.color}
                                name={item.name}
                                action={() => {
                                    window.open(item.url, "_self");
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    {activeWindows.includes("notepad") ? (
                        <p className="font-nso-dinkie-9px">
                            (Notepad is open! Automatic search is disabled.)
                        </p>
                    ) : activeWindows.includes("settings") ? (
                        <p className="font-nso-dinkie-9px">
                            (Settings is open! Automatic search is disabled.)
                        </p>
                    ) : (
                        <p className="font-nso-dinkie-9px">
                            ... or you can start typing. A search bar will
                            automatically pop up for you!
                        </p>
                    )}
                </div>
            </div>
        </Window>
    );
};

export default SpeedDialWindow;
