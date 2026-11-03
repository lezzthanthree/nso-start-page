import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchState } from "../../hooks/useSearch";
import SearchHistory from "./SearchHistory";
import { fuzzy } from "fast-fuzzy";
import { useSpeedDialState } from "../../hooks/useSpeedDial";

interface ISearchSuggestion {
    id: string;
    query: string;
    value: string;
    date?: Date;
    source: "speedDial" | "history";
}

const SearchHistoryList: React.FC = () => {
    const {
        searchHistoryList,
        search: query,
        setSearch,
        setTemporary,
    } = useSearchState();
    const speedDial = useSpeedDialState((state) => state.speedDial);
    const deferredQuery = useDeferredValue(query);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevQuery, setPrevQuery] = useState(deferredQuery);

    if (deferredQuery !== prevQuery) {
        setPrevQuery(deferredQuery);
        setSelectedIndex(-1);
    }

    const filteredSearch = useMemo(() => {
        if (deferredQuery.length == 0) return [];
        const speedDialMatches: ISearchSuggestion[] = speedDial
            .filter((link) => fuzzy(deferredQuery, link.name) > 0.6)
            .map((link) => ({
                id: `speedDial-${link.id}`,
                query: link.name,
                value: link.url,
                source: "speedDial",
            }));
        const historyMatches: ISearchSuggestion[] = searchHistoryList
            .filter((s) => {
                const confidence = fuzzy(deferredQuery, s.query);
                return confidence > 0.6;
            })
            .sort((a, b) => b.date.valueOf() - a.date.valueOf())
            .map((item, index) => ({
                id: `history-${index}-${item.query}`,
                query: item.query,
                value: item.query,
                date: item.date,
                source: "history",
            }));
        return [...speedDialMatches, ...historyMatches].slice(0, 5);
    }, [deferredQuery, searchHistoryList, speedDial]);

    useEffect(() => {
        const length = filteredSearch.length;
        if (length === 0) return;

        const event = (events: KeyboardEvent) => {
            const key = events.key;

            switch (key) {
                case "ArrowDown": {
                    events.preventDefault();
                    const nextIndex = (selectedIndex + 1) % length;

                    setSelectedIndex(nextIndex);

                    const targetItem = filteredSearch[nextIndex];
                    if (targetItem) setTemporary(targetItem.value);
                    break;
                }
                case "ArrowUp": {
                    events.preventDefault();
                    const nextIndex = (selectedIndex - 1 + length) % length;

                    setSelectedIndex(nextIndex);

                    const targetItem = filteredSearch[nextIndex];
                    if (targetItem) setTemporary(targetItem.value);
                    break;
                }
                case "Tab": {
                    const currentlySelected = filteredSearch[selectedIndex];
                    if (currentlySelected) {
                        events.preventDefault();
                        setSearch(currentlySelected.value);
                        setTemporary("");
                        setSelectedIndex(-1);
                    }
                    break;
                }
            }
        };

        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [filteredSearch, selectedIndex, setTemporary, setSearch]);

    return (
        <div className="absolute flex flex-col inset-x-16 py-2">
            {filteredSearch.map((search, i) => (
                <SearchHistory
                    key={search.id}
                    query={search.query}
                    date={search.date}
                    value={search.value}
                    source={search.source}
                    selected={selectedIndex == i}
                />
            ))}
        </div>
    );
};

export default SearchHistoryList;
