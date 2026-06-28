import React from "react";
import { Window } from "../Window";
import Button from "../Button";
import Note from "../Notepad/Note";

const NotepadWindow: React.FC = () => {
    const notes = 0;

    return (
        <Window title="Notepad" id="notepad" x={150} y={50}>
            <div className="w-lg h-150 p-4 font-nso-dinkie-9px text-nso-purple relative">
                <div id="file-menu" className="flex flex-col gap-2 h-full">
                    <div id="file-action-buttons" className="flex flex-row">
                        <Button label="Add new note" icon="hn-plus-solid" />
                    </div>
                    <div
                        id="separator"
                        className="h-1 w-full bg-nso-light-purple border-2 border-t-white border-l-white border-b-nso-purple border-r-nso-purple gap-2"
                    ></div>
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
                            <div
                                id="no-files"
                                className="flex-1 flex flex-col justify-center items-center "
                            >
                                <i className="hn hn-info-circle-solid text-2xl" />
                                <p>No notes found.</p>
                                <p>Start by adding a new one!</p>
                            </div>
                        )}
                    </div>
                </div>
                <div id="editor"></div>
            </div>
        </Window>
    );
};

export default NotepadWindow;
