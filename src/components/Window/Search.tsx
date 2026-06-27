import React, { useEffect, useRef } from "react";
import { Window } from "../Window";
import { useWindowState } from "../../hooks/useWindowStates";
import InputBox from "../InputBox";
import Button from "../Button";
import { useSearchState } from "../../hooks/useSearchState";

const SearchWindow: React.FC = () => {
    const { searchWindow, setSearchWindow } = useWindowState();
    const { search, setSearch, clear } = useSearchState();
    const inputBox = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const event = (events: KeyboardEvent) => {
            const key = events.key;
            switch (key) {
                case "Escape":
                    if (search) {
                        setSearch("");
                        break;
                    }
                    new Audio("snd/window_close.wav").play();
                    clear();
                    setSearchWindow(false);
                    break;
                case "Enter":
                    new Audio("snd/execute.wav").play();
                    break;
                default:
                    if (!key.match(/^[\w\s\p{P}]$/u)) break;
                    if (inputBox.current) {
                        inputBox.current.focus();
                    }
                    break;
            }
        };

        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [search]);

    return (
        <>
            {searchWindow && (
                <Window
                    title="Search"
                    id="search"
                    stateHandler={setSearchWindow}
                >
                    <div className="w-5xl flex flex-col justify-center gap-4">
                        <img
                            src="img/kangle.png"
                            alt=""
                            className="self-center w-75 mt-16"
                        />
                        <div className="flex flex-row gap-2 px-16 items-center">
                            <InputBox
                                placeholder="Search Kangle..."
                                onChange={setSearch}
                                value={search}
                                ref={inputBox}
                            />
                            <Button label="Search" />
                        </div>
                        <div className="flex flex-col justify-center items-center font-nso-dinkie-9px text-nso-purple ">
                            <p>Press ENTER to confirm</p>
                            <p>Press ESC to cancel</p>
                        </div>
                        <div className="h-20" />
                    </div>
                </Window>
            )}
        </>
    );
};

export default SearchWindow;
