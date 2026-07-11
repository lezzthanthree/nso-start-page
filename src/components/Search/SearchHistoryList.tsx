import React from "react";
import { useSearchState } from "../../hooks/useSearch";
import SearchHistory from "./SearchHistory";

const SearchHistoryList: React.FC = () => {
    const { searchHistoryList } = useSearchState();

    return (
        <div className="absolute flex flex-col inset-x-16 py-2">
            {searchHistoryList.map((search) => (
                <SearchHistory
                    query={search.query}
                    date={search.date}
                    key={search.date.valueOf()}
                />
            ))}
        </div>
    );
};

export default SearchHistoryList;
