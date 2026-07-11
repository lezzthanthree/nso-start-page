import React from "react";

interface SearchHistoryProps {
    query: string;
    date: Date;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ query, date }) => {
    return (
        <div className="flex flex-row bg-nso-gray border-nso-purple border-2 h-8 items-center px-2 flex-1 gap-4">
            <p className="flex-1 overflow-x-hidden wrap">{query}</p>
            <p className="text-nso-dark-pink text-sm">
                {date.toLocaleString()}
            </p>
        </div>
    );
};

export default SearchHistory;
