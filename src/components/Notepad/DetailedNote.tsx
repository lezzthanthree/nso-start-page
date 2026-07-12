import React from "react";
import { useNotesState } from "../../hooks/useNotes";

interface NoteProps {
    id: number;
    title: string;
    content: string;
    timestamp: string;
}

const DetailedNote: React.FC<NoteProps> = ({
    id,
    title,
    content,
    timestamp,
}) => {
    const { openNote } = useNotesState();

    return (
        <div
            id="task"
            className="flex flex-col border-2 p-1 border-t-white border-l-white border-b-nso-purple border-r-nso-purple"
            onClick={() => {
                openNote(id);
            }}
        >
            <p className="font-nso-dinkie-9px font-extrabold text-2xl truncate">
                {title == "" ? "Untitled" : title}
            </p>
            <p className="    text-xl truncate">{content}</p>
            <p>{timestamp}</p>
        </div>
    );
};

export default DetailedNote;
