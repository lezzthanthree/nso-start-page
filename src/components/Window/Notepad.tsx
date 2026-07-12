import React, { useEffect } from "react";
import { Window } from "../UI/Window";
import { useNotesState } from "../../hooks/useNotes";
import NoteMenu from "../Notepad/NoteMenu";
import Editor from "../Notepad/Editor";
import NotepadNotice from "../Notepad/NotepadNotice";

const NotepadWindow: React.FC = () => {
    const { initializeNotepad, openedNote, closeNote } = useNotesState();

    useEffect(() => {
        initializeNotepad();
    }, []);

    useEffect(() => {
        const event = (events: KeyboardEvent) => {
            const key = events.key;
            switch (key) {
                case "Escape":
                    if (!openedNote) break;
                    closeNote();
                    new Audio("snd/window_close.wav").play();
                    break;
            }
        };
        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [openedNote]);

    return (
        <Window title="Notepad" id="notepad" startingPosition="topLeft">
            <NotepadNotice />
            <div className="w-lg h-150 p-4    ">
                {!openedNote ? <NoteMenu /> : <Editor />}
            </div>
        </Window>
    );
};

export default NotepadWindow;
