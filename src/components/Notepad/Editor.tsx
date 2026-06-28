import React, { useState } from "react";
import { useNotesState } from "../../hooks/useNotes";
import Button from "../Button";
import NoteNotFound from "./NoteNotFound";

const Editor: React.FC = () => {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const {
        openedNote,
        closeNote,
        removeNote,
        editTitleNote,
        editContentNote,
    } = useNotesState();

    if (!openedNote) return <NoteNotFound />;

    return (
        <div id="editor" className="flex flex-col gap-2 h-full">
            <div className="flex flex-col">
                <input
                    className="flex flex-row gap-2 items-center font-nso-pixelmplus-b text-nso-purple text-4xl truncate"
                    value={openedNote.title}
                    onChange={(e) => {
                        const value = e.target.value;
                        editTitleNote(value);
                    }}
                />
                <p>{openedNote.modifiedAt.toLocaleString()}</p>
            </div>
            <textarea
                className="font-nso-dinkie-9px text-nso-purple text-xl resize-none flex-1"
                placeholder="Your note here..."
                onChange={(e) => {
                    const value = e.target.value;
                    editContentNote(value);
                }}
                value={openedNote.content}
            ></textarea>
            <div className="flex justify-between">
                <Button
                    label="Close"
                    icon="hn-arrow-left"
                    onClick={closeNote}
                />
                {!confirmation ? (
                    <div className="flex items-center">
                        <Button
                            label=""
                            icon="hn-trash-alt-solid"
                            onClick={() => {
                                setConfirmation(true);
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-row items-center gap-2">
                        <p>Are you sure? </p>
                        <Button
                            label=""
                            icon="hn-check"
                            onClick={() => {
                                removeNote(openedNote.id);
                            }}
                        />
                        <Button
                            label=""
                            icon="hn-times"
                            onClick={() => {
                                setConfirmation(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Editor;
