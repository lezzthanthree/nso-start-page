import React from "react";
import { useWindowState } from "../../hooks/useWindowStates";

interface TaskProps {
    title: string;
    id: string;
}

const Task: React.FC<TaskProps> = ({ title, id }) => {
    const { focusedWindow, openWindow } = useWindowState();
    const active = focusedWindow === id;

    return (
        <div
            className={`flex flex-row gap-2 items-center border-2 px-2 py-1 ${active ? "border-b-white border-r-white border-t-nso-purple border-l-nso-purple" : "border-t-white border-l-white border-b-nso-purple border-r-nso-purple"} h-full w-full max-w-64`}
            onClick={() => {
                openWindow(id);
            }}
        >
            <div className="bg-nso-purple h-5 w-5 shrink-0" />
            <p className="    text-xl">{title}</p>
        </div>
    );
};

export default Task;
