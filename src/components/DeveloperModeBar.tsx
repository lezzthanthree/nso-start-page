import React from "react";
import { useExperimentalState } from "../hooks/useExperimental";
import { useWindowState } from "../hooks/useWindowStates";

const DeveloperModeBar: React.FC = () => {
    const { experimental } = useExperimentalState();
    const { openWindow } = useWindowState();

    if (!experimental) return;

    return (
        <div
            className="h-8 bg-red-600 text-white   font-extrabold w-full items-center justify-center flex flex-col"
            onClick={() => openWindow("developer")}
        >
            DEVELOPER MODE
        </div>
    );
};

export default DeveloperModeBar;
