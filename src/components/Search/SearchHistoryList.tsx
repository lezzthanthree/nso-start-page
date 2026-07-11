import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchState } from "../../hooks/useSearch";
import SearchHistory from "./SearchHistory";
import { fuzzy } from "fast-fuzzy";

const SearchHistoryList: React.FC = () => {
    const { searchHistoryList, search: query, setSearch } = useSearchState();
    const deferredQuery = useDeferredValue(query);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevQuery, setPrevQuery] = useState(deferredQuery);

    if (deferredQuery !== prevQuery) {
        setPrevQuery(deferredQuery);
        setSelectedIndex(0);
    }

    const filteredSearch = useMemo(() => {
        if (deferredQuery.length == 0) return [];
        return searchHistoryList
            .filter((s) => {
                const confidence = fuzzy(deferredQuery, s.query);
                return confidence > 0.6;
            })
            .sort((a, b) => b.date.valueOf() - a.date.valueOf())
            .slice(0, 5);
    }, [deferredQuery, searchHistoryList]);

    useEffect(() => {
        const length = filteredSearch.length;
        if (length === 0) return;

        const event = (events: KeyboardEvent) => {
            const key = events.key;

            switch (key) {
                case "ArrowDown":
                    events.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % length);
                    break;
                case "ArrowUp":
                    events.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + length) % length);
                    break;
                case "Tab": {
                    events.preventDefault();
                    const currentlySelected = filteredSearch[selectedIndex];
                    if (currentlySelected) {
                        events.preventDefault();
                        setSearch(currentlySelected.query);
                    }
                    break;
                }
            }
        };

        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [filteredSearch.length, selectedIndex]);

    return (
        <div className="absolute flex flex-col inset-x-16 py-2">
            {filteredSearch.map((search, i) => (
                <SearchHistory
                    query={search.query}
                    date={search.date}
                    selected={selectedIndex == i}
                    key={i}
                />
            ))}
        </div>
    );
};

export default SearchHistoryList;
