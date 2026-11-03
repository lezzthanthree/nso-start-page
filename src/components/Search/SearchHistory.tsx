import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useSearchState } from "../../hooks/useSearch";

interface SearchHistoryProps {
    query: string;
    value?: string;
    date?: Date;
    source?: "speedDial" | "history";
    selected?: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
    query,
    date,
    value,
    source = "history",
    selected,
}) => {
    const { setSearch, setTemporary } = useSearchState();

    return (
        <div
            className={`flex flex-row ${selected ? "bg-nso-dark-pink" : "bg-nso-gray"} border-nso-purple border-2 h-8 items-center px-2 flex-1 gap-4`}
            onClick={() => {
                setSearch(value ?? query);
                setTemporary("");
            }}
        >
            <p className="flex-1 overflow-x-hidden wrap">{query}</p>
            <p
                className={`${selected ? "text-nso-purple" : "text-nso-dark-pink"} text-sm`}
            >
                {source === "speedDial"
                    ? "Speed Dial"
                    : date
                      ? formatDistanceToNow(date, { addSuffix: true })
                      : ""}
            </p>
        </div>
    );
};

export default SearchHistory;
