import React from "react";
import { Window } from "../Window";
import { useWindowState } from "../../hooks/useWindowStates";

const SpeedDialWindow: React.FC = () => {
    const { speedDialWindow, setSpeedDialWindow } = useWindowState();
    return (
        <>
            {speedDialWindow && (
                <Window
                    title="Speed Dial"
                    id="speedDial"
                    stateHandler={setSpeedDialWindow}
                ></Window>
            )}
        </>
    );
};

export default SpeedDialWindow;
