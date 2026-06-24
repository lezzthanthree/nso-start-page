import Draggable from "react-draggable";
import { useEffect, useRef } from "react";

interface WindowProps {
    title: string;
    children?: React.ReactNode;
    stateHandler?: (state: boolean) => void;
    x?: number;
    y?: number;
}

export const Window = (prop: WindowProps) => {
    const { title, children, stateHandler, x, y } = prop;

    const nodeRef = useRef(null);

    useEffect(() => {
        new Audio("snd/window_open.wav").play();
    }, []);

    const handleClose = () => {
        if (!stateHandler) return;

        new Audio("snd/window_close.wav").play();
        stateHandler(false);
    };

    const defaultPosition =
        x !== undefined || y !== undefined
            ? { x: x ?? 0, y: y ?? 0 }
            : undefined;

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#title-bar"
            defaultPosition={defaultPosition}
        >
            <div
                className="absolute border-2 border-nso-purple bg-nso-cyan px-1 pt-1 box-border flex flex-col shadow-[4px_4px_#4d23cf55] min-w-64 min-h-64 pointer-events-auto"
                ref={nodeRef}
            >
                <div
                    className="flex flex-row items-center bg-nso-light-pink border-2 border-nso-purple box-border p-1 gap-1"
                    id="title-bar"
                >
                    <div className="bg-nso-purple h-5 w-5 shrink-0" />
                    <span className="w-full text-[20px]/[20px] font-nso-dinkie-9px text-nso-purple">
                        {title}
                    </span>
                    <div className="flex gap-1 h-5 shrink-0">
                        {stateHandler && (
                            <img
                                src="img/button_close.png"
                                className="w-5 h-5 icons"
                                onClick={handleClose}
                            />
                        )}
                    </div>
                </div>
                <div className="bg-white border-2 border-nso-purple my-1 border-box flex flex-col flex-1">
                    {children}
                </div>
                <div className="flex flex-row">
                    <div className="h-2.5 w-12 bg-nso-dark-pink border-2 border-b-0 border-box border-nso-purple" />
                    <div className="h-2 w-2 bg-nso-cyan border-2 border-nso-purple border-box ml-0.5" />
                    <div className="h-2 w-2 bg-nso-cyan border-2 border-nso-purple border-box ml-0.5" />
                    <div className="h-2 w-2 bg-nso-cyan border-2 border-nso-purple border-box ml-0.5" />
                </div>
            </div>
        </Draggable>
    );
};
