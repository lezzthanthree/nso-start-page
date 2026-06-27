import React from "react";
import Separator from "./Taskbar/Separator";
import StartButton from "./Taskbar/StartButton";
import Clock from "./Taskbar/Clock";
import Task from "./Taskbar/Task";
import { useWindowState } from "../hooks/useWindowStates";
import { windowNames } from "../data/WindowName";

const Taskbar: React.FC = () => {
    const { activeWindows } = useWindowState();

    return (
        <div
            className="w-full bg-nso-light-purple border-t-2 border-t-white flex flex-row gap-2 items-center p-1 z-999999999999"
            id="taskbar"
        >
            <StartButton />
            <Separator />
            <div
                id="tasks"
                className="flex-1 flex flex-row h-full overflow-scroll gap-1"
            >
                {activeWindows.map((task) => (
                    <Task
                        title={
                            windowNames[task as keyof typeof windowNames] ??
                            task
                        }
                        id={task}
                    />
                ))}
            </div>
            <Clock />
        </div>
    );
};

export default Taskbar;
