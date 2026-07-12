import Draggable from "react-draggable";
import React, { useEffect, useRef, useState } from "react";
import { useWindowState } from "../../hooks/useWindowStates";

interface WindowProps {
    title: string;
    children?: React.ReactNode;
    id: string;
    x?: number;
    y?: number;
    startingPosition?:
        | "center"
        | "topLeft"
        | "topRight"
        | "bottomLeft"
        | "bottomRight";
}

const stylePositions = {
    center: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    topLeft: {
        top: "0",
        left: "0",
    },
    topRight: {
        top: "0",
        right: "0",
    },
    bottomLeft: {
        bottom: "0",
        left: "0",
    },
    bottomRight: {
        bottom: "0",
        right: "0",
    },
};

export const Window: React.FC<WindowProps> = ({
    title,
    children,
    id,
    x,
    y,
    startingPosition = "center",
}) => {
    const nodeRef = useRef(null);

    const {
        focusedWindow,
        setFocusedWindow,
        zCount,
        incrementZCount,
        closeWindow,
    } = useWindowState();

    const active = focusedWindow == id;

    const [z, setZ] = useState(zCount);

    useEffect(() => {
        new Audio("snd/window_open.wav").play();
    }, []);

    const handleClose = () => {
        new Audio("snd/window_close.wav").play();
        closeWindow(id);
    };

    const handleFocus = () => {
        if (!active) {
            setFocusedWindow(id);
            const nextZ = zCount + 1;
            incrementZCount();
            setZ(nextZ);
        }
    };

    const defaultPosition =
        x !== undefined || y !== undefined
            ? { x: x ?? 0, y: y ?? 0 }
            : undefined;

    if (active && z < zCount) {
        setZ(zCount + 1);
        incrementZCount();
    }

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#title-bar"
            defaultPosition={defaultPosition}
            onStart={handleFocus}
        >
            <div
                id="window"
                ref={nodeRef}
                className={`absolute border-2 border-nso-purple ${active ? "bg-nso-cyan" : "bg-nso-gray"} px-1 pt-1 box-border flex flex-col shadow-[4px_4px_#4d23cf55] min-w-64 min-h-64 pointer-events-auto ${startingPosition === "center" ? "-translate-1/2" : ""}`}
                style={{ zIndex: z, ...stylePositions[startingPosition] }}
                onClick={handleFocus}
            >
                <div
                    className="flex flex-row items-center bg-nso-light-pink border-2 border-nso-purple box-border p-1 gap-1"
                    id="title-bar"
                >
                    <div className="bg-nso-purple h-5 w-5 shrink-0" />
                    <span className="w-full text-[20px]/[20px]    ">
                        {title}
                    </span>
                    <div className="flex gap-1 h-5 shrink-0">
                        <img
                            src="img/button_close.png"
                            className="w-5 h-5 icons"
                            onClick={handleClose}
                        />
                    </div>
                </div>
                <div
                    id="content"
                    className="bg-nso-white border-2 border-nso-purple my-1 border-box flex flex-1 relative"
                >
                    {children}
                </div>
                <div id="small-boxes" className="flex flex-row">
                    <div className="h-2.5 w-12 bg-nso-dark-pink border-2 border-b-0 border-box border-nso-purple" />
                    <div
                        className={`h-2 w-2 ${active ? "bg-nso-cyan" : "bg-nso-gray"} border-2 border-nso-purple border-box ml-0.5`}
                    />
                    <div
                        className={`h-2 w-2 ${active ? "bg-nso-cyan" : "bg-nso-gray"} border-2 border-nso-purple border-box ml-0.5`}
                    />
                    <div
                        className={`h-2 w-2 ${active ? "bg-nso-cyan" : "bg-nso-gray"} border-2 border-nso-purple border-box ml-0.5`}
                    />
                </div>
            </div>
        </Draggable>
    );
};
