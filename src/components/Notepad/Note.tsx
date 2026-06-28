import React from "react";

interface NoteProps {
    title: string;
    content: string;
    timestamp: string;
}

const Note: React.FC<NoteProps> = ({ title, content, timestamp }) => {
    return (
        <div
            id="task"
            className="flex flex-col border-2 p-1 border-t-white border-l-white border-b-nso-purple border-r-nso-purple"
        >
            <p className="font-nso-pixelmplus-b text-nso-purple text-2xl truncate">
                {title}
            </p>
            <p className="font-nso-dinkie-9px text-nso-purple text-xl truncate">
                {content}
            </p>
            <p>{timestamp}</p>
        </div>
    );
};

export default Note;
