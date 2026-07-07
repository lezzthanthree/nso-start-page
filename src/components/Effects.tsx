import React from "react";
import RestartingEffect from "./Effects/Restarting";
import { useFXState } from "../hooks/useFX";

const Effects: React.FC = () => {
    const { restarting } = useFXState();
    return (
        <div className="absolute h-full w-full z-999999 pointer-events-none">
            {restarting && <RestartingEffect />}
        </div>
    );
};

export default Effects;
