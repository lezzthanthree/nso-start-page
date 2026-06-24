import React from "react";
import Separator from "./Taskbar/Separator";
import StartButton from "./Taskbar/StartButton";
import Clock from "./Taskbar/Clock";

const Taskbar: React.FC = () => {
    return (
        <div
            className="w-full bg-nso-light-purple border-t-2 border-t-white flex flex-row gap-2 items-center p-1 z-10"
            id="taskbar"
        >
            <StartButton />
            <Separator />
            <Separator />
            <div id="tasks" className="flex-1 bg-amber-300 h-full"></div>
            <Clock />
        </div>
    );
};

export default Taskbar;
