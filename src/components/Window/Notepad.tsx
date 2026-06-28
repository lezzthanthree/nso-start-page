import React, { useEffect, useRef } from "react";
import { Window } from "../Window";
import { useWindowState } from "../../hooks/useWindowStates";
import InputBox from "../InputBox";
import Button from "../Button";
import { useSearchState } from "../../hooks/useSearchState";

const NotepadWindow: React.FC = () => {
    return (
        <Window title="Notepad" id="notepad" x={150} y={150}>
            notepad
        </Window>
    );
};

export default NotepadWindow;
