import React, { useRef } from "react";
import Draggable from "react-draggable";

interface IconProps {
    image: string;
    name: string;
    action: () => void;
    execute?: boolean;
}

const Icon: React.FC<IconProps> = ({
    image,
    name,
    action,
    execute = false,
}) => {
    const nodeRef = useRef(null);
    const isDragging = useRef(false);

    const handleStart = () => {
        isDragging.current = false;
    };

    const handleDrag = () => {
        isDragging.current = true;
    };

    const handleStop = () => {
        // If the item wasn't dragged, trigger the click action
        if (!isDragging.current) {
            if (execute) {
                new Audio("snd/execute.wav")
                    .play()
                    .catch((e) => console.log(e));
            }
            action();
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            onDrag={handleDrag}
            onStop={handleStop}
            onStart={handleStart}
        >
            <div
                className="flex flex-col items-center gap-2 font-nso-dinkie-7px text-nso-purple"
                ref={nodeRef}
            >
                <img
                    src={image}
                    alt=""
                    className="h-16 w-16 object-cover icon"
                />
                <p>{name}</p>
            </div>
        </Draggable>
    );
};

export default Icon;
