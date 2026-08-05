import React, { useEffect } from "react";
import { Window } from "../UI/Window";
import { useNotesState } from "../../hooks/useNotes";
import NoteMenu from "../Notepad/NoteMenu";
import Editor from "../Notepad/Editor";
import NotepadNotice from "../Notepad/NotepadNotice";
import { useAudioManager } from "../../hooks/useAudioManager";

const NotepadWindow: React.FC = () => {
    const { initializeNotepad, openedNote, closeNote } = useNotesState();
    const { playSound } = useAudioManager();

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
                    playSound("snd/window_close.wav");
                    break;
            }
        };
        document.addEventListener("keydown", event);

        return () => {
            document.removeEventListener("keydown", event);
        };
    }, [openedNote]);

    return (
        <Window
            title="Notepad"
            id="notepad"
            startingPosition="topLeft"
            x={150}
            y={50}
        >
            <NotepadNotice />
            <div className="w-lg h-150 p-4    ">
                {!openedNote ? <NoteMenu /> : <Editor />}
            </div>
        </Window>
    );
};

export default NotepadWindow;
