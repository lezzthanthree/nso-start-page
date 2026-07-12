import React from "react";
import { useNotesState } from "../../hooks/useNotes";
import Button from "../UI/Button";
import Separator from "./Separator";
import DetailedNote from "./DetailedNote";
import NoFiles from "./NoFiles";
import SimpleNote from "./SimpleNote";
import { useGeneralSettingsState } from "../../hooks/useGeneralSettings";

const NoteMenu: React.FC = () => {
    const { hour24 } = useGeneralSettingsState();

    const { notes, createNote, noteListView, setNoteListView } =
        useNotesState();

    return (
        <div id="file-menu" className="flex flex-col gap-2 h-full">
            <div
                id="file-action-buttons"
                className="flex flex-row justify-between"
            >
                <Button
                    label="Add new note"
                    icon="hn-plus-solid"
                    onClick={createNote}
                />
                <div className="flex flex-row">
                    <Button
                        label="Simple"
                        icon="hn-bars"
                        onClick={() => {
                            setNoteListView("simple");
                        }}
                    />
                    <Button
                        label="Detailed"
                        icon="hn-bars-solid"
                        onClick={() => {
                            setNoteListView("detailed");
                        }}
                    />
                </div>
            </div>
            <Separator />
            <div
                id="note-list"
                className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden"
            >
                {notes.length > 0 ? (
                    notes
                        .sort(
                            (a, b) =>
                                b.modifiedAt.valueOf() - a.modifiedAt.valueOf(),
                        )
                        .map((note) =>
                            noteListView == "simple" ? (
                                <SimpleNote
                                    id={note.id}
                                    title={note.title}
                                    timestamp={note.modifiedAt.toLocaleString(
                                        [],
                                        {
                                            hour12: !hour24,
                                        },
                                    )}
                                    key={note.id}
                                />
                            ) : (
                                <DetailedNote
                                    id={note.id}
                                    title={note.title}
                                    content={note.content}
                                    timestamp={note.modifiedAt.toLocaleString(
                                        [],
                                        {
                                            hour12: !hour24,
                                        },
                                    )}
                                    key={note.id}
                                />
                            ),
                        )
                ) : (
                    <NoFiles />
                )}
            </div>
        </div>
    );
};

export default NoteMenu;
