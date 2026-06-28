import React from "react";
import { Window } from "../Window";
import Button from "../Button";
import Note from "../Notepad/Note";
import NoFiles from "../Notepad/NoFiles";
import Separator from "../Notepad/Separator";

const NotepadWindow: React.FC = () => {
    const notes = 1;

    return (
        <Window title="Notepad" id="notepad" x={150} y={50}>
            <div className="w-lg h-150 p-4 font-nso-dinkie-9px text-nso-purple">
                <div id="file-menu" className="flex flex-col gap-2 h-full">
                    <div id="file-action-buttons" className="flex flex-row">
                        <Button label="Add new note" icon="hn-plus-solid" />
                    </div>
                    <Separator />
                    <div
                        id="file-list"
                        className="flex-1 flex flex-col gap-1 overflow-scroll"
                    >
                        {notes ? (
                            <>
                                <Note
                                    title="Test"
                                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                                    timestamp="aslkdmsa"
                                />
                            </>
                        ) : (
                            <NoFiles />
                        )}
                    </div>
                </div>
                <div id="editor"></div>
            </div>
        </Window>
    );
};

export default NotepadWindow;
