import React, { useEffect, useRef } from "react";
import { Window } from "../Window";
import { useWindowState } from "../../hooks/useWindowStates";
import InputBox from "../InputBox";
import Button from "../Button";
import { useSearchState } from "../../hooks/useSearch";
import SearchHistoryList from "../Search/SearchHistoryList";

const SearchWindow: React.FC = () => {
    const { closeWindow } = useWindowState();
    const { search, setSearch, clear, initializeSearchHistoryList, addQuery } =
        useSearchState();
    const inputBox = useRef<HTMLInputElement>(null);
    const isURL =
        /^www\./i.test(search) ||
        /^http:\/\//i.test(search) ||
        /^https:\/\//i.test(search) ||
        /\.[a-zA-Z]{2,5}\b/.test(search);

    const handleExecution = () => {
        new Audio("snd/execute.wav").play();
        addQuery(search);
        if (isURL) {
            let url = search;
            if (!url.startsWith("http")) {
                url = "https://" + url;
            }
            window.open(url, "_self");
            return;
        }
        if (search.length == 0) {
            window.open("https://www.google.com/search?q=Ame-chan", "_self");
            return;
        }
        window.open("https://www.google.com/search?q=" + search, "_self");
    };

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
                    closeWindow("search");
                    break;
                case "Enter":
                    handleExecution();
                    break;
                case "Backspace":
                    if (inputBox.current) {
                        inputBox.current.focus();
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
                    break;
            }
        };

        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [search]);

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
                            value={search}
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
                    <p>Press [TAB] to auto-complete</p>
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
