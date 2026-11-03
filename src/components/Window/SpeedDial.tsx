import React, { useEffect } from "react";
import { Window } from "../UI/Window";
import { useWindowState } from "../../hooks/useWindowStates";
import Icon8Bit from "../UI/Icon8Bit";
import { useSpeedDialState } from "../../hooks/useSpeedDial";
import { useClock } from "../../hooks/useClock";
import { useGeneralSettingsState } from "../../hooks/useGeneralSettings";

const SpeedDialWindow: React.FC = () => {
    const { activeWindows, openWindow } = useWindowState();
    const { speedDial, settings } = useSpeedDialState();
    const { weekday, dateLong, timeLong } = useClock();
    const { hideSearchTip } = useGeneralSettingsState();

    useEffect(() => {
        const event = (events: KeyboardEvent) => {
            const key = events.key;
            if (!key.match(/^[\w\s\p{P}]$/u)) return;
            if (
                activeWindows.includes("search") ||
                activeWindows.includes("notepad") ||
                activeWindows.includes("settings") ||
                activeWindows.includes("calculator")
            )
                return;
            openWindow("search");
        };
        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [activeWindows]);

    if (!settings) return;

    return (
        <Window title="Speed Dial" id="speedDial">
            <div className="flex w-200 p-4   flex-col gap-4">
                <div id="intro">
                    <p className="font-nso-pressstart-2p text-4xl">
                        {settings?.header}
                    </p>
                    <p className="  text-2xl">
                        {settings?.description
                            .replace("{day}", weekday)
                            .replace("{date}", dateLong)
                            .replace("{time}", timeLong)}
                    </p>
                </div>
                <div id="apps" className="flex flex-col gap-1">
                    {speedDial.length > 0 ? (
                        <>
                            <p className="  text-xl">
                                What do you want to do today?
                            </p>
                            <div
                                className="flex flex-row justify-evenly flex-wrap"
                                style={{
                                    columnGap: `${settings?.gap.horizontal}px`,
                                    rowGap: `${settings?.gap.vertical}px`,
                                }}
                            >
                                {speedDial.map((item) => (
                                    <Icon8Bit
                                        execute
                                        icon={item.icon}
                                        color={item.color}
                                        name={item.name}
                                        action={() => {
                                            window.open(item.url, "_self");
                                        }}
                                        from="speed-dial"
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="p-4 flex justify-center items-center ">
                            <p className=" ">
                                There's nothing in your Speed Dial! You can add
                                by going to{" "}
                                <span
                                    onClick={() => {
                                        openWindow("settings");
                                    }}
                                    className="underline"
                                >
                                    Settings
                                </span>
                                .
                            </p>
                        </div>
                    )}
                </div>
                {hideSearchTip ? (
                    <div className="h-1" />
                ) : (
                    <div className="flex justify-center">
                        {activeWindows.includes("notepad") ? (
                            <p className=" ">
                                (Notepad is open! Automatic search is disabled.)
                            </p>
                        ) : activeWindows.includes("settings") ? (
                            <p className=" ">
                                (Settings is open! Automatic search is
                                disabled.)
                            </p>
                        ) : (
                            <p className=" ">
                                A search bar will automatically pop up for you
                                if you start typing!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </Window>
    );
};

export default SpeedDialWindow;
