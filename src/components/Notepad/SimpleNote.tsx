import React from "react";
import { useNotesState } from "../../hooks/useNotes";

interface SimpleNote {
    id: number;
    title: string;
    timestamp: string;
}

const SimpleNote: React.FC<SimpleNote> = ({ id, title, timestamp }) => {
    const { openNote } = useNotesState();

    return (
        <div
            id="task"
            className="flex flex-row justify-between border-b-2 p-1 border-b-nso-purple items-center"
            onClick={() => {
                openNote(id);
            }}
        >
            <p className="font-nso-dinkie-9px font-extrabold truncate">
                {title == "" ? "Untitled" : title}
            </p>
            <p className="shrink-0">{timestamp}</p>
        </div>
    );
};

export default SimpleNote;
