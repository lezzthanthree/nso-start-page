import React, { useEffect } from "react";
import { Window } from "../Window";
import { useWindowState } from "../../hooks/useWindowStates";
import { useClock } from "../../hooks/useClock";
import Icon8Bit from "../Icon8Bit";

const SpeedDialWindow: React.FC = () => {
    const { containWindow, openWindow, activeWindows } = useWindowState();
    const { complete } = useClock();

    useEffect(() => {
        const event = (events: KeyboardEvent) => {
            const key = events.key;
            if (!key.match(/^[\w\s\p{P}]$/u)) return;
            if (containWindow("search")) return;
            openWindow("search");
        };
        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [activeWindows]);

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
                    <div className="flex flex-row justify-around flex-wrap">
                        <Icon8Bit
                            execute
                            icon="hn-facebook-square"
                            color="text-[#0159ff]"
                            name="Facebook"
                            action={() => {
                                window.open("https://facebook.com", "_self");
                            }}
                        />
                        <Icon8Bit
                            execute
                            icon="hn-twitter"
                            color="text-[#1c96e8]"
                            name="Twitter"
                            action={() => {
                                window.open("https://twitter.com", "_self");
                            }}
                        />
                        <Icon8Bit
                            execute
                            icon="hn-reddit"
                            color="text-[#f74300]"
                            name="Reddit"
                            action={() => {
                                window.open("https://reddit.com", "_self");
                            }}
                        />
                        <Icon8Bit
                            execute
                            icon="hn-youtube"
                            color="text-[#f60002]"
                            name="YouTube"
                            action={() => {
                                window.open("https://youtube.com", "_self");
                            }}
                        />
                        <Icon8Bit
                            execute
                            icon="hn-github"
                            color="text-[#000000]"
                            name="GitHub"
                            action={() => {
                                window.open("https://github.com", "_self");
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <p className="font-nso-dinkie-9px">
                        ... or you can start typing. A search bar will
                        automatically pop up for you!
                    </p>
                </div>
            </div>
        </Window>
    );
};

export default SpeedDialWindow;
