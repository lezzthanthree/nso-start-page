import React from "react";
import { useExperimentalState } from "../hooks/useExperimental";

interface Icon8BitProps {
    icon: string;
    color?: string;
    name: string;
    action: () => void;
    execute?: boolean;
    from?: string;
}

const Icon8Bit: React.FC<Icon8BitProps> = ({
    icon,
    color = " ",
    name,
    action,
    execute = false,
    from,
}) => {
    const { experimental } = useExperimentalState();

    const handleAction = () => {
        if (execute) {
            new Audio("snd/execute.wav").play().catch((e) => console.log(e));
        }

        if (experimental && from == "speed-dial") {
            console.info("Will not redirect. Development mode on.");
            return;
        }

        action();
    };

    return (
        <div
            className="flex flex-col items-center gap-2     text-lg/4 w-20 text-center"
            onClick={handleAction}
        >
            <i
                className={`hn ${icon} h-16 w-16 text-[64px]`}
                style={{
                    color,
                }}
            />
            <p>{name}</p>
        </div>
    );
};

export default Icon8Bit;
