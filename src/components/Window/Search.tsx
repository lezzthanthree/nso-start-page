import React, { useEffect, useRef } from "react";
import { Window } from "../UI/Window";
import { useWindowState } from "../../hooks/useWindowStates";
import InputBox from "../UI/InputBox";
import Button from "../UI/Button";
import { useSearchState } from "../../hooks/useSearch";
import SearchHistoryList from "../Search/SearchHistoryList";
import { useAudioManager } from "../../hooks/useAudioManager";

const SearchWindow: React.FC = () => {
    const { closeWindow } = useWindowState();
    const { playSound } = useAudioManager();

    const {
        search,
        setSearch,
        clear,
        initializeSearchHistoryList,
        addQuery,
        temporary,
        setTemporary,
    } = useSearchState();
    const inputBox = useRef<HTMLInputElement>(null);
    const toSearch = temporary.length == 0 ? search : temporary;

    const isURL =
        /^www\./i.test(toSearch) ||
        /^http:\/\//i.test(toSearch) ||
        /^https:\/\//i.test(toSearch) ||
        /\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,5}(?!\s)\b/.test(toSearch);

    const handleExecution = () => {
        playSound("snd/execute.wav");

        addQuery(toSearch);
        if (isURL) {
            let url = toSearch;
            if (!url.startsWith("http")) {
                url = "https://" + url;
            }
            window.open(url, "_self");
            return;
        }
        if (toSearch.length == 0) {
            window.open("https://www.google.com/search?q=Ame-chan", "_self");
            return;
        }
        window.open("https://www.google.com/search?q=" + toSearch, "_self");
    };

    useEffect(() => {
        const event = (events: KeyboardEvent) => {
            const key = events.key;
            switch (key) {
                case "Escape":
                    if (search) {
                        setSearch("");
                        setTemporary("");
                        break;
                    }
                    playSound("snd/window_close.wav");
                    clear();
                    closeWindow("search");
                    break;
                case "Enter":
                    if (temporary) {
                        setSearch(temporary);
                        setTemporary("");
                    }
                    handleExecution();
                    break;
                case "Backspace":
                    if (inputBox.current) {
                        inputBox.current.focus();
                    }
                    if (temporary) {
                        setSearch(temporary);
                        setTemporary("");
                    }
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    if (inputBox.current) {
                        inputBox.current.blur();
                    }
                    break;
                default:
                    if (!key.match(/^[\w\s\p{P}]$/u)) break;
                    if (inputBox.current) {
                        inputBox.current.focus();
                    }
                    if (temporary) {
                        setSearch(temporary);
                        setTemporary("");
                    }
                    break;
            }
        };

        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [search, temporary]);

    useEffect(() => {
        if (inputBox.current) {
            inputBox.current.focus();
        }

        initializeSearchHistoryList();
    }, []);

    return (
        <Window title="Search" id="search">
            <div className="w-5xl flex flex-col justify-center gap-4">
                <img
                    src="img/kangle.png"
                    alt=""
                    className="self-center w-75 mt-16"
                />
                <div className="relative px-16">
                    <div className="flex flex-row gap-2 items-center">
                        <InputBox
                            placeholder="Search Kangle..."
                            onChange={(newValue) => {
                                setSearch(newValue as string);
                            }}
                            value={temporary ? temporary : search}
                            ref={inputBox}
                        />
                        <Button
                            label={isURL ? "I'm Feeling DENPA!" : "Search"}
                            onClick={handleExecution}
                        />
                    </div>
                    <SearchHistoryList />
                </div>
                <div className="flex flex-col justify-center items-center">
                    {isURL && <p>Detected a URL!</p>}
                    <p>Press [ENTER] to {isURL ? "continue" : "search"}</p>
                    <p>
                        Press [ESC] to{" "}
                        {search.length == 0
                            ? "close window"
                            : "clear search bar"}
                    </p>
                </div>
                <div className="h-[10vh]" />
            </div>
        </Window>
    );
};

export default SearchWindow;
